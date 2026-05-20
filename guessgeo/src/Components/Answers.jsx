/* Answers Component: displays multiple answer buttons and handles selection */
import { useState } from "react";

function Answers(props) {
const { options = [], correctAnswer, onAnswer } = props;
const [selected, setSelected] = useState(null);

const handleClick = (option) => {
    if (selected) return; // ignore if already selected
    setSelected(option);

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