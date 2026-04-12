import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, X, Mic, Square, Loader2 } from "lucide-react";
import Nav from "@/components/Nav";
import { useState } from "react";
import { toast } from "react-toastify";
import { formatTime, useAudioRecorder } from "@/lib/useAudioRecorder";

const CreatePost = () => {
  const [text, setText] = useState<string>("");
  const [photho, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    maxDuration,
    isRecording,
    recordedSeconds,
    previewUrl,
    recordedBlob,
    error: audioError,
    activeSeconds,
    progress,
    startRecording,
    stopRecording,
    clearRecording,
    createFile,
  } = useAudioRecorder({ maxSeconds: 10 });
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
  };
  const handleRemove = () => {
    setPhoto(null);
  };
  const token = localStorage.getItem("RabtaLtoken");

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("text", text);

      if (!photho) {
        toast.error("No photo selected!");
        toast.error("Please upload at least one picture");
        setLoading(false);
        return;
      }

      formData.append("image", photho);
      if (recordedBlob) {
        const audioFile = createFile("post-audio");
        if (audioFile) {
          formData.append("audio", audioFile);
        }
      }

      const backend_url = import.meta.env.VITE_BACKEND_URL;
      if (!backend_url) {
        throw new Error("Backend URL is not configured.");
      }

      const res = await fetch(`${backend_url}/photo`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Failed to create post.");
      }

      const data = await res.json();
      toast.success(data.message || "Post uploaded successfully");
      clearRecording();
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      <div className="flex-1 mt-4 sm:mt-0 font-['Space_Grotesk']">
        <div className="w-full max-w-3xl mb-6">
          <div className="relative overflow-hidden rounded-3xl border border-[#E6EEF5] bg-gradient-to-br from-white via-[#F6FBFF] to-[#FFF4E1] shadow-lg p-6 md:p-8">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-20 h-44 w-44 rounded-full bg-[radial-gradient(circle,_#F2A32C,_transparent_70%)] opacity-40"></div>
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,_#1E4F7A,_transparent_70%)] opacity-25"></div>
            </div>
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[#6B7280]">
                Create
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#0B2A43] mt-2">
                Share a new post
              </h1>
              <p className="text-sm text-[#4B6B88] mt-2 max-w-xl">
                Add a title, description, and a photo to update your community.
              </p>
            </div>
          </div>
        </div>

        <Card className="w-full max-w-2xl shadow-lg border-[#E6EEF5] rounded-2xl bg-white/90 backdrop-blur">
          <CardHeader className="border-b border-[#E6EEF5] bg-[#F6FBFF] rounded-t-2xl">
            <CardTitle className="text-xl font-semibold text-[#1E4F7A]">
              Create a new post
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <Textarea
                  placeholder="What's on your mind?"
                  maxLength={200}
                  value={text}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setText(e.target.value);
                  }}
                  className="min-h-[120px] resize-none text-base p-4 focus-visible:ring-[#1E4F7A] bg-white"
                />
                <div className="flex items-center justify-between text-xs text-[#4B6B88]">
                  <span>{text.length}/200</span>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-8 rounded-full border-[#D6E2EC] text-[#1E4F7A] hover:bg-[#F6FBFF]"
                  >
                    Enhance with AI
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3 mt-2">
                  {photho && (
                    <div className="relative w-24 h-24 group">
                      <img
                        src={URL.createObjectURL(photho)}
                        className="w-full h-full object-cover rounded-md border border-gray-200"
                      />
                      <button
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors cursor-pointer"
                        onClick={handleRemove}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-[#1E4F7A] transition-colors w-max mt-2">
                  <ImageIcon className="w-5 h-5" />
                  <label className="font-medium cursor-pointer">
                    Add Photo
                    <input
                      onChange={handleFiles}
                      type="file"
                      className="hidden"
                      accept=".jpg,.png,.jpeg"
                    />
                  </label>
                </div>

                {/* Audio Story Track */}
                <div className="mt-4 rounded-2xl border border-[#E6EEF5] bg-[#F6FBFF] p-4">
                  <div className="text-xs text-gray-500 font-medium mb-2">
                    Story audio track (max {maxDuration} seconds)
                  </div>
                  {audioError ? (
                    <div className="mb-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
                      {audioError}
                    </div>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#1E4F7A] text-xs font-semibold hover:bg-white/80 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      type="button"
                      onClick={startRecording}
                      disabled={isRecording || loading}
                    >
                      <Mic className="w-4 h-4" />
                      {recordedBlob ? "Re-record" : "Record"}
                    </button>
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-100 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      type="button"
                      onClick={stopRecording}
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
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E4F7A] text-white text-xs font-semibold hover:bg-[#143A5A] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      type="button"
                      disabled={!recordedBlob}
                    >
                      {recordedBlob ? "Audio ready" : "Add audio"}
                    </button>
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-100 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      type="button"
                      onClick={clearRecording}
                      disabled={!previewUrl && !recordedBlob}
                    >
                      Cancel audio
                    </button>
                  </div>
                  {previewUrl ? (
                    <div className="mt-3 rounded-2xl border border-[#E6EEF5] bg-white/90 p-4 shadow-sm">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="font-semibold text-[#1E4F7A]">
                          Audio preview
                        </span>
                        {recordedSeconds ? (
                          <span>{formatTime(recordedSeconds)}</span>
                        ) : null}
                      </div>
                      <audio controls src={previewUrl} className="w-full h-9" />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end border-t border-[#E6EEF5] bg-[#F6FBFF] p-4">
            <Button
              className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white transition-colors px-8 py-2 rounded-full inline-flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
