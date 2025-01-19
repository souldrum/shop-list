<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-4 py-4">
    <div class="flex items-center gap-2">
      <h1>Добро пожаловать</h1>
      <button class="border rounded p-1">
        <RouterLink :to="{ name: 'list' }"> Перейти к списку </RouterLink>
      </button>
    </div>
  </div>
</template>
