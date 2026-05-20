/* === Answers Component, displays multiple answer buttons, calls onAnswer when a user selects an option === */
import { useState } from "react";

function Answers(props) {
    const [selected, setSelected] = useState(null);
    const handleClick = (option) => {

        // Prevent double clicking
        if (selected) return;
        setSelected(option);

        // Wait 1.5 seconds before next round
        setTimeout(() => {
            props.onAnswer(option);
            setSelected(null);
        }, 1500);
    };
    return (
        <div>
            {props.options.map((option, index) => {
                let buttonClass = "";

                // Correct answer
                if (selected && option === props.correctAnswer) {
                    buttonClass = "correct";
                }

                // Wrong selected answer
                else if (selected === option && option !== props.correctAnswer) {
                    buttonClass = "wrong";
                }

                return (
                    <button
                        key={index}
                        className={buttonClass}
                        onClick={() => handleClick(option)}
                        >
                        {option}
                    </button>
                );
            })}
        </div>
    );
}



export default Answers;