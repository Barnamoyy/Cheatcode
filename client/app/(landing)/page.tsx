import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="px-2 lg:px-4 py-1 lg:py-2 bg-[#121212] h-full w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center">
        <div className="">
          <h1 className="text-xl lg:text-xl font-semibold text-white">CheatCode</h1>
        </div>
        <div className="flex flex-row space-x-2 lg:space-x-4">
        <Link href={"/sign-up"}>
          <Button variant="link" className="text-white font-semibold text-sm lg:text-md">Sign-up</Button>
        </Link>
        <Link href={"/sign-in"}>
            <Button className="bg-white text-black text-sm lg:text-md font-semibold">Log-in</Button>
        </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-[48px] lg:text-[84px] text-white text-center font-serif w-3/4 font-semibold leading-tight">Interviews made easy by a lot</h1>
        <h4 className="text-white text-md lg:text-lg mt-2 lg:mt-4 font-light font-serif">Cheatcode is a small-scale leetcode clone that helps with your interview prep</h4>
        <Link href={"/sign-in"}>
          <Button variant={'default'} className="bg-green-500 text-white font-bold text-md mt-4 lg:mt-8">Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
