<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCharacterStore } from '../../storage';
import { useHead } from '@unhead/vue'
import Header from "./Header.vue"
import Stats from './Stats.vue';
import InspirationProfBonus from './InspirationProfBonus.vue';
import ACInitiativeSpeed from './ACInitiativeSpeed.vue';

const characterStore = useCharacterStore();

const route = useRoute()
const id = parseInt(route.params.id?.toString()!)

const character = characterStore.characters[id]!;

if (character !== undefined) {
    useHead({
        title: `${character?.name} - CharacterForge` || '404 - Character Not Found'
    })
}
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen" v-if="character === undefined">
        <div class="w-140 h-20 m-auto p-8 rounded-md shadow-xl bg-white flex flex-col justify-center">
            <h1 class="text-4xl font-bold text-center">404 Not Found</h1>
        </div>
    </div>

    <Header :character="character" />
    <div class="flex flex-row h-full mt-2 gap-3">
        <Stats :character="character" />
        <InspirationProfBonus :character="character" :id="id" />
        <ACInitiativeSpeed :character="character" />
    </div>


</template>