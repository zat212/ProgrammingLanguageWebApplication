import api from "./api";

const GameService = {
    submitGameResult: (gameData) => api.post("/game/submit", gameData),
    submitPythonGameResult: (gameData) => api.post("/game/submitPython", gameData),
    submitJsGameResult: (gameData) => api.post("/game/submitJs", gameData),
    startNewGame: () => api.post("/game/start"),

    startNewGamePython: () => api.post("/game/startPythonGame"),
    startNewGameJavaScript: () => api.post("/game/startJsGame"),
    
    getJavaLederBoard: () => api.get("/game/javaLeaderBoard"),
    getPythonLederBoard: () => api.get("/game/pythonLeaderBoard"),
    getJavaScriptLederBoard: () => api.get("/game/javaScriptLeaderBoard"),

    getUserMarks: () => api.get("/game/userGameMark"),
};

export default GameService;