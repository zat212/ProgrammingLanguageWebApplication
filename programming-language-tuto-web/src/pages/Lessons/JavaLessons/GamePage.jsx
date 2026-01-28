// import React, { useState, useCallback, useEffect } from "react";
// import CodeEditor from "../../../components/CodeEditor";
// import FeedbackModal from "../../../components/FeedbackModal";
// import GameService from "../../../services/GameService";
// import GameIntro from "../../../components/GameIntro";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const INITIAL_TIME_SECONDS = 10 * 60;

// export const CHALLENGES = [
//   {
//     id: 6,
//     title: "Challenge 6: Loop Logic (Guess the Output)",
//     type: "guess-output",
//     desiredOutput: "Sum: 15",
//     initialCode: `public class INetCollegeGame {
//     public static void main(String[] args) {
//         int sum = 0;
//         for (int i = 1; i <= 5; i++) {
//             sum += i;
//         }
//         System.out.println("Sum: " + sum);
//     }
// }`,
//     options: [
//       "Sum: 10",
//       "Sum: 15",
//       "Sum: 20"
//     ]
//   },

//   {
//     id: 4,
//     title: "Challenge 4: Incorrect Operator Precedence (Fix the Bug)",
//     type: 'bug-fix',
//     desiredOutput: "Final result: 14",
//     initialCode: `public class INetCollegeGame {
//     public static void main(String[] args) {
//         int a = 2;
//         int b = 3;
//         int c = 4;
//         // Bug: The math needs fixing to get 14 (e.g., change - to +)
//         System.out.println("Final result: " + (a + b * c)); 
//     }
// }`
//   },
//   {
//     id: 1,
//     title: "Challenge 1: String Concatenation Order (Fix the Bug)",
//     type: 'bug-fix', 
//     desiredOutput: "Total: 15",
//     initialCode: `public class INetCollegeGame {
//     public static void main(String[] args) {
//         int x = 5;
//         int y = 10;
//         // Bug: String concatenation happens before addition
//         System.out.println(x + y + "Total: "); 
//     }
// }`
//   },
//   {
//     id: 2,
//     title: "Challenge 2: Method Call Error (Fix the Bug)",
//     type: 'bug-fix',
//     desiredOutput: "The product is: 50",
//     initialCode: `public class INetCollegeGame {
//     public static void main(String[] args) {
//         int a = 5;
//         int b = 10;
//         INetCollegeGame game = new INetCollegeGame();
//         // Bug: Calling a method that doesn't exist (should be 'multiply')
//         System.out.println("The product is: " + game.sum(a, b)); 
//     }
//     public int multiply(int num1, int num2) {
//         return num1 * num2;
//     }
// }`
//   },
//   {
//     id: 3,
//     title: "Challenge 3: Static vs. Instance Context (Fix the Bug)",
//     type: 'bug-fix',
//     desiredOutput: "Value is 42",
//     initialCode: `public class INetCollegeGame {
//     private int value = 42;

//     public static void main(String[] args) {
//         // Bug: Cannot reference instance field 'value' from static context
//         System.out.println("Value is " + value); 
//     }
// }`
//   },
  
//   {
//     id: 5,
//     title: "Challenge 5: Variable Scope Issue (Fix the Bug)",
//     type: 'bug-fix',
//     desiredOutput: "The square is: 25",
//     initialCode: `public class INetCollegeGame {
//     public static void main(String[] args) {
//         int num = 5;
//         if (num > 0) {
//             int square = num * num;
//         }
//         // Bug: 'square' is defined only within the 'if' block
//         System.out.println("The square is: " + square); 
//     }
// }`
//   },
  
