<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Simple header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-3">Car Collection</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">Discover our curated selection of premium vehicles</p>
      </div>
      
      <!-- Cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="car in cars" 
          :key="car._id" 
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
        >
          <!-- Image -->
          <div class="h-48 overflow-hidden bg-gray-200">
            <img 
              v-if="car.meta?.image || car.image" 
              :src="car.meta?.image || car.image" 
              :alt="car.title" 
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <!-- Title and category -->
            <div class="flex justify-between items-start mb-3">
              <h2 class="text-xl font-bold text-gray-900">{{ car.title }}</h2>
              <UBadge :color="getCategoryColor(car.category)" variant="subtle">
                {{ car.category }}
              </UBadge>
            </div>
            
            <!-- Description -->
            <p class="text-gray-600 mb-4 text-sm">{{ car.description }}</p>
            
            <!-- Key info -->
            <div class="space-y-2 mb-5">
              <div class="flex justify-between">
                <span class="text-gray-500 font-medium">Model:</span>
                <span class="text-gray-900 font-semibold">{{ car.meta?.model || car.model }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500 font-medium">Price:</span>
                <span class="text-green-600 font-bold text-lg">{{ car.meta?.price || car.price }}</span>
              </div>
            </div>
            
            <!-- Specs -->
            <div class="mb-4">
              <div class="text-gray-500 font-medium mb-2">Key Features:</div>
              <div class="flex flex-wrap gap-2">
                <UBadge 
                  v-for="spec in car.specs" 
                  :key="spec" 
                  color="gray" 
                  variant="soft" 
                  size="xs"
                >
                  {{ spec }}
                </UBadge>
              </div>
            </div>
            
            <!-- See More Link -->
            <NuxtLink 
              :to="`/cars/${getSlugFromPath(car)}`" 
              class="block w-full py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white text-center rounded-lg transition-colors duration-300 font-medium"
            >
              View Details
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
const route = useRoute()
// Category filter via query parameter
const category = computed(() => route.query.category || '')

// Build a cars query that optionally filters by category
let carsQuery = queryCollection('cars')
if (category.value) {
  carsQuery = carsQuery.where({ category: category.value })
}
const { data: cars, refresh } = await useAsyncData(`cars-${category.value || 'all'}`, () => {
  return carsQuery.order('category', 'DESC').all()
})
watch(category, () => refresh())

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
