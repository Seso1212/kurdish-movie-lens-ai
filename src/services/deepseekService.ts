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

    const response = await fetch("https://llm.chutes.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer cpk_fa5c80c6a2ad4a78be9a7bb929847794.8c4e737f030455d285cdb91bed574c07.iHJmkNZ35PU5h3htiPEjnKOYJPTLnPwJ",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-V3-0324",
        messages: [
          { role: "user", content: prompt }
        ],
        stream: false,
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    const result = await response.json();
    console.log("Chutes.ai response:", result);

    if (!result.choices || !result.choices[0]?.message?.content) {
      throw new Error("Invalid response from Chutes.ai API");
    }

    const content = result.choices[0].message.content.trim();

    try {
      const jsonStr = content.replace(/```json|```/g, '').trim();
      const parsedResponse = JSON.parse(jsonStr);

      return {
        title: parsedResponse.title || "Unknown",
        description: parsedResponse.description || "",
        searchTerms: Array.isArray(parsedResponse.searchTerms) ? parsedResponse.searchTerms : []
      };
    } catch (parseError) {
      console.error("Failed to parse JSON from AI response:", parseError);
      return {
        title: content.substring(0, 50),
        description: "Could not extract structured data from AI response.",
        searchTerms: []
      };
    }
  } catch (error) {
    console.error("Error calling Chutes.ai API:", error);
    throw new Error(`Failed to process movie description: ${error}`);
  }
}
