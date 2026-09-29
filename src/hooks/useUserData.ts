import { useState, useEffect, useCallback } from 'react';
import type { User } from 'firebase/auth';
import {
  signInWithGoogle,
  signOutUser,
  onUserAuthStateChanged,
  saveCreditInquiry,
  fetchUserInquiries,
  saveUserBookmark,
  fetchUserBookmarks,
  deleteUserBookmark,
  type SavedCreditInquiry,
  type UserBookmark,
} from '../firebase';

export function useUserData() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userInquiries, setUserInquiries] = useState<SavedCreditInquiry[]>([]);
  const [userBookmarks, setUserBookmarks] = useState<UserBookmark[]>([]);
  const [savingInquiry, setSavingInquiry] = useState(false);
  const [inquirySuccessMsg, setInquirySuccessMsg] = useState<string | null>(null);

  // Sync auth state and load user data
  useEffect(() => {
    const unsubscribe = onUserAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        try {
          const [inquiries, bookmarks] = await Promise.all([
            fetchUserInquiries(user.uid),
            fetchUserBookmarks(user.uid),
          ]);
          setUserInquiries(inquiries);
          setUserBookmarks(bookmarks);
        } catch (e) {
          console.error('Failed to load user firestore data:', e);
        }
      } else {
        setUserInquiries([]);
        setUserBookmarks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async () => {
    try {
      setAuthLoading(true);
      await signInWithGoogle();
    } catch (err) {
      console.error('Sign-in error:', err);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  }, []);

  const submitInquiry = useCallback(
    async (inquiryData: Omit<SavedCreditInquiry, 'id' | 'createdAt'>) => {
      if (!currentUser) {
        await login();
        return false;
      }

      try {
        setSavingInquiry(true);
        await saveCreditInquiry(currentUser.uid, inquiryData);
        const updated = await fetchUserInquiries(currentUser.uid);
        setUserInquiries(updated);
        setInquirySuccessMsg('Inquiry submitted & stored in your secure account database!');
        setTimeout(() => setInquirySuccessMsg(null), 4000);
        return true;
      } catch (err) {
        console.error('Failed to save inquiry to Firestore:', err);
        return false;
      } finally {
        setSavingInquiry(false);
      }
    },
    [currentUser, login],
  );

  const toggleBookmark = useCallback(
    async (
      title: string,
      category: 'financials' | 'leadership' | 'filing' | 'location',
      detail: string,
      onFeedback?: (msg: string) => void,
    ) => {
      if (!currentUser) {
        await login();
        return;
      }

      const existing = userBookmarks.find((b) => b.title === title);
      if (existing && existing.id) {
        await deleteUserBookmark(currentUser.uid, existing.id);
        setUserBookmarks((prev) => prev.filter((b) => b.id !== existing.id));
        if (onFeedback) onFeedback('Bookmark removed');
      } else {
        await saveUserBookmark(currentUser.uid, { title, category, detail });
        const updated = await fetchUserBookmarks(currentUser.uid);
        setUserBookmarks(updated);
        if (onFeedback) onFeedback('Saved to your database bookmarks');
      }
    },
    [currentUser, userBookmarks, login],
  );

  const removeBookmark = useCallback(
    async (bookmarkId: string) => {
      if (!currentUser) return;
      await deleteUserBookmark(currentUser.uid, bookmarkId);
      setUserBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
    },
    [currentUser],
  );

  return {
    currentUser,
    authLoading,
    userInquiries,
    userBookmarks,
    savingInquiry,
    inquirySuccessMsg,
    login,
    logout,
    submitInquiry,
    toggleBookmark,
    removeBookmark,
  };
}
