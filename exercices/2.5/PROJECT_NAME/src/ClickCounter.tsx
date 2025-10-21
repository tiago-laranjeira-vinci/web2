import { useState } from 'react'

interface ClickCounterProps {
    title : string,
    on10Clicksmessage ?: string,
    onMouseOverMessage ?: string
}

const ClickCounter = ({
    title,
    on10Clicksmessage = "Master!",
    onMouseOverMessage = "click!"
}: ClickCounterProps) => {
    const [clickCount, setClickCount] = useState(0)
    const [hoverMessage, setHoverMessage] = useState(false);

    return (
        <div className ="card">
            <h2>{title}</h2>
            {hoverMessage ? <p>{onMouseOverMessage}</p> : null}
            <button onClick={() => setClickCount(clickCount + 1)}
                onMouseOver={() => setHoverMessage(true)}
                onMouseOut={() => setHoverMessage(false)}
            >
                count is {clickCount}
            </button>
            {clickCount >= 10 ? <p>{on10Clicksmessage}</p> : null}
        </div>
    )
}

export default ClickCounter