<template>
  <q-page class="flex flex-center">
    <q-form>
      <div class="text-header text-primary text-weight-bold text-center q-mb-md">
        Sentiment Analysis
      </div>

      <div>
        <q-input
          v-model="inputData"
          filled
          label="Note: Only Input english/taglish/filipino feedbacks/comments"
          lazy-rules
          type="textarea"
          :disable="loading"
          class="q-mb-md"
        />
      </div>

      <div class="row  q-col-gutter-md justify-center">
        <div
          class="col-auto"
        >
          <q-btn
            color="primary"
            label="Submit"
            type="submit"
            :disable="inputData !== '' && !dataCategory ? false : true"
            :loading="loading"
            @click="submit()"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { Notify } from 'quasar'
import { ref } from 'vue'
import axios from 'axios'

const inputData = ref('')
const dataCategory = ref('')
const loading = ref(false)

const outputData = ref({
  input: '',
  category: '',
})

async function submit() {
  loading.value = true
  try {
    const openAI = axios.create({
      baseURL: 'https://api.openai.com/v1',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const sentimentPrompt = `Analyze the sentiment of the following text: ${inputData.value}`
    const result = await openAI.post('/engines/davinci/completions', {
      prompt: sentimentPrompt,
      max_tokens: 60,
    })

    console.log('OpenAI Response:', result.data.choices[0].text)

    dataCategory.value = interpretResponse(result.data.choices[0].text)
    outputData.value = {
      input: inputData.value,
      category: dataCategory.value,
    }

    Notify.create(`Sentiment analysis result: ${dataCategory.value}`)
  } catch (error) {
    console.error('Error:', error)
    Notify.create({
      type: 'negative',
      message: 'An error occurred while analyzing sentiment.',
    })
  } finally {
    loading.value = false
  }
}

function interpretResponse(responseText: string): string {
  // Implement logic to categorize the response as 'positive', 'negative', or 'neutral'
  // This will depend on how the OpenAI model formats its sentiment analysis responses
  if (responseText.includes('positive')) return 'positive'
  if (responseText.includes('negative')) return 'negative'
  return 'neutral' // Default to neutral if not clearly positive or negative
}
</script>

<style lang="sass">
.q-form
  width: 50vw !important

</style>
