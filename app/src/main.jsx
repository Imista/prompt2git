import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { translateCommandToText, translateTextToCommand } from "../api/dummy";

function toggleDarkMode() {
    // Obtén el elemento <html> actual
    const htmlElement = document.querySelector("html");

    // Cambia la clase de 'light' a 'dark' o viceversa
    if (htmlElement.classList.contains("light")) {
        htmlElement.classList.remove("light");
        htmlElement.classList.add("dark");
    } else {
        htmlElement.classList.remove("dark");
        htmlElement.classList.add("light");
    }
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isInputGitEditable, setIsInputGitEditable] = useState(false);
    const [inputPromptText, setInputPromptText] = useState("");
    const [inputGitText, setInputGitText] = useState("");
    const [isFieldsSwapped, setIsFieldsSwapped] = useState(false); // Estado para rastrear el intercambio

    const handleVersionChange = () => {
        // Cambia el estado de dark mode
        setIsDarkMode(!isDarkMode);

        // Llama a la función para cambiar el estilo y la clase
        toggleDarkMode();
    };

    const handleGenerateClick = async () => {
        if (!isFieldsSwapped) {
            // Traduce el texto de inputPrompt a inputGit
            const translatedText = await translateTextToCommand(
                inputPromptText
            );
            setInputGitText(translatedText);
            setIsInputGitEditable(true);
        } else {
            // Traduce el texto de inputGit a inputPrompt
            const translatedText = await translateCommandToText(inputGitText);
            setInputPromptText(translatedText);
            setIsInputGitEditable(false);
        }
    };

    const handleSwapFields = () => {
        // Cambia el estado de intercambio y borra los textos
        setIsFieldsSwapped(!isFieldsSwapped);
        setInputPromptText("");
        setInputGitText("");
        setIsInputGitEditable(!isFieldsSwapped); // Cambia la edición de inputGit
    };

    // Determina los nombres y títulos de los campos según el estado de intercambio
    const inputPromptTitle = isFieldsSwapped ? "Git" : "Lenguaje humano";
    const inputGitTitle = isFieldsSwapped ? "Lenguaje humano" : "Git";
    const inputPromptPlaceholder = isFieldsSwapped
        ? "Ingresa tus líneas de git"
        : "Ingresa tu prompt";
    const inputGitPlaceholder = isFieldsSwapped
        ? "¿Qué significa ese código?"
        : "Tu prompt en código git";

    return (
        <div
            className={`${isDarkMode ? "bg-git-brown-90" : "bg-git-white"} ${
                isDarkMode ? "text-git-brown" : "text-git-white"
            } font-sans transition-colors`}
        >
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <header className={`flex flex-col sm:flex-row sm:justify-center w-full pt-4 pb-8 px-2 text-${isDarkMode ? "git-white" : "git-brown"}`}>
                        <a className="flex flex-col" href="/">
                            <h1 className="flex font-sans font-bold sm:text-xl tracking-tight justify-center">
                                Prompt2Git
                            </h1>
                            <p className="flex font-sans font-bold justify-center">
                                Convierte tus prompts a git
                            </p>
                        </a>
                    </header>
                    <div>
                        <button
                            className={`flex items-center justify-center absolute top-2.5 right-4 text-gray-500 focus:outline-none hover:scale-125 transition w-8 h-8
                            ${
                                isDarkMode ? "bg-git-white" : "bg-git-orange"
                            } rounded-full`}
                            id="btn_version"
                            onClick={handleVersionChange}
                        >
                            <img
                                className="w-4 h-4"
                                src={`${
                                    isDarkMode
                                        ? "public/sun.svg"
                                        : "public/moon.svg"
                                }`}
                                id="iconMode"
                                alt={isDarkMode ? "Light" : "Dark"}
                            />
                        </button>
                        <button
                            className={`flex items-center justify-center absolute top-2.5 right-16 text-gray-500 focus:outline-none hover:scale-125 transition w-8 h-8 
                            ${
                               isDarkMode ? "bg-git-white" : "bg-git-orange"
                            } rounded-full`}
                            id="btn_coffee"
                        >
                            <img
                                className="w-4 h-4"
                                src={`${
                                    isDarkMode
                                        ? "public/coffeeDark.svg"
                                        : "public/coffee.svg"
                                }`}
                                id="iconCoffee"
                                alt="Coffee"
                            />
                        </button>
                        <button
                            className={`flex items-center justify-center absolute top-2.5 right-28 text-gray-500 focus:outline-none hover:scale-125 transition w-8 h-8 
                            ${
                                isDarkMode ? "bg-git-white" : "bg-git-orange"
                             } rounded-full`}
                            id="btn_github"
                        >
                            <img
                                className="w-4 h-4"
                                src={`${
                                    isDarkMode
                                        ? "public/githubDark.svg"
                                        : "public/github.svg"
                                }`}
                                id="iconGit"
                                alt="GitHub"
                            />
                        </button>
                    </div>
                    <div
                        className={`flex flex-col md:flex-row w-full gap-6 ${
                            isDarkMode ? "bg-git-brown-d10 border-git-white border" : "bg-git-white-10"
                        } rounded-2xl p-2`}
                    >
                        <div className="w-full">
                            <form className={`rounded-xl ${
                                isDarkMode ? "bg-git-brown-d20" : "bg-git-white-20"
                            } container-w-gradient-border p-3 h-full w-full shadow-md`}>
                                <div className="flex flex-col h-full">
                                    <label
                                        htmlFor="inputText"
                                        className={`block font-medium mb-2 ${
                                            isDarkMode ? "text-git-white-10" : "text-gray-700"}`}
                                    >
                                        {inputPromptTitle}
                                    </label>
                                    <textarea
                                        className={`${
                                            isDarkMode ? "bg-git-brown-d30" : "appearance-none"
                                        } border-0 rounded-lg w-full py-2 px-3 ${
                                            isDarkMode ? "text-git-white-20" : "text-gray-700"
                                        } leading-tight focus:outline-none focus:shadow-outline ${
                                            isDarkMode ? "placeholder-git-white-10" : ""
                                        }`}
                                        id="inputPrompt"
                                        rows={3}
                                        placeholder={inputPromptPlaceholder}
                                        value={inputPromptText}
                                        onChange={(e) =>
                                            setInputPromptText(e.target.value)
                                        }
                                        readOnly={isInputGitEditable}
                                    />
                                    <div className="flex items-center justify-end my-3 last:mb-0 space-x-10">
                                        <button
                                            type="button"
                                            className={`cursor-pointer py-2 px-4 ${
                                                isDarkMode ? "bg-git-orange-2" : "bg-git-brown"
                                            } rounded-full shadow-2xl flex flex-row`}
                                            onClick={handleGenerateClick}
                                            disabled={isInputGitEditable}
                                        >
                                            <div className="relative text-sm font-semibold font-inter text-white text-center inline-block mx-auto">
                                                Generar
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div>
                            <div className="flex items-center md:h-full">
                                <button
                                    className={`flex items-center justify-center ${
                                        isDarkMode ? "bg-git-orange-2" : "bg-git-brown"
                                    } rounded-full cursor-pointer mx-auto h-8 w-8`}
                                    id="btn_switch"
                                    onClick={handleSwapFields}
                                >
                                    <img
                                        src="public/switch.svg"
                                        alt="Switch"
                                        className="w-4 h-4 md:w-4 md:h-4"
                                        id="iconSwitch"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="w-full">
                            <form className={`rounded-xl ${
                                isDarkMode ? "bg-git-brown-d20" : "bg-git-white-20"
                            } container-w-gradient-border p-3 h-full w-full shadow-md`}>
                                <div className="flex flex-col h-full">
                                    <label
                                        htmlFor="inputText"
                                        className={`block font-medium mb-2 ${
                                            isDarkMode ? "text-git-white-10" : "text-gray-700"}`}
                                    >
                                        {inputGitTitle}
                                    </label>
                                    <textarea
                                        className={`${
                                            isDarkMode ? "bg-git-brown-d30" : "appearance-none"
                                        } border-0 rounded-lg w-full py-2 px-3 ${
                                            isDarkMode ? "text-git-white-20" : "text-gray-700"
                                        } leading-tight focus:outline-none focus:shadow-outline ${
                                            isDarkMode ? "placeholder-git-white-10" : ""
                                        }`}
                                        id="inputGit"
                                        rows={3}
                                        placeholder={inputGitPlaceholder}
                                        value={inputGitText}
                                        readOnly={!isInputGitEditable}
                                        onChange={(e) =>
                                            setInputGitText(e.target.value)
                                        }
                                    />
                                    <div className="flex items-center justify-between my-3 last:mb-0 space-x-10">
                                        <button
                                            type="button"
                                            className={`cursor-pointer py-2 px-4 ${
                                                isDarkMode ? "bg-git-white-10" : "bg-gray-100"} rounded-full shadow-2xl flex flex-row`}
                                        >
                                            <div className="relative text-sm font-semibold font-inter text-white text-center inline-block mx-auto">
                                                <img
                                                    className="h-5 w-5"
                                                    src="public/copy.svg"
                                                    alt="Copy"
                                                    id="iconCopy"
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
