import { Draggable } from 'react-beautiful-dnd';
import { TODO_STATUS } from 'features/Todo/TodoModel';
import TodoItem from './TodoItem';

const { DONE } = TODO_STATUS;

function DraggableTodo({ todo, index, ...props }) {
  const { id, status } = todo;

  const getItemStyle = (isDragging, draggableStyle) => {
    const styles = {
      ...draggableStyle,
    };

    if (isDragging) {
      styles.userSelect = 'none';
    }

    if (status === DONE) {
      styles.display = 'none';
    }

    // restrict dragging to only vertical by overriding the transform that powers the dragging
    if (styles.transform) {
      const re = /translate\(([^)]+)\)/i;
      const [, xY] = styles.transform.match(re);
      const [,y] = xY.split(', ').map(val => parseFloat(val, 10));
      styles.transform = `translate(0px, ${y}px)`;
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
