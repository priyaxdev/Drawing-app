import { create } from 'zustand'
import { type Tool } from '../types/drawing';
import {type DrawingState } from '../types/drawing';

const useDrawingStore = create<DrawingState>((set) => ({
  tool: 'draw' as Tool,
  brushColor: '#ff6b35',
  brushSize: 5,

  setTool: (tool) => set({ tool }),
  setBrushColor: (color) => set({ brushColor: color }),
  setBrushSize: (size) => set({ brushSize: size }),

  history: [] as ImageData[],

pushHistory: (imageData: ImageData) =>
  set((state) => ({ history: [...state.history, imageData] })),

undo: () =>
  set((state) => ({ history: state.history.slice(0, -1) })),
}))

export default useDrawingStore;