//   {
//     id: 7, 
//     title: "Challenge 7: Boolean Evaluation (Guess the Output)",
//     type: 'guess-output',
//     desiredOutput: "Result: true",
//     initialCode: `public class INetCollegeGame {
//     public static void main(String[] args) {
//         boolean x = true;
//         boolean y = false;
//         System.out.println("Result: " + (x || !y));
//     }
// }`,
//     options: [
//       "Result: true",     
//       "Result: false",
//       "Result: 1"
//     ]
//   },
//   {
//     id: 8,
//     title: "Challenge 8: Array Sum (Fix the Bug)",
//     type: 'bug-fix',
//     desiredOutput: "Sum: 15",
//     initialCode: `public class INetCollegeGame {
//     public static void main(String[] args) {
//         int[] numbers = {1, 2, 3, 4, 5};
//         int sum = 0;
//         for (int i = 0; i <= numbers.length; i++) { // Bug: off-by-one error
//             sum += numbers[i];
//         }
//         System.out.println("Sum: " + sum);
//     }
// }`
//   },
//   {
//     id: 9,
//     title: "Challenge 9: Reverse a String (Fix the Bug)",
//     type: 'bug-fix',
//     desiredOutput: "tpircsavaj",
//     initialCode: `public class INetCollegeGame {
//     public static void main(String[] args) {
//         String str = "javascript";
//         String rev = "";
//         for (int i = 0; i <= str.length(); i++) { // Bug: off-by-one error
//             rev += str.charAt(i);
//         }
//         System.out.println(rev);
//     }
// }`
//   }
// ];


// function GamePage() {
//   const [gameStarted, setGameStarted] = useState(false);
//   const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
//   const currentChallenge = CHALLENGES[currentChallengeIndex];
//   const [code, setCode] = useState(currentChallenge.initialCode);
//   const [result, setResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [gifStatus, setGifStatus] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME_SECONDS);
//   const [isTimeUp, setIsTimeUp] = useState(false);
//   const [points, setPoints] = useState(0);

//   useEffect(() => {
//     if (!gameStarted || isTimeUp) return;

//     const timerId = setInterval(() => {
//       setTimeRemaining((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerId);
//           setIsTimeUp(true);
//           setShowModal(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timerId);
//   }, [gameStarted, isTimeUp]);

//   useEffect(() => {
//     if (currentChallenge.type === "guess-output") setCode("");
//     else setCode(currentChallenge.initialCode);

//     setGifStatus(null);
//     setResult(null);
//   }, [currentChallengeIndex]);

//   const formatTime = (totalSeconds) => {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   const handleCodeChange = useCallback((value) => setCode(value), []);

//   const closeModal = () => {
//     setShowModal(false);
//     if (!isTimeUp && gifStatus === "success" && currentChallengeIndex < CHALLENGES.length - 1) {
//       setCurrentChallengeIndex(currentChallengeIndex + 1);
//     }
//   };

//   const handleSubmit = async () => {
//     if (isTimeUp) return;

//     if (!code) {
//       toast.error("Please enter or select your answer first!");
//       return;
//     }

//     setIsLoading(true);
//     setResult(null);
//     setGifStatus(null);

//     const isGuessChallenge = currentChallenge.type === "guess-output";
//     const submittedCode = isGuessChallenge ? currentChallenge.initialCode : code;
//     const expectedOutput = isGuessChallenge ? code : currentChallenge.desiredOutput;

//     try {
//       const response = await GameService.submitGameResult({
//         code: submittedCode,
//         desiredOutput: expectedOutput,
//       });
//       const success = response.data.success;

//       setResult(response.data);
//       setGifStatus(success ? "success" : "error");
//       setShowModal(true);

//       if (success) {
//         setPoints((prev) => prev + 10); // add points
//         setTimeRemaining((prev) => prev + 10); // add +10 sec
//         toast.success("✅ Correct! +10 points & +10 seconds!");

//         if (currentChallengeIndex < CHALLENGES.length - 1) {
//           setTimeout(() => {
//             setShowModal(false);
//             setCurrentChallengeIndex(currentChallengeIndex + 1);
//           }, 2000);
//         } else {
//           setIsTimeUp(true);
//           setTimeout(() => setShowModal(false), 3000);
//         }
//       } else {
//         toast.error("❌ Wrong answer! Try again.");
//       }
//     } catch (err) {
//       toast.error("⚠️ Server error! Try again later.");
//       setResult({ success: false, message: "Error connecting to server." });
//       setGifStatus("error");
//       setShowModal(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const timeBarProgress = (timeRemaining / INITIAL_TIME_SECONDS) * 100;

