export function getReplies(): number | null {
  const inputElement = document.getElementById(
    "totalReplies"
  ) as HTMLInputElement;
  return inputElement.value ? parseInt(inputElement.value, 10) : null;
}

/**
 * A factory function for handlers where the next post is derived from the post count.
 * @param calculator A function that will take the next post number and return a string.
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
