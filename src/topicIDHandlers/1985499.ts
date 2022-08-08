import { TopicIDReturn } from "../types";
import { getLatestForumPost, goToLatestPage } from "../utils";

export default async function handle1985499(): TopicIDReturn {
  const changedPage = goToLatestPage();
  if (changedPage) {
    return undefined;
  }
  const post = getLatestForumPost();
  if (post.author.isActiveStaff()|| post.author.getName() === "Bored_Ronin"){
    return "1";
  } else {
    const lastNum = post.getFirstNumber();
    if (lastNum === null) {
      console.log("No numbers found in the latest post.");
      return null;
    }
    return String(lastNum + 1);
  }
}
