import { useState } from "react";
import RetroStartScreen from "./components/RetroStartScreen";
import OriginalPortfolio from "./components/OriginalPortfolio";

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const handleStartScreenComplete = (name) => {
    setPlayerName(name);
    setShowPortfolio(true);
  };

  if (showPortfolio) {
    return <OriginalPortfolio playerName={playerName} />;
  }

  return <RetroStartScreen onComplete={handleStartScreenComplete} />;

  
}

export default App;
