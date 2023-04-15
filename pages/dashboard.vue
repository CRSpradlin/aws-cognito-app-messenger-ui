<script setup>

const user = useUser();
const dynamicAnimationClass = ref('animate-fade-in-down');

</script>

<template>
  <div class="text-stone-200 bg-gradient-to-r from-teal-600 to-blue-600 grid place-items-center w-screen h-screen">
    <div :class="dynamicAnimationClass" class="flex flex-col content-center bg-cyan-900 p-12 rounded-xl">
      <div class="flex flex-col">
        {{ user.value.profile }}
      </div>
    </div>
  </div>
</template>