//   // 🟢 Intro screen
//   if (!gameStarted) return <GameIntro setGameStarted={setGameStarted} />;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
//       <ToastContainer position="bottom-right" />
//       <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
//         {/* Timer */}
//         <div className="mb-6 p-4 bg-blue-100 rounded-lg shadow-sm border border-blue-200">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className={`text-lg font-semibold ${isTimeUp ? "text-red-600" : "text-blue-700"}`}>
//               ⏳ Time Remaining: <span className="font-bold">{formatTime(timeRemaining)}</span>
//             </h2>
//             <span className="font-semibold text-sm text-gray-600">{isTimeUp ? "Game Over!" : "60 Sec Limit"}</span>
//           </div>
//           <div className="w-full h-3 bg-blue-200 rounded-full overflow-hidden">
//             <div
//               className={`h-full rounded-full transition-all duration-500 ${
//                 timeBarProgress > 50 ? "bg-green-500" : timeBarProgress > 20 ? "bg-yellow-400" : "bg-red-500"
//               }`}
//               style={{ width: `${timeBarProgress}%` }}
//             />
//           </div>
//         </div>

//         {/* Challenge Title */}
//         <h1 className="text-2xl font-bold mb-3 text-indigo-700">{currentChallenge.title}</h1>
//         <p className="mb-4 text-gray-700 font-medium">
//           {currentChallenge.type !== "guess-output"
//             ? "Modify the code below to produce the exact output shown."
//             : "Analyze the code and select the exact output it will produce."}
//         </p>

//         {/* Desired Output */}
//         {currentChallenge.type !== "guess-output" && (
//           <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-4">
//             <h3 className="font-semibold mb-2 text-blue-700">🎯 Desired Output:</h3>
//             <pre className="text-blue-800 font-mono whitespace-pre-wrap">{currentChallenge.desiredOutput}</pre>
//           </div>
//         )}

//         {/* Code Editor */}
//         {currentChallenge.type !== "guess-output" ? (
//           <CodeEditor initialCode={code} onCodeChange={handleCodeChange} isReadOnly={isTimeUp} />
//         ) : (
//           <CodeEditor initialCode={currentChallenge.initialCode} isReadOnly />
//         )}

//         {/* Guess Output Options */}
//         {currentChallenge.type === "guess-output" && (
//           <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
//             <h3 className="font-semibold mb-2">Select Your Output Guess:</h3>
//             {currentChallenge.options.map((option, idx) => (
//               <label
//                 key={idx}
//                 className="flex items-center mb-2 cursor-pointer hover:bg-yellow-100 p-2 rounded transition"
//               >
//                 <input
//                   type="radio"
//                   name={`guess-${currentChallenge.id}`}
//                   value={option}
//                   checked={code === option}
//                   onChange={(e) => setCode(e.target.value)}
//                   disabled={isTimeUp}
//                   className="mr-3"
//                 />
//                 <span className="font-medium">{option}</span>
//               </label>
//             ))}
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={isLoading || (currentChallenge.type === "guess-output" && !code) || isTimeUp}
//           className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
//         >
//           {isLoading ? "Running Code..." : isTimeUp ? "Time Is Up!" : "Submit & Check"}
//         </button>

//         {/* Result Box */}
//         {result && (
//           <div
//             className={`mt-6 p-4 rounded-lg border ${
//               result.success ? "bg-green-50 border-green-400 text-green-700" : "bg-red-50 border-red-400 text-red-700"
//             }`}
//           >
//             <strong>Result:</strong> {result.message}
//             {result.success && currentChallengeIndex < CHALLENGES.length && (
//               <p className="mt-1 font-medium">
//                 🏆 Points: {points} | Challenge {currentChallengeIndex + 1}/{CHALLENGES.length}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Feedback Modal */}
//         {showModal && gifStatus && <FeedbackModal status={gifStatus} onClose={closeModal} />}
//       </div>
//     </div>
//   );
// }

// export default GamePage;
