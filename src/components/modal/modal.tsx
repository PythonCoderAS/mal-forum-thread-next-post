import * as SimpleTSX from "simple-tsx";
import modalStyles from "./modal.module.css";

export interface ModalProps {
  header: string | SimpleTSX.Element;
  children?: SimpleTSX.Element | SimpleTSX.Element[] | string | number;
  dividingLine?: boolean;
}

export default function Modal(props: ModalProps) {
  return (
    <div class={modalStyles.modal}>
      <div class={modalStyles.content}>
        <div style="display: flex; justify-content: space-between;">
          <div>{props.header}</div>
          <span class={modalStyles.close}>&times;</span>
        </div>
        {props.dividingLine ? <hr /> : null}
        <div>{props.children}</div>
      </div>
    </div>
  );
}
