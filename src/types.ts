export type TopicIDReturn = Promise<string | null | undefined>;
/**
 * The handler for a topic ID.
 * @return A string for the next post, `null` if the next post could not be calculated,
 * and undefined if some event occurred that will call the function a second time.
 */
export type TopicIDHandler = (topicId: number) => TopicIDReturn;

export type PostMappingTopicData = {
  "0": number;
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
  "8": number;
  "9": number;
};
