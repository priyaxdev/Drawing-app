import Toolbar from "./Components/Toolbar";
import Canvas from "./Components/Canvas";
import { useRef } from "react";
import useDrawingStore from "./store/useDrawingStore";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { history, undo } = useDrawingStore((state) => state);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const undoCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const prevState = history[history.length - 2];

    if (prevState) {
      ctx.putImageData(prevState, 0, 0);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    undo();
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "my-drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  };
  return (
    <div className="flex min-h-screen bg-bg">
      <div className="w-[280px] min-h-screen bg-surface border-r border-border">
        <Toolbar
          onClear={clearCanvas}
          onUndo={undoCanvas}
          onDownload={downloadCanvas}
        />
      </div>
      <div className="flex-1 min-h-screen">
        <Canvas canvasRef={canvasRef} />
      </div>
    </div>
  );
}

export default App;
