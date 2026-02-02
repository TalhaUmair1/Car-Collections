<script setup>
const route = useRoute()
const slug = route.params.slug

const { data: post } = await useAsyncData(`car-${slug}`, () => {
  return queryCollection('cars').path(`/cars/${slug}`).first()
})

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
<!-- Hero image -->
        <div v-if="post?.meta?.image || post?.image" class="h-64 md:h-96 overflow-hidden bg-gray-200">
          <img 
            :src="post?.meta?.image || post?.image" 
            :alt="post?.title" 
            class="w-full h-full object-cover"
          />
        </div>
        
        <div class="p-8">
          <!-- Title and category -->
          <div class="mb-6">
            <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900">{{ post?.title }}</h1>
              <UBadge v-if="post?.category" :color="getCategoryColor(post.category)" variant="solid" class="text-sm">
                {{ post?.category }}
              </UBadge>
            </div>
            
<div class="flex flex-wrap gap-6 text-gray-600">
              <div>
                <span class="font-medium text-gray-500">Model:</span>
                <span class="ml-2 font-semibold">{{ post?.meta?.model || post?.model }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-500">Price:</span>
                <span class="ml-2 font-bold text-green-600">{{ post?.meta?.price || post?.price }}</span>
              </div>
            </div>
          </div>
          
          <!-- Description -->
          <p class="text-gray-700 text-lg mb-8 leading-relaxed">{{ post?.description }}</p>
          
          <!-- Specs -->
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Key Specifications</h2>
            <div class="flex flex-wrap gap-2">
              <UBadge 
                v-for="spec in post?.specs" 
                :key="spec" 
                color="gray" 
                variant="solid" 
                size="sm"
              >
                {{ spec }}
              </UBadge>
            </div>
          </div>
          
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
