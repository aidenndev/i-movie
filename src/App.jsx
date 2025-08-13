import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./src/assets/avengers.png" alt="Avengers Banner" className="w-70 h-70 "/>
            <h1 className="text-4xl font-bold text-white-900">
              Welcome to iMovie
            </h1>
            <h3>
              Find <span className="text-gradient">Movies</span> You Will Enjoy!
            </h3>
          </header>
          <p>Search</p>
        </div>
      </div>
    </main>
  );
}

export default App;
