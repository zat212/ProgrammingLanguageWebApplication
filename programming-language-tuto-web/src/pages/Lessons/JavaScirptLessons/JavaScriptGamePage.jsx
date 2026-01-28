import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import GameService from "../../../services/GameService";
import Editor from "@monaco-editor/react";
import JavaScriptGameIntro from "../../../components/JavaScriptGameIntro";

const INITIAL_TIME_SECONDS = 120; // 2 minutes

const CHALLENGES = [
    {
        title: "Print Hello World",
        description: "Write a program that prints 'Hello, World!'",
        initialCode: `function main() {\n  console.log("Hello, World!");\n}\n\nmain();`,
        expectedOutput: "Hello, World!",
    },
    {
        title: "Add Two Numbers",
        description: "Add 10 and 20, then print the result.",
        initialCode: `function main() {\n  var a = 10;\n  var b = 20;\n  console.log(a + b);\n}\n\nmain();`,
        expectedOutput: "30",
    },
    {
        title: "Even or Odd",
        description: "Check if a number is even or odd.",
        initialCode: `function main() {\n  var num = 7;\n  if (num % 2 === 0) console.log("Even");\n  else console.log("Odd");\n}\n\nmain();`,
        expectedOutput: "Odd",
    },
    {
        title: "Sum of Array",
        description: "Find the sum of [1,2,3,4,5].",
        initialCode: `function main() {\n  var arr = [1,2,3,4,5];\n  var sum = 0;\n  for(var i=0;i<arr.length;i++) sum += arr[i];\n  console.log(sum);\n}\n\nmain();`,
        expectedOutput: "15",
    },
    {
        title: "Reverse a String",
        description: "Reverse 'javascript' and print it.",
        initialCode: `function main() {\n  var str = "javascript";\n  var rev = "";\n  for(var i=str.length-1;i>=0;i--) rev += str[i];\n  console.log(rev);\n}\n\nmain();`,
        expectedOutput: "tpircsavaj",
    },
];

