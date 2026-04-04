import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Profileprop } from "./types";
import {
  formatTime,
  useAudioRecorder,
} from "@/lib/useAudioRecorder";

type IntroAudioCardProps = {
  user?: Profileprop;
  maxSeconds?: number;
  isSaving?: boolean;
  isRemoving?: boolean;
  onSave?: (
    file: File,
    previewUrl: string,
    durationSeconds: number,
  ) => Promise<boolean> | boolean;
  onRemove?: () => Promise<boolean> | boolean;
};

const IntroAudioCard = ({
  user,
  maxSeconds = 10,
  isSaving = false,
  isRemoving = false,
  onSave,
  onRemove,
}: IntroAudioCardProps) => {
  const {
    maxDuration,
    isRecording,
    recordedSeconds,
    previewUrl,
    recordedBlob,
    error: recorderError,
    activeSeconds,
    progress,
    startRecording,
    stopRecording,
    clearRecording,
    createFile,
  } = useAudioRecorder({ maxSeconds });
  const [localSavedUrl, setLocalSavedUrl] = useState("");
  const [error, setError] = useState("");
  const savedUrlRef = useRef<string>("");

  const currentSavedUrl = user?.introAudio || localSavedUrl;
  const hasPreview = Boolean(previewUrl);
  const displayUrl = hasPreview ? previewUrl : currentSavedUrl;
  const canRemove = Boolean(localSavedUrl || (user?.introAudio && onRemove));
  const displayError = error || recorderError;

  const handleStartRecording = async () => {
    setError("");
    await startRecording();
  };

  const handleSave = async () => {
    if (!recordedBlob || !previewUrl) {
      return;
    }
    const file = createFile("intro-audio");
    if (!file) {
      return;
    }
    setError("");
    try {
      if (onSave) {
        const result = await Promise.resolve(
          onSave(file, previewUrl, recordedSeconds),
        );
        if (result === false) {
          setError("Failed to save intro audio. Please try again.");
          return;
        }
      }
      setLocalSavedUrl(previewUrl);
      clearRecording({ revokePreview: false });
    } catch (err) {
      console.error("Error saving intro audio:", err);
      setError("Failed to save intro audio. Please try again.");
    }
  };

  const handleCancel = () => {
    clearRecording();
  };

  const handleRemove = async () => {
    setError("");
    try {
      if (onRemove) {
        const result = await Promise.resolve(onRemove());
        if (result === false) {
          setError("Failed to remove intro audio. Please try again.");
          return;
        }
      }
      if (localSavedUrl && localSavedUrl.startsWith("blob:")) {
        URL.revokeObjectURL(localSavedUrl);
      }
      if (user?.introAudio && user.introAudio.startsWith("blob:")) {
        URL.revokeObjectURL(user.introAudio);
      }
      setLocalSavedUrl("");
      clearRecording();
    } catch (err) {
      console.error("Error removing intro audio:", err);
      setError("Failed to remove intro audio. Please try again.");
    }
  };

  useEffect(() => {
    savedUrlRef.current = localSavedUrl;
  }, [localSavedUrl]);

  useEffect(() => {
    if (!localSavedUrl || !user?.introAudio) {
      return;
    }
    if (user.introAudio !== localSavedUrl) {
      if (localSavedUrl.startsWith("blob:")) {
        URL.revokeObjectURL(localSavedUrl);
      }
      setLocalSavedUrl("");
    }
  }, [user?.introAudio, localSavedUrl]);

  useEffect(() => {
    return () => {
      if (savedUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(savedUrlRef.current);
      }
    };
  }, []);
  return (
    <Card className="w-full shadow-lg border-[#E6EEF5] bg-white/90 backdrop-blur rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-[#E6EEF5] pb-4 bg-[#F6FBFF]">
        <CardTitle className="text-lg text-[#1E4F7A] flex items-center gap-2">
          <Mic className="w-5 h-5" /> Intro Audio
        </CardTitle>
        <CardDescription>
          Add a short audio intro to show on your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="text-xs text-gray-500 font-medium">
          Max length: {maxDuration} seconds
        </div>
        {displayError ? (
          <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
            {displayError}
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#1E4F7A] text-xs font-semibold hover:bg-[#F6FBFF] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleStartRecording}
            type="button"
            disabled={isRecording || isSaving}
          >
            <Mic className="w-4 h-4" />
            {hasPreview ? "Re-record" : "Record"}
          </button>
          <button
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-100 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={stopRecording}
            type="button"
            disabled={!isRecording}
          >
            <Square className="w-4 h-4" />
            Stop
          </button>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-24 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-[#1E4F7A] transition-all"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            {formatTime(activeSeconds)} / {formatTime(maxDuration)}
          </div>
        </div>
        {displayUrl ? (
          <div className="rounded-2xl border border-[#E6EEF5] bg-white/90 p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-semibold text-[#1E4F7A]">
                {hasPreview ? "Preview (not saved yet)" : "Current intro audio"}
              </span>
              {hasPreview && recordedSeconds ? (
                <span>{formatTime(recordedSeconds)}</span>
              ) : null}
            </div>
            <audio controls src={displayUrl} className="w-full h-9" />
          </div>
        ) : (
          <div className="text-xs text-gray-500">
            No intro audio set yet.
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <Button
            className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white px-6 cursor-pointer"
            onClick={handleSave}
            disabled={!hasPreview || isSaving || isRecording}
          >
            {isSaving ? "Saving..." : "Set Intro Audio"}
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer"
            onClick={handleCancel}
            type="button"
            disabled={!hasPreview || isRecording}
          >
            Cancel Audio
          </Button>
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
            type="button"
            onClick={handleRemove}
            disabled={!canRemove || isRemoving}
          >
            {isRemoving ? "Removing..." : "Remove"}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="bg-[#F6FBFF] border-t border-[#E6EEF5] p-4 text-xs text-gray-500">
        This intro audio will appear on your profile.
      </CardFooter>
    </Card>
  );
};

export default IntroAudioCard;
