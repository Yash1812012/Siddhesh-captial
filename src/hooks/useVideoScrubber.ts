import { useState, useEffect, useRef, useCallback } from 'react';
import { loadVideoBlob, saveVideoBlob, DEFAULT_VIDEO_URL } from '../services/mediaStorage';

export function useVideoScrubber() {
  const [videoSrc, setVideoSrc] = useState<string>('/video.mp4');
  const [videoDuration, setVideoDuration] = useState<number>(10);
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [scrubSensitivity, setScrubSensitivity] = useState<number>(0.8);
  const [videoNotification, setVideoNotification] = useState<string | null>(null);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize video from local storage / cache / fallback
  useEffect(() => {
    let isMounted = true;

    async function initVideo() {
      const storedBlob = await loadVideoBlob();
      if (storedBlob && isMounted) {
        const objectUrl = URL.createObjectURL(storedBlob);
        setVideoSrc(objectUrl);
        return;
      }

      try {
        const res = await fetch('/video.mp4', { method: 'HEAD' });
        if (res.ok && isMounted) {
          setVideoSrc('/video.mp4');
          return;
        }
      } catch {
        // Fallback
      }

      if (isMounted) {
        setVideoSrc(DEFAULT_VIDEO_URL);
      }
    }

    initVideo();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleVideoError = useCallback(() => {
    if (videoSrc !== DEFAULT_VIDEO_URL) {
      setVideoSrc(DEFAULT_VIDEO_URL);
    }
  }, [videoSrc]);

  const handleApplyNewVideoFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|webm|mov|m4v)$/i)) {
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setVideoSrc(objectUrl);
    await saveVideoBlob(file);
    setVideoNotification('Custom video loaded & stored locally');
    setTimeout(() => setVideoNotification(null), 3500);
  }, []);

  // Global drag & drop file replacement
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.types.includes('Files')) {
        setIsDraggingVideo(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      if (e.clientX <= 0 || e.clientY <= 0) {
        setIsDraggingVideo(false);
      }
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      setIsDraggingVideo(false);
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        await handleApplyNewVideoFile(e.dataTransfer.files[0]);
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, [handleApplyNewVideoFile]);

  // Mouse & Touch Scrubbing
  useEffect(() => {
    if (isPlaying) return;

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        prevXRef.current = e.clientX;
        return;
      }

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const timeOffset = (delta / window.innerWidth) * scrubSensitivity * video.duration;
      let newTarget = targetTimeRef.current + timeOffset;
      newTarget = Math.max(0, Math.min(video.duration, newTarget));
      targetTimeRef.current = newTarget;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const clientX = e.touches[0].clientX;
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        prevXRef.current = clientX;
        return;
      }

      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        return;
      }

      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      const timeOffset = (delta / window.innerWidth) * scrubSensitivity * video.duration;
      let newTarget = targetTimeRef.current + timeOffset;
      newTarget = Math.max(0, Math.min(video.duration, newTarget));
      targetTimeRef.current = newTarget;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrubSensitivity, isPlaying]);

  const handleSeeked = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentVideoTime(video.currentTime);

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration || 10);
      targetTimeRef.current = videoRef.current.currentTime || 0;
      setCurrentVideoTime(videoRef.current.currentTime || 0);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentVideoTime(videoRef.current.currentTime);
    }
  }, []);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  return {
    videoSrc,
    videoRef,
    fileInputRef,
    videoDuration,
    currentVideoTime,
    isPlaying,
    scrubSensitivity,
    setScrubSensitivity,
    videoNotification,
    isDraggingVideo,
    togglePlayback,
    handleSeeked,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleVideoError,
    handleApplyNewVideoFile,
  };
}
