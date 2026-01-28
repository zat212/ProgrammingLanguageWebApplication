import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🧩 Coding Challenges (Your existing ones + story)
const CHALLENGES = [
  {
    title: "Print Hello",
    description: "Your robot needs a voice! Teach it to say 'Hello, World!'",
    initialCode: `def main():\n    # Write your code below\n    print("Hello, World!")\n\nmain()`,
    expectedOutput: "Hello, World!",
  },
  {
    title: "Print 1 to 5",
    description: "Help your robot count its first five tools.",
    initialCode: `def main():\n    for i in range(1, 6):\n        print(i)\n\nmain()`,
    expectedOutput: "1\n2\n3\n4\n5",
  },
  {
    title: "Even or Odd",
    description: "Program your robot to detect even-numbered energy cells.",
    initialCode: `def main():\n    num = 7\n    if num % 2 == 0:\n        print("Even")\n    else:\n        print("Odd")\n\nmain()`,
    expectedOutput: "Odd",
  },
  {
    title: "Factorial Power",
    description: "Help your robot calculate the power factorial of 5.",
    initialCode: `def main():\n    n = 5\n    fact = 1\n    for i in range(1, n + 1):\n        fact *= i\n    print(fact)\n\nmain()`,
    expectedOutput: "120",
  },
];

// 🏆 Main Game Component
const TestingGame = () => {
  const [current, setCurrent] = useState(0);
  const [code, setCode] = useState(CHALLENGES[0].initialCode);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [output, setOutput] = useState("");

  const currentChallenge = CHALLENGES[current];

  // 🕒 Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🎮 Level Up Logic
  useEffect(() => {
    if (xp >= level * 50) {
      setLevel((prev) => prev + 1);
      toast.success(`🎉 Level Up! You're now Level ${level + 1}`);
    }
  }, [xp]);

  // 🏅 Unlock Badge
  const unlockBadge = (name) => {
    if (!badges.includes(name)) {
      setBadges([...badges, name]);
      toast.info(`🏅 New Badge: ${name}`);
    }
  };

  // 🧠 Run code (simulation)
  const handleSubmit = () => {
    try {
      // Simulate code execution output (just comparing expectedOutput)
      if (output.trim() === currentChallenge.expectedOutput.trim()) {
        setPoints((p) => p + 10);
        setXp((x) => x + 10);
        setTimeLeft((t) => t + 10);
        toast.success("✅ Correct! +10 XP, +10 Points, +10 sec");

        if (current === 0) unlockBadge("First Steps");
        if (current === CHALLENGES.length - 1) unlockBadge("Python Explorer");
        if (points >= 50) unlockBadge("Fast Thinker");

        // Move to next challenge
        if (current < CHALLENGES.length - 1) {
          setCurrent((c) => c + 1);
          setCode(CHALLENGES[current + 1].initialCode);
          setOutput("");
        } else {
          toast.success("🎉 You completed all challenges!");
          unlockBadge("Master Coder");
        }
      } else {
        toast.error("❌ Output incorrect. Try again!");
      }
    } catch (err) {
      toast.error("⚠️ Code execution error!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-2xl shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-indigo-700">
        🧠 Code Quest: Python Adventure
      </h1>

      <div className="flex justify-between mb-4">
        <p>⏰ Time Left: {timeLeft}s</p>
        <p>⭐ Points: {points}</p>
        <p>🔥 Level {level} | XP: {xp}</p>
      </div>

      <div className="mb-4 p-4 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold">{currentChallenge.title}</h2>
        <p className="text-gray-600 mb-2">{currentChallenge.description}</p>
        <textarea
          rows="8"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 border rounded-lg font-mono text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">
          🧾 Expected Output:
        </label>
        <pre className="p-2 bg-gray-200 rounded">{currentChallenge.expectedOutput}</pre>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">
          ✏️ Your Output:
        </label>
        <textarea
          rows="3"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          className="w-full p-2 border rounded-lg font-mono text-sm"
          placeholder="Type your program output here..."
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
      >
        Submit Code
      </button>

      {/* 🏅 Badges Section */}
      <div className="mt-6">
        <h3 className="font-bold text-gray-700">🏅 Achievements</h3>
        {badges.length === 0 ? (
          <p className="text-sm text-gray-500">No badges yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2 mt-2">
            {badges.map((b, i) => (
              <span
                key={i}
                className="bg-yellow-300 px-3 py-1 rounded-full font-medium text-gray-800"
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default TestingGame;
