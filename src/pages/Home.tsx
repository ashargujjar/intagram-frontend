import Nav from "@/components/Nav";

import Pictures from "@/components/Home/Pictures";
import Greeting from "@/components/Home/Greeting";
const Home = () => {
  return (
    <div className="w-full p-4 md:p-6 flex flex-col sm:flex-row gap-8 mx-auto max-w-6xl">
      {/* 1. SIDEBAR Navigation */}
      <div className="w-full sm:w-64 shrink-0">
        <Nav />
      </div>

      {/* 2. MAIN FEED CONTENT AREA */}
      {/* We center the feed on the screen like Instagram/Twitter */}
      <div className="flex-1 flex flex-col items-center mt-4 sm:mt-0">
        <Greeting />

        {/* Map over the mockPosts array to generate individual cards */}
        <Pictures />
      </div>
    </div>
  );
};

export default Home;
