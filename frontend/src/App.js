import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./Components/Header";
import EnterForm from "./Components/EnterForm";
import { Button, VStack, HStack, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function App() {
    const [loadedGame, setloadedGame] = useState();
    const [responseMessage, setResponseMessage] = useState("");
    const [playerName, setplayerName] = useState("");
    const [nameInput, setnameInput] = useState();
    const navigate = useNavigate();

    const getstuff = async () => {
        const res = await axios.post("http://localhost:3000/api/games", {
            name: "Isak",
        });
        console.log(res);
    };
    useEffect(() => {
        getstuff();
        return () => {};
    }, []);

    const createGame = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/games", {
                name: playerName,
            });
            const id = res.data.message.split(":")[1].trim();
            setResponseMessage(res.data.message);
            navigate(`/${id}`);
        } catch (error) {
            setResponseMessage("Invalid request, you need a name");
        }
    };

    const joinGame = async (gameID) => {
        try {
            const res = await axios.post(
                `http://localhost:3000/api/games/${gameID}/join`,
                { name: playerName }
            );
            console.log(res);
            setResponseMessage(res.data.message);
            navigate(`/${gameID}`);
        } catch (error) {}
    };

    return (
        <div className="App">
            <div className="container">
                <VStack spacing={6}>
                    <Header />
                    {playerName !== "" ? (
                        <>
                            <p>Welcome, {playerName}</p>
                            <p>Join a game</p>
                            <EnterForm
                                key="Join"
                                placeholder="Enter game ID"
                                buttonText="Join game"
                                clickHandler={joinGame}
                            />
                            <p>Or</p>
                            <Button onClick={createGame} colorScheme={"green"}>
                                Create Game
                            </Button>
                        </>
                    ) : (
                        <>
                            <HStack>
                                <Input
                                    value={nameInput}
                                    onInput={(e) =>
                                        setnameInput(e.target.value)
                                    }
                                    placeholder="Enter your name"
                                />
                                <Button
                                    colorScheme={"green"}
                                    onClick={(e) => setplayerName(nameInput)}
                                >
                                    Submit
                                </Button>
                            </HStack>
                        </>
                    )}

                    {responseMessage !== "" ? (
                        <p>{responseMessage}</p>
                    ) : (
                        <p></p>
                    )}
                </VStack>
            </div>
        </div>
    );
}

export default App;
