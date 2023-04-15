<script setup>

const user = useUser();
const dynamicAnimationClass = ref('animate-fade-in-down');

const logout = () => {
    clearUser();
    navigateTo('/');
};

</script>

<template>
  <div class="text-stone-200 bg-gradient-to-r from-teal-600 to-blue-600 grid place-items-center w-screen h-screen">
    <div :class="dynamicAnimationClass" class="flex flex-col content-center bg-cyan-900 p-12 rounded-xl">
      <div class="flex flex-col">
        {{ user.profile }}
      </div>
      <div class="flex flex-col text-stone-100 text-2xl text-center p-3 bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600" @click="logout()">
        <span>Log Out</span>
      </div>
    </div>
  </div>
</template>
