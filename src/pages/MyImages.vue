<template>
    <header
        class="relative bg-gray-400 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-white">Images</h1>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div v-for="image in images" :key="image.id" class="bg-white overflow-hidden shadow rounded-lg">
                    <img :src="image.url" alt="Image" class="w-full h-48 object-contain">
                    <div class="px-4 py-4">
                        <h3 class="text-lg font-semibold text-gray-900">{{ image.name }}</h3>
                        <p class="text sm text-gray-500 mb-4 ">{{ image.label }}</p>

                        <div class="flex justify-between ">
                            <button type="submit" @click="copyImageUrl(image.url)"
                                class="rounded-md bg-indigo-600 px-3 py-1 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Copy Image Url
                            </button>
                            <button type="submit" @click="deleteImage(image.id)"
                                class="rounded-md bg-red-600 px-3 py-1 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>

<script setup>
import axiosClient from '@/axios';
import { onMounted, ref } from 'vue';

const images = ref([]);

function deleteImage(id) {
    if (!confirm('Ary you sure you want to delete this image?')) {
        return;
    }
    axiosClient.delete(`/api/image/${id}`)
        .then(res => {
            images.value = images.value.filter(image => image.id !== id)
        })
}
async function copyImageUrl(url) {
    await navigator.clipboard.writeText(url);
}
onMounted(() => {
    axiosClient.get('/api/image')
        .then((res) => {
            console.log(res.data);
            images.value = res.data;
        })
})
</script>

<style lang="scss" scoped></style>