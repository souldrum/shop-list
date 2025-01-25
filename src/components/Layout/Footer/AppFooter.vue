<script setup lang="ts">
import { ref } from "vue";

const year = ref(new Date().getFullYear());
</script>

<template>
  <footer
    class="flex justify-center bg-primary-fixed-dim text-primary px-4 py-1"
  >
    <div class="container flex justify-center gap-2">
      <span>Copyright © {{ year }}</span>
      <span>Souldrum</span>
    </div>
  </footer>
</template>
