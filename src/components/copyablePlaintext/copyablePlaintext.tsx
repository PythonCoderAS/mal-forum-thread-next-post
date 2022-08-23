import * as SimpleTSX from "simple-tsx";

import Modal from "../modal/modal";
import copyablePlaintextStyles from "./copyablePlaintext.module.css";

function copyText(this: HTMLButtonElement) {
  const textToCopy = this.parentElement!.querySelector("textarea")!.value;
  navigator.clipboard.writeText(textToCopy);
}

export interface CopyablePlaintextProps {
  title?: string;
  text: string;
}

export function CopyablePlaintext(props: CopyablePlaintextProps) {
  const heading = props.title ?? "Text";
  const body = (
    <div>
      <textarea
        rows="10"
        value={props.text}
        class={copyablePlaintextStyles.textarea}
      >
        {props.text}
      </textarea>
      <button type="button" class="btn-topic-normal" onclick={copyText}>
        Copy Text
      </button>
    </div>
  );
  return <Modal header={heading} body={body} />;
}
