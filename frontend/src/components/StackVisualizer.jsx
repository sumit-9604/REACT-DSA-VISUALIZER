/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import "../style.css";

const CAPACITY = 10;

function StackVisualiser() {
  const [stack, setstack] = useState([]);
  const [input, setinput] = useState("");
  const [operation, setoperation] = useState("");
  const [complexity, setcomplexity] = useState("");
  const [message, setmessage] = useState("");

  const push = () => {
    if (stack.length >= CAPACITY) {
      setoperation("push");
      setcomplexity("Time: O(1) | space: O(1)");
      setmessage("stack overflow");
      return;
    }

    const value =
      input === "" ? Math.floor(Math.random() * 100) : Number(input);
    setstack([...stack, value]);
    setoperation("push");
    setcomplexity("Time: O(1) | Space: O(1)");
    setmessage(`${value} pushed`);
    setinput("");
  };

  const pop = () => {
    if (stack.length === 0) {
      setoperation("Pop");
      setcomplexity("Time: O(1) | Space: O(1)");
      setmessage("Stack Underflow");
      return;
    }

    const removed = stack[stack.length - 1];
    setstack(stack.slice(0, -1));
    setoperation("Pop");
    setcomplexity("Time: O(1) | Space: O(1)");
    setmessage(`${removed} popped`);
  };

  const peek = () => {
    setoperation("Peek");
    setcomplexity("Time: O(1) | Space: O(1)");
    if (stack.length === 0) {
      setmessage("Stack Empty");
      return;
    }
    setmessage(`Top Element: ${stack[stack.length - 1]}`);
  };

  const search = () => {
    if (input === "") {
      setmessage("Enter value to search");
      return;
    }

    setoperation("Search");
    setcomplexity("Time: O(n) | Space: O(1)");
    const index = stack.lastIndexOf(Number(input));
    if (index === -1) setmessage("Not Found");
    else setmessage(`Found at position ${stack.length - index}`);
  };

  const reset = () => {
    setstack([]);
    setoperation("");
    setcomplexity("");
    setmessage("");
  };

  const size = stack.length;
  const top = stack.length === 0 ? "None" : stack[stack.length - 1];
  const space = CAPACITY - stack.length;

  return (
    <div className="container">
      <h1>STACK VISUALIZER</h1>
      <div className="main-layout">
      {operation && (
        <div className="info-panel">
          <pre>Operation: {operation}</pre>
          <pre>{complexity}</pre>
          <pre>Stack Size: {size}</pre>
          <pre>Top Element: {top}</pre>
          <pre>Total Capacity: {CAPACITY}</pre>
          <pre>Available Space: {space}</pre>
          <pre style={{ color: "#facc15" }}>{message}</pre>
          <pre style={{ color: "#22c55e" }}>
            Principle: LIFO (Last In First Out)
          </pre>
        </div>
      )}

      <div className="stack">
        {[...stack].reverse().map((val, i) => {
          const isTop = i === 0;

          return (
            <motion.div
              key={i}
              initial={{ y: -40 }}
              animate={{ y: 0 }}
              className="stack-node"
            >
              {val}

              {isTop && (
                <div className="top-indicator">
                  <span className="arrow">←</span>
                  <span className="top-text">TOP</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      </div>
      <div className="button-group">
        <input
          type="number"
          placeholder="Enter value"
          value={input}
          onChange={(e) => setinput(e.target.value)}
          className="algo-button"
        />

        <button onClick={push} className="algo-button">Push</button>
        <button onClick={pop} className="algo-button">Pop</button>
        <button onClick={peek} className="algo-button">Peek</button>
        <button onClick={search} className="algo-button">Search</button>
        <button onClick={reset} className="algo-button">Reset</button>
      </div>
    </div>
  );
}

export default StackVisualiser;
