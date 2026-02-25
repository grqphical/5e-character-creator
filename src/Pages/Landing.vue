<script setup lang="ts">
import { characters } from "../storage"
</script>

<template>
    <div class="w-140 mh-80 m-auto p-4 mt-24 rounded-md shadow-xl bg-white flex flex-col">
        <h1 class="text-4xl font-bold">5e Character Creator</h1>
        <h2 class="text-3xl" v-if="characters.length !== 0">Characters:</h2>
        <div class="py-4">
            <div v-if="characters.length === 0">Hmm no characters have been created...</div>
            <div v-for="character in characters">{{ character.name }}</div>
        </div>
        <div class="flex flex-row gap-2 mt-auto">
            <RouterLink to="/create" class="text-lg px-3 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
                New
                Character</RouterLink>
            <button class="text-lg px-3 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">Import
                Character</button>
        </div>
        <p class="mt-4">Made by <a class="underline" href="https://nathanjacobson.ca">Nathan Jacobson</a>. <a
                class="underline" href="https://github.com">GitHub</a></p>
    </div>


</template>

<style scoped></style>