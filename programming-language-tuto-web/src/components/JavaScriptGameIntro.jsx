import React from "react";
import GameService from "../services/GameService";

function JavaScriptGameIntro({ setGameStarted }) {
  const handleStartGame = async () => {
    try {
      await GameService.startNewGameJavaScript(); // ✅ Calls JavaScript game API
      setGameStarted(true);
    } catch (error) {
      console.error("Failed to start JavaScript game:", error);
      alert("⚠️ Failed to start JavaScript game. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-2 pt-20">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl text-center border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          ⚡ JavaScript Coding Challenge Game
        </h1>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Welcome to the <strong>INet College JavaScript Coding Game!</strong> 🎯
          Test your <strong>JavaScript programming skills</strong> with fun and interactive coding challenges.
          <br />
          You’ll solve <strong>logic</strong> and <strong>bug-fix</strong> tasks using real JavaScript code!
        </p>

        <ul className="text-left text-gray-700 mb-6 list-disc list-inside">
          <li>You have <strong>60 seconds</strong> to start — earn more by solving challenges.</li>
          <li>Each correct solution gives you <span className="text-green-600 font-semibold">+10 points</span> and <span className="text-green-600 font-semibold">+10 seconds</span>.</li>
          <li>Wrong answers will reduce your time by <span className="text-red-600 font-semibold">5 seconds</span>.</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-md px-4 py-3 mb-6">
          💡 <strong>Tip:</strong> Use the built-in code editor to run your JavaScript code directly in the browser.
        </div>

        <button
          onClick={handleStartGame}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
        >
          🚀 Start JavaScript Game
        </button>
      </div>
    </div>
  );
}

export default JavaScriptGameIntro;
