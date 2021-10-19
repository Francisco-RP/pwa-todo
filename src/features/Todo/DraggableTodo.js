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
      styles.border = '1px solid lightgreen'
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
