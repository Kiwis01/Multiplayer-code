// Initialize Ace editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/ambiance");
editor.session.setMode("ace/mode/python");

// Initialize button click event
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