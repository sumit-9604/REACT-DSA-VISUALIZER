import { useState } from "react";
import AnimatedNode from './AnimatedNode';



function QueueVisalizer(){

    const CAPACITY = 10;

    const[queue,setqueue]= useState([]);
    const [message, setmessage] = useState("Queue Ready");
    const [operation, setoperation] = useState("");
    const [showInfo, setshowInfo] = useState(false);


    const enqueue = () => {
        setshowInfo(true);
        if (queue.length >= CAPACITY) {
            setmessage("Queue Overflow");
            return;}
        const value = Math.floor(Math.random() * 100);
        setqueue([...queue, value]);
        setoperation("enqueue");
        setmessage(value + " enqueued");};


    const dequeue = () => {
        setshowInfo(true);
        if (queue.length === 0) {
            setoperation("underflow");
            setmessage("Queue Underflow");
            return;}
        const removed = queue[0];
        setqueue(queue.slice(1));
        setoperation("dequeue");
        setmessage(removed + " dequeued");};

    const front = queue.length > 0? queue[0] : "none";
    const rear = queue.length > 0? queue[queue.length-1]:"none";

    return(
        <div className="container">

            <h1>QUEUE VISUALIZER</h1>
            <div className="main-layout">
            <div className="info-panel">
            {showInfo && (
                <>
                    <h2>Operation: {operation}</h2>
                    <pre>Queue Size: {queue.length}</pre>
                    <pre>Front Element: {front}</pre>
                    <pre>Rear Element: {rear}</pre>
                    <pre>Total Capacity: {CAPACITY}</pre>
                    <pre>Available Space: {CAPACITY - queue.length}</pre>
                    <pre className="message">{message}</pre>
                    <pre className="principle">
                        Principle: FIFO (First In First Out)
                    </pre>
                </>
            )}</div>

            <div className="queue-box">
                {queue.map((val, i) => {
                    const isFront = i === 0;
                    const isRear = i === queue.length - 1;
                    return (
                        <div key={i} className="queue-node-wrapper">
                            {isFront &&
                                <div className="front-label">
                                    FRONT →</div>}
                            <AnimatedNode
                                value={val}
                                isFront={isFront}
                                isRear={isRear}
                            />
                            {isRear &&
                                <div className="rear-label">← REAR</div>}

                        </div>
                    );
                })}

            </div>
            </div>
            <div className="button-group">
                <button onClick={enqueue} className="algo-button">enqueue</button>
                <button onClick={dequeue} className="algo-button">dequeue</button>
            </div>

        </div>
    );

}
export default QueueVisalizer;