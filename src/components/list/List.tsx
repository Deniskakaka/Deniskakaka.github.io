import React, { ReactElement } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { ITask } from "../../types/task";
import { Task } from "../task/Task";
import style from "./list.module.scss";

type Props = {
  tasks: ITask[];
  editComplete: (id: string) => void;
  editText: (id: string, value: string) => void;
  deleteTask: (id: string) => void;
  changeOrder: (tasks: ITask[]) => void;
};

export const List: React.FC<Props> = ({
  tasks,
  editComplete,
  editText,
  deleteTask,
  changeOrder,
}): ReactElement => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    const updatedTasks = Array.from(tasks);
    const [removed] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, removed);

    changeOrder(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <ul
            className={style.list}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task: ITask, index: number) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task
                      task={task}
                      editComplete={editComplete}
                      editText={editText}
                      deleteTask={deleteTask}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
