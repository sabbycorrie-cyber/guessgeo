/* === Answers Component, displays multiple answer buttons, calls onAnswer when a user selects an option === */
function Answers(props) {
    return (
        <div>
            {props.options.map((option, index) => (
                <button key={index} onClick={() => props.onAnswer(option)}>
                    {option}
                </button>
            ))}
        </div>
    )
}

export default Answers;