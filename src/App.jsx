import { useState } from "react";
import Board from "./components/Board";
import PropTypes from 'prop-types';

const App = () => {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const [currentMove, setCurrentMove] = useState(0);

    const currentSquares = history[history.length - 1];
    
    const handlePlay = (newSquares) => {
        setXIsNext(!xIsNext);
        const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const jumpTo = (move) => {
        setCurrentMove(move);
        setXIsNext(move % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = `Go to move #${move}`;
        } else {
            description = 'Go to game start';
        }

        return(
            <li>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })
    
    return (
        <div className="mt-20 flex items-center justify-center gap-14">
            <div>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}></Board>
            </div>
            <div>
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    );
};

export default App;

App.propTypes = {
    history: PropTypes.array,
    xIsNext: PropTypes.bool
}