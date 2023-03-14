import React, { useState } from "react";

// это заглушка
const rowData = `function App() {}
  
  export default App;`;

export function Typing() {
  // в стейт нужно передавать данные с сервера/stor'a
  const [data, setData] = useState(
    rowData.replace(/\s+/g, " ").trim().split("")
  );

  const handleKeyDown = (event) => {
    const dataForChanging = data;
    console.log("User pressed: ", event.key);
    if (event.key === data[0] && data.length > 0) {
      dataForChanging.shift();
      setData([...dataForChanging]);
    }
  };

  return (
    <div>
        <h1>Кликни на функцию и пиши</h1>
      <div tabIndex={0} onKeyDown={handleKeyDown}>
        <h2>{data}</h2>
      </div>
    </div>
  );
}
