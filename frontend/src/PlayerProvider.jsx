import React, { useState } from "react";

export const PlayerContext = React.createContext();

export function PlayerProvider({ children }) {
    const [contextplayerName, setcontextplayerName] = useState("");

    return (
        <PlayerContext.Provider
            value={{ contextplayerName, setcontextplayerName }}
        >
            {children}
        </PlayerContext.Provider>
    );
}
