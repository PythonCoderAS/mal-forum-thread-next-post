import * as toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import { TopicIDHandler } from "./types";
import {
  firstNumberLatestPostFormula,
  postCountFormula,
  useMod10Data,
} from "./utils";

const topicIdMap: Map<number, TopicIDHandler> = new Map([
  [1889851, postCountFormula((replies) => String((replies % 10) + 1))],
  [1979992, postCountFormula((replies) => String((replies + 1) * 7))],
  [1978072, postCountFormula((replies) => String((replies + 1) * 9))],
  // I have *no* idea why the 917 constant is needed. There seems to be a gap of ~917 posts.
  // Since the gap is so large, instead of trying to find where it went wrong, it will be easier
  // to add a constant and continue the chain.
  [1916230, postCountFormula((replies) => String((replies + 1 + 917) * 2))],
  [1821719, postCountFormula((replies) => String(replies + 1 + 542))],
  [1719728, postCountFormula((replies) => String(replies))],
  [1457565, postCountFormula((replies) => String(replies + 1 + 6))],
  // For these two I have no idea how I came up with the formula. However, as a general rule of thumb, for threads
  // that restart once a certain number is reached, you need to use the modulo operator and then a ternary operator
  // to deal with the 0 case.
  [1209529, useMod10Data],
  [113300, useMod10Data],
  [199746, useMod10Data],
  [1959517, postCountFormula((replies) => String(replies + 2))],
  [1892107, postCountFormula((replies) => String(replies + 1 + 20000))],
  [1879712, postCountFormula((replies) => String(100001 - replies - 1))],
  [1377703, postCountFormula((replies) => String(replies + 1 + 700))],
  [1538912, postCountFormula((replies) => String(9907 - replies - 1))],
  [1931026, postCountFormula((replies) => String(replies + 1 + 16))],
  [1824920, postCountFormula((replies) => String(replies + 1 + 597613))],
  [1989661, firstNumberLatestPostFormula((replies) => String(replies + 1))],
  [1166563, postCountFormula((replies) => String(replies + 1 + 10002))],
  [1797078, postCountFormula((replies) => String(replies + 1 - 16 ))],
  // Technically replies + 1 - 1, but they cancel out
  [1797078, postCountFormula((replies) => String(replies))],

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

  toastify({
    text: "Starting calculation of the next post.",
  }).showToast();
  let nextPost: string | null | undefined;
  try {
    nextPost = await callback(topicId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    let errorMessage = "An error occurred while calculating the next post.";
    if (e.stack) {
      errorMessage += `\n${e.stack}`;
    } else {
      errorMessage += `\n${e}`;
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
  } else if (nextPost === undefined) {
    // A page load or some other event is occurring that will call this function again.
    return;
  } else {
    const textareaElement = document.getElementById(
      "messageText"
    ) as HTMLTextAreaElement;
    textareaElement.value = nextPost;
  }

  toastify({
    text: "Next post has been calculated.",
  }).showToast();
}

function clickHandler() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return handleGenerateNextPost().catch((e: any) => {
    let errorMessage =
      "An error occurred while trying to determine the callback for handing the next post.";
    if (e.stack) {
      errorMessage += `\n${e.stack}`;
    } else {
      errorMessage += `\n${e}`;
    }

    toastify({
      text: errorMessage,
    }).showToast();
  });
}

function main(): void {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn-topic-normal");
  button.addEventListener("click", clickHandler);
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
  const urlParams = new URLSearchParams(document.location.search);
  if (urlParams.has("_calculatePostIdRunOnPageLoad")) {
    const title = document.querySelector("title")!.text;
    const url = new URL(document.location.href);
    const { searchParams } = url;
    searchParams.delete("_calculatePostIdRunOnPageLoad");
    url.search = searchParams.toString();
    history.replaceState(null, title, url.href);
    clickHandler().then(() => {
      const quickReplyDiv =
        document.querySelector<HTMLDivElement>("div#quickReply")!;
      const quickReplyButton =
        document.querySelector<HTMLLinkElement>("a#showQuickReply")!;
      quickReplyButton.click();
      quickReplyDiv.scrollIntoView();
    });
  }
}

main();
