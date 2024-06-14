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
    with tempfile.NamedTemporaryFile(delete=False, suffix=".js") as temp:
        temp.write(f"const input_data = {input_data};\n".encode() + code.encode())
        temp.close()
        result = subprocess.run(["node", temp.name], capture_output=True, text=True)
        os.remove(temp.name)
        return result.stdout if result.returncode == 0 else result.stderr

def run_java_code(code, input_data):
    class_name = code.split('public class ')[1].split(' ')[0]
    java_file_path = os.path.join(tempfile.gettempdir(), f"{class_name}.java")
    
    with open(java_file_path, "w") as temp:
        temp.write(f"public class {class_name} {{ public static void main(String[] args) }} {{ String input_data = \"{input_data}\";\n }}")
        temp.write(code)
        temp.write(" } }")
        
    compile_result = subprocess.run(["javac", java_file_path], capture_output=True, text=True)
    if compile_result.returncode != 0:
        os.remove(java_file_path)
        return compile_result.stderr

    run_result = subprocess.run(["java", class_name], capture_output=True, text=True, cwd=tempfile.gettempdir())

    os.remove(java_file_path)
    os.remove(os.path.join(tempfile.gettempdir(), f"{class_name}.class"))
    
    return run_result.stdout if run_result.returncode == 0 else run_result.stderr

def run_cpp_code(code, input_data):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".cpp") as temp:
        temp.write(f'const std::string input_data = "{input_data}";\n'.encode() + code.encode())
        temp.close()
        compile_result = subprocess.run(["g++", temp.name, "-o", temp.name + ".out"], capture_output=True, text=True)
        if compile_result.returncode != 0:
            os.remove(temp.name)
            return compile_result.stderr
        run_result = subprocess.run([temp.name + ".out"], capture_output=True, text=True)
        os.remove(temp.name)
        os.remove(temp.name + ".out")
        return run_result.stdout if run_result.returncode == 0 else run_result.stderr

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
