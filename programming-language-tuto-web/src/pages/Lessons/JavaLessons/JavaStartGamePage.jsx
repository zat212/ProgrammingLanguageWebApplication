import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameService from "../../../services/GameService";

const GAME_LEVELS = [
  {
    step: 1,
    tier: "beginner",
    gameKey: "CORE_DIAGNOSTICS",
    title: "Mission 1: Core Diagnostics",
    concept: "Variables, Print, Basic Math",
    color: "blue",
    icon: "💡",
  },
  {
    step: 2,
    tier: "beginner1",
    gameKey: "FLOW_CONTROL",
    title: "Mission 2: Flow Control Academy",
    concept: "Loops, Conditionals, Logic Tracing",
    color: "green",
    icon: "🧠",
  },
  {
    step: 3,
    tier: "Intermediate",
    gameKey: "DATA_STRUCTURES",
    title: "Mission 3: Data Structures Lab",
    concept: "Lists, Strings, Functions & State",
    color: "purple",
    requireMarks: 40,
    icon: "⚙️",
  },
  {
    step: 4,
    tier: "Intermediate",
    gameKey: "BACKEND_SIMULATION",
    title: "Mission 4: Backend Simulation",
    concept: "Handling Dictionary/JSON Data",
    color: "yellow",
    requireMarks: 40,
    icon: "🔧",
  },
  {
    step: 5,
    tier: "Advanced",
    gameKey: "OO_CHALLENGE",
    title: "Mission 5: Object-Oriented Challenge",
    concept: "Classes, Objects, Methods",
    color: "pink",
    requireMarks: 100,
    icon: "🖥️",
  },
  {
    step: 6,
    tier: "Advanced",
    gameKey: "PROJECT_MISSION",
    title: "Mission 6: The System Restore",
    concept: "Comprehensive Final Exam",
    color: "indigo",
    requireMarks: 100,
    icon: "🚀",
  },
];

