import Checkbox from "@mui/material/Checkbox";
import { v4 as uuidv4 } from "uuid";
import { ReactElement, useState } from "react";
import { ITask } from "../../types/task";
import style from "./creator.module.scss";
import { Field } from "../field/Field";

type Props = {
  addTask: (task: ITask) => void;
};

export const Creator: React.FC<Props> = ({ addTask }): ReactElement => {
  const [done, setDone] = useState(false);
  const [value, setValue] = useState("");

  const handlerDone = () => {
    setDone((prevValue) => !prevValue);
  };

  const handlerSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handlerAddTask = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value) {
      addTask({ text: value, id: uuidv4(), complete: done });
      setValue("");
      setDone(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <Checkbox checked={done} onChange={handlerDone} color="success" />
      <Field
        placeholder="Add new Task"
        value={value}
        setValue={handlerSetValue}
        keyEvent={handlerAddTask}
      />
    </div>
  );
};
