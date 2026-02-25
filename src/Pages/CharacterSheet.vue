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

const abilityToModifierLoookup = new Map<number, number>([
    [1, -5],
    [2, -4],
    [3, -4],
    [4, -3],
    [5, -3],
    [6, -2],
    [7, -2],
    [8, -1],
    [9, -1],
    [10, 0],
    [11, 0],
    [12, 1],
    [13, 1],
    [14, 2],
    [15, 2],
    [16, 3],
    [17, 3],
    [18, 4],
    [19, 4],
    [20, 5],
    [21, 5],
    [22, 6],
    [23, 6],
    [24, 7],
    [25, 7],
    [26, 8],
    [27, 8],
    [28, 9],
    [29, 9],
    [25, 10],
])

const getModifierFromAbility = (abilityScore: number): string => {
    const modifier = abilityToModifierLoookup.get(abilityScore)
    const sign = Math.sign(modifier!) === -1 ? "-" : "+"
    return `${sign}${Math.abs(modifier!)}`
}

const exportCharacter = () => {
    const exportObject = {
        "_meta": {
            "source": "CharacterForge",
            "version": 1,
        },
        "character": character

    };
    const jsonString = JSON.stringify(exportObject);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "character.json";
    a.click();

    URL.revokeObjectURL(url);
}

</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen" v-if="character === undefined">
        <div class="w-140 h-20 m-auto p-8 rounded-md shadow-xl bg-white flex flex-col justify-center">
            <h1 class="text-4xl font-bold text-center">404 Not Found</h1>
        </div>
    </div>

    <div class="w-full flex flex-row gap-3">
        <div class="w-80 bg-white rounded-md shadow-xl px-2 flex flex-col justify-center items-center">
            <h2 class="font-bold text-3xl">{{ character?.name }}</h2>
        </div>
        <div class="w-160 bg-white rounded-md shadow-xl px-2 grid grid-cols-3">
            <div class="flex flex-col">
                <h2 class="text-lg font-bold">{{ `Level ${character?.level} ${character?.class}` }}</h2>
                <p class="text-xs">Class/Level</p>
            </div>
            <div class="flex flex-col">
                <h2 class="text-lg font-bold">{{ character?.background === undefined ? "Undefined" :
                    character.background }}</h2>
                <p class="text-xs">Background</p>
            </div>
            <button class="text-lg px-2 py-1 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 self-center"
                @click="exportCharacter">Export</button>
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
    <div class="flex flex-row h-full mt-2">
        <div class="flex flex-col gap-3">
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.strength!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.strength }}</p>
                <p class="font-bold">STR</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.dexterity!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.dexterity }}</p>
                <p class="font-bold">DEX</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.constitution!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.constitution }}</p>
                <p class="font-bold">CON</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.intelligence!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.intelligence }}</p>
                <p class="font-bold">INT</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.wisdom!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.wisdom }}</p>
                <p class="font-bold">WIS</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.charisma!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.charisma }}</p>
                <p class="font-bold">CHA</p>
            </div>

        </div>
    </div>

</template>