const JavaStartGamePage = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("All");
  const [progress, setProgress] = useState({});
  const [userMarks, setUserMarks] = useState(null); 

  // Load progress + user marks
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await GameService.getUserMarks();
        setUserMarks(res.data.javaGameMark); 
      } catch (err) {
        console.error("Failed to load user marks", err);
        setUserMarks(0); 
      }
    };

    fetchMarks();

    const saved = localStorage.getItem("mission_progress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  // Update progress
  const updateProgress = (gameKey, status) => {
    const updated = { ...progress, [gameKey]: status };
    setProgress(updated);
    localStorage.setItem("mission_progress", JSON.stringify(updated));
  };

  // Handle level navigation
  const handleLevelSelect = (gameKey, tier) => {
    updateProgress(gameKey, "in-progress");
    navigate("/javaGamePage", {        // Note: Create here java Game page!!!!
      state: { selectedDifficulty: tier.toLowerCase(), selectedLevelKey: gameKey },
    });
  };

  // Level filter by difficulty (REVISED LOGIC)
  const filteredLevels = GAME_LEVELS.filter((level) => {
    if (difficulty === "All") {
      return true;
    }
    // If the user selects 'Beginner', include both 'beginner' and 'beginner1' tiers.
    if (difficulty === "beginner") {
      return level.tier === "beginner" || level.tier === "beginner1";
    }
    // For Intermediate and Advanced, use the exact tier match.
    return level.tier === difficulty;
  });

  // Lock logic
  const isLockedByMarks = (level) => {
    if (!level.requireMarks) return false;
    if (userMarks === null) return true;
    return userMarks < level.requireMarks;
  };

  // Colors
  const getColorClasses = (color) => {
    switch (color) {
      case "blue":
        return { bg: "bg-blue-500", text: "text-blue-600", border: "border-blue-500", hover: "hover:border-blue-700" };
      case "green":
        return { bg: "bg-green-500", text: "text-green-600", border: "border-green-500", hover: "hover:border-green-700" };
      case "purple":
        return { bg: "bg-purple-500", text: "text-purple-600", border: "border-purple-500", hover: "hover:border-purple-700" };
      case "yellow":
        return { bg: "bg-yellow-500", text: "text-yellow-600", border: "border-yellow-500", hover: "hover:border-yellow-700" };
      case "pink":
        return { bg: "bg-pink-500", text: "text-pink-600", border: "border-pink-500", hover: "hover:border-pink-700" };
      case "indigo":
        return { bg: "bg-indigo-500", text: "text-indigo-600", border: "border-indigo-500", hover: "hover:border-indigo-700" };
      default:
        return { bg: "bg-gray-500", text: "text-gray-600", border: "border-gray-500", hover: "hover:border-gray-700" };
    }
  };

  // Calculate percentage for the progress bar, capped at 100%
  const marksPercentage = userMarks !== null ? Math.min((userMarks / 100) * 100, 100) : 0;
  
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
        Code Hunter: Select Mission
      </h2>

      {/* --- START OF MARKS DISPLAY --- */}
      {userMarks !== null && (
        <div className="max-w-xl mx-auto mb-10 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold text-gray-700">
              Your Current Marks:
            </p>
            <span className="text-3xl font-extrabold text-blue-600">
              {userMarks} pts
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${marksPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">
            {marksPercentage}% Progress toward the highest unlock goal (100 pts)
          </p>
        </div>
      )}
      {userMarks === null && (
        <div className="max-w-xl mx-auto mb-10 text-center text-gray-500">
          Loading marks...
        </div>
      )}
      {/* --- END OF MARKS DISPLAY --- */}
      
      {/* Difficulty buttons (SIMPLIFIED LIST) */}
      <div className="flex justify-center space-x-4 mb-10 flex-wrap">
        {["All", "beginner", "Intermediate", "Advanced"].map((diff) => (
          <button
            key={diff}
            onClick={() => setDifficulty(diff)}
            className={`px-4 py-2 rounded-xl border mt-2 ${
              // Note: Case sensitivity is maintained for accurate filtering logic
              difficulty === diff
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            } hover:shadow-md transition`}
          >
            {/* Capitalize the first letter for display */
             diff.charAt(0).toUpperCase() + diff.slice(1)
            }
          </button>
        ))}
      </div>

      {/* Timeline line */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

        <div className="space-y-12 md:space-y-24">
          {filteredLevels.map((level, index) => {
            const classes = getColorClasses(level.color);
            const isRightSide = index % 2 === 0;

            let status = progress[level.gameKey] || "locked";
            if (isLockedByMarks(level)) status = "locked-marks";

            return (
              <div
                key={level.step}
                className="flex flex-col md:flex-row items-center transition transform hover:scale-[1.01] duration-300"
              >
                {isRightSide && <div className="hidden md:block md:w-1/2 pr-12"></div>}

                {/* Icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full ${classes.bg} text-white border-4 border-white shadow-lg`}
                  >
                    {level.icon}
                  </div>
                </div>

                {/* Card */}
                <div className={`${isRightSide ? "md:ml-12" : "md:pr-12"} md:w-1/2`}>
                  <div
                    className={`timeline-card bg-white rounded-2xl shadow-xl p-6 border-l-4 ${classes.border} ${classes.hover}`}
                  >
                    {/* Display 'Beginner' for both internal 'beginner' and 'beginner1' tiers */}
                    <p className={`text-sm font-semibold ${classes.text}`}>
                      Level {level.step} — {level.tier === "beginner1" ? "beginner" : level.tier}
                    </p>

                    <h3 className="text-xl font-bold text-gray-800 mt-2">{level.title}</h3>
                    <p className="text-gray-600 mt-4">{level.concept}</p>

                    {/* Status text */}
                    <div className="mt-4 text-sm font-semibold">
                      {status === "completed" && (
                        <span className="text-green-600">🟢 Completed</span>
                      )}
                      {status === "in-progress" && (
                        <span className="text-yellow-600">🟡 Play</span>
                      )}
                      {status === "locked" && (
                        <span className="text-gray-500">🔒 Not Started</span>
                      )}
                      {status === "locked-marks" && (
                        <span className="text-red-600">
                          🔒 Requires {level.requireMarks} Points
                        </span>
                      )}
                    </div>

                    {/* Launch button */}
                    <button
                      onClick={() => {
                        if (!isLockedByMarks(level)) {
                          handleLevelSelect(level.gameKey, level.tier);
                        }
                      }}
                      disabled={isLockedByMarks(level)}
                      className={`mt-4 text-sm font-medium px-4 py-2 rounded-lg transition ${
                        isLockedByMarks(level)
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : `bg-gray-100 ${classes.text}`
                      }`}
                    >
                      {isLockedByMarks(level) ? "Locked 🔒" : "Launch Mission →"}
                    </button>
                  </div>
                </div>

                {!isRightSide && <div className="hidden md:block md:w-1/2"></div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JavaStartGamePage;