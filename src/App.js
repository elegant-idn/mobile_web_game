import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const startDrawing = (event) => {
      setDrawing(true);
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      ctx.beginPath();
      ctx.moveTo(x, y);
      setLastX(x);
      setLastY(y);
    };

    const draw = (event) => {
      if (drawing) {
        const bounds = canvas.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        ctx.lineTo(x, y);
        ctx.stroke();

        const lineLength = Math.sqrt(
          Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2)
        );
        if (lineLength >= 300) {
          setShowSubmit(true);
        }

        setLastX(x);
        setLastY(y);
      }
    };

    const endDrawing = () => {
      setDrawing(false);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDrawing);

    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", endDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", endDrawing);

      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", endDrawing);
    };
  }, [drawing, lastX, lastY]);

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Submit button clicked");
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
      />
      {showSubmit && <button onClick={handleSubmit}>Submit</button>}
    </div>
  );
};

export default App;
