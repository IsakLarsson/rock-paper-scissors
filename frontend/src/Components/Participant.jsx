import React from "react";

export default function Participant({ name, move }) {
    return (
        <div className="participant">
            <p>Player: {name}</p>
            <p>Move: {move}</p>
        </div>
    );
}
