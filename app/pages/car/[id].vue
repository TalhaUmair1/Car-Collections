<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

// Map IDs to car slugs
const carSlugs: Record<string, string> = {
  '1': 'luxury-sedan',
  '2': 'sports-car',
  '3': 'electric-vehicle'
};

const slug = carSlugs[id as keyof typeof carSlugs];

const { data: car, error } = await useAsyncData(`car-${id}`, async () => {
  if (!slug) return null;
  
  try {
    const carData = await queryCollection('cars').path(`/cars/${slug}`).first();
    return carData;
  } catch (err) {
    console.error(`Error fetching car data for slug: ${slug}`, err);
    return null;
  }
});

const notFound = computed(() => !car.value && !error.value);

useSeoMeta({
  title: car.value ? `${car.value.title} - Car Details` : 'Car Not Found',
  description: car.value ? car.value.description : 'The requested car could not be found'
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="notFound" class="text-center py-12">
      <h1 class="text-3xl font-bold mb-4">Car Not Found</h1>
      <p class="text-lg text-muted-foreground">The requested car listing could not be found.</p>
      <UButton to="/cars" variant="solid" color="primary" class="mt-6">
        Browse All Cars
      </UButton>
    </div>
    
    <div v-else class="max-w-4xl mx-auto">
      <UPageCard
        :title="car?.title"
        :description="car?.description"
        orientation="vertical"
      >
        <div class="space-y-6">
          <div class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
            <span class="text-8xl">🚗</span>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-muted rounded-lg p-4 text-center">
              <p class="text-sm text-muted-foreground">Price</p>
              <p class="text-xl font-bold">{{ car?.price }}</p>
            </div>
            
            <div class="bg-muted rounded-lg p-4 text-center">
              <p class="text-sm text-muted-foreground">Category</p>
              <p class="text-xl font-bold">{{ car?.category }}</p>
            </div>
          </div>
          
          <div>
            <h2 class="text-xl font-semibold mb-2">Overview</h2>
            <ContentRenderer v-if="car" :value="car" />
          </div>
          
          <div>
            <h2 class="text-xl font-semibold mb-2">Specifications</h2>
            <div class="flex flex-wrap gap-2">
              <UBadge v-for="spec in car?.specs" :key="spec" variant="outline">{{ spec }}</UBadge>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div class="flex flex-col sm:flex-row gap-3">
            <UButton class="flex-1" variant="outline" color="primary">
              Schedule Test Drive
            </UButton>
            <UButton class="flex-1" variant="solid" color="primary">
              Contact Sales
            </UButton>
          </div>
        </template>
      </UPageCard>
    </div>
  </div>
</template>