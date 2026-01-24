<template>
  <header class="border-b">
    <div class="container flex items-center justify-between gap-4 px-4 py-3 mx-auto">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="flex items-center gap-2 text-xl font-bold">
          Car World
          <UIcon name="i-lucide-car" class="w-6 h-6" />
        </NuxtLink>
      </div>
      
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
        <NuxtLink to="/" class="transition-colors hover:text-primary">
          Home
        </NuxtLink>
        <NuxtLink to="/about" class="transition-colors hover:text-primary">
          About
        </NuxtLink>
       
      </nav>
      
      <div class="flex items-center gap-3">
        <UButton to="/cars" variant="solid" size="sm">
          Explore Cars
        </UButton>
        

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Header component for the Car World application
// Provides navigation and branding elements
</script>