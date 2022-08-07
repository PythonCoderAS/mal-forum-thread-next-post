import { getReplies } from "../utils";

export default function handle1889851(): string | null {
  const replies = getReplies();
  if (!replies) {
    return null;
  }

  // How this is calculated: The last digit of the post # is the number to be posted. For example, post #555 will contain the string 5.
  // However, if the last digit is zero, we want the string 10.
  // Total replies: 775 -> Latest post is #776 -> Next entry is "7"
  // Total replies: 778 -> Latest post is #779 -> Next entry is "10"
  return String(((replies + 1) % 10) + 1);
}
