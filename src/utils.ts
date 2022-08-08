import * as toastify from "toastify-js";

import * as postMappings from "./postMappings.json";
import { PostMappingTopicData, TopicIDReturn } from "./types";

export function getReplies(): number | null {
  const inputElement = document.getElementById(
    "totalReplies"
  ) as HTMLInputElement;
  return inputElement.value ? parseInt(inputElement.value, 10) : null;
}

/**
 * A factory function for handlers where the next post is derived from the post count.
 * @param calculator A function that will take the next post number and return a string.
 * The next post number is basically the highest post # you will see on the thread.
 * If a thread has a post with #765 on the last page at the very botton,
 * `nextPostNum` will be 765.
 */
export function postCountFormula(
  calculator: (nextPostNum: number) => string
): () => TopicIDReturn {
  return async () => {
    const replies = getReplies();
    if (!replies) {
      console.log("Could not get the total replies from page HTML.");
      return null;
    }

    return calculator(replies + 1);
  };
}

export async function useMod10Data(topicId: number): TopicIDReturn {
  const replies = getReplies();
  if (!replies) {
    console.log("Could not get the total replies from page HTML.");
    return null;
  }

  const postMappingsTyped: { [id: string]: PostMappingTopicData } =
    postMappings;
  const lastDigit = String((replies + 1) % 10);
  const topicIdData: PostMappingTopicData | undefined =
    postMappingsTyped[String(topicId)];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Can't really have typescript know that something mod 10 to a string has 10 options.
  // @ts-ignore -- anything mod 10 to a string will always be in "1" - "9"
  return topicIdData === undefined ? null : topicIdData[lastDigit];
}

const pageRegex = /Pages \((\d+)\)/;

/**
 * Go to the latest page of the forum.
 * @return True if a navigation did occur, false otherwise.
 */
export function goToLatestPage(): boolean {
  const postReplyButton = document.querySelector(
    'a[href^="?action=message&topic_id="]'
  );
  if (!postReplyButton) {
    throw new Error("Could not find the post reply button.");
  }

  const parent = postReplyButton.parentElement as HTMLDivElement;
  const pagesData = parent.querySelector("div") as HTMLDivElement;
  const pagesString = pagesData.innerText || "";
  const pageRegexMatch = pagesString.match(pageRegex);
  if (pageRegexMatch) {
    const highestPage = parseInt(pageRegexMatch[1], 10);
    const urlParams = new URLSearchParams(document.location.search);
    const currentOffset = parseInt(urlParams.get("show") || "0", 10);
    if (currentOffset < (highestPage - 1) * 50) {
      toastify({
        text: "Calculating the post requires going to the latest page. Curently navigating to the last page.",
      }).showToast();
      urlParams.set("show", String((highestPage - 1) * 50));
      urlParams.set("_calculatePostIdRunOnPageLoad", "true");
      const url = new URL(document.location.href);
      url.search = urlParams.toString();
      url.hash = "quickReply";
      location.replace(url);
      return true;
    }
  }

  return false;
}

export class ForumPost {
  public containerNode: HTMLDivElement;

  constructor(containerNode: HTMLDivElement) {
    this.containerNode = containerNode;
  }

  getPostNumber(): number {
    const postNumberElement =
      this.containerNode.querySelector('a[name^="post"]');
    if (!postNumberElement) {
      throw new Error("Could not find the post number <a> element.");
    }

    // We won't get here if the querySelector fails, which checks for name.
    return parseInt(postNumberElement.getAttribute("name")!.substring(4), 10);
  }

  getMessageNumber(): number {
    const messageNumberElement =
      this.containerNode.querySelector('a[name^="msg"]');
    if (!messageNumberElement) {
      throw new Error("Could not find the message number <a> element.");
    }

    // We won't get here if the querySelector fails, which checks for name.
    return parseInt(
      messageNumberElement.getAttribute("name")!.substring(3),
      10
    );
  }

  getAuthor(): string {
    const authorElement = this.containerNode.querySelector(
      'a[href^="/profile"] > strong'
    ) as HTMLElement | null;
    if (!authorElement) {
      throw new Error("Could not find the author <strong> element.");
    }

    return authorElement.innerText || "Unknown Author";
  }

  getBodyNode(): HTMLDivElement {
    return this.containerNode.querySelector(
      'td.forum_boardrow1 div[id^="message"]'
    ) as HTMLDivElement;
  }

  getBodyText(): string {
    return this.getBodyNode().innerText || "";
  }

  getFirstNumber(): number | null {
    const match = this.getBodyText().match(/\d+/);
    return match === null ? null : parseInt(match[0], 10);
  }
}

export function getLatestForumPost(): ForumPost {
  const posts = document.querySelectorAll('div[id^="forumMsg"]');
  return new ForumPost(posts[posts.length - 1] as HTMLDivElement);
}

/**
 * A factory function for handlers where the next post is derived from the first number
 * in the latest post. Requires user to be on the last page.
 * @param calculator A function that will take the first number and return a string.
 */
export function firstNumberLatestPostFormula(
  calculator: (firstNumberFound: number) => string
): () => TopicIDReturn {
  return async function () {
    const changedPage = goToLatestPage();
    if (changedPage) {
      return undefined;
    }

    const post = getLatestForumPost();
    const num = post.getFirstNumber();
    if (num === null) {
      console.log("No numbers found in the latest post.");
      return null;
    }

    return calculator(num);
  };
}
