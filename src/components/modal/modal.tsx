import * as SimpleTSX from "simple-tsx";
import modalStyles from "./modal.module.css";

export interface ModalProps {
  header: string | SimpleTSX.Element;
  body: SimpleTSX.Element | SimpleTSX.Element[] | string | number;
  dividingLine?: boolean;
}

export default function Modal(props: ModalProps) {
  return (
    <div class={modalStyles.modal}>
      <div class={modalStyles.content}>
        <div style="display: flex; justify-content: space-between;">
          <span>{typeof props.header === "string" ? <h1>props.header</h1> : props.header}</span>
          <span class={modalStyles.close}>&times;</span>
        </div>
        {props.dividingLine ? <hr /> : null}
        <div>{props.body}</div>
      </div>
    </div>
  );
}
