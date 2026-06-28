export type Tool = 'draw' | 'erase'

export interface DrawingState {
  // State
  tool: Tool
  brushColor: string
  brushSize: number
  history: ImageData[]

  // Actions
  setTool: (tool: Tool) => void
  setBrushColor: (color: string) => void
  setBrushSize: (size: number) => void
  pushHistory: (imageData: ImageData) => void
  undo: () => void
}