import * as SimpleTSX from "simple-tsx";
import advancedOptionsStyles from "./advancedOptions.module.css";
import { data as threadData, topicIdMap } from "../../calculateNextPost";
import { CopyablePlaintext } from "../copyablePlaintext/copyablePlaintext";
import { mountModal } from "../../utils";

function getSupportedThreads() {
  const template = prompt(
    "Enter template for formatting each line ({threadid} is the placeholder that is substituted): ",
    "https://myanimelist.net/forum/?topicid={threadid}"
  );
  if (!template) {
    return;
  }
  const text = [...topicIdMap.keys()]
    .sort()
    .map((threadid) => template.replace("{threadid}", String(threadid)))
    .join("\n");
  const modal = <CopyablePlaintext text={text} title="Supported Threads" />;
  mountModal(modal);
}

function getDuplicatedThreads() {
  const seen: Map<number, number[]> = new Map();
  threadData.forEach(([threadid], index) => {
    if (!seen.has(threadid)) {
      seen.set(threadid, []);
    }
    seen.get(threadid)!.push(index);
  });
  const duplicatedThreads = [...seen.entries()].filter(
    ([_, indices]) => indices.length > 1
  );
  const text = duplicatedThreads
    .map(
      ([threadid, indices]) =>
        `Thread at https://myanimelist.net/forum/?topicid=${threadid} has entires on 'data' indices ${indices.join(
          ", "
        )}.`
    )
    .join("\n");
  const modal = <CopyablePlaintext text={text} title="Duplicated Threads" />;
  mountModal(modal);
}

export default function AdvancedOptions() {
  return (
    <div>
      <span class={advancedOptionsStyles.heading}>
        Advanced Debugging Options
      </span>
      <p>
        <strong>Do not use these unless you know what you're doing!</strong>
      </p>
      <button
        type="button"
        class="btn-topic-normal"
        onclick={getSupportedThreads}
      >
        Get List of All Supported Threads
      </button>
      <button
        type="button"
        class="btn-topic-normal"
        onclick={getDuplicatedThreads}
      >
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
