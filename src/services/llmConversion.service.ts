import { RestaurantJSONCommandInterface } from "../interfaces/restaurant.interface";
import { LLM_CONVERSION_CONSTANTS } from "../constants/llmConversion.constants";
import openai from "../configs/openai.config";

export const llmConversion = async (
  message: string
): Promise<RestaurantJSONCommandInterface> => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: LLM_CONVERSION_CONSTANTS.SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
    model: "deepseek-chat",
    temperature: 0,
  });
  
  const content = completion.choices[0].message.content!;
  console.log("JSON DATA:", content);

  if(!content){
    throw new Error("No content received from LLM");
  }

  return JSON.parse(content);
};


