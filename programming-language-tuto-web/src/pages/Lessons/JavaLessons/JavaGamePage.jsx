import React, { useEffect,useState,useCallback } from 'react'
import GameService from '../../../services/GameService'
import { useNavigate, useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const GAMIFIED_CHALLENGES_JAVA = [
  {
    id: 10,
    gameKey: "CORE_LOGIC_1",
    difficulty: "beginner",
    quest_title: "Calculate Circle Area 📐",
    context_narrative:
      "Input: radius = 5, PI = 3.14159. Output: Area formula: π * r * r.",
    concept_focus: "Variables, Basic Arithmetic, Math Formulas",
    point_value: 10,
    initialCode:
      `public class KaiZenGame {
    public static void main(String[] args) {
        double radius = 5;
        double PI = 3.14159;
        // Write your code here
        
    }
}`,
    expectedOutput: "78.53975",
  },

  {
    id: 11,
    gameKey: "SIMPLE_ARRAY_SUM",
    difficulty: "beginner",
    quest_title: "Sum Array Elements ➕",
    context_narrative:
      "Given an array of integers, find the sum. Input: [10, 20, 30]. Output: 60.",
    concept_focus: "Arrays, Functions, Loops",
    point_value: 10,
    initialCode:
      `public class KaiZenGame {

    public static int simpleArraySum(int[] ar) {
        int total = 0;
        // Write your logic here

        return total;
    }

    public static void main(String[] args) {
        int[] testArray = {10, 20, 30};
        System.out.println(simpleArraySum(testArray));
    }
}`,
    expectedOutput: "60",
  },

  {
    id: 12,
    gameKey: "CORE_LOGIC_2",
    difficulty: "beginner",
    quest_title: "Fuel Consumption Rate",
    context_narrative:
      "Input: Distance = 250 km, Fuel = 20 liters. Output: km/l consumption.",
    concept_focus: "Division, Variables, Formula Implementation",
    point_value: 10,
    initialCode:
      `public class KaiZenGame {
    public static void main(String[] args) {
        double distanceKm = 250;
        double fuelUsedLiters = 20;
        // Calculate consumption rate and print
        
    }
}`,
    expectedOutput: "12.5",
  },

  {
    id: 13,
    gameKey: "CORE_LOGIC_3",
    difficulty: "beginner",
    quest_title: "Temperature Conversion (Fahrenheit)",
    context_narrative:
      "Celsius = 30. Convert to Fahrenheit: F = (C × 9/5) + 32.",
    concept_focus: "Math Operations, Float Division",
    point_value: 10,
    initialCode:
      `public class KaiZenGame {
    public static void main(String[] args) {
        double celsius = 30;
        // Convert to Fahrenheit and print result
        
    }
}`,
    expectedOutput: "86.0",
  },

  {
    id: 14,
    gameKey: "FLOW_LOGIC_1",
    difficulty: "beginner1",
    quest_title: "Check System Status",
    context_narrative:
      "If status_code is 200 → print OK, else print ERROR.",
    concept_focus: "If/Else",
    point_value: 10,
    initialCode:
      `public class KaiZenGame {
    public static void main(String[] args) {
        int statusCode = 200;
        // Write if/else here
        
    }
}`,
    expectedOutput: "OK",
  },

  {
    id: 15,
    gameKey: "FLOW_LOGIC_2",
    difficulty: "beginner1",
    quest_title: "Count Sensor Readings",
    context_narrative: "Print numbers 1 to 5 using a loop.",
    concept_focus: "For Loops",
    point_value: 10,
    initialCode:
      `public class KaiZenGame {
    public static void main(String[] args) {
        // Use a for loop to print 1 through 5
        
    }
}`,
    expectedOutput: "1\n2\n3\n4\n5",
  },

  {
    id: 16,
    gameKey: "INTERMEDIATE_ALGORITHMS",
    difficulty: "intermediate",
    quest_title: "Optimize Fuel Calculation",
    context_narrative:
      "Refactor fuel calculation using a function that sums any number of tanks.",
    concept_focus: "Functions & Loops",
    point_value: 10,
    initialCode:
      `public class KaiZenGame {

    public static int calculateTotalFuel(int[] fuels) {
        // Implement sum logic
        return 0;
    }

    public static void main(String[] args) {
        int[] fuelTanks = {10, 20, 15};
        System.out.println("Total Fuel: " + calculateTotalFuel(fuelTanks));
    }
}`,
    expectedOutput: "Total Fuel: 45",
  },

  {
    id: 17,
    gameKey: "INTERMEDIATE_DATA_STRUCTURES",
    difficulty: "intermediate",
    quest_title: "Fix Sensor Data Stream",
    context_narrative:
      "Sum all values from a nested data stream (2D array).",
    concept_focus: "Nested Loops, Arrays",
    point_value: 10,
    initialCode:
      `public class KaiZenGame {
    public static void main(String[] args) {
        int[][] dataStream = {{1,2,3}, {4,5}, {6}};
        // Calculate total sum
        System.out.println("Sum: " + 0);
    }
}`,
    expectedOutput: "Sum: 21",
  },

  {
    id: 18,
    gameKey: "INTERMEDIATE_LOGIC",
    difficulty: "intermediate",
    quest_title: "Predict System Load",
    context_narrative:
      "Compute CPU load percentage: (used / total) * 100.",
    concept_focus: "Math Operations & Formatting",
    point_value: 10,
    initialCode:
      `public class KaiZenGame {
    public static void main(String[] args) {
        double cpuUsed = 35;
        double cpuTotal = 60;
        // Calculate load percentage
        System.out.println("Load: " + 0);
    }
}`,
    expectedOutput: "Load: 58.333333333333336",
  },
];

const UserPoints = ({ points }) => (
  <div className="text-blue-600 font-semibold text-lg">🏆 {points} pts</div>
);


export default function JavaGamePage() {

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDifficulty, selectedLevelKey } = location.state || {};

  useEffect(() => {
    if (!selectedDifficulty || !selectedLevelKey) {
      toast.error("Please select a mission from TestingGamePage.");
      navigate("/javaStartGame");
    }
  }, [selectedDifficulty, selectedLevelKey, navigate]);

  const filteredChallenges = GAMIFIED_CHALLENGES_JAVA.filter(
    (c) => c.difficulty.toLowerCase() === selectedDifficulty?.toLowerCase()
  );

  const initialIndex = Math.max(
    filteredChallenges.findIndex((c) => c.gameKey === selectedLevelKey),
    0
  );


  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(initialIndex);
  const [code, setCode] = useState(filteredChallenges[initialIndex]?.initialCode ?? "");
  const [output, setOutput] = useState("");
  const [points, setPoints] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const challenge = filteredChallenges[currentChallengeIndex];

  useEffect(() => {
    setCode(challenge?.initialCode ?? "");
    setOutput("");
  }, [challenge]);


  const handleSubmit = useCallback(async () => {
    if (!challenge) return;
    setIsRunning(true);
    try {
      const response = await GameService.submitGameResult({
        code,
        desiredOutput: challenge.expectedOutput,
        challengeId: challenge.id,
      });

      const data = response.data || {};
      const actual = (data.output || "").trim();
      const expected = (challenge.expectedOutput || "").trim();

      setOutput(actual || "Execution Error: Check your code.");

      if (data.success || actual === expected) {
        setPoints((prev) => prev + challenge.point_value);
        toast.success(`Code Deployed! +${challenge.point_value} pts.`);

        setTimeout(() => {
          if (currentChallengeIndex < filteredChallenges.length - 1) {
            setCurrentChallengeIndex((prev) => prev + 1);
          } else {
            setIsCompleted(true);
            toast.success("All challenges complete!");
          }
          setIsRunning(false);
        }, 500);
      } else {
        setPoints((prev) => Math.max(0, prev - 2));
        toast.error("Output Mismatch!");
        setIsRunning(false);
      }
    } catch (error) {
      toast.error("Communication Failure!");
      console.error(error);
      setIsRunning(false);
    }
  }, [challenge, code, currentChallengeIndex, filteredChallenges]);

    const handleRestart = () => {
    setCurrentChallengeIndex(0);
    setCode(filteredChallenges[0]?.initialCode ?? "");
    setOutput("");
    setPoints(0);
    setIsCompleted(false);
    navigate("/javaLeaderBoard");
  };



  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold mb-2 text-blue-600">
        Code Hunter: System Recovery
      </h1>
      <div className="w-11/12 max-w-4xl mb-6 flex justify-end">
        <UserPoints points={points} />
      </div>

      <p className="text-gray-600 mb-4">
        Showing{" "}
        <span className="font-semibold text-blue-500">{selectedDifficulty}</span> challenges —{" "}
        {filteredChallenges.length} total.
      </p>

      {challenge ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-xl w-11/12 max-w-4xl border border-gray-300">
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">{challenge.quest_title}</h2>
          <p className="text-sm text-gray-700 mb-2">
            Focus: <span className="font-medium">{challenge.concept_focus}</span>
          </p>
          <p className="text-gray-700 mb-4 italic border-l-4 border-blue-400 pl-3">
            {challenge.context_narrative}
          </p>
          <div className="w-full h-72 border border-gray-300 rounded-lg mb-3">
            <Editor
              language="java"
              theme="vs-dark"
              value={code ?? ""}
              onChange={(val) => setCode(val ?? "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
              }}
              height="100%"
              width="100%"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={isRunning || isCompleted}
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              ▶️ Run Code
            </button>
            <button
              onClick={() => {
                setCode(challenge.initialCode ?? "");
                setOutput("");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
            >
              ↺ Reset Code
            </button>
            <div className="ml-auto text-sm text-gray-600">
              Points: <span className="font-semibold">{challenge.point_value}</span>
            </div>
          </div>

          <div className="bg-gray-200 text-gray-900 font-mono text-sm p-3 mt-5 rounded-lg h-32 overflow-auto border border-gray-300">
            <p className="text-gray-500 mb-2">OUTPUT LOG:</p>
            {output}
          </div>
        </div>
      ) : (
        <p className="text-red-500 mt-4">No challenges found for this level.</p>
      )}

      {isCompleted && (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-95 z-50">
          <div className="bg-gray-100 w-11/12 max-w-lg p-10 rounded-3xl shadow-2xl text-center border border-blue-500">
            <h2 className="text-4xl font-extrabold mb-6 text-blue-600">🎉 Mission Accomplished!</h2>
            <p className="mb-6 text-gray-700">
              You've completed all challenges in this difficulty.
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Check Leaderboard
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};
