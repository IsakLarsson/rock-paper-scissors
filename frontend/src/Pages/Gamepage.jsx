import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./../Components/Header";
import { VStack } from "@chakra-ui/react";
import axios from "axios";
import Participant from "../Components/Participant";

export default function Gamepage() {
    const { id } = useParams();
    const [players, setPlayers] = useState([]);
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
        return () => {};
    }, []);

    return (
        <div className="App">
            <VStack>
                <Header />
                <p>GameID: {id}</p>
                {players.map((player, index) => (
                    <Participant key={`player-${index}`} name={player.name} />
                ))}
            </VStack>
        </div>
    );
}
