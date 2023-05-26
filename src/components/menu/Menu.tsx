import classNames from "classnames";
import { ReactElement } from "react";
import { FilterType } from "../../enums/typeFilters";
import { ITask } from "../../types/task";
import style from "./menu.module.scss";

type Props = {
  count: number;
  setTypeFilter: (type: FilterType | null) => void;
  deleteAllComplete: () => void;
  type: FilterType | null;
  listTask: ITask[];
};

export const Menu: React.FC<Props> = ({
  count,
  setTypeFilter,
  deleteAllComplete,
  type,
  listTask,
}): ReactElement => {
  return (
    <div className={style.menu}>
      <span className={style.count}>{`${count} items left`}</span>
      <div>
        <button
          onClick={() => setTypeFilter(null)}
          className={classNames(style.filter, {
            [style["active"]]: type === null,
          })}
        >
          All
        </button>
        <button
          disabled={!listTask.filter((task: ITask) => !task.complete).length}
          onClick={() => setTypeFilter(FilterType.active)}
          className={classNames(style.filter, {
            [style["active"]]: type === "Active",
            [style["disable"]]: !listTask.filter(
              (task: ITask) => !task.complete
            ).length,
          })}
        >
          Active
        </button>
        <button
          disabled={!listTask.filter((task: ITask) => task.complete).length}
          onClick={() => setTypeFilter(FilterType.complete)}
          className={classNames(style.filter, {
            [style["active"]]: type === "Complete",
            [style["disable"]]: !listTask.filter((task: ITask) => task.complete)
              .length,
          })}
        >
          Completed
        </button>
      </div>
      <button className={style.clear} onClick={deleteAllComplete}>
        Clear Complete
      </button>
    </div>
  );
};
