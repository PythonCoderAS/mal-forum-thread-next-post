import * as SimpleTSX from "simple-tsx";
import advancedOptionsStyles from "./advancedOptions.module.css";

export default function AdvancedOptions() {
  return (
    <div>
      <span class={advancedOptionsStyles.heading}>
        Advanced Debugging Options
      </span>
      <p>
        <strong>Do not use these unless you know what you're doing!</strong>
      </p>
      <button type="button" class="btn-topic-normal">
        Get List of All Supported Threads
      </button>
      <button type="button" class="btn-topic-normal">
        Get List of Duplicated Supported Threads
      </button>
      <button type="button" class="btn-topic-normal">
        Store Current List of Supported Threads
      </button>
      <button type="button" class="btn-topic-normal">
        Compare Current List of Supported Threads With Stored Threads
      </button>
    </div>
  );
}
