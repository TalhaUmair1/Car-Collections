<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Simple header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-3">Car Collection</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">Discover our curated selection of premium vehicles</p>
      </div>
      
      <!-- Pagination (global per page) -->

      <!-- Results info -->
      <div class="mb-6 text-center">
        <p class="text-gray-600">
          Page {{ page }} of {{ Math.ceil(allCars.length / perPage) }} | 
          Showing {{ pagedCars.length }} cars
        </p>
      </div>
      
      <!-- Cards grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard 
          v-for="car in pagedCars" 
          :key="car._id"
          :ui="{ 
            base: 'hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
            ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
            divide: 'divide-y divide-gray-200 dark:divide-gray-800',
            background: 'bg-white dark:bg-gray-900'
          }"
          class="overflow-hidden"
        >
          <template #header>
            <!-- Image -->
            <div class="h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
              <img 
                v-if="car.meta?.image || car.image" 
                :src="car.meta?.image || car.image" 
                :alt="car.title" 
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                <UIcon name="i-heroicons-photo" class="w-12 h-12" />
              </div>
            </div>
          </template>
          
          <!-- Content -->
          <div class="p-5">
            <!-- Title and category -->
            <div class="flex justify-between items-start mb-3">
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ car.title }}</h2>
              <UBadge :color="getCategoryColor(car.category)" variant="subtle">
                {{ car.category }}
              </UBadge>
            </div>
            
            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">{{ car.description }}</p>
            
            <!-- Key info -->
            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Model:</span>
                <span class="text-gray-900 dark:text-white font-semibold">{{ car.meta?.model || car.model }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400 font-medium">Price:</span>
                <span class="text-green-600 dark:text-green-400 font-bold">{{ car.meta?.price || car.price }}</span>
              </div>
            </div>
            
            <!-- Specs -->
            <div class="mb-4">
              <div class="text-gray-500 dark:text-gray-400 font-medium text-sm mb-2">Key Features:</div>
              <div class="flex flex-wrap gap-1.5">
                <UBadge 
                  v-for="spec in car.specs?.slice(0, 3)" 
                  :key="spec" 
                  color="gray" 
                  variant="soft" 
                  size="xs"
                >
                  {{ spec }}
                </UBadge>
                <UBadge 
                  v-if="car.specs?.length > 3"
                  color="gray" 
                  variant="soft" 
                  size="xs"
                >
                  +{{ car.specs.length - 3 }} more
                </UBadge>
              </div>
            </div>
          </div>
          
          <template #footer>
            <!-- See More Link -->
            <UButton 
              :to="`/cars/${getSlugFromPath(car)}`"
              color="black"
              variant="solid"
              block
              size="sm"
            >
              View Details
            </UButton>
          </template>
        </UCard>
      </div>
      <!-- Pagination Controls -->
      <div class="flex justify-center mt-12">
        <UPagination 
          v-model:page="page"
          :total="allCars.length"
          :items-per-page="perPage"
          :max="7"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
const route = useRoute()
const perPage = 6

const { data: cars } = await useAsyncData('all-cars', () => {
  return queryCollection('cars').order('title', 'ASC').all()
})

const allCars = computed(() => cars.value ?? [])

// The `page` is a computed property with a getter and setter.
// This creates a two-way binding between the pagination component and the URL query.
const page = computed({
  // The getter reads the page number from the URL, defaulting to 1.
  get: () => Number(route.query.page) || 1,
  // The setter is called by v-model when the user interacts with the pagination.
  set: (newPage) => {
    // We use navigateTo to update the URL.
    navigateTo({
      query: {
        // To keep the URL clean, we remove the `page` query for the first page.
        page: newPage > 1 ? newPage : undefined,
      },
    })
  },
})

const pagedCars = computed(() => {
  const start = (page.value - 1) * perPage
  const end = start + perPage
  return allCars.value.slice(start, end)
})

// Correct page value if it's out of bounds after data loads or changes
watch(allCars, (newCars) => {
  if (!newCars) return;
  const maxPage = Math.ceil(newCars.length / perPage) || 1;
  if (page.value > maxPage) {
    // If the current page from the URL is out of bounds, navigate to the last valid page.
    navigateTo({ query: { page: maxPage }, replace: true });
  }
}, { immediate: true });

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
