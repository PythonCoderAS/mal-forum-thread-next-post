import * as postMappings from "./postMappings.json";
import { PostMappingTopicData } from "./types";

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
): () => Promise<string | null> {
  return async () => {
    const replies = getReplies();
    if (!replies) {
      console.log("Could not get the total replies from page HTML.");
      return null;
    }

    return calculator(replies + 1);
  };
}

export async function useMod10Data(topicId: number): Promise<string | null> {
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
