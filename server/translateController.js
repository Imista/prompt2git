const { generate_text } = require("./config/openaiConfig");

const generate_prompt = (prompt, isTextToGit) => {
    return `
    Provide the equivalent ${
        isTextToGit ? "Git command" : "text"
    } for "${prompt}" as JSON:
    Format answer:
    {
        "text": ${isTextToGit ? prompt : ""},
        "command": ${isTextToGit ? "" : prompt}
    }
    Example 1:
    {
        "text": Undo the last commit but keep the changes.
        "command": git reset HEAD~1
    }
    Example 2:
    {
        "text": Switch to the production branch.
        "command": git checkout production.
    }
        `;
};

const textToCommand = async (text) => {
    const prompt = generate_prompt(text, true);
    const res = await generate_text(prompt);

    return res.command;
};

const commandToText = async (command) => {
    const prompt = generate_prompt(command, false);
    const res = await generate_text(prompt);

    return res.text;
};

module.exports = {
    textToCommand,
    commandToText,
};
