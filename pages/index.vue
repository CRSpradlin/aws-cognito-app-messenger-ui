<script setup>
const user = useUser();

const loadingState = ref(false);
const registeredUser = ref(false);
const confirmedUser = ref(false);
const email = ref("");
const username = ref("");
const password = ref("");
const confirmation = ref("");
const dynamicAnimationClass = ref("animate-fade-in-down");

const confirmUser = async () => {
    loadingState.value = true;
    const dataValue = await cognitoFetch('/user/confirm', {
        username: username.value,
        confirmation: confirmation.value
    });
    loadingState.value = false;

    confirmedUser.value = true;
    user.value.confirmed = true;
}

const registerUser = async () => {
    dynamicAnimationClass.value = "";
    loadingState.value = true;
    const dataValue = await cognitoFetch('/user/register', {
        username: username.value,
        email: email.value,
        password: password.value
    });
    loadingState.value = false;

    user.value = {
        ...user.value,
        name: username.value,
        profile: dataValue['UserSub'],
        confirmed: dataValue['UserConfirmed']
    };

    registeredUser.value = true;
    dynamicAnimationClass.value = "animate-fade-in-down";
}
</script>


<template>
    <div class="text-stone-200 bg-gradient-to-r from-teal-600 to-blue-600 grid place-items-center w-screen h-screen">
        <div v-bind:class="dynamicAnimationClass" class="flex flex-col content-center bg-cyan-900 p-12 rounded-xl">
            <div v-if="confirmedUser" class="flex flex-col text-center">
                <span class="text-4xl p-2">User Confirmed</span>
                <span>{{user}}</span>
            </div>
            <div v-else>
                <div v-if="registeredUser">
                    <div class="flex flex-col">
                        <span class="text-4xl pr-2 pl-2 pt-2">Confirm</span>
                        <span class="text-xl pr-2 pl-2">A confirmation code was sent to: {{email}}</span>
                        <span class="text-xl pr-2 pl-2 pb-2">Please enter the code below and click confirm</span>
                        <div class="flex flex-col p-2">
                            <label class="text-2xl" for="confirmation">Confirmation Code</label>
                            <input class="text-stone-800 text-2xl rounded" v-model="confirmation"  name="confirmation" type="text" />
                        </div>
                        <div class="flex flex-col p-2">
                            <div @click="confirmUser()" class="flex flex-col text-stone-100 text-2xl text-center p-3 bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600">
                                <img v-if="loadingState" class="h-8 w-8 m-auto" src="/assets/images/loading.gif" />
                                <span v-else>Confirm</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="flex flex-col">
                        <span class="text-4xl p-2">Register</span>
                        <div class="flex flex-col p-2">
                            <label class="text-2xl" for="email">Email</label>
                            <input class="text-stone-800 text-2xl rounded" v-model="email"  name="email" type="text" />
                        </div>
                        <div class="flex flex-col p-2">
                            <label class="text-2xl" for="username">Username</label>
                            <input class="text-stone-800 text-2xl rounded" v-model="username"  name="username" type="text" />
                        </div>
                        <div class="flex flex-col p-2">
                            <label class="text-2xl" for="password">Password</label>
                            <input class="text-stone-800 text-2xl rounded" v-model="password" name="password" type="password" />
                        </div>
                        <div class="flex flex-col p-2">
                            <div @click="registerUser()" class="flex flex-col text-stone-100 text-2xl text-center p-3 bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600">
                                <img v-if="loadingState" class="h-8 w-8 m-auto" src="/assets/images/loading.gif" />
                                <span v-else>Submit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>