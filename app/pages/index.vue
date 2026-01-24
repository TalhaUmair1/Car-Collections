<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/home').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Hero Section -->
    <section class="py-12 md:py-20">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{{ home?.title || 'Welcome to Car Collections' }}</h1>
          <p class="text-lg text-gray-700 mb-8 max-w-lg">{{ home?.description || 'Discover our premium collection of luxury and sports cars' }}</p>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink to="/cars">
              <UButton variant="solid" color="primary" size="lg">
                Explore Cars
              </UButton>
            </NuxtLink>
            <NuxtLink to="/about">
              <UButton variant="outline" color="primary" size="lg">
                About Us
              </UButton>
            </NuxtLink>
          </div>
        </div>
        
        <div class="md:w-1/2 flex justify-center">
          <img 
            src="/audi.jpg" 
            alt="Audi Luxury Car" 
            class="rounded-xl shadow-2xl max-w-full h-auto border-4 border-white"
            width="600"
            height="400"
          >
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Premium Car Collection</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Explore our curated selection of luxury, sports, and electric vehicles from top manufacturers worldwide.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-4">🏎️</div>
            <h3 class="text-xl font-semibold mb-2">Sports Cars</h3>
            <p class="text-gray-600">High-performance vehicles designed for speed and agility</p>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-4">🚗</div>
            <h3 class="text-xl font-semibold mb-2">Luxury Sedans</h3>
            <p class="text-gray-600">Elegant and comfortable vehicles with premium features</p>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-4">⚡</div>
            <h3 class="text-xl font-semibold mb-2">Electric Vehicles</h3>
            <p class="text-gray-600">Environment-friendly cars with cutting-edge technology</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Content from home.md -->
    <section v-if="home && home.body" class="py-16 container mx-auto px-4">
      <div class="prose max-w-3xl mx-auto">
        <ContentRenderer :value="home" />
      </div>
    </section>
    
    <!-- Fallback content if home data not found -->
    <section v-else class="py-16 container mx-auto px-4">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Welcome to Our Car Collection</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">We offer a diverse range of premium vehicles from luxury sedans to high-performance sports cars. Browse our collection to find your dream car today.</p>
      </div>
    </section>
  </div>
</template>
