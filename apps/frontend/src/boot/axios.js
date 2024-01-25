import axios from 'axios'

const openAI = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
})

openAI.post('/engines/davinci/completions', {
  prompt: "Translate the following English text to French: 'Hello, world!'",
  max_tokens: 60,
})
  .then(response => {
    console.log(response.data.choices[0].text)
  })
  .catch(error => {
    console.error('Error:', error)
  })
