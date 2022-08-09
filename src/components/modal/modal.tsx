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
        <span class="close">&times;</span>
        <div>{props.header}</div>
        {props.dividingLine ? <hr /> : null}
        <div>{props.children}</div>
      </div>
    </div>
  );
}
