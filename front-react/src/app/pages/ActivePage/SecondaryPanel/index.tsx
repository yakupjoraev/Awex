import { PropsWithChildren } from "react";

export type SecondaryPanelProps = PropsWithChildren<{
  title: string;
  onNavBack: () => void;
}>;

export function SecondaryPanel(props: SecondaryPanelProps) {
  return (
    <div className="actives-action">
      <div className="actives-action__inner">
        <button className="actives-check__back" onClick={props.onNavBack}>
          <img
            className="actives-check__back-pic"
            src="/img/icons/arrow-left.svg"
            alt="arrow to back"
          />
          Вернуться
        </button>
        <h2 className="actives-action__title">{props.title}</h2>
        {props.children}
      </div>
    </div>
  );
}
