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
          v-for="car in motor" 
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
              :to="`/cars/${getFilenameFromPath(car._path)}`" 
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
const motor = await queryCollection('cars').order('category', 'DESC').all()
console.log(motor, 'this is from content');
console.log(motor[0], 'first car data');
console.log('Sample car paths:', motor.slice(0, 3).map(c => ({ title: c.title, path: c._path })))

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

const getFilenameFromPath = (path) => {
  // Extract filename without extension from path like '/cars/bmw.md'
  if (!path) return '';
  return path.split('/').pop().replace('.md', '');
}
</script>

<style scoped>
/* Simple card hover effects */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
}

/* Responsive grid */
.grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Utility classes */
.bg-white {
  background-color: #fff;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.text-center {
  text-align: center;
}

.max-w-7xl {
  max-width: 80rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.mb-12 {
  margin-bottom: 3rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-5 {
  margin-bottom: 1.25rem;
}

.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}

.flex {
  display: flex;
}

.items-start {
  align-items: flex-start;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.flex-wrap {
  flex-wrap: wrap;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-8 {
  gap: 2rem;
}

.h-48 {
  height: 12rem;
}

.w-full {
  width: 100%;
}

.overflow-hidden {
  overflow: hidden;
}

.object-cover {
  object-fit: cover;
}

.p-6 {
  padding: 1.5rem;
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.text-gray-900 {
  color: #111827;
}

.text-gray-600 {
  color: #4b5563;
}

.text-gray-500 {
  color: #6b7280;
}

.text-green-600 {
  color: #16a34a;
}
</style>