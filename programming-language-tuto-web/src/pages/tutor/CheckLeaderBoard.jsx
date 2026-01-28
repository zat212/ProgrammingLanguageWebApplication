import React, { useEffect, useState } from "react";
import GameService from "../../services/GameService";

export default function CheckLeaderBoard() {
  const [pythonMarks, setPythonMarks] = useState([]);
  const [javaMarks, setJavaMarks] = useState([]);
  const [jsMarks, setJsMarks] = useState([]);

  const [selectedBoard, setSelectedBoard] = useState("python");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMarksPython = async () => {
    try {
      const res = await GameService.getPythonLederBoard();
      setPythonMarks(res.data);
    } catch (err) {
      setError("Failed to fetch Python leaderboard");
    }
  };

  const fetchMarksJava = async () => {
    try {
      const res = await GameService.getJavaLederBoard();
      setJavaMarks(res.data);
    } catch (err) {
      setError("Failed to fetch Java leaderboard");
    }
  };

  const fetchMarksJs = async () => {
    try {
      const res = await GameService.getJavaScriptLederBoard();
      setJsMarks(res.data);
    } catch (err) {
      setError("Failed to fetch JavaScript leaderboard");
    }
  };

  useEffect(() => {
    const load = async () => {
      await Promise.all([fetchMarksPython(), fetchMarksJava(), fetchMarksJs()]);
      setLoading(false);
    };
    load();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading leaderboard...
      </p>
    );

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  const activeList =
    selectedBoard === "python"
      ? pythonMarks
      : selectedBoard === "java"
      ? javaMarks
      : jsMarks;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-10 text-indigo-700 tracking-wide">
        Game Leaderboards
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-gray-200 p-1 rounded-xl flex gap-2">
          {["python", "java", "javascript"].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedBoard(item)}
              className={`px-6 py-2 rounded-lg font-semibold transition shadow-sm 
                ${
                  selectedBoard === item
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="bg-gray-50 p-5 rounded-xl shadow-inner">
        {activeList.length === 0 ? (
          <p className="text-center text-gray-500">No leaderboard data yet.</p>
        ) : (
          <ul className="space-y-4">
            {activeList.map((item, index) => {
              const user = item.user || {};
              const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

              const score =
                selectedBoard === "python"
                  ? item.pythonGameMark
                  : selectedBoard === "java"
                  ? item.javaGameMark
                  : item.javascriptGameMark;

              return (
                <li
                  key={index}
                  className="flex items-center justify-between bg-white p-5 rounded-xl 
                             shadow hover:shadow-lg transition hover:-translate-y-1 border"
                >
                  {/* Rank Badge */}
                  <div className="w-1/6 flex justify-center">
                    <span className="bg-indigo-100 text-indigo-700 font-bold px-4 py-2 rounded-full">
                      #{index + 1}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="w-3/6">
                    <p className="font-semibold text-gray-900 text-lg">{fullName}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>

                  {/* Score Badge */}
                  <div className="w-1/6 text-right">
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                      {score}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
