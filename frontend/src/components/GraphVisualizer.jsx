import { useState } from "react";
import { motion, px } from "framer-motion";
import "../style.css";

const algoInfoData = {
  bfs: {
    title: "Breadth First Search (BFS)",
    concept:
      "BFS explores the graph level by level using a Queue. It visits all neighbors before going deeper.",
    steps: [
      "1. Select start node",
      "2. Put start node in Queue",
      "3. Mark node as visited",
      "4. Remove node from Queue",
      "5. Visit all unvisited neighbors",
      "6. Add neighbors to Queue",
      "7. Repeat until Queue is empty",
    ],
    complexity: "Time: O(V + E), Space: O(V)",
    use: "Shortest path in unweighted graph, networking, web crawling",
  },

  dfs: {
    title: "Depth First Search (DFS)",
    concept:
      "DFS explores as deep as possible first using recursion or stack before backtracking.",
    steps: [
      "1. Select start node",
      "2. Mark as visited",
      "3. Visit one neighbor",
      "4. Repeat until no neighbor left",
      "5. Backtrack",
      "6. Continue remaining nodes",
    ],
    complexity: "Time: O(V + E), Space: O(V)",
    use: "Cycle detection, path finding, topological sort",
  },

  dijkstra: {
    title: "Dijkstra Algorithm",
    concept:
      "Finds shortest path from source to all nodes using greedy approach and priority queue.",
    steps: [
      "1. Set source distance = 0",
      "2. Set all others = infinity",
      "3. Select node with minimum distance",
      "4. Update neighbor distances",
      "5. Repeat until all visited",
    ],
    complexity: "Time: O(E log V)",
    use: "GPS navigation, network routing",
  },

  kruskal: {
    title: "Kruskal Algorithm",
    concept:
      "Finds Minimum Spanning Tree by selecting smallest edges without forming cycle.",
    steps: [
      "1. Sort edges by weight",
      "2. Pick smallest edge",
      "3. Check cycle using Union-Find",
      "4. Add edge if no cycle",
      "5. Repeat until MST complete",
    ],
    complexity: "Time: O(E log E)",
    use: "Network design, road construction",
  },

  prim: {
    title: "Prim Algorithm",
    concept:
      "Builds MST by expanding from start node and choosing minimum edge.",
    steps: [
      "1. Select start node",
      "2. Find minimum edge from visited set",
      "3. Add new node",
      "4. Repeat until all nodes included",
    ],
    complexity: "Time: O(E log V)",
    use: "Electrical grid design",
  },

  dag: {
    title: "Directed Acyclic Graph (DAG)",
    concept: "Graph with direction and no cycles.",
    steps: [
      "1. Create directed edges",
      "2. Ensure no cycles",
      "3. Used for dependency ordering",
    ],
    complexity: "N/A",
    use: "Task scheduling, compilers",
  },

  topo: {
    title: "Topological Sort",
    concept:
      "Orders nodes such that for every directed edge u → v, u comes before v.",
    steps: [
      "1. Perform DFS",
      "2. Push node after visiting children",
      "3. Reverse stack",
      "4. Result is topological order",
    ],
    complexity: "Time: O(V + E)",
    use: "Build systems, task scheduling",
  },
};

