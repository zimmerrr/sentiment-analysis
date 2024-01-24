<template>
  <q-page class="flex flex-center">
    <q-form>
      <div class="text-header text-primary text-weight-bold text-center q-mb-md">
        Sentiment Analysis Data Feeder
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
          v-for="(category, index) in categoryOptions"
          :key="index"
          class="col-auto"
        >
          <q-btn
            :color="category === 'positive' ? 'positive' : category === 'negative' ? 'negative' : 'primary'"
            :label="category"
            type="submit"
            :disable="inputData !== '' && !dataCategory ? false : true"
            :loading="loading"
            @click="submit(category)"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { Notify } from 'quasar'
import { ref } from 'vue'

const inputData = ref('')
const categoryOptions = ref(['positive', 'neutral', 'negative'])
const dataCategory = ref('')
const loading = ref(false)

const outputData = ref({
  input: '',
  category: '',
})
async function submit(category: string) {
  try {
    loading.value = true
    // input to database
  } finally {
    // add temporary loading
    setTimeout(() => {
      Notify.create({
        message: `Successfully added to ${category} category`,
        color: 'positive',
        icon: 'check',
      })
      loading.value = false
      outputData.value = {
        input: inputData.value,
        category,
      }
      console.log(outputData.value)
      resetForm()
    }, 500)
  }
}

function resetForm() {
  inputData.value = ''
  dataCategory.value = ''

  outputData.value = {
    input: '',
    category: '',
  }
}
</script>

<style lang="sass">
.q-form
  width: 50vw !important

</style>
