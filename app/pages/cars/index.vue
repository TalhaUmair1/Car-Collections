<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Car Collection</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard 
        v-for="car in motor" 
        :key="car._id" 
        class="overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div class="p-6">

          <div class="mb-4">
            <img 
              v-if="car.meta.image" 
              :src="car.meta.image" 
              :alt="car.title" 
              class="w-full h-48 object-cover rounded-lg"
            />
          </div>
                    <h2 class="text-xl font-bold mb-2 text-gray-800">{{ car.title }}</h2>
          <div class="space-y-2 mb-4">
            <p class="text-gray-600"><span class="font-semibold">Description:</span> {{ car.description }}</p>
            <p class="text-gray-600"><span class="font-semibold">Price:</span> {{ car.price }}</p>
            <p class="text-gray-600"><span class="font-semibold">Category:</span> 
              <UBadge :color="getCategoryColor(car.category)" variant="soft">{{ car.category }}</UBadge>
            </p>
            <p class="text-gray-600"><span class="font-semibold">Model:</span> {{ car.meta.model }}</p>
            <div class="text-gray-600">
              <span class="font-semibold">Specs:</span>
              <div class="flex flex-wrap gap-1 mt-1">
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
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
const motor = await queryCollection('cars').order('category', 'DESC').all()
console.log(motor, 'this is from content');
console.log(motor[0], 'first car data');

const getCategoryColor = (category) => {
  const colors = {
    'Luxury': 'amber',
    'Performance': 'red',
    'Eco-Friendly': 'green',
    'Reliability': 'blue',
    'Electric': 'purple'
  }
  return colors[category] || 'gray'
}
</script>

<style lang="scss" scoped>

</style>