

function AnimatedBar({
  value,
  isComparing,
  isFound,
  isSorted
}) {

  let className = "bar";

  if (isFound) className += " found";
  else if (isComparing) className += " comparing";
  else if (isSorted) className += " sorted";

  return (

    <div className="bar-wrapper">

      <div
        className={className}
        style={{
          height: `${value * 10}px`
        }}
      >
      </div>

      <div className="bar-value">
        {value}
      </div>

    </div>

  );
}

export default AnimatedBar;