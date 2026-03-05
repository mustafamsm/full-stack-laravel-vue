<template>
    <GuestLayout>
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create new account</h2>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submit" class="space-y-6">
                <div>
                    <label for="name" class="block text-sm/6 font-medium text-gray-900">Full Name</label>
                    <div class="mt-2">
                        <input type="text" v-model="data.name" name="name" id="name"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <p class="text-red-500">
                        {{ errors.name ? errors.name[0] : '' }}
                    </p>
                </div>
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input type="email" v-model="data.email" name="email" id="email" autocomplete="email"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <p class="text-red-500">
                        {{ errors.email ? errors.email[0] : '' }}
                    </p>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>

                    </div>
                    <div class="mt-2">
                        <input type="password" v-model="data.password" name="password" id="password"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <p class="text-red-500">
                        {{ errors.password ? errors.password[0] : '' }}
                    </p>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="passwordConfirmation" class="block text-sm/6 font-medium text-gray-900"> Repeat
                            Password</label>

                    </div>
                    <div class="mt-2">
                        <input type="password" v-model="data.password_confirmation" name="passwordConfirmation"
                            id="passwordConfirmation"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <p class="text-red-500">
                        {{ errors.password_confirmation ? errors.password_confirmation[0] : '' }}
                    </p>
                </div>
                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        up</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?
                {{ ' ' }}
                <RouterLink :to="{ name: 'Login' }" class="font-semibold text-indigo-600 hover:text-indigo-500">Login
                    from
                    here</RouterLink>
            </p>
        </div>
    </GuestLayout>>
</template>

<script setup>
import axiosClient from '@/axios';
import GuestLayout from '@/components/GuestLayout.vue';
import router from '@/router';
import { ref } from 'vue';

const data = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})
const errors = ref({
    name: [],
    email: [],
    password: [],
    password_confirmation: []
})
const submit = async () => {

    await axiosClient.get('/sanctum/csrf-cookie', {
        baseURL: "http://localhost:8000"
    });


    await axiosClient.post('/register', data.value)
        .then(response => {
            router.push({ name: 'Home' })
        }).catch(error => {
            console.error(error.response)
            errors.value = error.response.data.errors
        })
}
</script>

<style lang="scss" scoped></style>