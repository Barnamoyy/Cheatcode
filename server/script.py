# server/script.py
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin 
import subprocess
import os
import tempfile
from contextlib import redirect_stdout
import io

app = Flask(__name__)
CORS(app, support_credentials=True)

def run_code(language, code, input_data):
    if language == "python":
        return run_python_code(code, input_data)
    elif language == "js":
        return run_js_code(code, input_data)
    elif language == "java":
        return run_java_code(code, input_data)
    elif language == "cpp":
        return run_cpp_code(code, input_data)
    else:
        return "Unsupported language"

def run_python_code(code, input_data):
    try:
        code_with_input = f'input_data = """{input_data}"""\n' + code
        exec_globals = {}
        f = io.StringIO()
        with redirect_stdout(f):
            exec(code_with_input, exec_globals)
        output = f.getvalue()
        return output.strip()
    except Exception as e:
        return str(e)

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

def run_cpp_code(code, input_data):
    # Create a temporary file for the C++ source code
    with tempfile.NamedTemporaryFile(delete=False, suffix=".cpp") as temp:
        temp.write(code.encode())
        temp.close()
        cpp_file = temp.name
        exe_file = temp.name + ".out"

    try:
        # Compile the C++ program
        compile_result = subprocess.run(["g++", cpp_file, "-o", exe_file], capture_output=True, text=True)
        if compile_result.returncode != 0:
            os.remove(cpp_file)
            return compile_result.stderr

        # Run the compiled program
        run_result = subprocess.run([exe_file], input=input_data, capture_output=True, text=True)
        output = run_result.stdout if run_result.returncode == 0 else run_result.stderr
        return output.strip()

    finally:
        os.remove(cpp_file)
        if os.path.exists(exe_file):
            os.remove(exe_file)

@app.route('/run_code', methods=['POST'])
def run_code_endpoint():
    data = request.get_json()
    language = data.get('language')
    code = data.get('code')
    test_cases = data.get('test_cases')


    if not all([language, code, test_cases]):
        return jsonify({'error': 'Missing required fields'}), 400

    results = []
    for i, (input_data, expected_output) in enumerate(test_cases):
        result = run_code(language, code, input_data)
        passed = result.strip() == expected_output.strip()
        results.append({
            'test_case': i + 1,
            'input': input_data,
            'expected': expected_output,
            'result': result,
            'passed': passed,
        })

    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
