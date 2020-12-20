function Box (props) {

    return (
        <div style = {{
            color: props.color,
        }}>
            {props.text}
        </div>
    )
}

export default Box;