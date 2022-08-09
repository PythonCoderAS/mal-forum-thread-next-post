import * as SimpleTSX from "simple-tsx";
import { clickHandler as calculateNextPostClickHandler } from "../../calculateNextPost";
import { clickHandler as debugClickHandler } from "../../debug";

export default function Buttons() {
  return (
    <div>
      <button class="btn-topic-normal" onclick={calculateNextPostClickHandler}>
        Calculate Next Post
      </button>
      <button class="btn-topic-normal inverse" onclick={debugClickHandler}>
        Debug
      </button>
    </div>
  );
}
