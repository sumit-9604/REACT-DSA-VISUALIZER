import { useState } from "react";
import AnimatedBar from "./AnimatedBar";

function ArrayVisualiser() {
  const [array, setarray] = useState([5, 3, 8, 2, 7, 15, 6, 1]);
  const [comparing, setcomparing] = useState([]);
  const [found, setfound] = useState(null);
  const [status, setStatus] = useState("");
  const [sorted, setsorted] = useState(new Array(8).fill(false));
  const [target, setTarget] = useState("");
  const [complexity, setComplexity] = useState({
    time: "",
    space: "",
  });

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const swap = (arr, i, j) => {
    const newArr = [...arr];
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    return newArr;
  };

  const linear = async () => {
    if (target === "") {
      alert("Enter a number to search");
      return;
    }

    const targetValue = Number(target);

    let arr = [...array];
    setStatus(`searching for ${target}...`);

    setfound(null);
    setComplexity({
      time: "O(n)",
      space: "O(1)",
    });

    for (let i = 0; i < arr.length; i++) {
      setcomparing([i]);
      setStatus(`Comparing index ${i}`);
      await delay(500);

      if (arr[i] === targetValue) {
        setfound(i);
        setStatus(`Found ${target} at index ${i}`);
        setcomparing([]);

        return;
      }
    }

    setfound(-1);
    setStatus(`${target} not found`);
    setcomparing([]);
  };

  const sort = async () => {
    let arr = [...array];
    setStatus("Sorting started...");
    setComplexity({
      time: "O(n²)",
      space: "O(1)",
    });
    let sortedFlags = new Array(arr.length).fill(false);

    setsorted(sortedFlags);

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setcomparing([j, j + 1]);
        setStatus(`Comparing index ${j} and ${j + 1}`);
        await delay(300);

        if (arr[j] > arr[j + 1]) {
          arr = swap(arr, j, j + 1);

          setarray(arr);
        }
      }

      sortedFlags[arr.length - i - 1] = true;

      setsorted([...sortedFlags]);
    }

    sortedFlags[0] = true;

    setsorted([...sortedFlags]);

    setcomparing([]);
    setStatus("Sorting completed");
  };

  const randomize = () => {
    const newArr = Array(9)
      .fill()
      .map(() => Math.floor(Math.random() * 50) + 1);
    setarray(newArr);
    setsorted(new Array(newArr.length).fill(false));
    setfound(null);
    setcomparing([]);
    setComplexity({
      time: "",
      space: "",
    });
  };

  return (
    <div className="container">
      <h1>ARRAY VISUALIZER</h1>

      <div className="complexity-box">
        <h2>{comparing.length > 0 && `Comparing index ${comparing.join(",")}`}</h2>
        <h2>{found !== null && found >= 0 && `✅ Found at index ${found}`}</h2>

        <h2>{found === -1 && "❌ 6 Not Found"}</h2>

        <pre>{complexity.time && `Time Complexity: ${complexity.time}`}</pre>

        <pre>{complexity.space && `Space Complexity: ${complexity.space}`}</pre>
 
        <h2>{sorted.length > 0 &&
          `${sorted.filter(Boolean).length}/${array.length} sorted`}</h2>
      </div>



      <div className="array-container">
        {array.map((val, i) => (
          <div key={i}>
            <AnimatedBar
              key={i}
              value={val}
              style={{ "--height": `${val * 10}px` }}
              isComparing={comparing.includes(i)}
              isFound={found === i}
              isSorted={sorted[i]}
              index={i}
            />
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={randomize} className="algo-button">
          Randomize
        </button>
        <button onClick={linear} className="algo-button search-btn">
          🔍 Search
        </button>
        <input
          type="number"
          placeholder="Enter number to search"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="algo-button"
        />
        <button onClick={sort} className="algo-button sort-btn">
          🔄 Bubble Sort
        </button>
      </div>
    </div>
  );
}

export default ArrayVisualiser;
