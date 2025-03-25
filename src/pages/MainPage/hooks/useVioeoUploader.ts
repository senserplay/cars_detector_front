import { useState, useRef, ChangeEvent } from "react";

export const useVideoUploader = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const cancelVideo = () => {
    setVideoUrl(null);
    setVideoFile(null);
  };

  return {
    videoUrl,
    videoFile,
    handleFileChange,
    cancelVideo,
  };
};
