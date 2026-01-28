import React, { useEffect, useState } from "react";
import GameService from "../../../services/GameService";
import { FaTrophy, FaMedal, FaCrown } from "react-icons/fa";

export default function PythonLeaderBoard() {
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMarks = async () => {
    try {
      const response = await GameService.getPythonLederBoard();
      setMarks(response.data);
      console.log("✅ Marks fetched:", response.data);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setError("Failed to fetch leaderboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading leaderboard...
      </p>
    );

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex justify-center items-start pt-16">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl border border-indigo-100 p-8 ">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <FaTrophy className="text-yellow-400 text-6xl drop-shadow-lg mb-3" />
          <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-sm">
            Python Game Leaderboard
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            🏆 Who’s ruling the Python in the Class today?
          </p>
        </div>

        {/* Table */}
        {marks.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No players yet!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-indigo-600 text-white text-sm uppercase tracking-wide">
                  <th className="px-6 py-4 text-left font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left font-semibold">Player</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-center font-semibold">Score</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((mark, index) => {
                  const rankIcon =
                    index === 0 ? (
                      <FaCrown className="text-yellow-400 text-2xl inline-block" />
                    ) : index === 1 ? (
                      <FaMedal className="text-gray-400 text-2xl inline-block" />
                    ) : index === 2 ? (
                      <FaMedal className="text-amber-600 text-2xl inline-block" />
                    ) : null;

                  return (
                    <tr
                      key={mark.userMarkId}
                      className={`transition duration-200 ${index % 2 === 0 ? "bg-white/70" : "bg-indigo-50/70"
                        } hover:bg-indigo-100`}
                    >
                      <td className="px-6 py-4 font-bold text-indigo-700 flex items-center gap-3">
                        {rankIcon || (
                          <span className="text-indigo-600 font-semibold">
                            #{index + 1}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        {mark.user.firstName} {mark.user.lastName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {mark.user.email}
                      </td>
                      <td className="px-6 py-4 text-center font-extrabold text-indigo-700 text-lg">
                        {mark.pythonGameMark}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
