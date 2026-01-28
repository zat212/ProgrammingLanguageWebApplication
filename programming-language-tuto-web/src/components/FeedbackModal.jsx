import React from "react";
import TenorGif from "./TenorGifHappy";
import TenorGif1 from "./TenorGifSad";
function FeedbackModal({ status, onClose }) {
    if (!status) return null;

    const title = status === "success" ? "SUCCESS!" : "TRY AGAIN!";
    const GifComponent = status === "success" ? TenorGif : TenorGif1;

    return (
        <div
            className="fixed inset-0 backdrop-blur-md bg-white/10 flex justify-center items-center z-[1000]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-2xl text-center p-6 sm:p-8 w-[90%] max-w-[400px] max-h-[90%]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>

                {/* 🎁 Bonus time message */}
                {status === "success" && (
                    <p className="text-green-600 font-medium mb-4 animate-pulse">
                        ⏱ You got +10 seconds! Let's keep the momentum going!
                    </p>
                )}

                <div className="my-5 min-h-[250px] max-h-[400px] flex justify-center items-center overflow-hidden">
                    <GifComponent className="max-w-full max-h-full object-contain" />
                </div>

                <button
                    onClick={onClose}
                    className={`mt-4 px-5 py-2 rounded-md text-white text-lg font-medium transition 
                        ${status === "success"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"}
                    `}
                >
                    {status === "success"
                        ? "Awesome! Next Challenge"
                        : "I Need to Fix That Code"}
                </button>
            </div>
        </div>
    );
}

export default FeedbackModal;
