<script setup lang="ts">
import AppButton from "@/ui/Button/AppButton.vue";
</script>

<template>
  <div class="flex flex-col gap-4 py-4">
    <div class="flex items-center gap-2">
      <h1>Добро пожаловать</h1>
      <AppButton style-type="elevated">
        <RouterLink :to="{ name: 'list' }"> Перейти к списку </RouterLink>
      </AppButton>
    </div>
  </div>
</template>
