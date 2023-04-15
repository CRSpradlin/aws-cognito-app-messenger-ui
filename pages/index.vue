<script setup>
definePageMeta({
    middleware: 'auth'
});

const dynamicAnimationClass = ref('animate-fade-in-down');
</script>

<template>
  <div class="text-stone-200 bg-gradient-to-r from-teal-600 to-blue-600 grid place-items-center w-screen h-screen">
    <div :class="dynamicAnimationClass" class="flex flex-col content-center bg-cyan-900 p-12 rounded-xl">
      <div class="flex flex-col">
        <span class="text-4xl p-2">Messenger Web App</span>
        <div class="flex flex-row">
          <NuxtLink to="/login" class="basis-1/2 m-2 text-stone-100 text-2xl text-center p-3 bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600">
            <span>Log In</span>
          </NuxtLink>
          <NuxtLink to="/register" class="basis-1/2 m-2 text-stone-100 text-2xl text-center p-3 bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600">
            <span>Register</span>
          </NuxtLink>
        </div>
        <!-- <div v-if="user">
          <span class="text-4xl p-2">{{ user.name }}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>
