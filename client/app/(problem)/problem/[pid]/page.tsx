"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFontSize, setFontSize } from "@/lib/storage";

import axios from "axios";
import Navbar from "@/components/navbar";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { set } from "date-fns";
import TestcaseWindow from "@/components/testcase-window";

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  acceptance: string;
  description: string;
  examples: Example[];
  testcases: Testcase[];
}

interface Example {
  id: string;
  input: string;
  output: string;
}

interface Testcase {
  id: string;
  input: string;
  output: string;
}

const Page = () => {

  const [showTestcase, setShowTestcase] = useState<Testcase | null>(null);

  // editor states
  const [fontSizeState, setFontSizeState] = useState<number>(getFontSize() || 12);

  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/get");
        const data = res.data;
        const problem = data.find((problem: any) => problem.id === params.pid);
        setCurrentProblem(problem || null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(currentProblem);
  }, [currentProblem]);

  const params = useParams<{ pid: string }>();
  console.log(params?.pid);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontSize = parseInt(e.target.value);
    setFontSizeState(newFontSize);
    setFontSize(newFontSize);
  };
  if (!currentProblem) {
    return <></>;
  }

  return (
    <div className="w-full h-full">
      <Navbar />
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-row space-x-2 lg:space-x-4"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex flex-col justify-start items-start w-full py-4 lg:py-8">
            <div className="flex flex-row justify-center items-center space-x-2 lg:space-x-4">
              <h1 className="text-md lg:text-xl font-semibold">
                {currentProblem.title}
              </h1>
              <div
                className={
                  "font-medium px-4 py-2 w-fit rounded-full text-green-500 bg-green-500/10 text-sm lg:text-md"
                }
              >
                {currentProblem.difficulty}
              </div>
            </div>
            <div className="py-2 lg:py-4">
              <p className="text-sm lg:text-[16px] w-5/6 text-wrap leading-6">
                {currentProblem.description}
              </p>
            </div>
            <div className="space-y-4 lg:space-y-8 w-full">
              <h1 className="font-semibold">Example</h1>
              {currentProblem.examples.map((example) => (
                <div
                  key={example.id}
                  className="dark:bg-slate-800 dark:text-white bg-slate-200 text-black rounded-md lg:rounded-lg flex flex-row justify-start items-center px-2 py-2 lg:py-4 lg:px-4"
                >
                  <div className="flex flex-col justify-center items-start space-y-2 lg:space-y-4">
                    <div className="flex flex-row justify-center items-start space-x-2 lg:space-x-4">
                      <h2 className="text-sm lg:text-[16px] font-semibold">
                        Input:
                      </h2>
                      <p className="text-sm lg:text-[16px] font-semibold">
                        {example.input}
                      </p>
                    </div>
                    <div className="flex flex-row justify-center items-start space-x-2 lg:space-x-4">
                      <h2 className="text-sm lg:text-[16px] font-semibold">
                        Output:
                      </h2>
                      <p className="text-sm lg:text-[16px] font-semibold">
                        {example.output}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-start items-center space-x-2 lg:space-x-4 mt-2 lg:mt-4">
              {currentProblem.testcases.map((testcase, index) => (
                <div key={testcase.id}>
                    <Button className="bg-green-500/10 text-green-500 rounded-md lg:rounded-lg px-2 py-1 lg:px-2 lg:py-2" onClick={() => {
                      setShowTestcase(testcase)
                    }}>
                      {`Test ${index + 1}`}
                    </Button>
                </div> 
              ))}
            </div>
              {showTestcase && <TestcaseWindow {...showTestcase}/>}
            <div className="py-2 lg:py-4">
              <h2 className="my-2 lg:my-4 font-semibold">Constraints</h2>
              <p className="text-sm lg:text-[16px] leading-6 py-1 lg:py-2">
                      {`2 <= nums.length <= 10^4`}
              </p>
              <p className="text-sm lg:text-[16px] leading-6 py-1 lg:py-2">
                      {`10^9 <= nums[i] <= 10^9`}
              </p>
              <p className="text-sm lg:text-[16px] leading-6 py-1 lg:py-2">
                      {`10^9 <= target <= 10^9`}
              </p>

            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="w-full h-full">
            <select name="language" id="language" defaultValue={"javascript"} className="bg-transparent my-2 lg:my-4">
              <option value="javascript">Javascript</option>
              <option value="c++">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
            <Editor
              height={"80%"}
              defaultLanguage="javascript"
              defaultValue="//some comment"
              theme="vs-dark"
              className="py-0 lg:py-2 rounded-lg"
              options={{
                minimap: { enabled: false },
                fontSize: fontSizeState,
                wordWrap: "on",
              }}
            />
            <div className="flex flex-row space-x-4 lg:space-x-8 items-center">
              <Button className="text-white bg-green-500">Submit</Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Settings className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex flex-col justify-center items-start">
                    <h2 className="text-sm lg:text-md">Settings</h2>
                    <div className="flex flex-row items-center justify-center space-x-2 lg:space-x-4 mt-2 lg:mt-4">
                      <h3 className="text-sm lg:text-md">Font-size</h3>
                      <select
                        name="font-size"
                        id="fsize"
                        defaultValue={"12px"}
                        className="bg-transparent text-sm lg:text-md"
                        value={fontSizeState}
                        onChange={handleFontSizeChange}
                      >
                        <option value="10">10px</option>
                        <option value="12">12px</option>
                        <option value="14">14px</option>
                        <option value="16">16px</option>
                        <option value="18">18px</option>
                      </select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;
