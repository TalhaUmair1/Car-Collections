<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/home').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <UPageCard
      :title="home?.title || 'Home'"
      :description="home?.description || 'No description provided'"
      orientation="vertical"
    >
      <div class="prose max-w-none">
        <ContentRenderer v-if="home" :value="home" />
      </div>
      <template #footer>
        <div class="flex gap-4">
          <NuxtLink to="/about">
            <UButton variant="outline" color="primary">
              About Us
            </UButton>
          </NuxtLink>
          <NuxtLink to="/cars">
            <UButton variant="solid" color="primary">
              Learn More
            </UButton>
          </NuxtLink>
        </div>
      </template>
    </UPageCard>
    
    <div v-if="!home" class="text-center py-8">
      <h2 class="text-xl font-bold">Home not found</h2>
    </div>
  </div>
</template>
