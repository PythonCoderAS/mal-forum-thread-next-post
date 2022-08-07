import * as toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import { TopicIDHandler } from "./types";
import handle1889851 from "./topicIDHandlers/1889851";

const topicIdMap: Map<number, TopicIDHandler> = new Map([
  [1889851, handle1889851],
]);

async function handleGenerateNextPost(): Promise<void> {
  const params = new URLSearchParams(document.location.search);
  const topicIdStr = params.get("topicid");
  if (topicIdStr === null) {
    toastify({
      text: "The thread topic ID was not found and the next post could not be calculated.",
    }).showToast();
    return;
  }

  const topicId = parseInt(topicIdStr, 10);
  const callback = topicIdMap.get(topicId);
  if (callback === undefined) {
    toastify({
      text: "There is no handler for the current topic ID.",
    }).showToast();
    return;
  }

  let nextPost: string | null;
  try {
    nextPost = await callback(topicId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    let errorMessage = "An error occurred while calculating the next post.";
    if (e.stack) {
      errorMessage += `\n${ e.stack}`;
    } else {
      errorMessage += `\n${ e}`;
    }

    toastify({
      text: errorMessage,
    }).showToast();
    return;
  }

  if (nextPost === null) {
    toastify({
      text: "The next post could not be calculated. Check the console for more information.",
    }).showToast();

  } else {
    const textareaElement = document.getElementById(
      "messageText"
    ) as HTMLTextAreaElement;
    textareaElement.value = nextPost;
  }
}

function main(): void {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn-topic-normal");
  button.addEventListener("click", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleGenerateNextPost().catch((e: any) => {
      let errorMessage =
        "An error occurred while trying to determine the callback for handing the next post.";
      if (e.stack) {
        errorMessage += `\n${ e.stack}`;
      } else {
        errorMessage += `\n${ e}`;
      }

      toastify({
        text: errorMessage,
      }).showToast();

    });
  });
  button.innerText = "Calculate Next Post";
  const cancelButton = document.getElementById(
    "clearQuickReply"
  ) as HTMLInputElement;
  const parentContainer = cancelButton.parentElement;
  if (parentContainer === null) {
    toastify({
      text: "The cancel button's parent container was not found.",
    }).showToast();
    return;
  }

  parentContainer.insertBefore(button, cancelButton);
}

main();
