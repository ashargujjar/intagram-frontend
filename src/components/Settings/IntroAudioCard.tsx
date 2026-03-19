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

const IntroAudioCard = () => {
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
          Max length: 10 seconds
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#1E4F7A] text-xs font-semibold hover:bg-[#F6FBFF] transition">
            <Mic className="w-4 h-4" />
            Record
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-gray-100 transition">
            <Square className="w-4 h-4" />
            Stop
          </button>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-24 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full w-1/2 bg-[#1E4F7A]" />
            </div>
            0:05 / 0:10
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-[#1E4F7A] hover:bg-[#143A5A] text-white px-6 cursor-pointer">
            Set Intro Audio
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Cancel Audio
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
