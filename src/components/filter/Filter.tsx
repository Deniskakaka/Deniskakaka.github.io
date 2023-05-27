import classNames from "classnames";
import { FilterType } from "../../enums/typeFilters";
import { ITask } from "../../types/task";
import style from "./filter.module.scss";

type Props = {
  setTypeFilter: (type: FilterType | null) => void;
  type: FilterType | null;
  listTask: ITask[];
};

export const Filter: React.FC<Props> = ({ setTypeFilter, type, listTask }) => {
  const saveTypeFilter = (type: FilterType | null) => {
    setTypeFilter(type);
    localStorage.setItem("filterType", JSON.stringify(type));
  };

  return (
    <div>
      <button
        onClick={() => saveTypeFilter(null)}
        className={classNames(style.filter, {
          [style["active"]]: type === null,
        })}
      >
        All
      </button>
      <button
        disabled={!listTask.filter((task: ITask) => !task.complete).length}
        onClick={() => saveTypeFilter(FilterType.active)}
        className={classNames(style.filter, {
          [style["active"]]: type === "Active",
          [style["disable"]]: !listTask.filter((task: ITask) => !task.complete)
            .length,
        })}
      >
        Active
      </button>
      <button
        disabled={!listTask.filter((task: ITask) => task.complete).length}
        onClick={() => saveTypeFilter(FilterType.complete)}
        className={classNames(style.filter, {
          [style["active"]]: type === "Complete",
          [style["disable"]]: !listTask.filter((task: ITask) => task.complete)
            .length,
        })}
      >
        Completed
      </button>
    </div>
  );
};
