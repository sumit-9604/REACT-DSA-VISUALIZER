import { useState, useRef } from "react";
import { motion } from "framer-motion";

const NODE_SIZE = 60;
const DELAY = 600;

export default function LinkedListVisualizer() {
  const containerRef = useRef(null);
  const [state, setState] = useState({
    nodes: [],
    message: "Ready",
    listContent: "EMPTY",
    activeId: null,
  });

  const { nodes, message, listContent, activeId } = state;
  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };


  const getListContent = (list) =>
    list.length === 0
      ? "EMPTY"
      : "HEAD → " + list.map((n) => n.value).join(" → ") + " → NULL";


  const getRandomPosition = () => {
    const container = containerRef.current;
    if (!container) return { x: 100, y: 100 };
    const padding = 40;
    const { clientWidth: width, clientHeight: height } = container;
    return {
      x: Math.random() * (width - NODE_SIZE - padding * 2) + padding,
      y: Math.random() * (height - NODE_SIZE - padding * 2) + padding,
    };
  };


  const insertNode = () => {
    const pos = getRandomPosition();

    const newNode = {
      id: Date.now() + Math.random(),
      value: Math.floor(Math.random() * 100),
      x: pos.x,
      y: pos.y,
    };

    const updated = [...nodes, newNode];

    updateState({
      nodes: updated,
      message: `Inserted ${newNode.value}`,
      listContent: getListContent(updated),
    });
  };


  const deleteNode = () => {
    if (nodes.length === 0) {
      updateState({ message: "List Empty" });
      return;
    }

    const updated = nodes.slice(0, -1);

    updateState({
      nodes: updated,
      message: "Last node deleted",
      listContent: getListContent(updated),
    });
  };


  const animateNodes = async (callback) => {
    for (let node of nodes) {
      updateState({ activeId: node.id });
      await new Promise((res) => setTimeout(res, DELAY));

      if (callback && callback(node)) return;
    }

    updateState({ activeId: null });
  };


  const traverse = async () => {
    if (nodes.length === 0) {
      updateState({ message: "List Empty" });
      return;
    }

    updateState({ listContent: getListContent(nodes) });

    await animateNodes();

    updateState({
      message: "Traversal Complete",
      activeId: null,
    });
  };


  const searchNode = async () => {
    if (nodes.length === 0) {
      updateState({ message: "List Empty" });
      return;
    }

    const target = nodes[Math.floor(Math.random() * nodes.length)].value;

    updateState({ listContent: getListContent(nodes) });

    await animateNodes((node) => {
      if (node.value === target) {
        updateState({
          message: `Found ${target}`,
          activeId: null,
        });
        return true;
      }
      return false;
    });

    if (!nodes.some((n) => n.value === target)) {
      updateState({
        message: "Not Found",
        activeId: null,
      });
    }
  };

  return (
    <div className="ll-container">
      <h1>Linked List Visualizer</h1>

      <div className="message-box">
        <h1>{message}</h1>
        <br />
        {listContent}
      </div>

      <div
        ref={containerRef}
        className="linkedlist-container"
        style={{
          width: "100%",
          height: "600px",
          position: "relative",
          border: "2px solid #334155",
          overflow: "hidden",
        }}
      >
        <svg className="connections" width="100%" height="100%">
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

          {/* HEAD pointer */}
          {nodes.length > 0 && (
            <>
              <text
                x="20"
                y="40"
                fill="#22c55e"
                fontSize="18"
                fontWeight="bold"
              >
                HEAD
              </text>

              <line
                x1="70"
                y1="35"
                x2={nodes[0].x + NODE_SIZE / 2}
                y2={nodes[0].y + NODE_SIZE / 2}
                stroke="#22c55e"
                strokeWidth="3"
                markerEnd="url(#arrow)"
              />
            </>
          )}

          {/* Connections */}
          {nodes.map((node, i) => {
            if (i === nodes.length - 1) return null;
            const next = nodes[i + 1];

            return (
              <line
                key={node.id}
                x1={node.x + NODE_SIZE / 2}
                y1={node.y + NODE_SIZE / 2}
                x2={next.x + NODE_SIZE / 2}
                y2={next.y + NODE_SIZE / 2}
                stroke="#38bdf8"
                strokeWidth="3"
                markerEnd="url(#arrow)"
              />
            );
          })}
        </svg>

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className={`ll-node ${activeId === node.id ? "active" : ""}`}
            style={{
              left: node.x,
              top: node.y,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {node.value}
          </motion.div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={insertNode} className="algo-button">
          Insert
        </button>

        <button onClick={deleteNode} className="algo-button">
          Delete
        </button>

        <button onClick={searchNode} className="algo-button">
          Search
        </button>

        <button onClick={traverse} className="algo-button">
          Traverse
        </button>
      </div>
    </div>
  );
}
