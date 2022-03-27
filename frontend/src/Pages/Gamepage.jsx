import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./../Components/Header";
import { VStack } from "@chakra-ui/react";
import axios from "axios";
import Participant from "../Components/Participant";
import MoveSelect from "../Components/MoveSelect";
import { PlayerContext } from "../PlayerProvider";

export default function Gamepage() {
    const { id } = useParams();
    const [players, setPlayers] = useState([]);
    const { contextplayerName } = useContext(PlayerContext);
    const loadGame = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/games/${id}`
            );
            console.log(res);
            setPlayers(res.data.game.players);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadGame();
        console.log(contextplayerName);
        return () => {};
    }, []);

    return (
        <div className="App">
            <VStack spacing={10}>
                <Header />
                <p>GameID: {id}</p>
                <MoveSelect id={id} />
                {players.map((player, index) => (
                    <Participant
                        key={`player-${index}`}
                        name={player.name}
                        move={player.move}
                    />
                ))}
            </VStack>
        </div>
    );
}
