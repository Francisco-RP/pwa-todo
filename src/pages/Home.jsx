import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { selectTodos, reorder } from 'features/Todo/todoSlice';
import TodoItem from 'features/Todo/TodoItem';
import DraggableTodo from 'features/Todo/DraggableTodo';
import { TODO_STATUS } from 'features/Todo/TodoModel';
import { Container, Row, Col } from 'react-bootstrap';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TodoForm from 'components/TodoForm/TodoForm';
const { DONE } = TODO_STATUS;

function HomePage() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [showUndo, setShowUndo] = useState(false);

  const completed = todos.filter((todo) => todo.status === DONE);

  function onDelete() {
    setShowUndo(true);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    dispatch(
      reorder({
        id: result.draggableId,
        endIndex: result.destination.index,
      })
    );
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="home-list">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="list-unstyled"
                  >
                    {todos &&
                      todos.map((todo, index) => (
                        <DraggableTodo
                          key={todo.id}
                          todo={todo}
                          onDeleteItem={onDelete}
                          index={index}
                        />
                      ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>

            {showUndo && (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(ActionCreators.undo());
                    setShowUndo(false);
                  }}
                >
                  undo
                </button>
              </div>
            )}

            {completed.length > 0 && (
              <ul className="list-unstyled mt-4">
                {completed.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onDeleteItem={onDelete} />
                ))}
              </ul>
            )}
          </Col>
        </Row>
      </Container>
      <TodoForm />
    </>
  );
}

export default HomePage;
