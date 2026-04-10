<script setup lang="ts">
import { reactive } from 'vue' // Import reactive
import { ClassName, type Character, Alignment } from "../../models"
import races from "../../Data/races.json"
import backgrounds from "../../Data/backgrounds.json"
import { useCharacterStore } from "../../storage"
import { useRouter } from 'vue-router'
import ClassSelector from './ClassSelector.vue'
import RaceSelector from './RaceSelector.vue'
import AlignmentSelector from './AlignmentSelector.vue'
import StatSelector from './StatSelector.vue'

const router = useRouter()
const charactersStore = useCharacterStore();

const character = reactive<Character>({
    name: '',
    level: 1,
    class: ClassName.Fighter,
    race: races[0]?.name || '',
    alignment: Alignment.TrueNeutral,
    stats: {
        str: 8,
        dex: 8,
        con: 8,
        int: 8,
        cha: 8,
        wis: 8,
    },
    chosen_stats_bonuses: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        cha: 0,
        wis: 0,
    },
    xp: 0,
    inspiration: false,
} as Character)

const handleSubmit = (e: Event) => {
    e.preventDefault()

    charactersStore.addCharacter(character)
    const idx = charactersStore.characters.length - 1;

    router.push(`/character-sheet/${idx}`)
}

</script>

<template>
    <div class="w-full rounded-md p-4 bg-white flex flex-col gap-2">
        <h1 class="font-bold text-3xl mb-4">Create New Character</h1>
        <form class="flex flex-col gap-2" @submit="handleSubmit">
            <div class="flex flex-col gap-1">
                <label for="name" class="text-xl">Name:</label>
                <input v-model="character.name" type="text" class="bg-gray-200 p-1 rounded-md w-1/3" required>
            </div>

            <ClassSelector :character="character" />
            <RaceSelector :character="character" />

            <div class="flex flex-col gap-1">
                <label for="level" class="text-xl">Level:</label>
                <input v-bind:value="character.level" type="number" class="bg-gray-200 p-1 rounded-md w-1/3" max="20"
                    min="1" required>
            </div>

            <AlignmentSelector :character="character" />

            <div class="flex flex-col gap-1">
                <label for="level" class="text-xl">Background:</label>
                <select v-model="character.background" class="bg-gray-200 p-1 rounded-md w-1/3" required>
                    <option v-for="background in backgrounds.backgrounds" :value="background.name"
                        :key="background.name">{{ background.name }}</option>
                </select>
            </div>

            <StatSelector :character="character" />

            <button type="submit" class="text-lg px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 w-48">
                Create
            </button>
        </form>
    </div>
</template>