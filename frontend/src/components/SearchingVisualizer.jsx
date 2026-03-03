/* eslint-disable no-unused-vars */
import { useState } from "react";

function SearchingVisualizer(){
    const orignalarray = [4,8,1,11,6,3,9,2,5];
    const [array,setarray] = useState(orignalarray);
    const [activeindex,setactiveindex] = useState(-1);
    const [foundindex,setfoundindex] = useState(-1);
    const [issearching,setissearching] = useState(false);
    const [target,settarget] = useState("");
    const [complex,setcomplex] = useState("");
    const [selectedAlgo, setSelectedAlgo] = useState("");

    const delay =(ms) => new Promise(resolve=>setTimeout(resolve,ms));


    const resetvisual = () => {
        setactiveindex(-1);
        setfoundindex(-1);}


    const reset = () => {
        setarray(orignalarray);
        resetvisual();
        setissearching(false);
        setcomplex("");
        settarget("");
        setSelectedAlgo("");}



    const linearsearch = async () => {
        if(issearching) return;

        if(target===""){
            alert("Enter target value");
            return;
        }

        resetvisual();
        setissearching(true);
        setSelectedAlgo("LINEAR SEARCH");
        setcomplex(
            "Linear Search Time Complexity:\n" +
            "Best Case: O(1)\n" +
            "Average Case: O(n)\n" +
            "Worst Case: O(n)"
        );

        const tar = Number(target);
        
        for (let i = 0; i < array.length; i++) {
            setactiveindex(i);
            await delay(700);

            if(array[i] === tar){
                setfoundindex(i);
                setactiveindex(-1);
                setissearching(false);
                return;}}
        setactiveindex(-1);
        setissearching(false)
        alert("element not found");}



    const binarysearch = async() =>{
        if(issearching) return;
        if(target===""){
            alert("Enter target value");
            return;}

        resetvisual();
        setissearching(true);
        setSelectedAlgo("BINARY SEARCH");
        setcomplex(
            "Binary Search Time Complexity:\n" +
            "Best Case: O(1)\n" +
            "Average Case: O(log n)\n" +
            "Worst Case: O(log n)"
        );

        const tar = Number(target);
        const sorted = [...array].sort((a,b)=>a-b);

        setarray(sorted);
        await delay(500);

        let low = 0;
        let high = sorted.length-1;
        while(low<=high){
            const mid = Math.floor((low+high)/2);
            setactiveindex(mid);
            await delay(800);

            if (sorted[mid] === tar) {
                setfoundindex(mid);
                setactiveindex(-1);
                setissearching(false);
                return;}
            
                if (tar>sorted[mid]) {
                    low = mid+1;
                    
                }else{
                    high = mid-1;}}
        setactiveindex(-1);
        setissearching(false);
        alert("element not found");
    };

    return(
        <div className="container">
            <h1>SEARCHING VISUALIZER</h1>
                {complex && (
                    <div className="complexity-box">
                        <h3>{selectedAlgo}</h3>
                        <h3>Time Complexity</h3>
                        <pre>{complex}</pre>
                    </div>)}


            <div className="array-container">
                {array.map((value,index) => (
                    <div key={index} className={`node
                        ${index === activeindex?"active":""}
                        ${index === foundindex?"found":""}
                        `}>
                        {value}
                    </div>
                ))}
            </div>
            <div className="button-group">
                <button onClick={linearsearch} className="algo-button">linear search</button>
                <button onClick={binarysearch} className="algo-button">binary search</button>
                <button
                    onClick={reset}
                    className="algo-button">
                    Reset Array
                </button>

                <input
                    type="number"
                    placeholder="Enter target"
                    value={target}
                    onChange={(e)=>settarget(e.target.value)}
                    className="algo-button"
                />
            </div>
        </div>
    );
};

export default SearchingVisualizer;