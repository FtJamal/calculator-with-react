import React, { useEffect, useState } from "react";

import Header from "./components/Header/header";
import Keypad from "./components/keypad/keypad";

import moonIcon from "./assets/moon.png";
import sunIcon from "./assets/sun.jpeg";

import './App.css';
// jo keys hm ne calculator mai di hai sirf un ka keyboard se access k lye bcoz sare keys ki need to nh h
const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
  96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
  8, 13, 190, 189, 191, 56, 111, 106, 107, 109, 187,
];
// calculator k keypad se access k lye
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operators = ["-", "+", "*", "/"];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.
    getItem("calculator-app-mode")) || false); //bydefault light rkhna h is lye darkmode ki initial value false di hai
  // hme history,expression aur result ko update krna h to un k state ko update krne k lye useState 
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("" || 0);
  const [history, setHistory] = useState(JSON.parse(localStorage.
    getItem("calculator-app-history")) || []);// array hoga expressions ka jo history mai jaen gay

  // keyboard ya keypad se key press hone pe ye function
  //  jo key press ki h usko screen pe dkhae ga , validations lgae ga
  const handleKeyPress = (keyCode, key) => {
    console.log(keyCode, key)

    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      // pehla num 0 press ya just = press pe validation
      if (key === "0") {
        if (expression.length === 0) return;
      } // jo expression mai hai + ab jo key enter hwa usko bh lkho
      calculateResult(expression + key);//realtime calculation k lye
      setExpression(expression + key);
    }
    else if (operators.includes(key)) {
      // expreesion khali h aur operator pe click kare to return
      if (!expression) return;
      // 1 operator k baad wapis operator press kare to
      // .slice last se 1 character ko trim kr k de dega
      const lastChar = expression.slice(-1);

      if (operators.includes(lastChar)) return;
      //agr last mai . ho to bh return
      if (lastChar === ".") return;
      setExpression(expression + key);

    }
    else if (key === ".") {
      console.log("point")
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;

      setExpression(expression + key)
    }
    else if (keyCode === 8) {
      console.log("backspace")
      if (!expression) return;
      calculateResult(expression.slice(0, -1));//realtime calculation k lye
      setExpression(expression.slice(0, -1));// 0 means start se dekho aur -1 means end se 1 trim kr do
    }
    else if (keyCode === 13 || 187) {
      console.log("enter")
      if (!expression) return;
      calculateResult(expression);

      //jb enter hoga us k baad expression history mai jae ga

      const tempHistory = [...history];
      if (tempHistory.length > 20 )tempHistory.splice(0,1); // 0 se start karo aur pehla trim kr do
      tempHistory.push(expression + result);
      
      setHistory(tempHistory);
      // setExpression("");
      setResult(0);
      

    }
  }
  // ye function result calculate kare ga expression k according
  const calculateResult = (exp) => {
    if (!exp) {
      setResult(0);
      return
    };
    // agr last mai number k ilawa kch aur hai to usko trim krne k lye
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar))
      exp = exp.slice(0, -1)
    //eval func hai hm  is mai exp de gay result de ga in number,expression should be in string only
    // answer mai (ex:23.9876543598) decimal k baad number bohot bara aya to usko fixed krne k lye
    //  eval number mai result deta hai ,string mai convert krne k lye ""
    const answer = "=" + eval(exp).toFixed(2) + "";
    setResult(answer);
    
  };

  useEffect(() => {
    localStorage.setItem("calculator-app-mode", JSON.stringify(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem("calculator-app-history", JSON.stringify(history))
  }, [history])

  return (
    <div
      className="app"
      tabIndex="0"  // keydown ko chalane k lye tabindex 0
      onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)}  // keyboard key press ko handle krne k lye
      data-theme={isDarkMode ? "dark" : ""} //css attribute
    >
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div className="app_calculator_navbar_toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}>
            <div className={`app_calculator_navbar_toggle_circle ${isDarkMode ?
              "app_calculator_navbar_toggle_circle_active" : ""
              }`} />
          </div>
          <img src={isDarkMode ? moonIcon : sunIcon} alt="mode" />
        </div>

        <Header expression={expression} result={result} history={history}  />
        <Keypad handleKeyPress={handleKeyPress} />
        {/* <Keypad />  //calculator k keypad pe click ko handle krne k lye props k through function pass kya */}
      </div>
    </div>

  );
}

export default App;
