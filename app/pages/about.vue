<script setup lang="ts">
const { data: about } = await useAsyncData(() => queryCollection('content').path('/about').first())

useSeoMeta({
  title: about.value?.title,
  description: about.value?.description
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <UPageCard
      :title="about?.title || 'About'"
      :description="about?.description || 'No description provided'"
      orientation="vertical"
    >
      <div class="prose max-w-none">
        <ContentRenderer v-if="about" :value="about" />
      </div>
      <template #footer>
        <div class="flex gap-4">
          <NuxtLink to="/">
            <UButton variant="outline" color="primary">
              Back to Home
            </UButton>
          </NuxtLink>
          <NuxtLink to="/cars">
            <UButton variant="solid" color="primary">
              View Cars
            </UButton>
          </NuxtLink>
        </div>
      </template>
    </UPageCard>
    
    <div v-if="!about" class="text-center py-8">
      <h2 class="text-xl font-bold">About page not found</h2>
    </div>
  </div>
</template>