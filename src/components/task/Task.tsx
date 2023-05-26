import Checkbox from "@mui/material/Checkbox";
import { ReactElement, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ITask } from "../../types/task";
import { Field } from "../field/Field";
import style from "./task.module.scss";
import classNames from "classnames";

type Props = {
  task: ITask;
  editComplete: (id: string) => void;
  editText: (id: string, value: string) => void;
  deleteTask: (id: string) => void;
};

export const Task: React.FC<Props> = ({
  task,
  editComplete,
  editText,
  deleteTask,
}): ReactElement => {
  const [done, setDone] = useState(task.complete);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(task.text);

  const handlerDone = () => {
    if (!edit) {
      setDone((prevValue) => !prevValue);
      editComplete(task.id);
    }
  };

  const handlerEdit = () => {
    if (!done) {
      setEdit((prevValue) => !prevValue);
    }
  };

  const handlerSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handlerEditText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value) {
      setEdit((prevValue) => !prevValue);
      editText(task.id, value);
    }
  };

  return (
    <div className={style.task}>
      <Checkbox checked={done} onChange={handlerDone} color="success" />
      {!edit && (
        <span
          className={classNames(style.text, {
            [style["done"]]: done,
          })}
          onClick={handlerEdit}
        >
          {task.text}
        </span>
      )}
      {edit && !done && (
        <Field
          placeholder=""
          value={value}
          setValue={handlerSetValue}
          keyEvent={handlerEditText}
        />
      )}
      <button className={style.close} onClick={() => deleteTask(task.id)}>
        <CloseIcon />
      </button>
    </div>
  );
};
