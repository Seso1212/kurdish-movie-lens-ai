
/**
 * Service for interacting with the Deepseek AI via OpenRouter API
 */

export interface DeepseekResponse {
  title: string;
  description: string;
  searchTerms: string[];
}

/**
 * Processes a user's movie description through Deepseek AI and returns structured data
 * @param userQuery The user's natural language description of a movie
 * @returns Structured data with movie title, description and search terms
 */
export async function processMovieDescription(userQuery: string): Promise<DeepseekResponse> {
  try {
    console.log(`Sending query to Deepseek: "${userQuery}"`);
    
    const prompt = `
You are a movie specialist AI. Based on this description: "${userQuery}", 
identify the most likely movie being described. Output JSON ONLY with three fields:
1. "title": The most likely movie title
2. "description": A brief analysis of why this is the likely match 
3. "searchTerms": An array of 3-5 keywords that would help find this movie in a database

Format your response as valid JSON only, without any other text.
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-prover-v2:free",
        "messages": [
          {"role": "user", "content": prompt}
        ]
      })
    });

    const result = await response.json();
    console.log("Deepseek response:", result);

    if (!result.choices || !result.choices[0]?.message?.content) {
      throw new Error("Invalid response from Deepseek API");
    }

    const content = result.choices[0].message.content.trim();
    // Try to parse the JSON response from the AI
    try {
      // Handle cases where the AI might wrap the JSON in code blocks
      const jsonStr = content.replace(/```json|```/g, '').trim();
      const parsedResponse = JSON.parse(jsonStr);
      
      return {
        title: parsedResponse.title || "Unknown",
        description: parsedResponse.description || "",
        searchTerms: Array.isArray(parsedResponse.searchTerms) ? parsedResponse.searchTerms : []
      };
    } catch (parseError) {
      console.error("Failed to parse JSON from AI response:", parseError);
      // Fallback to returning the raw content as title
      return {
        title: content.substring(0, 50),
        description: "Could not extract structured data from AI response.",
        searchTerms: []
      };
    }
  } catch (error) {
    console.error("Error calling Deepseek API:", error);
    throw new Error(`Failed to process movie description: ${error}`);
  }
}
