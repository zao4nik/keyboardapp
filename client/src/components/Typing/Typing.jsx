import React, { useEffect, useState } from "react";

// это заглушка
const rowData = `function App() {}
  
  export default App;`;


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateRandomCode() {
    let code = '';
    let length = getRandomInt(5, 30); // длина кода от 5 до 30 символов
  
    for (let i = 0; i < length; i++) {
      let num = getRandomInt(1, 15);
  
      switch (num) {
        case 1:
          code += 'let ';
          break;
        case 2:
          code += 'const ';
          break;
        case 3:
          code += 'var ';
          break;
        case 4:
          code += 'if (';
          break;
        case 5:
          code += 'for (let i = 0; i < ';
          code += getRandomInt(1, 10);
          code += '; i++) {';
          break;
        case 6:
          code += 'function ';
          code += 'myFunction' + getRandomInt(1, 100);
          code += '() {';
          break;
        case 7:
          code += 'console.log("';
          code += 'Hello World';
          code += '");';
          break;
        case 8:
          code += 'return ';
          code += getRandomInt(1, 100);
          code += ';';
          break;
        case 9:
          code += 'while (';
          code += 'true';
          code += ') {';
          break;
        case 10:
          code += 'switch (';
          code += getRandomInt(1, 10);
          code += ') {';
          break;
        case 11:
          code += 'case ';
          code += getRandomInt(1, 10);
          code += ':';
          break;
        case 12:
          code += '{';
          break;
        case 13:
          code += '}';
          break;
        default:
          code += ' ';
          break;
      }
    }
    return code;
  }

export function Typing() {
  // в стейт нужно передавать данные с сервера/stor'a
  
  const [data, setData] = useState(
    generateRandomCode().replace(/\s+/g, " ").trim().split("")
  );
  const [isHidden, setIsHidden] = useState(false);
    const [stats , setStats] = useState({
        rightCount:0,
        clickCount:0,
        timeGame:0,

    })
    useEffect(() => {
        const timer = setTimeout(() => {
          setIsHidden(true);
        }, 20000);
    
        return () => {
          clearTimeout(timer);
        };
      }, []);



  const handleKeyDown = (event) => {
   
    setStats(prevStats => ({
        ...prevStats,
        clickCount: prevStats.clickCount + 1
      }));
    const dataForChanging = data;
    console.log("User pressed: ", event.key);
    if (event.key === data[0] && data.length > 0) {
      dataForChanging.shift();
      setData([...dataForChanging]);
      setStats(prevStats => ({
        ...prevStats,
        rightCount: prevStats.rightCount + 1
      }));
    }
  };
  console.log(stats)

  return (
    <div>
        <h1>Кликни на функцию и пиши</h1>
        {!isHidden && (
        <div tabIndex={0} onKeyDown={handleKeyDown}>
          <h2>{data}</h2>
        </div>
      )}
    </div>
  );
}
