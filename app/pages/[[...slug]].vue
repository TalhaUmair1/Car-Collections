<script setup lang="ts">
const route = useRoute()
const slug = computed(() => {
  if (Array.isArray(route.params.slug)) {
    return route.params.slug.join('/')
  }
  return route.params.slug || ''
})

const { data: content, error } = await useAsyncData(`content-${slug.value}`, async () => {
  try {
    const contentData = await queryCollection('content').path(`/${slug.value}`).first()
    return contentData
  } catch (err) {
    console.error(`Error fetching content for path: /${slug.value}`, err)
    return null
  }
})

if (!content.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
  title: content.value?.title || 'Page Not Found',
  description: content.value?.description || 'The requested page could not be found.'
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <UPageCard
      v-if="content"
      :title="content?.title"
      :description="content?.description"
      orientation="vertical"
    >
      <div class="prose max-w-none">
        <ContentRenderer :value="content" />
      </div>
      <template #footer>
        <div class="flex gap-4">
          <NuxtLink to="/">
            <UButton variant="outline" color="primary">
              Back to Home
            </UButton>
          </NuxtLink>
          <NuxtLink to="/about">
            <UButton variant="solid" color="primary">
              About
            </UButton>
          </NuxtLink>
        </div>
      </template>
    </UPageCard>
    
    <div v-else class="text-center py-8">
      <h2 class="text-xl font-bold">Page not found</h2>
      <p class="mt-2">The requested page could not be found.</p>
    </div>
  </div>
</template>