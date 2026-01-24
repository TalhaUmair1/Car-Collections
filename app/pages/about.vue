

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- About Hero Section -->
    <section class="">
      <div class="flex justify-center py-8">
              <img 
                src="/mercedes.jpg" 
                alt="Mercedes-Benz Luxury Car" 
                class="rounded-xl shadow-2xl max-w-full h-auto border-4 border-white"
                width="900"
                height="400"
              >
             
            </div>
            <div class=" text-center text-lg text-gray-700">
              <ContentRenderer v-if="about" :value="about" />
              <div v-else class="space-y-4">
                <p>Welcome to our premium car collection platform. We specialize in showcasing the finest luxury and performance vehicles from around the world.</p>
                <p>Our mission is to connect car enthusiasts with the most exceptional automotive experiences, featuring detailed information about each vehicle's history, specifications, and unique characteristics.</p>
                <p>With years of experience in the automotive industry, we curate only the most remarkable vehicles for our discerning clientele.</p>
              </div>
            </div>
            <div class="flex justify-center py-8">
              <img 
                src="/bmw.jpg" 
                alt="Mercedes-Benz Luxury Car" 
                class="rounded-xl shadow-2xl max-w-full h-auto border-4 border-white"
                width="900"
                height="400"
              >
             
            </div>
    </section>
                <div class="mt-8 flex flex-wrap gap-4 py-8">
              <NuxtLink to="/">
                <UButton variant="outline" color="primary" size="lg">
                  Back to Home
                </UButton>
              </NuxtLink>
              <NuxtLink to="/cars">
                <UButton variant="solid" color="primary" size="lg">
                  View Cars
                </UButton>
              </NuxtLink>
            </div>

     
    <!-- Company Values Section -->
    <UContainer>
      <!-- Header -->
      <div class="text-center mb-12 ">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Our Values
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          We are committed to excellence in everything we do
        </p>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 py-9 gap-8">
        <UCard
          v-for="(item, index) in values"
          :key="index"
          class="text-center bg-gray-50 hover:shadow-lg transition-shadow rounded-xl"
        >
          <div class="text-4xl mb-4">
            {{ item.icon }}
          </div>

          <h3 class="text-xl font-semibold mb-2">
            {{ item.title }}
          </h3>

          <p class="text-gray-600">
            {{ item.description }}
          </p>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { data: about } = await useAsyncData(() => queryCollection('content').path('/about').first())

useSeoMeta({
  title: about.value?.title,
  description: about.value?.description
})
const values = [
  {
    icon: '🏆',
    title: 'Quality',
    description:
      'We only feature the highest quality vehicles that meet our strict standards'
  },
  {
    icon: '🤝',
    title: 'Integrity',
    description:
      'Transparency and honesty in all our interactions with clients'
  },
  {
    icon: '🚗',
    title: 'Passion',
    description:
      'Our love for automobiles drives us to deliver exceptional service'
  }
]
</script>

