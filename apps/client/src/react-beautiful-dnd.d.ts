// Type override for react-beautiful-dnd to fix React 18 compatibility
import 'react-beautiful-dnd';

declare module 'react-beautiful-dnd' {
  export interface DraggableProps {
    children(
      provided: DraggableProvided,
      snapshot: DraggableStateSnapshot,
      rubric: DraggableRubric
    ): React.ReactNode;
  }

  export interface DroppableProps {
    children(
      provided: DroppableProvided,
      snapshot: DroppableStateSnapshot
    ): React.ReactNode;
  }
}
