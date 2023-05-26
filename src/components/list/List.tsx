import React, { ReactElement } from "react";
import { ITask } from "../../types/task";
import { Task } from "../task/Task";
import style from "./list.module.scss";

type Props = {
  tasks: ITask[];
  editComplete: (id: string) => void;
  editText: (id: string, value: string) => void;
  deleteTask: (id: string) => void;
};

export const List: React.FC<Props> = ({
  tasks,
  editComplete,
  editText,
  deleteTask,
}): ReactElement => {
  return (
    <ul className={style.list}>
      {tasks.map((task: ITask) => (
        <li key={task.id}>
          <Task
            task={task}
            editComplete={editComplete}
            editText={editText}
            deleteTask={deleteTask}
          />
        </li>
      ))}
    </ul>
  );
};
