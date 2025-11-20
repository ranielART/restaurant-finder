import { RestaurantJSONCommandInterface } from "../interfaces/restaurant.interface.js";
import { LLM_CONVERSION_CONSTANTS } from "../constants/llmConversion.constants.js";
import openai from "../configs/openai.config.js";
import { InternalServerError } from "../utils/customErrors.js";

export const llmConversion = async (
  message: string
): Promise<RestaurantJSONCommandInterface> => {

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: LLM_CONVERSION_CONSTANTS.SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
    model: "gemini-2.5-flash",
    temperature: 0,
    reasoning_effort: "low",
    top_p: 1,
    max_tokens: 1024,
    response_format: { type: "json_object" },
  });

  let content = completion.choices[0].message.content!;
  console.log("JSON DATA:", content);

  if (!content) {
    throw new InternalServerError("No content received from LLM");
  }

  return JSON.parse(content);
};
