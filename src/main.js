// Initialize button click event
const btn = document.getElementById("run-code");
const consoleOutput = document.getElementById('console');

btn.addEventListener("click", (event) => {
    const editor = document.getElementById("editor");
    const pythonCode = editor.textContent;
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

document.getElementById('editor').addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const editor = e.target;
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        // Insert a tab space (4 spaces)
        const tabNode = document.createTextNode('    ');
        range.insertNode(tabNode);

        // Move caret after the tab space
        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});



