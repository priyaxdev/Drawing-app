import useDrawingStore from "../store/useDrawingStore";

interface prop {
  onClear: () => void;
  onUndo: () => void;
  onDownload:()=>void;
}

const Toolbar = ({ onClear, onUndo,onDownload }: prop) => {
  const { brushColor, brushSize, tool, setBrushColor, setBrushSize, setTool } =
    useDrawingStore((state) => state);

  const colors = [
    "#ff6b35",
    "#f87171",
    "#fbbf24",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#f1f5f9",
    "#1a1a1a",
  ];
  return (
    <div className="w-[280px] min-h-screen bg-surface border-r border-border p-4 flex flex-col gap-6">
      {/* Logo / Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <h1 className="text-text font-medium text-base">Drawing app</h1>
      </div>
      <p className="text-muted text-xs uppercase tracking-widest">Colors</p>
      {/* Color picker */}
      <div className="grid grid-cols-4 gap-2 m-2">
        {colors.map((color) => (
          <button
            key={color}
            style={{ background: color }}
            onClick={() => setBrushColor(color)}
            className={`w-7 h-7 rounded-full cursor-pointer ${
              brushColor === color
                ? "ring-2 ring-white ring-offset-1 ring-offset-black"
                : ""
            }`}
          />
        ))}
        {/* Custom color picker */}
        <input
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
        />
      </div>
      {/* Brush size slider */}
      <p className="text-muted text-xs uppercase tracking-widest">Brush size</p>
      <input
        type="range"
        min={1}
        max={50}
        value={brushSize}
        onChange={(e) => setBrushSize(Number(e.target.value))}
      />
      {/* Draw / Erase toggle */}
      <p className="text-muted text-xs uppercase tracking-widest">Tool</p>
      <button
        onClick={() => setTool("draw")}
        className={
          tool === "draw"
            ? "bg-primary text-white border-2 rounded-lg hover:cursor-pointer"
            : "bg-card border border-border text-muted hover:cursor-pointer border-2 rounded-lg"
        }
      >
        Draw
      </button>
      <button
        onClick={() => setTool("erase")}
        className={
          tool === "erase"
            ? "bg-primary text-white border-2 rounded-lg hover:cursor-pointer"
            : "bg-card border border-border text-muted hover:cursor-pointer border-2 rounded-lg"
        }
      >
        Erase
      </button>
      {/* Undo button */}
      <button
        onClick={onUndo}
        className="bg-card border border-border text-muted border-2 rounded-lg hover:border-text hover:text-text hover:cursor-pointer"
      >
        Undo
      </button>

      {/* Clear button — abhi sirf log */}
      <button
        onClick={onClear}
        className="bg-card border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:cursor-pointer rounded-lg"
      >
        Clear
      </button>
      <button onClick={onDownload} className="bg-card border border-primary/30 text-primary hover:bg-primary/10 cursor-pointer rounded-lg">Save PNG</button>
    </div>
  );
};

export default Toolbar;