const NODE_SIZE = 60;
const CENTER_X = 400;
const CENTER_Y = 260;
const RADIUS = 170;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default function GraphVisualizer() {
  const [algoInfo, setAlgoInfo] = useState({
    title: "",
    concept: "",
    steps: [],
    complexity: "",
    use: "",
  });
  const resetAlgoState = () => {
    setAlgoState({
      visited: [],
      activeNode: null,
      activeEdge: null,
      mstEdges: [],
      distances: {},
      priorityQueue: [],
      stepText: "",
      startNode: null,
      graphType: "directed",
    });
  };
  const createDAG = () => {
    setAlgoInfo(algoInfoData.dag);
    resetAlgoState();

    const dagNodes = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ];

    const dagEdges = [
      { from: 0, to: 1, weight: 2 },
      { from: 0, to: 2, weight: 4 },
      { from: 1, to: 3, weight: 3 },
      { from: 2, to: 3, weight: 1 },
      { from: 3, to: 4, weight: 5 },
      { from: 4, to: 5, weight: 2 },
    ];

    setNodes(dagNodes);
    setEdges(dagEdges);

    setAlgoState((prev) => ({
      ...prev,
      graphType: "directed",
    }));
  };
  const [nodes, setNodes] = useState([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);

  const [algoState, setAlgoState] = useState({
    visited: [],
    activeNode: null,
    activeEdge: null,
    mstEdges: [],
    distances: {},
    priorityQueue: [],
    startNode: null,
    graphType: "undirected",
  });

  const [showSortingInfo, setShowSortingInfo] = useState(false);

  const toggleSortingInfo = () => {
    setShowSortingInfo((prev) => !prev);
  };

  const [edges, setEdges] = useState([]);
  const [graphInfo, setGraphInfo] = useState({
    type: "",
    condition: "",
    description: "",
  });

  const graphData = {
    complete: {
      type: "Complete Graph",
      condition: "Every pair of distinct vertices is connected by an edge.",
      description:
        "A complete graph has maximum possible edges. Number of edges = n(n−1)/2.",
    },

    sparse: {
      type: "Sparse Graph",
      condition: "Number of edges is much less than maximum possible edges.",
      description:
        "Sparse graphs contain very few edges compared to total possible edges.",
    },

    regular: {
      type: "Regular Graph",
      condition: "Every vertex has the same number of edges (same degree).",
      description:
        "In a regular graph, each vertex has equal degree. Example: cycle graph.",
    },
  };

  const getPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI;

    return {
      x: CENTER_X + RADIUS * Math.cos(angle),
      y: CENTER_Y + RADIUS * Math.sin(angle),
    };
  };

  const getNodePositionById = (id) => {
    const index = nodes.findIndex((n) => n.id === id);
    if (index === -1) return { x: 0, y: 0 };
    return getPosition(index, nodes.length);
  };

  const getAdjList = () => {
    let adj = {};

    nodes.forEach((n) => (adj[n.id] = []));

    edges.forEach((e) => {
      adj[e.from].push({ node: e.to, weight: e.weight });

      if (algoState.graphType === "undirected") {
        adj[e.to].push({ node: e.from, weight: e.weight });
      }
    });

    return adj;
  };

  const runBFS = async () => {
    resetAlgoState();
    await sleep(50);
    setAlgoInfo(algoInfoData.bfs);

    if (nodes.length === 0) return;

    let adj = getAdjList();
    let visited = {};
    const start = algoState.startNode ?? nodes[0]?.id;
    let queue = [start];
    visited[start] = true;

    let order = [];

    while (queue.length) {
      let v = queue.shift();
      order.push(v);

      setAlgoState((prev) => ({
        ...prev,
        visited: [...order],
      }));

      await new Promise((r) => setTimeout(r, 600));

      for (let nei of adj[v]) {
        if (!visited[nei.node]) {
          visited[nei.node] = true;
          queue.push(nei.node);
        }
      }
    }
  };

  const runDFS = async () => {
    resetAlgoState();
    await sleep(50);
    setAlgoInfo(algoInfoData.dfs);

    let adj = getAdjList();
    let visited = {};
    let order = [];

    const start = algoState.startNode ?? nodes[0]?.id;

    const dfs = async (v) => {
      visited[v] = true;
      order.push(v);

      setAlgoState((prev) => ({
        ...prev,
        visited: [...order],
        activeNode: v,
      }));

      await sleep(600);

      for (let nei of adj[v]) {
        if (!visited[nei.node]) {
          await dfs(nei.node);
        }
      }
    };

    await dfs(start);
  };

