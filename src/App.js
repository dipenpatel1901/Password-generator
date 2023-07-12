import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const numbers = '0123456789'
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const specialCharacters = "!'^+%&/()=?_#${[]}|;:><`~.,*-@"
  const COPY_SUCCESS = 'password successfully COPIED to clipboard'
  
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [darkmode, setDarkMode] = useState(false);
  const handleGeneratePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify("YOU MUST SELECT ATLEAST ONE OPTION", true);
    }
    let characterList = "";

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters;
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters;
    }

    if (includeNumbers) {
      characterList = characterList + numbers;
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters;
    }

    setPassword(createPassword(characterList));
  };
  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };
  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleCopyPassword = (e) => {
    if (password === "") {
      notify("NOTHING TO COPY", true);
    } else {
      copyToClipboard();
      notify(COPY_SUCCESS);
    }
  };
  return (
    <div className="App">
      <div className={`flex flex-col justify-center h-screen items-center ${darkmode?"bg-blue-950":"bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-500"}` }>
        <div className="h-1/6 flex justify-between items-center lg:px-10 px-5 py-10 w-full">
          <h2 className={`font-bold text-2xl italic md:text-5xl ${darkmode?"text-white":" text-black"}`}>
            Random Pass-Gen
          </h2>
          <label className="ui-switch">
            <input type="checkbox" checked={darkmode} onChange={(e) => setDarkMode(e.target.checked)}/>
            <div className="slider">
              <div className="circle"></div>
            </div>
          </label>
        </div>
        <div className="h-5/6 mt-16 text-white">
          <div className="bg-black bg-opacity-40 w-fit flex flex-col items-center rounded-xl shadow-xl p-5 gap-2.5">
            <h2 className="header text-xl font-semibold pt-3 pb-2 underline">
              The Password Generator
            </h2>
            {password && (
              <div className="flex w-full justify-between border px-6 py-1 rounded items-center mb-2">
                <h3 className="titled">{password}</h3>
                <button onClick={handleCopyPassword} className="copy-btn">
                  <i className="far fa-clipboard"></i>
                </button>
              </div>
            )}

            <div className="flex w-full justify-between items-center mb-2">
              <label htmlFor="pass-length">Password Length</label>
              <input
                className="outline-none text-black w-8 rounded text-center"
                onChange={(e) => setPasswordLength(e.target.value)}
                type="numeric"
                id="pass-length"
                name="pass-length"
                defaultValue={passwordLength}
              />
            </div>

            <div className="flex w-full justify-between items-center`">
              <label htmlFor="uppercase">Include Upper Case</label>
              <input
                className="bubble"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                type="checkbox"
                id="uppercase"
                name="uppercase"
              />
            </div>

            <div className="flex w-full justify-between items-center">
              <label htmlFor="lowercase">Include Lower Case</label>
              <input
                className="bubble"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                type="checkbox"
                id="lowercase"
                name="lowercase"
              />
            </div>

            <div className="flex w-full justify-between items-center">
              <label htmlFor="numbers">Include Numbers</label>
              <input
                className="bubble"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                type="checkbox"
                id="numbers"
                name="numbers"
              />
            </div>

            <div className="flex w-full justify-between items-center">
              <label htmlFor="symbols">Include Symbols</label>
              <input
                className="bubble"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                type="checkbox"
                id="symbols"
                name="symbols"
              />
            </div>

            <button
              onClick={handleGeneratePassword}
              className="generate border-2 bg-black bg-opacity-30 rounded px-2 p-1.5"
            >
              Generate password
            </button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