export default function JavaScriptGamePage() {
    const [gameStarted, setGameStarted] = useState(false);
    const navigate = useNavigate();
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
    const [code, setCode] = useState(CHALLENGES[0].initialCode);
    const [output, setOutput] = useState("");
    const [points, setPoints] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME_SECONDS);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(false);

    const challenge = CHALLENGES[currentChallengeIndex];
    const progressWidth = `${(timeRemaining / INITIAL_TIME_SECONDS) * 100}%`;

    // Timer countdown
    useEffect(() => {
        if (timeRemaining > 0 && !isTimeUp) {
            const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeRemaining === 0) {
            setIsTimeUp(true);
        }
    }, [timeRemaining, isTimeUp]);

    // Calculate gradient color from green → yellow → red
    const getTimeBarColor = () => {
        const ratio = timeRemaining / INITIAL_TIME_SECONDS;
        if (ratio > 0.5) return "bg-green-500";
        if (ratio > 0.2) return "bg-yellow-400";
        return "bg-red-500";
    };

    // Submit code to backend
    const handleSubmit = async () => {
        const gameData = { code, desiredOutput: challenge.expectedOutput };

        try {
            setLoading(true);
            const response = await GameService.submitJsGameResult(gameData);
            const result = response.data;

            setOutput(result.output || result.message || "No output received");

            if (result.success) {
                // ✅ Add points
                setPoints(prev => prev + 10);

                // ✅ Add 10 seconds to remaining time
                setTimeRemaining(prev => prev + 10);

                // ✅ Show toast notification
                toast.success(`Correct! +10 points & +10 seconds!`);

                // Move to next challenge after short delay
                setTimeout(() => {
                    const nextIndex = currentChallengeIndex + 1;
                    if (nextIndex < CHALLENGES.length) {
                        setCurrentChallengeIndex(nextIndex);
                        setCode(CHALLENGES[nextIndex].initialCode);
                        setOutput("");
                    } else {
                        setIsCompleted(true);
                    }
                }, 800);
            } else {
                // If incorrect, show error toast
                toast.error("Wrong output! Try again.");
            }
        } catch (err) {
            console.error(err);
            setOutput("⚠️ Error submitting code to server.");
            toast.error("⚠️ Server error!");
        } finally {
            setLoading(false);
        }
    };


    const handleRestart = () => {
        navigate("/javaScriptLeaderBoard");
        setCurrentChallengeIndex(0);
        setCode(CHALLENGES[0].initialCode);
        setOutput("");
        setPoints(0);
        setTimeRemaining(INITIAL_TIME_SECONDS);
        setIsTimeUp(false);
        setIsCompleted(false);
    };

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    if (!gameStarted) {
        return <JavaScriptGameIntro setGameStarted={setGameStarted} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">⚡ JavaScript Coding Game</h1>

            {/* Timer & Score */}
            <div className="w-full max-w-3xl mb-6">
                <div className="flex justify-between mb-1 text-gray-700 font-semibold">
                    <span>⏱️ {minutes}:{seconds.toString().padStart(2, "0")}</span>
                    <span>🏆 {points} pts</span>
                </div>
                <div className="w-full h-4 bg-blue-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${getTimeBarColor()}`}
                        style={{ width: progressWidth }}
                    ></div>
                </div>
            </div>

            {/* Challenge Card */}
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl mb-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                    Challenge {currentChallengeIndex + 1} / {CHALLENGES.length}: {challenge.title}
                </h2>
                <p className="text-gray-600 mb-4">{challenge.description}</p>

                {/* Desired Output */}
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-3 mb-4 rounded">
                    <h3 className="font-semibold mb-1">🎯 Desired Output:</h3>
                    <pre className="font-mono text-sm whitespace-pre-wrap">{challenge.expectedOutput}</pre>
                </div>

                {/* Monaco Editor */}
                <div style={{ height: "200px", width: "100%", border: "1px solid #ddd", borderRadius: "8px" }}>
                    <Editor
                        language="javascript"
                        theme="vs-dark"
                        value={code}
                        onChange={setCode}
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            automaticLayout: true,
                            scrollBeyondLastLine: false,
                        }}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isTimeUp || loading}
                    className={`mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                    {loading ? "⏳ Checking..." : "✅ Submit"}
                </button>

                {/* Output Box */}
                <div className="bg-gray-900 text-green-400 font-mono text-sm p-3 mt-5 rounded-lg h-32 overflow-auto">
                    {output || "Output will appear here after submission..."}
                </div>
            </div>

            {/* Time Up Modal */}
            {isTimeUp && !isCompleted && (
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-60 backdrop-blur-sm z-50">
                    <div className="bg-white w-11/12 max-w-lg md:max-w-2xl p-10 rounded-3xl shadow-2xl text-center border border-gray-200">
                        <h2 className="text-4xl font-extrabold mb-6 text-red-600">⏰ Time’s Up!</h2>
                        <p className="mb-6 text-2xl font-semibold text-gray-800">
                            Your Final Score: <span className="text-indigo-600">{points}</span> 🏆
                        </p>
                        <button
                            onClick={handleRestart}
                            className="px-8 py-3 bg-green-500 text-white text-lg font-bold rounded-xl hover:bg-green-600 transition-transform transform hover:scale-105 shadow-md"
                        >
                            🔄 Restart Game
                        </button>
                    </div>
                </div>
            )}

            {/* Completed Modal */}
            {isCompleted && (
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-60 backdrop-blur-sm z-50">
                    <div className="bg-white w-11/12 max-w-lg md:max-w-2xl p-10 rounded-3xl shadow-2xl text-center border border-gray-200 animate-bounce">
                        <h2 className="text-4xl font-extrabold mb-6 text-green-600">🎉 Congratulations!</h2>
                        <p className="mb-6 text-2xl font-semibold text-gray-800">
                            You completed all challenges with{" "}
                            <span className="text-indigo-600">{points}</span> points! 🏆
                        </p>
                        <button
                            onClick={handleRestart}
                            className="px-8 py-3 bg-indigo-600 text-white text-lg font-bold rounded-xl hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-md"
                        >
                            Watch Leader Board
                        </button>
                        <p className="mt-6 text-gray-500 italic text-sm">
                            Great job! Keep improving your JavaScript skills 🐍
                        </p>
                    </div>
                </div>
            )}

            <ToastContainer position="bottom-right" />

        </div>
    );
}
