/* Answers Component: displays multiple answer buttons and handles selection */
import { useState } from "react";

function Answers(props) {
const { options = [], correctAnswer, onAnswer } = props;
const [selected, setSelected] = useState(null);

const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");

const handleClick = (option) => {
    if (selected) return; // ignore if already selected
    setSelected(option);

console.log("OPTION:", option);
console.log("CORRECT:", correctAnswer);
    if (option?.trim().toLowerCase() === correctAnswer?.trim().toLowerCase() 
    ) {
        correctSound.currentTime = 0;
        correctSound.play();
    } else {
        wrongSound.currentTime = 0;
        wrongSound.play();
    }

    // Wait 1.5 seconds before reporting the answer
    setTimeout(() => {
    onAnswer(option);
    setSelected(null);
    }, 1500);
};

return (
    <div>
    {options.map((option, index) => {
        let buttonClass = "";

        if (selected) {
        if (option === correctAnswer) buttonClass = "correct";
        else if (option === selected) buttonClass = "wrong";
        }

        return (
        <button key={index} className={buttonClass} onClick={() => handleClick(option)}>
            {option}
        </button>
        );
    })}
    </div>
);
}

export default Answers;