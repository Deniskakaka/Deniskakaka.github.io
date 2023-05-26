import style from "./field.module.scss";

type Props = {
  placeholder: string;
  value: string;
  setValue?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  keyEvent?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const Field: React.FC<Props> = ({
  placeholder,
  value,
  setValue,
  keyEvent,
}) => {
  return (
    <input
      value={value}
      onChange={setValue}
      onKeyDown={keyEvent}
      placeholder={placeholder}
      className={style.creator}
    />
  );
};
