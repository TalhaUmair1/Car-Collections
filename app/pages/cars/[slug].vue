<script setup>
const route = useRoute()
const slug = route.params.slug

const { data: post } = await useAsyncData(`car-${slug}`, () =>
  queryCollection('cars').path(`/cars/${slug}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Car not found' })
}

const title = computed(() => post.value?.title || '')
const description = computed(() => post.value?.description || '')

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const getCategoryColor = (category) => {
  const colors = {
    'Luxury': 'amber',
    'Performance': 'red',
    'Eco-Friendly': 'emerald',
    'Reliability': 'blue',
    'Electric': 'purple'
  }
  return colors[category] || 'gray'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <NuxtLink to="/cars" class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Cars
      </NuxtLink>
      
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">

        
        <div class="p-8">
         
          
          <!-- Content Body -->
          <div class="prose prose-lg max-w-none">
            <ContentRenderer :value="post">
              <template #empty>
                <p>No content found.</p>
              </template>
            </ContentRenderer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