const runDijkstra = async () => {
  if (nodes.length === 0) return;

  const start = algoState.startNode ?? nodes[0].id;

  const adj = getAdjList();

  let dist = {};
  let visited = {};
  let pq = [];

  nodes.forEach(n => {
    dist[n.id] = Infinity;
    visited[n.id] = false;
  });

  dist[start] = 0;
  pq.push({ node: start, dist: 0 });

  // FULL RESET WITH START PRESERVED
  setAlgoState({
    visited: [],
    activeNode: null,
    activeEdge: null,
    mstEdges: [],
    distances: { ...dist },
    priorityQueue: [...pq],
    startNode: start,
    graphType: algoState.graphType,
    stepText: "Initialized with start node " + start
  });

  setAlgoInfo(algoInfoData.dijkstra);

  await sleep(1000);

  while (pq.length > 0) {

    // Sort PQ
    pq.sort((a, b) => a.dist - b.dist);

    const current = pq.shift();

    // UPDATE PQ AFTER POP
    setAlgoState(prev => ({
      ...prev,
      priorityQueue: [...pq],
      stepText: `Removed node ${current.node} from Priority Queue`
    }));

    await sleep(1000);

    const u = current.node;

    if (visited[u]) continue;

    visited[u] = true;

    // ACTIVE NODE UPDATE
    setAlgoState(prev => ({
      ...prev,
      activeNode: u,
      visited: [...prev.visited, u],
      stepText: `Processing node ${u}`
    }));

    await sleep(1000);

    for (let nei of adj[u]) {

      // ACTIVE EDGE UPDATE
      setAlgoState(prev => ({
        ...prev,
        activeEdge: { from: u, to: nei.node },
        stepText: `Checking edge ${u} → ${nei.node}`
      }));

      await sleep(1000);

      if (!visited[nei.node] && dist[u] + nei.weight < dist[nei.node]) {

        dist[nei.node] = dist[u] + nei.weight;

        pq.push({
          node: nei.node,
          dist: dist[nei.node]
        });

        // UPDATE EVERYTHING TOGETHER
        setAlgoState(prev => ({
          ...prev,
          distances: { ...dist },
          priorityQueue: [...pq],
          stepText: `Updated distance of node ${nei.node} to ${dist[nei.node]}`
        }));

        await sleep(1000);
      }
    }
  }

  setAlgoState(prev => ({
    ...prev,
    activeNode: null,
    activeEdge: null,
    stepText: "Dijkstra Complete"
  }));
};

  const runKruskal = async () => {
    resetAlgoState();
    await sleep(50);
    setAlgoInfo(algoInfoData.kruskal);

    let parent = {};

    nodes.forEach((n) => (parent[n.id] = n.id));

    const find = (x) => {
      if (parent[x] === x) return x;
      return (parent[x] = find(parent[x]));
    };

    const union = (a, b) => {
      parent[find(a)] = find(b);
    };

    let sorted = [...edges].sort((a, b) => a.weight - b.weight);

    let mst = [];

    for (let e of sorted) {
      if (find(e.from) !== find(e.to)) {
        union(e.from, e.to);

        mst.push(e);

        setAlgoState((prev) => ({
          ...prev,
          activeEdge: { from: e.from, to: e.to },
          mstEdges: [...mst],
        }));

        await new Promise((r) => setTimeout(r, 600));
      }
    }
  };

  const runPrim = async () => {
    resetAlgoState();
    await sleep(50);
    setAlgoInfo(algoInfoData.prim);

    if (nodes.length === 0) return;

    let adj = getAdjList();

    let visited = {};
    const start = algoState.startNode ?? nodes[0]?.id;
    visited[start] = true;

    let mst = [];

    for (let i = 0; i < nodes.length - 1; i++) {
      let minEdge = null;

      for (let node of Object.keys(visited)) {
        for (let nei of adj[node]) {
          if (!visited[nei.node]) {
            if (!minEdge || nei.weight < minEdge.weight) {
              minEdge = {
                from: Number(node),
                to: nei.node,
                weight: nei.weight,
              };
            }
          }
        }
      }

      if (!minEdge) break;

      visited[minEdge.to] = true;

      mst.push(minEdge);

      setAlgoState((prev) => ({
        ...prev,
        activeEdge: minEdge,
        mstEdges: [...mst],
      }));

      await new Promise((r) => setTimeout(r, 600));
    }
  };

  const topo = async () => {
    resetAlgoState();
    await sleep(50);
    setAlgoInfo(algoInfoData.topo);
    if (algoState.graphType !== "directed") {
      alert("Create DAG first");
      return;
    }

    let adj = getAdjList();
    let visited = {};
    let stack = [];

    const dfs = async (v) => {
      visited[v] = true;

      setAlgoState((prev) => ({
        ...prev,
        activeNode: v,
      }));

      await sleep(600);

      for (let nei of adj[v]) {
        setAlgoState((prev) => ({
          ...prev,
          activeEdge: { from: v, to: nei.node },
        }));

        await sleep(600);

        if (!visited[nei.node]) await dfs(nei.node);
      }

      stack.push(v);
    };

    for (let node of nodes) if (!visited[node.id]) await dfs(node.id);

    stack.reverse();

    setAlgoState((prev) => ({
      ...prev,
      visited: stack,
    }));
  };

  const addVertex = () => {
    const newId = nodes.length;
    const newNodes = [...nodes, { id: newId }];
    setNodes(newNodes);

    if (newNodes.length > 1) {
      setEdges((prev) => [
        ...prev,
        {
          from: newNodes[newNodes.length - 2].id,
          to: newId,
          weight: Math.floor(Math.random() * 9) + 1,
        },
      ]);
    }
  };

  const removeVertex = () => {
    if (nodes.length === 0) return;
    const lastId = nodes[nodes.length - 1].id;
    setNodes((prev) => prev.slice(0, -1));
    setEdges((prev) =>
      prev.filter((e) => e.from !== lastId && e.to !== lastId),
    );
  };

  const makeCompleteGraph = () => {
    let newEdges = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        newEdges.push({
          from: nodes[i].id,
          to: nodes[j].id,
          weight: Math.floor(Math.random() * 9) + 1,
        });
      }
    }
    setEdges(newEdges);
    setGraphInfo(graphData.complete);
  };

  const makeSparseGraph = () => {
    let newEdges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      newEdges.push({
        from: nodes[i].id,
        to: nodes[i + 1].id,
        weight: Math.floor(Math.random() * 9) + 1,
      });
    }
    setEdges(newEdges);
    setGraphInfo(graphData.sparse);
  };

  const makeRegularGraph = () => {
    let newEdges = [];
    const n = nodes.length;
    for (let i = 0; i < n; i++) {
      newEdges.push({
        from: nodes[i].id,
        to: nodes[(i + 1) % n].id,
        weight: Math.floor(Math.random() * 9) + 1,
      });
    }
    setEdges(newEdges);
    setGraphInfo(graphData.regular);
  };

  const resetGraph = () => {
    setAlgoInfo({
      title: "",
      concept: "",
      steps: [],
      complexity: "",
      use: "",
    });

    setGraphInfo({
      type: "",
      condition: "",
      description: "",
    });

    const defaultNodes = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

    const defaultEdges = [
      { from: 0, to: 1, weight: 2 },
      { from: 1, to: 2, weight: 4 },
      { from: 2, to: 3, weight: 3 },
    ];

    setNodes(defaultNodes);
    setEdges(defaultEdges);
    setAlgoState({
      visited: [],
      activeNode: null,
      activeEdge: null,
      mstEdges: [],
      distances: {},
      priorityQueue: [],
      startNode: null,
      graphType: "undirected",
    });
  };

  return (
    <>
      <div className="graph-container">
        <h1>GRAPH VISUALIZER</h1>

        <div className="info-panel">
          {/* GRAPH INFO */}
          {graphInfo.type && (
            <>
              <h3>{graphInfo.type}</h3>

              <pre>
                <strong>Condition:</strong> {graphInfo.condition}
              </pre>

              <pre>
                <strong>Description:</strong> {graphInfo.description}
              </pre>
            </>
          )}

          {/* ALGORITHM INFO */}
          {algoInfo.title && (
            <>
              <h3 style={{ marginTop: "10px", color: "#22c55e" }}>
                {algoInfo.title}
              </h3>

              <pre>
                <strong>Concept:</strong> {algoInfo.concept}
              </pre>

              <strong>Steps:</strong>
              {algoInfo.steps.map((step, i) => (
                <div key={i}>• {step}</div>
              ))}

              <pre>
                <strong>Complexity:</strong> {algoInfo.complexity}
              </pre>

              <pre>
                <strong>Use:</strong> {algoInfo.use}
              </pre>
            </>
          )}
        </div>
        <div className="graphbutton">
          <div className="graph-area">
            <div
              onClick={resetGraph}
              title="Reload Graph"
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                cursor: "pointer",
                width: "42px",
                height: "42px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                background: "rgba(15,23,42,0.9)",
                border: "2px solid #38bdf8",
                zIndex: 50,
                transition: "0.3s",
              }}
            >
              <motion.svg
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                style={{ top: "4px" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-3-6.7" />
                <polyline points="21 3 21 9 15 9" />
              </motion.svg>
            </div>
            <div className="graph-text">
              Graph Type: {algoState.graphType}
              <br />
              Visited: {algoState.visited.join(", ")}
              {"   "}
              Step: {algoState.stepText}
            </div>
            <svg
              width="800"
              height="500"
              style={{ position: "absolute", left: 0, top: 0 }}
            >
              <defs>
                <marker
                  id="arrow"
                  markerWidth="10"
                  markerHeight="10"
                  refX="10"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#38bdf8" />
                </marker>
              </defs>
              {edges.map((edge, i) => {
                const fromindex = nodes.findIndex((n) => n.id === edge.from);
                const toindex = nodes.findIndex((n) => n.id === edge.to);
                if (fromindex === -1 || toindex === -1) return null;
                const from = getPosition(fromindex, nodes.length);
                const to = getPosition(toindex, nodes.length);

                const isMST = algoState.mstEdges.some(
                  (e) =>
                    (e.from === edge.from && e.to === edge.to) ||
                    (e.from === edge.to && e.to === edge.from),
                );

                const isActive =
                  algoState.activeEdge &&
                  algoState.activeEdge.from === edge.from &&
                  algoState.activeEdge.to === edge.to;

                return (
                  <g key={i}>
                    <motion.line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={
                        isActive
                          ? "#ef4444" // RED = active edge
                          : isMST
                            ? "#22c55e" // GREEN = MST edge
                            : "#38bdf8" // BLUE = normal edge
                      }
                      strokeWidth={isActive ? 7 : isMST ? 6 : 3}
                      markerEnd={
                        algoState.graphType === "directed" ? "url(#arrow)" : ""
                      }
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: 1,
                        strokeWidth: isActive ? 7 : isMST ? 6 : 3,
                      }}
                    />
                    <text
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2}
                      fontSize={"34px"}
                      fontWeight="500"
                      textAnchor="middle"
                      fill="yellow"
                    >
                      {edge.weight}
                    </text>
                  </g>
                );
              })}
            </svg>

            {nodes.map((node, index) => {
              const pos = getPosition(index, nodes.length);

              return (
                <motion.div
                  key={node.id}
                  className="graph-node"
                  onClick={() =>
                    setAlgoState((prev) => ({
                      ...prev,
                      startNode: node.id,
                    }))
                  }
                  animate={{
                    left: pos.x - NODE_SIZE / 2,
                    top: pos.y - NODE_SIZE / 2,
                    background:
                      algoState.activeNode === node.id
                        ? "#ef4444" // RED = currently processing
                        : algoState.startNode === node.id
                          ? "#f59e0b" // ORANGE = start
                          : algoState.visited.includes(node.id)
                            ? "#22c55e" // GREEN = finished
                            : "#6366f1",
                  }}
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                >
                  {node.id}

                  {/* DISTANCE LABEL */}
                  {algoState.distances[node.id] !== undefined &&
                    algoState.distances[node.id] !== Infinity && (
                      <div style={{ fontSize: "12px", color: "yellow" }}>
                        {algoState.distances[node.id]}
                      </div>
                    )}
                </motion.div>
              );
            })}
            <div
              style={{
                position: "absolute",
                right: "20px",
                top: "80px",
                background: "#0f172a",
                padding: "10px",
                borderRadius: "8px",
                width: "190px",
                height:"160px",
                zIndex: 1000,
                border: "1px solid #38bdf8",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              }}
            >
              <strong style={{ color: "white" }}>Priority Queue</strong>

              {algoState.priorityQueue.length === 0 ? (
                <div style={{ color: "#64748b" }}>Empty</div>
              ) : (
                algoState.priorityQueue.map((item, i) => (
                  <div key={i} style={{ color: "yellow" }}>
                    Node {item.node} : {item.dist}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="graph-button-group">
            <button onClick={addVertex} className="graph-algo-button">
              Add Vertex
            </button>
            <button onClick={removeVertex} className="graph-algo-button">
              Remove Vertex
            </button>
            <button onClick={makeCompleteGraph} className="graph-algo-button">
              Complete Graph
            </button>
            <button onClick={makeSparseGraph} className="graph-algo-button">
              Sparse Graph
            </button>
            <button onClick={makeRegularGraph} className="graph-algo-button">
              Regular Graph
            </button>
            <button onClick={runBFS} className="graph-algo-button">
              BFS
            </button>

            <button onClick={runDFS} className="graph-algo-button">
              DFS
            </button>

            <button onClick={runDijkstra} className="graph-algo-button">
              Dijkstra
            </button>

            <button onClick={runKruskal} className="graph-algo-button">
              Kruskal
            </button>

            <button onClick={runPrim} className="graph-algo-button">
              Prim
            </button>
            <button onClick={createDAG} className="graph-algo-button">
              Create DAG
            </button>
            <button onClick={topo} className="graph-algo-button">
              Topological
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
