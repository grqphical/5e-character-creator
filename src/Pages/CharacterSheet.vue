<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCharacterStore } from '../storage';
import { useHead } from '@unhead/vue'

const characterStore = useCharacterStore();

const route = useRoute()
const id = parseInt(route.params.id?.toString()!)

const character = characterStore.characters[id];

useHead({
    title: `${character?.name} - CharacterForge` || '404 - Character Not Found'
})
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen" v-if="character === undefined">
        <div class="w-140 h-20 m-auto p-8 rounded-md shadow-xl bg-white flex flex-col justify-center">
            <h1 class="text-4xl font-bold text-center">404 Not Found</h1>
        </div>
    </div>

    <div class="w-full flex flex-row gap-3">
        <div class="w-80 bg-white rounded-md shadow-xl px-2 py-3 flex flex-col justify-center items-center">
            <h2 class="font-bold text-3xl">{{ character?.name }}</h2>
        </div>
        <div class="w-160 bg-white rounded-md shadow-xl px-2 py-3 grid grid-cols-3">
            <div class="flex flex-col">
                <h2 class="text-lg font-bold">{{ `Level ${character?.level} ${character?.class}` }}</h2>
                <p class="text-xs">Class/Level</p>
            </div>
            <div class="flex flex-col">
                <h2 class="text-lg font-bold">{{ character?.background === undefined ? "Undefined" :
                    character.background }}</h2>
                <p class="text-xs">Background</p>
            </div>
            <h2 class="text-lg font-bold"></h2>
            <div class="flex flex-col">
                <h2 class="text-lg  font-bold">{{ character?.race }}</h2>
                <p class="text-xs">Race</p>
            </div>
            <div class="flex flex-col">
                <h2 class="text-lg font-bold">{{ character?.alignment }}</h2>
                <p class="text-xs">Alignment</p>
            </div>
            <div class="flex flex-col">
                <h2 class="text-lg font-bold">{{ character?.xp }}</h2>
                <p class="text-xs">XP</p>
            </div>
        </div>
    </div>

</template>