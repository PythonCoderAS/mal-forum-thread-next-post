import * as SimpleTSX from "simple-tsx";
import modalStyles from "./modal.module.css";

export interface ModalProps {
  header: string | SimpleTSX.Element;
  children?: SimpleTSX.Element | SimpleTSX.Element[] | string | number;
  dividingLine?: boolean;
}

export default function Modal(props: ModalProps) {
  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.content}>
        <span className="close">&times;</span>
        <div>{props.header}</div>
        {props.dividingLine ? <hr /> : null}
        <div>{props.children}</div>
      </div>
    </div>
  );
}
