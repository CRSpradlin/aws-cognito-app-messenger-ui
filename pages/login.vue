<script setup>
definePageMeta({
    middleware: 'auth'
});

const user = useUser();

const loadingState = ref(false);
const errorState = ref(false);

const loggedInUser = ref(false || user.value !== undefined);

const username = ref('');
const password = ref('');

const errorMessage = ref('');
const dynamicAnimationClass = ref('animate-fade-in-down');

const showError = (message) => {
    errorMessage.value = message;
    errorState.value = true;
};

const clearError = () => {
    errorState.value = false;
    errorMessage.value = '';
};

const loginUser = async () => {
    clearError();
    loadingState.value = true;
    const { data, error } = await cognitoFetch('/user/login', {
        username: username.value,
        password: password.value
    });
    loadingState.value = false;

    if (error.value === null) {
        user.value = {
            ...user.value,
            token: data.value.AuthenticationResult.AccessToken,
            ...data.value.User
        };

        return navigateTo('/dashboard');
    } else if (error.value.data.info.code === 5504) {
        return navigateTo('/register?email=' + error.value.data.context.user.email + '&profile=' + error.value.data.context.user.profile);
    } else {
        showError(error.value.data.info.message);
    }
};
</script>

<template>
  <div class="text-stone-200 bg-gradient-to-r from-teal-600 to-blue-600 grid place-items-center w-screen h-screen">
    <div :class="dynamicAnimationClass" class="flex flex-col content-center bg-cyan-900 p-12 rounded-xl">
      <div class="flex flex-col">
        <span class="text-4xl p-2">Login</span>
        <div class="flex flex-col p-2">
          <label class="text-2xl" for="username">Username</label>
          <input v-model="username" class="text-stone-800 text-2xl rounded" name="username" type="text">
        </div>
        <div class="flex flex-col p-2">
          <label class="text-2xl" for="password">Password</label>
          <input v-model="password" class="text-stone-800 text-2xl rounded" name="password" type="password">
        </div>
        <div class="flex flex-col p-2">
          <div class="flex flex-col text-stone-100 text-2xl text-center p-3 bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600" @click="loginUser()">
            <img v-if="loadingState" class="h-8 w-8 m-auto" src="/assets/images/loading.gif">
            <span v-else>Log In</span>
          </div>
        </div>
      </div>
      <div v-if="errorState">
        <div :class="loggedInUser ? 'max-w-md' : 'max-w-xs'" class="flex flex-col">
          <div class="text-red-500 p-2 inline-flex">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
