import React, { useState, useContext } from "react";
import { Radio, RadioGroup, Stack, Button } from "@chakra-ui/react";
import { PlayerContext } from "../PlayerProvider";
import axios from "axios";

export default function MoveSelect({ id }) {
    const [value, setValue] = useState("1");
    const { contextplayerName } = useContext(PlayerContext);

    const playMove = async () => {
        try {
            const res = await axios.post(
                `http://localhost:3000/api/games/${id}/move`,
                {
                    name: contextplayerName,
                    move: value,
                }
            );
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Stack direction="column" spacing={3}>
                <h2>Make your move, {contextplayerName}!</h2>
                <RadioGroup onChange={setValue} value={value}>
                    <Stack spacing={3} direction="row">
                        <Radio value="Rock">Rock</Radio>
                        <Radio value="Paper">Paper</Radio>
                        <Radio value="Scissors">Scissors</Radio>
                    </Stack>
                </RadioGroup>
                <Button onClick={playMove} colorScheme={"green"}>
                    Play!
                </Button>
            </Stack>
        </div>
    );
}
