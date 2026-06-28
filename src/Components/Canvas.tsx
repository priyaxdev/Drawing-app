import { useRef } from "react";
import useDrawingStore from "../store/useDrawingStore";

const Canvas = ({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement> }) => {
  const isDrawing = useRef<boolean>(false);
  const lastX = useRef<number>(0);
  const lastY = useRef<number>(0);

  const { brushColor, brushSize, tool, pushHistory} = useDrawingStore(
    (state) => state,
  );

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    lastX.current = e.nativeEvent.offsetX;
    lastY.current = e.nativeEvent.offsetY;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (tool === "erase") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.strokeStyle = brushColor;
      ctx.globalCompositeOperation = "source-over";
    }

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const currentX = e.nativeEvent.offsetX;
    const currentY = e.nativeEvent.offsetY;
    ctx.beginPath();
    ctx.moveTo(lastX.current, lastY.current);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    lastX.current = currentX;
    lastY.current = currentY;
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    pushHistory(imageData);
  };
  
  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth - 280} 
      height={window.innerHeight}
      className="block" 
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
};

export default Canvas;
