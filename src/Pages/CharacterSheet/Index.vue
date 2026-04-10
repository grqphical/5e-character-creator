<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCharacterStore } from '../../storage';
import races from "../../Data/races.json"
import { useHead } from '@unhead/vue'
import { ClassName } from '../../models';
import Header from "./Header.vue"

const characterStore = useCharacterStore();

const route = useRoute()
const id = parseInt(route.params.id?.toString()!)

const character = characterStore.characters[id]!;
const currentRace = races.find((race) => race.name === character.race)

if (character !== undefined) {
    useHead({
        title: `${character?.name} - CharacterForge` || '404 - Character Not Found'
    })
}

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

const proficiencyBonusLookup: Record<number, number> = {
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 3,
    8: 3,
    9: 4,
    10: 4,
    11: 4,
    12: 4,
    13: 5,
    14: 5,
    15: 5,
    16: 5,
    17: 6,
    18: 6,
    19: 6,
    20: 6,
}

const getModifierFromAbility = (abilityScore: number): string => {
    const modifier = abilityToModifierLoookup.get(abilityScore)
    if (modifier === undefined) {
        console.error("could not lookup modifier for", abilityScore)
    }
    const sign = Math.sign(modifier!) === -1 ? "-" : "+"
    return `${sign}${Math.abs(modifier!)}`
}

const getAbility = (name: string): number | undefined => {
    const key = name as keyof typeof character.stats;
    return character.stats[key] + character.chosen_stats_bonuses[key];
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

    <Header :character="character" />
    <div class="flex flex-row h-full mt-2 gap-3">
        <div class="flex flex-col gap-3">
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(getAbility("str")!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ getAbility("str")! }}</p>
                <p class="font-bold">STR</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(getAbility("dex")!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ getAbility("dex")! }}</p>
                <p class="font-bold">DEX</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(getAbility("con")!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ getAbility("con")! }}</p>
                <p class="font-bold">CON</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(getAbility("int")!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ getAbility("con") }}</p>
                <p class="font-bold">INT</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(getAbility("wis")!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ getAbility("wis") }}</p>
                <p class="font-bold">WIS</p>
            </div>
            <div class="w-25 bg-white rounded-md shadow-xl p-2 flex flex-col justify-center items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">{{
                    getModifierFromAbility(getAbility("cha")!) }}
                </p>
                <p class="border aspect-square text-center rounded">{{ getAbility("cha") }}</p>
                <p class="font-bold">CHA</p>
            </div>

        </div>
        <div class="flex flex-col gap-2">
            <div class="w-60 bg-white rounded-md shadow-xl p-1 flex flex-row gap-2 items-center">
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
            <div class="w-60 bg-white rounded-md shadow-xl p-1 flex flex-row gap-2 items-center">
                <p class="text-3xl border-2 rounded aspect-square text-center p-0.5 mb-1">+{{
                    proficiencyBonusLookup[character.level] }}
                </p>
                <p class="font-bold">Proficency Bonus</p>
            </div>
        </div>
        <div class="flex flex-col gap-3">
            <div class="w-70 bg-white rounded-md shadow-xl p-4 flex flex-row gap-2 items-center justify-between">

                <div class="flex flex-col items-center gap-1">
                    <div class="relative flex items-center justify-center w-16 h-16">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                            <path d="M10,5 
                             L90,5 
                             L90,50 
                             C90,85 50,98 50,98 
                             C50,98 10,85 10,50 
                             Z" fill="none" stroke="black" stroke-width="6" stroke-linejoin="round" />
                            <text x="50" y="48" text-anchor="middle" dominant-baseline="middle" font-size="36"
                                font-weight="bold" fill="black">
                                {{
                                    10 + abilityToModifierLoookup.get(character.stats.dex)! +
                                    (character.class === ClassName.Barbarian ?
                                        abilityToModifierLoookup.get(character.stats.con)! : 0) +
                                    (character.class === ClassName.Barbarian ?
                                        abilityToModifierLoookup.get(character.stats.dex)! : 0)
                                }}
                            </text>
                        </svg>
                    </div>
                    <p class="text-sm font-bold">AC</p>
                </div>

                <div class="flex flex-col items-center gap-1">
                    <p
                        class="text-3xl border-2 border-black p-3 rounded w-16 h-16 flex items-center justify-center text-center font-bold">
                        {{ character.stats.dex >= 10 ? "+" : "" }}{{
                            abilityToModifierLoookup.get(character.stats.dex) }}
                    </p>
                    <p class="text-sm font-bold">Initiative</p>
                </div>

                <div class="flex flex-col items-center gap-1">
                    <p
                        class="text-3xl border-2 border-black p-3 rounded w-16 h-16 flex items-center justify-center text-center font-bold">
                        {{ typeof currentRace?.speed === 'object' ? currentRace.speed.walk : currentRace?.speed }}
                    </p>
                    <p class="text-sm font-bold">Speed</p>
                </div>

            </div>
        </div>
    </div>


</template>