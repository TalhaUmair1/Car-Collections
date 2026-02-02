<script setup>
import { useRoute } from '#imports'

const route = useRoute()
const slugCat = (route.params.category ?? '').toString()

const toLabel = (s) => {
  if (!s) return ''
  const map = { luxury: 'Luxury', sports: 'Sports', electric: 'Electric' }
  const lower = s.toLowerCase()
  if (map[lower]) return map[lower]
  // Fallback: capitalize and replace - with space
  const cap = lower.charAt(0).toUpperCase() + lower.slice(1)
  return cap.replace(/-/g, ' ')
}

const categoryLabel = toLabel(slugCat)

const { data: cars } = await useAsyncData(`cars-${slugCat}-category`, () => {
  return queryCollection('cars').where({ category: categoryLabel }).order('title', 'ASC').all()
})

const getSlugFromPath = (car) => {
  const raw = car?._path ?? car?.id ?? ''
  if (!raw) return ''
  let p = raw
  p = p.replace(/\.md$/, '')
  while (p.startsWith('/')) p = p.slice(1)
  while (p.startsWith('cars/')) p = p.slice(5)
  return p
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <NuxtLink to="/cars" class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
        <span class="h-5 w-5 inline-block mr-1">⬅</span>
        Back to Cars
      </NuxtLink>

      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-900">{{ categoryLabel }} Cars</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="car in cars" :key="car._id" class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div class="h-48 overflow-hidden bg-gray-200">
            <img v-if="car.meta?.image || car.image" :src="car.meta?.image || car.image" :alt="car.title" class="w-full h-full object-cover" />
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-3">
              <h2 class="text-xl font-bold text-gray-900">{{ car.title }}</h2>
              <UBadge :color="getCategoryColor(car.category)" variant="solid" class="text-sm" v-if="car.category">{{ car.category }}</UBadge>
            </div>
            <p class="text-gray-600 mb-4 text-sm">{{ car.description }}</p>
            <div class="flex justify-between mb-4">
              <span class="text-gray-500 font-medium">Model:</span>
              <span class="text-gray-900 font-semibold">{{ car.model ?? car.meta?.model }}</span>
            </div>
            <div class="flex justify-between mb-4">
              <span class="text-gray-500 font-medium">Price:</span>
              <span class="text-green-600 font-bold">{{ car.price ?? car.meta?.price }}</span>
            </div>
            <NuxtLink :to="`/cars/${getSlugFromPath(car)}`" class="block w-full py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white text-center rounded-lg transition-colors">
              View Details
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// local color helper (reuse if needed)
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
