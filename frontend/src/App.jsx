import SortingVisualizer from "./components/SortingVisualiser"
import SearchingVisualizer from "./components/SearchingVisualizer"
import StackVisualizer from "./components/StackVisualizer"
import QueueVisualizer from "./components/QueueVisualizer"
import LinkedListVisualizer from "./components/LinkedListVisualizer"
import RecursionTree from "./components/RecursionTree";
import '../src/style.css';
import { useState, useEffect } from "react";
import ArrayVisualiser from "./components/ArrayVisualizer"
import GraphVisualizer from "./components/GraphVisualizer"

function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="component-wrapper">
      
      <div className={`heading ${scrolled ? "scrolled" :""}`}>
      DSA VISUALIZER
      </div>
      <div className="components">
      <ArrayVisualiser/>
      <SortingVisualizer/>
      <SearchingVisualizer/>
      <StackVisualizer/>
      <QueueVisualizer/>
      <LinkedListVisualizer/>
      <RecursionTree/>
      <GraphVisualizer/>
      </div>
    </div>
  )
}

export default App
