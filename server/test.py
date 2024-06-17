import subprocess
import os
import tempfile

def run_java_code(code, input_data):
    class_name = "Main"
    # Create a temporary directory
    with tempfile.TemporaryDirectory() as tempdir:
        # Define the path for the Java file with a fixed name
        java_file_path = os.path.join(tempdir, f"{class_name}.java")
        
        # Write the Java code to the file
        with open(java_file_path, "w", encoding="utf-8") as java_file:
            java_file.write(code)
        
        try:
            # Compile the Java code
            compile_result = subprocess.run(["javac", java_file_path], capture_output=True, text=True)
            if compile_result.returncode != 0:
                return compile_result.stderr
            
            # Run the compiled Java class
            run_process = subprocess.run(
                ["java", "-cp", tempdir, class_name],
                capture_output=True,
                text=True,
                input=input_data,
            )

            output = run_process.stdout if run_process.returncode == 0 else run_process.stderr
            return output.strip()
        finally:
            # Clean up the temporary files
            if os.path.exists(java_file_path):
                os.remove(java_file_path)
            class_file_path = java_file_path.replace(".java", ".class")
            if os.path.exists(class_file_path):
                os.remove(class_file_path)


def run_js_code(code, input_data):
    # creating a name temporary file 
    with tempfile.NamedTemporaryFile(delete=False, suffix=".js") as temp:
        temp.write(code.encode())
        temp.close()
        js_file = temp.name
    
    try: 
        # run the compiled javascript code
        
        # Explicitly set the PATH for the subprocess
        env = os.environ.copy()
        env["PATH"] = "/path/to/nodejs/bin:" + env["PATH"]  # Replace with actual path to Node.js bin directory

        run_result = subprocess.run(["node", js_file], input=input_data, capture_output=True, text=True, env=env)
        output = run_result.stdout if run_result.returncode == 0 else run_result.stderr
        return output.strip()

    finally: 
        if os.path.exists(js_file):
            os.remove(js_file)


# Example usage
java_code = """
const readline = require('readline');

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class Solution {
    addTwoNumbers(l1, l2) {
        let dummy = new ListNode();
        let res = dummy;
        let total = 0, carry = 0;

        while (l1 !== null || l2 !== null || carry !== 0) {
            total = carry;

            if (l1 !== null) {
                total += l1.val;
                l1 = l1.next;
            }
            if (l2 !== null) {
                total += l2.val;
                l2 = l2.next;
            }

            let num = total % 10;
            carry = Math.floor(total / 10);
            dummy.next = new ListNode(num);
            dummy = dummy.next;
        }

        return res.next;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function createList(input) {
    let values = input.split(" ").map(Number);
    let dummy = new ListNode();
    let current = dummy;
    for (let value of values) {
        current.next = new ListNode(value);
        current = current.next;
    }
    return dummy.next;
}

rl.question('', (input1) => {
    rl.question('', (input2) => {
        let l1 = createList(input1);
        let l2 = createList(input2);

        let solution = new Solution();
        let result = solution.addTwoNumbers(l1, l2);

        let output = [];
        while (result !== null) {
            output.push(result.val);
            result = result.next;
        }
        console.log(output.join(' '));

        rl.close();
    });
});
"""

input_data = "2 4 3\n5 6 4\n"

print(run_js_code(java_code, input_data))
