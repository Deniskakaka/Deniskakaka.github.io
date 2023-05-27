import { ReactElement, useEffect, useState } from "react";
import style from "./app.module.scss";
import { Creator } from "./components/creator/Creator";
import { Filter } from "./components/filter/Filter";
import { List } from "./components/list/List";
import { Menu } from "./components/menu/Menu";
import { FilterType } from "./enums/typeFilters";
import useWindowSize from "./hooks/UseWindowSize";
import { ITask } from "./types/task";

function App(): ReactElement {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [typeFilter, setTypeFilter] = useState<FilterType | null>(null);
  const [update, setUpdate] = useState(false);
  const windowsSize = useWindowSize();

  const saveLocalTasks = (data: ITask[]) => {
    localStorage.setItem("tasks", JSON.stringify(data));
  };

  const changeOrder = (newTasksOrder: ITask[]) => {
    const updatedTasks = [...newTasksOrder];

    for (const task of tasks) {
      const existingTaskIndex = updatedTasks.findIndex(
        (newTask) => newTask.id === task.id
      );

      if (existingTaskIndex === -1) {
        updatedTasks.push(task);
      }
    }

    setTasks(updatedTasks);
    saveLocalTasks(updatedTasks);
  };

  const addTask = (task: ITask) => {
    setTasks((prevValue) => [...prevValue, task]);
    setUpdate(true);
  };

  const editTaskComplete = (id: string) => {
    setTasks((prevValue) => [
      ...prevValue.map((task: ITask) => {
        if (task.id === id) {
          task.complete = !task.complete;
        }

        return task;
      }),
    ]);
    setUpdate(true);
  };

  const editTextTask = (id: string, value: string) => {
    setTasks((prevValue) => [
      ...prevValue.map((task: ITask) => {
        if (task.id === id) {
          task.text = value;
        }

        return task;
      }),
    ]);
    setUpdate(true);
  };

  const deleteTask = (id: string) => {
    setTasks((prevValue) => [
      ...prevValue.filter((task: ITask) => task.id !== id),
    ]);
    setUpdate(true);
  };

  const deleteAllComplete = () => {
    setTasks((prevValue) => [
      ...prevValue.filter((task: ITask) => !task.complete),
    ]);
    setUpdate(true);
  };

  const filterTasks = (type?: FilterType | null) => {
    if (type === "Active") {
      return tasks.filter((task: ITask) => !task.complete);
    }
    if (type === "Complete") {
      return tasks.filter((task: ITask) => task.complete);
    }

    return tasks;
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (!storedTasks) {
      saveLocalTasks([]);
    } else {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    const typeFilter = localStorage.getItem("filterType");

    if (typeFilter) {
      setTypeFilter(JSON.parse(typeFilter));
    }
  }, []);

  useEffect(() => {
    if (update) {
      saveLocalTasks(tasks);
      setUpdate(false);
    }
  }, [tasks, update]);

  return (
    <div className={style.wrapper}>
      <div className={style.mask}></div>
      <h1 className={style.title}>Todo</h1>
      <div className={style.todo}>
        <Creator addTask={addTask} />
        <List
          tasks={filterTasks(typeFilter)}
          editComplete={editTaskComplete}
          editText={editTextTask}
          deleteTask={deleteTask}
          changeOrder={changeOrder}
        />
        <Menu
          count={filterTasks(typeFilter).length}
          setTypeFilter={setTypeFilter}
          deleteAllComplete={deleteAllComplete}
          type={typeFilter}
          listTask={tasks}
        />
        {windowsSize.width < 600 && (
          <div className={style.supplementary_menu}>
            <Filter
              setTypeFilter={setTypeFilter}
              type={typeFilter}
              listTask={tasks}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
