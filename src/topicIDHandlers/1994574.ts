import { TopicIDReturn } from "../types";
import { getLatestForumPost, goToLatestPage } from "../utils";

export default async function handle1994574(): TopicIDReturn {
  const changedPage = goToLatestPage();
  if (changedPage) {
    return undefined;
  }

  const post = getLatestForumPost();
  const author = post.author.getName();
  if (author.match(/\d+/)) {
    // We restart when numbers are in their name
    return "1";
  }

  const lastNum = post.getFirstNumber();
  if (lastNum === null) {
    console.log("No numbers found in the latest post.");
    return null;
  }

  return String(lastNum + 1);
}
