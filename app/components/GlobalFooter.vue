<template>
  <footer class="border-t py-8 mt-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Car World</h3>
          <p class="text-sm text-muted-foreground">
            Your premier destination for all things automotive. Discover the latest in car technology, reviews, and industry news.
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Navigation</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-sm text-muted-foreground hover:text-primary transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-sm text-muted-foreground hover:text-primary transition-colors">About</NuxtLink></li>
            <li><NuxtLink to="/cars" class="text-sm text-muted-foreground hover:text-primary transition-colors">Cars</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Collections</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/luxury" class="text-sm text-muted-foreground hover:text-primary transition-colors">Luxury Cars</NuxtLink></li>
            <li><NuxtLink to="/sports" class="text-sm text-muted-foreground hover:text-primary transition-colors">Sports Cars</NuxtLink></li>
            <li><NuxtLink to="/electric" class="text-sm text-muted-foreground hover:text-primary transition-colors">Electric Vehicles</NuxtLink></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Connect</h3>
          <div class="flex space-x-4">
            <UButton
              variant="ghost"
              icon="i-simple-icons-twitter"
              aria-label="Twitter"
              :ui="{ base: 'p-2' }"
            />
            <UButton
              variant="ghost"
              icon="i-simple-icons-facebook"
              aria-label="Facebook"
              :ui="{ base: 'p-2' }"
            />
            <UButton
              variant="ghost"
              icon="i-simple-icons-instagram"
              aria-label="Instagram"
              :ui="{ base: 'p-2' }"
            />
          </div>
        </div>
      </div>
      
      <div class="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {{ new Date().getFullYear() }} Car World. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Global footer component for the Car World application
</script>