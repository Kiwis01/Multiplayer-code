// Initialize Ace editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");

// Selecet language
const languageSelect = document.getElementById("language-select");

languageSelect.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    editor.session.setMode(`ace/mode/${selectedLanguage}`);
});
