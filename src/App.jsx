import { useState } from "react";
import "./App.css";
import Search from "./components/Search";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img
              src="./src/assets/avengers.png"
              alt="Avengers Banner"
              className="w-70 h-70"
            />
            <h1 className="text-4xl font-bold text-white-900 justify-center">
              Welcome to iMovie
            </h1>
            <h3 className="text-2xl text-white-700">
              Find <span className="text-gradient">Movies</span> You Will
              Enjoy!
            </h3>
          </header>
        </div>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  );
}

export default App;
