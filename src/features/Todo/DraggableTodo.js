import { Draggable } from 'react-beautiful-dnd';
import { TODO_STATUS } from 'features/Todo/TodoModel';
import TodoItem from './TodoItem';

const { DONE } = TODO_STATUS;

function DraggableTodo({ todo, index, ...props }) {
  const { id, status } = todo;

  const getItemStyle = (isDragging, draggableStyle) => {
    const styles = {
      // change background colour if dragging
      background: isDragging ? 'lightgreen' : 'transparent',
      // styles we need to apply on draggables
      ...draggableStyle,
    };

    if (isDragging) {
      styles.userSelect = 'none';
    }

    if (status === DONE) {
      styles.display = 'none';
    }

    return styles;
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TodoItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          todo={todo}
          {...props}
        />
      )}
    </Draggable>
  );
}

export default DraggableTodo;
