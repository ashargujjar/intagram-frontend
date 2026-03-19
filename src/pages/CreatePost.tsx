import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, X, Mic, Square } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import Nav from "@/components/Nav";

const CreatePost = () => {
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
              <Field>
                <FieldLabel
                  htmlFor="title"
                  className="text-[#1E4F7A] font-medium mb-1.5 block"
                >
                  Title
                </FieldLabel>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter your Title"
                  className="focus-visible:ring-[#1E4F7A] p-4 bg-white"
                />
              </Field>

              <div className="flex flex-col gap-4">
                <Textarea
                  placeholder="What's on your mind?"
                  className="min-h-[120px] resize-none text-base p-4 focus-visible:ring-[#1E4F7A] bg-white"
                />

                <div className="flex flex-wrap gap-3 mt-2">
                  <div className="relative w-24 h-24 group">
                    <img
                      src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=200&auto=format&fit=crop"
                      alt="Mock Preview"
                      className="w-full h-full object-cover rounded-md border border-gray-200"
                    />
                    <button className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-[#1E4F7A] transition-colors w-max mt-2">
                  <ImageIcon className="w-5 h-5" />
                  <span className="font-medium">Add Photo</span>
                </div>

                {/* Audio Story Track (UI only) */}
                <div className="mt-4 rounded-2xl border border-[#E6EEF5] bg-[#F6FBFF] p-4">
                  <div className="text-xs text-gray-500 font-medium mb-2">
                    Story audio track (max 10 seconds)
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#1E4F7A] text-xs font-semibold hover:bg-white/80 transition">
                      <Mic className="w-4 h-4" />
                      Record
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-100 transition">
                      <Square className="w-4 h-4" />
                      Stop
                    </button>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-24 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full w-1/3 bg-[#1E4F7A]" />
                    </div>
                    0:04 / 0:10
                  </div>
                  <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E4F7A] text-white text-xs font-semibold hover:bg-[#143A5A] transition">
                    Add audio
                  </button>
                  <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-100 transition">
                    Cancel audio
                  </button>
                </div>
              </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end border-t border-[#E6EEF5] bg-[#F6FBFF] p-4">
            <Button className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white transition-colors px-8 py-2 rounded-full cursor-pointer">
              Post
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
