<template>
    <div class="text-stone-200 bg-gradient-to-r from-teal-600 to-blue-600 grid place-items-center w-screen h-screen">
        <div class="flex flex-col content-center bg-cyan-900 p-12 rounded-xl">
            <span class="text-4xl">Register</span>
            <div class="flex flex-col">
                <div class="flex flex-col p-2">
                    <label class="text-2xl" for="email">Email</label>
                    <input class="text-2xl rounded" name="email" type="text" />
                </div>
                <div class="flex flex-col p-2">
                    <label class="text-2xl" for="password">Password</label>
                    <input class="text-2xl rounded" name="password" type="password" />
                </div>
                <div class="flex flex-col p-2">
                    <button class="text-2xl p-3 bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>