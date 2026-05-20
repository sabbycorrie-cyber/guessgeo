/* === Score Component, displays the user's current score === */
function Score({ score }) {

    // Displays the score passed down from Game.jsx
    return <h2 className="score">Score: {score}</h2>;
}

export default Score;