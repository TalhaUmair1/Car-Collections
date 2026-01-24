<script setup lang="ts">
useSeoMeta({
  title: 'Our Car Collection',
  description: 'Browse our collection of premium vehicles from top manufacturers'
})

const carBrands = [
  {
    id: 'audi',
    name: 'Audi',
    description: 'German luxury vehicles known for Quattro all-wheel drive and advanced technology.',
    path: '/cars/audi'
  },
  {
    id: 'tesla',
    name: 'Tesla',
    description: 'Innovative electric vehicles with cutting-edge autonomous driving features.',
    path: '/cars/tesla'
  },
  {
    id: 'bmw',
    name: 'BMW',
    description: 'Bavarian engineering excellence with a focus on performance and luxury.',
    path: '/cars/bmw'
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    description: 'Premium luxury vehicles with a reputation for safety and comfort.',
    path: '/cars/mercedes'
  },
  {
    id: 'porsche',
    name: 'Porsche',
    description: 'High-performance sports cars with iconic design and racing heritage.',
    path: '/cars/porsche'
  },
  {
    id: 'toyota',
    name: 'Toyota',
    description: 'Reliable and efficient vehicles with excellent build quality.',
    path: '/cars/toyota'
  }
]
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4">Our Car Collection</h1>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
        Discover premium vehicles from leading manufacturers around the world. 
        Each brand offers unique features and technologies designed to enhance your driving experience.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <UPageCard
        v-for="brand in carBrands"
        :key="brand.id"
        :title="brand.name"
        :description="brand.description"
        orientation="horizontal"
        class="h-full"
      >
        <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex items-center justify-center w-32 h-32">
          <span class="text-5xl font-bold text-gray-400">{{ brand.name.charAt(0) }}</span>
        </div>
        
        <template #footer>
          <NuxtLink :to="brand.path">
            <UButton variant="solid" color="primary">
              Learn More
            </UButton>
          </NuxtLink>
        </template>
      </UPageCard>
    </div>
  </div>
</template>