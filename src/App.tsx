import React from "react";
import Sidebar from "./Components/Sidebar";

import "./App.css";

function App() {
  return (
    <div className='App'>
      <header className='App-header'></header>
      <div className='w-1/4 p-4 fixed top-0 right-0'>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
