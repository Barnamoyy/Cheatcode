
interface TestcaseWindowProps {
    id: string; 
    input: string;
    output: string;
}

const TestcaseWindow:React.FC<TestcaseWindowProps> = (testcase) => {
    return (
        <div className="flex flex-col justify-start items-center px-2 py-2 lg:py-4 lg:px-4 dark:bg-slate-800 dark:text-white bg-slate-200 text-black rounded-md lg:rounded-lg mt-2 lg:mt-4">
            <div className="flex flex-col justify-center items-start space-y-2 lg:space-y-4">
                    <div className="flex flex-row justify-center items-start space-x-2 lg:space-x-4">
                      <h2 className="text-sm lg:text-[16px] font-semibold">
                        Input:
                      </h2>
                      <p className="text-sm lg:text-[16px] font-semibold">
                        {testcase.input}
                      </p>
                    </div>
                    <div className="flex flex-row justify-center items-start space-x-2 lg:space-x-4">
                      <h2 className="text-sm lg:text-[16px] font-semibold">
                        Output:
                      </h2>
                      <p className="text-sm lg:text-[16px] font-semibold">
                        {testcase.output}
                      </p>
                    </div>
                  </div>
        </div>
    );
}

export default TestcaseWindow;