import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { Header } from "./Components/Header";

function App() {
    const getstuff = async () => {
        const res = await axios.get("http://localhost:3000/api/games");
        console.log(res);
    };
    useEffect(() => {
        getstuff();
        return () => {};
    }, []);

    return (
        <div className="App">
            <div className="container">
                <Header />
            </div>
        </div>
    );
}

export default App;
