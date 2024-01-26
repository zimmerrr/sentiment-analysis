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
        <div class="text-h6 text-center q-mb-md">
          <span :class="outputData.label === 'POSITIVE'? 'text-green' : 'text-red'">
            {{ outputData.label }}
          </span>
          {{ outputData.score }}
        </div>
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
import { ref } from 'vue'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

const inputData = ref('')
const dataCategory = ref('')
const loading = ref(false)

const outputData = ref({
  label: '',
  score: '',
})

async function submit() {
  try {
    loading.value = true
    const resp = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: inputData.value,
      }),
    }).then((res) => {
      return res.json()
    }).then((data) => {
      const _data = data[0]
      outputData.value.label = _data.label
      outputData.value.score = _data.score
    })
  } finally {
    loading.value = false
  }
}

// const body = await resp.json()

</script>

<style lang="sass">
.q-form
  width: 50vw !important

</style>
