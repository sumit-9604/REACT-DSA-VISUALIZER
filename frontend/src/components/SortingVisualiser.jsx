/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "../style.css";

const SIZE = 20;
const MIN = 10;
const MAX = 80;

const generateRandomArray = () =>
  Array.from({ length: SIZE }, () => Math.floor(Math.random() * MAX) + MIN);

const complexity = {
  Bubble: "Time: O(n²), Space: O(1)",
  Selection: "Time: O(n²), Space: O(1)",
  Insertion: "Time: O(n²), Space: O(1)",
  Merge: "Time: O(n log n), Space: O(n)",
  Quick: "Time: O(n log n), Space: O(log n)",
};

export default function SortingVisualizer() {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleSortingInfo = () => {
    setShowDropdown((prev) => !prev);
  };
  const [state, setState] = useState({
    array: generateRandomArray(),
    active: [],
    sorted: [],
    speed: 200,
    algorithm: "",
    isRunning: false,
    timeTaken: null,
    isPaused: false,
    isStepMode: false,
    pivot: null,
  });

  const {
    array,
    active,
    sorted,
    speed,
    algorithm,
    isRunning,
    timeTaken,
    isPaused,
    isStepMode,
    pivot,
  } = state;

  const pausedRef = useRef(false);
  const stepModeRef = useRef(false);
  const stepResolve = useRef(null);

  const updateState = (updates) =>
    setState((prev) => ({ ...prev, ...updates }));

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    stepModeRef.current = isStepMode;
  }, [isStepMode]);

  // Delay controller
  const delay = async () => {
    if (stepModeRef.current) {
      await new Promise((res) => (stepResolve.current = res));
    }

    while (pausedRef.current) {
      await new Promise((res) => setTimeout(res, 50));
    }

    await new Promise((res) => setTimeout(res, speed));
  };

  const stepForward = () => {
    if (stepResolve.current) {
      stepResolve.current();
      stepResolve.current = null;
    }
  };

  // Reset
  const reset = () => {
    updateState({
      array: generateRandomArray(),
      active: [],
      sorted: [],
      algorithm: "",
      isRunning: false,
      timeTaken: null,
      pivot: null,
    });
  };

  // Swap utility
  const swap = async (arr, i, j) => {
    updateState({ active: [i, j] });

    await delay();

    [arr[i], arr[j]] = [arr[j], arr[i]];

    updateState({ array: [...arr] });

    await delay();
  };

  // Sorting wrapper
  const startSort = (name) => {
    updateState({
      algorithm: name,
      isRunning: true,
      timeTaken: null,
      sorted: [],
      active: [],
      pivot: null,
    });

    return performance.now();
  };

  const endSort = (start, arr) => {
    const end = performance.now();

    updateState({
      sorted: arr.map((_, i) => i),
      active: [],
      isRunning: false,
      pivot: null,
      timeTaken: (end - start).toFixed(2),
    });
  };

  // Bubble Sort
  const bubbleSort = async () => {
    const start = startSort("Bubble");
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          await swap(arr, j, j + 1);
        }
      }

      updateState((prev) => ({
        sorted: [...prev.sorted, arr.length - i - 1],
      }));
    }

    endSort(start, arr);
  };

  // Selection Sort
  const selectionSort = async () => {
    const start = startSort("Selection");
    let arr = [...array];

    for (let i = 0; i < arr.length - 1; i++) {
      let min = i;

      for (let j = i + 1; j < arr.length; j++) {
        updateState({ active: [min, j] });

        await delay();

        if (arr[j] < arr[min]) min = j;
      }

      if (min !== i) await swap(arr, i, min);

      updateState((prev) => ({
        sorted: [...prev.sorted, i],
      }));
    }

    endSort(start, arr);
  };

  // Insertion Sort
  const insertionSort = async () => {
    const start = startSort("Insertion");
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        updateState({ active: [j, j + 1] });

        await delay();

        arr[j + 1] = arr[j];

        updateState({ array: [...arr] });

        j--;
      }

      arr[j + 1] = key;

      updateState({ array: [...arr] });
    }

    endSort(start, arr);
  };

  // Merge Sort
  const mergeSort = async () => {
    const start = startSort("Merge");
    let arr = [...array];

    const merge = async (l, m, r) => {
      let left = arr.slice(l, m + 1);
      let right = arr.slice(m + 1, r + 1);

      let i = 0,
        j = 0,
        k = l;

      while (i < left.length && j < right.length) {
        updateState({ active: [k] });

        await delay();

        arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];

        updateState({ array: [...arr] });
      }

      while (i < left.length) {
        arr[k++] = left[i++];
        updateState({ array: [...arr] });
      }

      while (j < right.length) {
        arr[k++] = right[j++];
        updateState({ array: [...arr] });

        await delay();
      }
    };

    const sort = async (l, r) => {
      if (l >= r) return;

      let m = Math.floor((l + r) / 2);

      await sort(l, m);
      await sort(m + 1, r);

      await merge(l, m, r);
    };

    await sort(0, arr.length - 1);

    endSort(start, arr);
  };

  // Quick Sort
  const quickSort = async () => {
    const start = startSort("Quick");
    let arr = [...array];

    const partition = async (l, r) => {
      let p = arr[r];

      updateState({ pivot: r });

      let i = l;

      for (let j = l; j < r; j++) {
        if (arr[j] < p) {
          await swap(arr, i, j);
          i++;
        }
      }

      await swap(arr, i, r);

      updateState({ pivot: null });

      return i;
    };

    const sort = async (l, r) => {
      if (l >= r) return;

      let pi = await partition(l, r);

      await sort(l, pi - 1);
      await sort(pi + 1, r);
    };

    await sort(0, arr.length - 1);

    endSort(start, arr);
  };

  return (
    <div className="container">
      <button
        className="bulb-icon"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        💡
      </button>

      {/* 📦 Info Box */}
      {showDropdown && (
        <div className="sorting-info-box">
          <h2>Sorting Algorithms Comparison</h2>

          <h3>Ascending Order of Time Complexity (Best → Worst)</h3>
          <p>
            Counting Sort → Radix Sort → Bucket Sort → Merge Sort → Quick Sort →
            Heap Sort → Insertion Sort → Selection Sort → Bubble Sort
          </p>

          <h3>Ascending Order of Speed (Fastest → Slowest)</h3>
          <p>
            Quick Sort → Merge Sort → Heap Sort → Insertion Sort → Selection
            Sort → Bubble Sort
          </p>

          <h3>Comparison Table</h3>

          <table>
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Best</th>
                <th>Average</th>
                <th>Worst</th>
                <th>Stable</th>
                <th>Space</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Bubble</td>
                <td>O(n)</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>Yes</td>
                <td>O(1)</td>
              </tr>

              <tr>
                <td>Selection</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>No</td>
                <td>O(1)</td>
              </tr>

              <tr>
                <td>Insertion</td>
                <td>O(n)</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>Yes</td>
                <td>O(1)</td>
              </tr>

              <tr>
                <td>Merge</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>Yes</td>
                <td>O(n)</td>
              </tr>

              <tr>
                <td>Quick</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>O(n²)</td>
                <td>No</td>
                <td>O(log n)</td>
              </tr>

              <tr>
                <td>Heap</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>No</td>
                <td>O(1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="complexity-box">
        <h1>SORTING VISUALIZER</h1>

        <h2>{algorithm} sort</h2>

        <pre>{complexity[algorithm]}</pre>

        {timeTaken && (
          <pre style={{ color: "#22c55e" }}>Time Taken: {timeTaken} ms</pre>
        )}
      </div>

      <div className="array">
        {array.map((value, index) => (
          <motion.div
            key={index}
            animate={{
              height: value * 4,
              background: sorted.includes(index)
                ? "#22c55e"
                : pivot === index
                  ? "#f59e0b"
                  : active.includes(index)
                    ? "#f43f5e"
                    : "linear-gradient(90deg, #38bdf8, #a78bfa)",
            }}
          >
            {value}
          </motion.div>
        ))}
      </div>

      <br />

      <div className="button-group">
        <button onClick={reset} className="algo-button">
          Generate
        </button>

        <button onClick={bubbleSort} className="algo-button">
          Bubble
        </button>

        <button onClick={selectionSort} className="algo-button">
          Selection
        </button>

        <button onClick={insertionSort} className="algo-button">
          Insertion
        </button>

        <button onClick={mergeSort} className="algo-button">
          Merge
        </button>

        <button onClick={quickSort} className="algo-button">
          Quick
        </button>
      </div>

      <br />
      <br />

      <div className="button-group">
        <button
          onClick={() => updateState({ isPaused: true })}
          className={`algo-button ${isPaused ? "paused" : ""}`}
        >
          Pause
        </button>

        <button
          onClick={() => updateState({ isPaused: false })}
          className="algo-button"
        >
          Resume
        </button>

        <button
          onClick={() => updateState({ isStepMode: true })}
          className={`algo-button ${isStepMode ? "step-mode" : ""}`}
        >
          Step Mode
        </button>

        <button onClick={stepForward} className="algo-button">
          Next Step
        </button>

        <button
          onClick={() => updateState({ isStepMode: false })}
          className="algo-button"
        >
          Exit Step Mode
        </button>
      </div>
    </div>
  );
}
