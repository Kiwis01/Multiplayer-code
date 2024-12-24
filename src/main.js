// Code editor
const editor = CodeMirror(document.getElementById("editor"), {
    mode: "python",      
    theme: "material",        // to change: https://codemirror.net/5/demo/theme.html#material
    lineNumbers: true,       // line numbers
    value: "print('Hello, Lug')", // Initial content
    tabSize: 4,             
    indentWithTabs: true     
});
// Size change for code editor
editor.setSize(1100, 600);

// Run code button event to handle running the code
const btn = document.getElementById("run-code");
const consoleOutput = document.getElementById('console');

btn.addEventListener("click", (event) => {
    const pythonCode = editor.getValue();
    consoleOutput.innerText = "Running...";

    try {
        main(pythonCode);
    } catch (error) {
        consoleOutput.innerText = `Error: ${error.message}`;
    }
});

// Python code execution using Pyodide
async function main(pythonCode) {
    const outputDiv = document.getElementById('console');
    outputDiv.innerText = "Running...";

    try {
        let pyodide = await loadPyodide();
        
        // Redirect stdout to capture print statements
        pyodide.runPython(`
            import sys
            from io import StringIO
            sys.stdout = StringIO()
        `);

        pyodide.runPython(pythonCode);

        const capturedOutput = pyodide.runPython(`sys.stdout.getvalue()`);
        outputDiv.innerText = capturedOutput || "No output";
    } catch (error) {
        outputDiv.innerText = `Error: ${error.message}`;
    }
}





