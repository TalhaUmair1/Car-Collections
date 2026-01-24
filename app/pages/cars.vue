<script setup lang="ts">
const { data: content } = await useAsyncData(() => queryCollection('content').path('/cars').first())

useSeoMeta({
  title: content.value?.title,
  description: content.value?.description
})

// Sample car data for grid display
const cars = [
  {
    id: 1,
    title: 'Luxury Sedan',
    description: 'Experience the pinnacle of automotive sophistication with our luxury sedans.',
    image: '/placeholder-car.jpg',
    price: '$75,000',
    specs: ['AWD', 'Premium Sound', 'Leather Seats']
  },
  {
    id: 2,
    title: 'Sports Car',
    description: 'Unleash the power of our high-performance sports cars.',
    image: '/placeholder-car.jpg',
    price: '$85,000',
    specs: ['Turbo Engine', 'Carbon Fiber', 'Track Ready']
  },
  {
    id: 3,
    title: 'Electric Vehicle',
    description: 'Drive into the future with our eco-friendly electric vehicles.',
    image: '/placeholder-car.jpg',
    price: '$65,000',
    specs: ['Zero Emissions', 'Fast Charging', 'Long Range']
  },
  {
    id: 4,
    title: 'Classic Car',
    description: 'Discover automotive history with our classic car collection.',
    image: '/placeholder-car.jpg',
    price: '$95,000',
    specs: ['Restored', 'Original Parts', 'Award Winning']
  },
  {
    id: 5,
    title: 'SUV',
    description: 'Explore versatility with our spacious and capable SUVs.',
    image: '/placeholder-car.jpg',
    price: '$55,000',
    specs: ['All Terrain', '3rd Row Seating', 'Towing Capability']
  },
  {
    id: 6,
    title: 'Hybrid',
    description: 'Combine efficiency with performance in our hybrid vehicles.',
    image: '/placeholder-car.jpg',
    price: '$45,000',
    specs: ['Excellent MPG', 'Regenerative Braking', 'Eco Mode']
  }
]
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-10 text-center">
      <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ content?.title || 'Our Car Collection' }}</h1>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">{{ content?.description || 'Explore our diverse collection of premium vehicles' }}</p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard 
        v-for="car in cars" 
        :key="car.id"
        class="overflow-hidden"
      >
        <template #header>
          <div class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
            <span class="text-4xl">🚗</span>
          </div>
        </template>
        
        <h3 class="text-xl font-semibold">{{ car.title }}</h3>
        <p class="text-muted-foreground mt-2">{{ car.description }}</p>
        
        <div class="mt-4 pt-4 border-t">
          <div class="flex justify-between items-center">
            <span class="font-bold text-lg">{{ car.price }}</span>
            <UBadge variant="subtle" size="lg">New</UBadge>
          </div>
          
          <div class="mt-3 flex flex-wrap gap-2">
            <UBadge v-for="spec in car.specs" :key="spec" size="sm" variant="outline">{{ spec }}</UBadge>
          </div>
        </div>
        
        <template #footer>
          <div class="flex gap-3">
            <NuxtLink :to="`/car/${car.id}`">
              <UButton class="flex-1" variant="outline">View Details</UButton>
            </NuxtLink>
            <UButton class="flex-1" variant="solid" color="primary">Contact</UButton>
          </div>
        </template>
      </UCard>
    </div>
    
    <div v-if="!content" class="text-center py-8">
      <h2 class="text-xl font-bold">Cars page not found</h2>
    </div>
  </div>
</template>