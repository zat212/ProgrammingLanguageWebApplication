import React from "react";
import GameService from "../services/GameService";
function GameIntro({ setGameStarted }) {
  const handleStartGame = async () => {
    try {
      await GameService.startNewGame(); 
      setGameStarted(true); 
    } catch (error) {
      console.error("Failed to start game:", error);
      alert("⚠️ Failed to start game. Please try again.");
    }
  };

  return (
<div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-2 pt-20">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl text-center border border-gray-200">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          🧠 Java Coding Challenge Game
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Welcome to the <strong>INet College Java Coding Game!</strong> 🎯
          Test your Java skills through fun challenges.
          <br />
          You’ll face <strong>bug-fix</strong> and <strong>guess-output</strong> tasks.
          Each correct answer earns you <span className="text-green-600 font-semibold">+10 seconds</span>!
        </p>

        <ul className="text-left text-gray-700 mb-6 list-disc list-inside">
          <li>You have <strong>15 minutes</strong> to complete all challenges.</li>
          <li>Each challenge tests a specific Java concept.</li>
          <li>Think carefully before submitting your answer!</li>
        </ul>

        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm rounded-md px-4 py-3 mb-6">
          ⚠️ <strong>Note:</strong> Starting a new game will reset your Java game
          marks to <strong>0</strong>.
        </div>

        <button
          onClick={handleStartGame}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
        >
          🚀 Start Game
        </button>
      </div>
    </div>
  );
}

export default GameIntro;
