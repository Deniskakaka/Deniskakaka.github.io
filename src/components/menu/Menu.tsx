import { ReactElement } from "react";
import { FilterType } from "../../enums/typeFilters";
import useWindowSize from "../../hooks/UseWindowSize";
import { ITask } from "../../types/task";
import { Filter } from "../filter/Filter";
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
  const windowSize = useWindowSize();

  return (
    <div className={style.menu}>
      <span className={style.count}>{`${count} items left`}</span>
      {windowSize.width > 600 && (
        <Filter setTypeFilter={setTypeFilter} type={type} listTask={listTask} />
      )}
      <button className={style.clear} onClick={deleteAllComplete}>
        Clear Complete
      </button>
    </div>
  );
};
