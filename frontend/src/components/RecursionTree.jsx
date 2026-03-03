import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Node from "./Node";
import Arrow from "./Arrow";

const NODESIZE = 50;
const LEVELGAP = 90;
const HORIZANTALGAP = 60;

export default function RecursionTreeVisualizer() {
  const containerRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [message, setMessage] = useState("Click Generate");
  const [content, setContent] = useState("");

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };




  const generateStepTree = async (value, x, y, subtreeWidth, parentId = null) => {
    const id = Date.now() + Math.random();
    const newNode = { id, value, x, y };
    setNodes((prev) => [...prev, newNode]);
    setContent((prev) => prev + ` fib(${value}) →`);

    setMessage(`Calling fib(${value})`);

    await sleep(700);

    if (parentId !== null) {
      setEdges((prev) => [...prev, { from: parentId, to: id }]);
      await sleep(500);}

    if (value <= 1) return;

    const leftOffset = subtreeWidth / 4;
    await generateStepTree(value - 1, x - leftOffset, y + LEVELGAP, subtreeWidth/2, id);

    const rightOffset = subtreeWidth / 4;
    await generateStepTree(value - 2, x + rightOffset, y + LEVELGAP, subtreeWidth/ 2, id);
  };





  const generateTree = async () => {
    setNodes([]);
    setEdges([]);
    setContent("");

    const width = containerRef.current.clientWidth;
    const initialSubtreeWidth = width * 0.9;
    await generateStepTree(5, width / 2, 50, initialSubtreeWidth, null);

    setMessage("Tree Complete");
  };

  const clearTree = () => {
    setNodes([]);
    setEdges([]);
    setContent("");
    setMessage("Cleared");
  };

  return (
    <div className="container">
      <h1>RECURSION TREE VISUALIZER</h1>

      <div className="message-box">{message}</div>

      <div className="content-box">{content}</div>

      <div ref={containerRef} className="tree-container">
        <svg width="100%" height="100%" className="connections">
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#38bdf8" />
            </marker>
          </defs>

          {edges.map((edge, index) => {
            const from = nodes.find((n) => n.id === edge.from);

            const to = nodes.find((n) => n.id === edge.to);

            if (!from || !to) return null;

            return (
              <motion.line
                key={index}
                x1={from.x + NODESIZE / 2}
                y1={from.y + NODESIZE / 2}
                x2={to.x + NODESIZE / 2}
                y2={to.y + NODESIZE / 2}
                stroke="#48bdf1"
                strokeWidth="3"
                markerEnd="url(#arrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 }}
              />
            );
          })}
        </svg>

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="tree-node"
            style={{
              left: node.x,
              top: node.y,
              fontSize:"x-large"
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {node.value}
          </motion.div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={generateTree} className="algo-button">
          Generate Step Tree
        </button>

        <button onClick={clearTree} className="algo-button">
          Clear
        </button>
      </div>
    </div>
  );
}
