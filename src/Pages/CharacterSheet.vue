<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCharacterStore } from '../storage';
import races from "../Data/races.json"
import { useHead } from '@unhead/vue'

const characterStore = useCharacterStore();

const route = useRoute()
const id = parseInt(route.params.id?.toString()!)

const character = characterStore.characters[id]!;

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
    if (modifier === undefined) {
        console.error("could not lookup modifier for", abilityScore)
    }
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

const toggleInspiration = () => {
    const newInspiration = !character.inspiration
    character.inspiration = newInspiration;
    characterStore.updateCharacter(id, { ...character, inspiration: newInspiration });
}

</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen" v-if="character === undefined">
        <div class="w-140 h-20 m-auto p-8 rounded-md shadow-xl bg-white flex flex-col justify-center">
            <h1 class="text-4xl font-bold text-center">404 Not Found</h1>
        </div>
    </div>

    <div class="w-full flex flex-row gap-3">
        <div class="min-w-90 bg-white rounded-md shadow-xl px-2 flex flex-row items-center gap-2">
            <a href="/"><img src="/logo.webp" alt="logo" width="64" height="64"></a>
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
    <div class="flex flex-row h-full mt-2 gap-3">
        <div class="flex flex-col gap-3">
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.str!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.str }}</p>
                <p class="font-bold">STR</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.dex!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.dex }}</p>
                <p class="font-bold">DEX</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.con!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.con }}</p>
                <p class="font-bold">CON</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.int!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.int }}</p>
                <p class="font-bold">INT</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.wis!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.wis }}</p>
                <p class="font-bold">WIS</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(character?.stats.cha!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ character?.stats.cha }}</p>
                <p class="font-bold">CHA</p>
            </div>

        </div>
        <div class="flex flex-col gap-3">
            <div class="w-60 bg-white rounded-md shadow-xl p-2 flex flex-row gap-2 items-center">
                <label class="relative flex items-center cursor-pointer text-xl font-bold">
                    <input type="checkbox" name="inspiration" id="inspiration"
                        class="peer appearance-none h-12 w-12 border-2 border-black transition-colors rounded"
                        :checked="character.inspiration" @change="toggleInspiration">
                    <span
                        class="absolute w-10 h-10 rounded bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none cursor-pointer">
                        <img src="/polar-star.svg" alt="Star">
                    </span>
                </label>
                <span class="font-bold">Inspiration</span>
            </div>
            <div class="w-60 bg-white rounded-md shadow-xl p-2 flex flex-row gap-2 items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">+{{
                    character.proficiency_bonus }}
                </p>
                <p class="font-bold">Proficency Bonus</p>
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <div class="w-70 bg-white rounded-md shadow-xl p-2 flex flex-row gap-4 items-center justify-around">
                <div class="flex flex-col items-center">
                    <p class="text-3xl border-2 p-3 rounded">{{ character.armor_class }}
                    </p>
                    <p class="text-sm font-bold">AC</p>
                </div>
                <div class="flex flex-col items-center">
                    <p class="text-3xl border-2 p-3 rounded">{{ character.initiative }}</p>
                    <p class="text-sm font-bold">Initiative</p>
                </div>
                <div class="flex flex-col items-center">
                    <p class="text-3xl border-2 p-3 rounded">{{ character.speed }}</p>
                    <p class="text-sm font-bold">Speed</p>
                </div>
            </div>
        </div>
    </div>

</template>