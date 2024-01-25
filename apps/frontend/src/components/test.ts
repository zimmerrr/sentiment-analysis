import axios from 'axios'

const openAIEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions'

const getOpenAIResponse = async (prompt) => {
  const headers = {
    'Authorization': `Bearer ${process.env.OPENAI_API}`,
    'Content-Type': 'application/json',
  }

  const data = {
    prompt: prompt,
    max_tokens: 100,
  }

  try {
    const response = await axios.post(openAIEndpoint, data, { headers })
    return response.data.choices[0].text
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    return null
  }
}

export default {
  getOpenAIResponse,
}
