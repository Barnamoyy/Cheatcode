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


def run_python_code(code, input_data):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as temp:
        temp.write(code.encode())
        temp.close()
        py_file = temp.name
    try:
        run_result = subprocess.run(["python3", py_file], input=input_data, capture_output=True, text=True)
        output = run_result.stdout if run_result.returncode == 0 else run_result.stderr
        return output.strip()
    finally: 
        if os.path.exists(py_file):
            os.remove(py_file)

# Example usage
java_code = """
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1, l2):
        dummy = ListNode()
        res = dummy
        total, carry = 0, 0

        while l1 is not None or l2 is not None or carry != 0:
            total = carry

            if l1 is not None:
                total += l1.val
                l1 = l1.next
            if l2 is not None:
                total += l2.val
                l2 = l2.next

            num = total % 10
            carry = total // 10
            dummy.next = ListNode(num)
            dummy = dummy.next

        return res.next

def create_list(input_string):
    values = list(map(int, input_string.split()))
    dummy = ListNode()
    current = dummy
    for value in values:
        current.next = ListNode(value)
        current = current.next
    return dummy.next

def main():
    input1 = input().strip()
    input2 = input().strip()

    l1 = create_list(input1)
    l2 = create_list(input2)

    solution = Solution()
    result = solution.addTwoNumbers(l1, l2)

    output = []
    while result is not None:
        output.append(result.val)
        result = result.next
    print(' '.join(map(str, output)))

if __name__ == "__main__":
    main()
"""

input_data = "2 4 3\n5 6 4\n"

print(run_python_code(java_code, input_data))
