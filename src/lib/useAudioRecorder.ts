import { useEffect, useRef, useState } from "react";

export const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const getSupportedMimeType = () => {
  if (typeof MediaRecorder === "undefined") {
    return "";
  }
  const types = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg;codecs=opus",
    "audio/ogg",
    "audio/mp4",
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
  ];
  return types.find((type) => MediaRecorder.isTypeSupported(type)) || "";
};

const getFileExtension = (mimeType: string) => {
  if (mimeType.includes("ogg")) return "ogg";
  if (mimeType.includes("mp4")) return "mp4";
  if (mimeType.includes("mpeg") || mimeType.includes("mp3")) return "mp3";
  if (mimeType.includes("wav")) return "wav";
  return "webm";
};

export const createAudioFileFromBlob = (
  blob: Blob,
  baseName = "audio",
) => {
  const mimeType = blob.type || "audio/webm";
  const extension = getFileExtension(mimeType);
  return new File([blob], `${baseName}.${extension}`, {
    type: mimeType,
  });
};

export const blobToBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(typeof reader.result === "string" ? reader.result : "");
    };
    reader.onerror = () => reject(new Error("Unable to read audio file"));
    reader.readAsDataURL(blob);
  });

type UseAudioRecorderOptions = {
  maxSeconds?: number;
};

type ClearOptions = {
  revokePreview?: boolean;
};

export const useAudioRecorder = (options: UseAudioRecorderOptions = {}) => {
  const maxDuration = Math.min(Math.max(options.maxSeconds ?? 15, 1), 60);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [recordedSeconds, setRecordedSeconds] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const previewUrlRef = useRef<string>("");

  const activeSeconds = isRecording
    ? Math.ceil(elapsedMs / 1000)
    : recordedSeconds;
  const progress =
    maxDuration > 0 ? Math.min(activeSeconds / maxDuration, 1) : 0;

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const cleanupStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const clearRecording = (options?: ClearOptions) => {
    const shouldRevoke = options?.revokePreview !== false;
    if (shouldRevoke && previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl("");
    setRecordedBlob(null);
    setRecordedSeconds(0);
    setElapsedMs(0);
    previewUrlRef.current = "";
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state !== "recording") {
      return;
    }
    const elapsed = Date.now() - startTimeRef.current;
    const seconds = Math.min(
      maxDuration,
      Math.max(1, Math.round(elapsed / 1000)),
    );
    setRecordedSeconds(seconds);
    setIsRecording(false);
    clearTimer();
    recorder.stop();
    cleanupStream();
  };

  const startRecording = async () => {
    try {
      if (typeof MediaRecorder === "undefined") {
        setError("Audio recording is not supported in this browser.");
        return;
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Microphone access is not available in this browser.");
        return;
      }
      setError("");
      clearRecording();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = getSupportedMimeType();
      const mediaRecorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      );
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data?.size) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorder.mimeType || "audio/webm",
        });
        setRecordedBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setPreviewUrl(url);
      };
      mediaRecorder.onerror = () => {
        setError("Recording failed. Please try again.");
      };
      mediaRecorder.start();
      setIsRecording(true);
      setElapsedMs(0);
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        setElapsedMs(elapsed);
        if (elapsed >= maxDuration * 1000) {
          stopRecording();
        }
      }, 100);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      cleanupStream();
      setError("Microphone access was blocked.");
    }
  };

  const createFile = (baseName = "audio") => {
    if (!recordedBlob) return null;
    return createAudioFileFromBlob(recordedBlob, baseName);
  };

  useEffect(() => {
    previewUrlRef.current = previewUrl;
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      clearTimer();
      cleanupStream();
      if (previewUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  return {
    maxDuration,
    isRecording,
    elapsedMs,
    recordedSeconds,
    previewUrl,
    recordedBlob,
    error,
    activeSeconds,
    progress,
    startRecording,
    stopRecording,
    clearRecording,
    createFile,
  };
};
