import { useRef } from "react";

const downloadCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  if (!canvas) return;

  const link = document.createElement("a"); 
  link.download = "my-drawing.png"; 
  link.href = canvas.toDataURL(); 
  link.click(); 
};

export default downloadCanvas;
