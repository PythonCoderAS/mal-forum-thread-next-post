export function getReplies(): number | null {
  const inputElement = document.getElementById('totalReplies') as HTMLInputElement;
  return inputElement.value ? parseInt(inputElement.value, 10) : null;
}
