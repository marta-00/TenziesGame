export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59e390c6" : "white"
    }

    return(
        <button 
            type="button"  
            className="die" 
            style={styles} 
            onClick={() => props.holdDice(props.id)}
            aria-pressed={props.isHeld}
            aria-label={`Die with the value of " + ${props.value},
                        ${props.isHeld ? "held" : "not held"}`}>
                {props.value}
        </button>
    )
}