interface outputtabProps {
  output: Output[];
}

interface Output {
  expected: String;
  input: String;
  passed: Boolean;
  result: String;
  test_case: Number;
}

const Outputtab: React.FC<outputtabProps> = ({ output }) => {
  return (
    <div className="my-2 lg:my-4">
      <div className="px-2 py-2 lg:px-4 lg:py-2 bg-slate-800 text-white font-medium text-xs lg:text-md rounded-sm">
        <h4>Output</h4>
      </div>
      <div className="text-white px-2 py-2 lg:px-4 lg:py-2 bg-[#1a1a1a]">
        <div className="flex flex-col text-white space-x-2 lg:space-y-4 justify-start items-start">
          {output.map((output: Output, index) => (
            <>
              {output.passed ? (
                <div className="text-green-500 text-left text-sm lg:text-md">
                    <h2>Testcase {index + 1}</h2>
                    <p>{output.result}</p>
                </div>
              ) : (
                <div className="text-red-500 text-left text-sm lg:text-md">
                    <h2>Testcase {index + 1}</h2>
                    <p>{output.result}</p>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Outputtab;
