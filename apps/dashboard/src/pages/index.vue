<template>
  <q-page class="flex flex-center">
    <q-form>
      <div class="text-h3 text-bold text-center q-mb-md">
        Sentiment Analysis Data Feeder
      </div>

      <div>
        <q-input
          v-model="data"
          filled
          label="Note: Only Input english/taglish/filipino feedbacks/comments"
          lazy-rules
          type="textarea"
          :rules="[val => !!val || 'Input is required']"
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
            :disable="true"
            @click="() => console.log(data)"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref('')
const categoryOptions = ref(['positive', 'negative', 'neutral'])
const dataCategory = ref('')
</script>

<style lang="sass">
.q-form
  width: 50vw !important
</style>
