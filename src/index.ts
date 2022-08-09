import * as toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { Element } from "simple-tsx";

import Buttons from "./components/buttons/buttons";
import { clickHandler } from "./calculateNextPost";

function main(): void {
  /*  Const button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn-topic-normal");
    button.addEventListener("click", clickHandler);
    button.innerText = "Calculate Next Post"; */
  // const button = <button>Calculate Next Post</button>;
  const buttons: Element = Buttons();
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

  parentContainer.insertBefore(buttons.element, cancelButton);
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
