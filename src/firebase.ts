import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth instance & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Firestore instance (using designated firestoreDatabaseId if specified)
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Auth helper functions
export async function signInWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Record / update user in Firestore
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLoginAt: serverTimestamp(),
        },
        { merge: true },
      );
    }
    return user;
  } catch (error) {
    console.error('Google Sign-In failed:', error);
    throw error;
  }
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

export function onUserAuthStateChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Firestore Inquiry & Bookmark interfaces
export interface SavedCreditInquiry {
  id?: string;
  facilityType: string;
  amountCrore: number;
  tenorMonths: number;
  monthlyEmiLakhs: string;
  totalPayableCrore: string;
  notes?: string;
  status: 'Draft' | 'Submitted' | 'Under Review';
  createdAt?: any;
}

export interface UserBookmark {
  id?: string;
  title: string;
  category: 'financials' | 'leadership' | 'filing' | 'location';
  detail: string;
  createdAt?: any;
}

// Save credit inquiry to Firestore
export async function saveCreditInquiry(
  userId: string,
  inquiry: Omit<SavedCreditInquiry, 'id' | 'createdAt'>,
): Promise<string> {
  const inquiriesRef = collection(db, 'users', userId, 'inquiries');
  const docRef = await addDoc(inquiriesRef, {
    ...inquiry,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Fetch user credit inquiries
export async function fetchUserInquiries(userId: string): Promise<SavedCreditInquiry[]> {
  try {
    const inquiriesRef = collection(db, 'users', userId, 'inquiries');
    const q = query(inquiriesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<SavedCreditInquiry, 'id'>),
    }));
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }
}

// Save bookmark
export async function saveUserBookmark(
  userId: string,
  bookmark: Omit<UserBookmark, 'id' | 'createdAt'>,
): Promise<string> {
  const bookmarksRef = collection(db, 'users', userId, 'bookmarks');
  const docRef = await addDoc(bookmarksRef, {
    ...bookmark,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Fetch user bookmarks
export async function fetchUserBookmarks(userId: string): Promise<UserBookmark[]> {
  try {
    const bookmarksRef = collection(db, 'users', userId, 'bookmarks');
    const q = query(bookmarksRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<UserBookmark, 'id'>),
    }));
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
}

// Delete bookmark
export async function deleteUserBookmark(userId: string, bookmarkId: string): Promise<void> {
  const bookmarkDoc = doc(db, 'users', userId, 'bookmarks', bookmarkId);
  await deleteDoc(bookmarkDoc);
}
