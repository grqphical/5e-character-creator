<script lang="ts">
import type { Character } from '../../models'
import { abilityToModifierLoookup } from './utils';



export default {
    props: {
        character: {
            type: Object as () => Character,
            required: true
        }
    },
    methods: {
        getAbility(name: string): number | undefined {
            const key = name as keyof typeof this.character.stats;
            return this.character.stats[key] + this.character.chosen_stats_bonuses[key];
        },
        getModifierFromAbility(abilityScore: number): string {
            const modifier = abilityToModifierLoookup.get(abilityScore)
            if (modifier === undefined) {
                console.error("could not lookup modifier for", abilityScore)
            }
            const sign = Math.sign(modifier!) === -1 ? "-" : "+"
            return `${sign}${Math.abs(modifier!)}`
        }
    }
}
</script>

<template>
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
    </div>
</template>