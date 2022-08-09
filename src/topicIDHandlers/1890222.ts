import { TopicIDReturn } from "../types";
import { getForumPosts, goToLatestPage } from "../utils";

export default async function handle1890222(): TopicIDReturn {
  const changedPage = goToLatestPage();
  if (changedPage) {
    return undefined;
  }

  const posts = getForumPosts();
  const lastPost = posts[posts.length - 1];
  const secondLastPost = posts[posts.length - 2];
  const lastPostNum = lastPost.getFirstNumber() || -1;
  const secondLastPostNum = secondLastPost.getFirstNumber() || -1;
  if (lastPostNum === secondLastPostNum + 1 || lastPostNum === 1) {
    return String(lastPostNum + 1);
  }

  return "1";
}
