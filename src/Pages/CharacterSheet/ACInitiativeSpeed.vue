<script lang="ts">
import { ClassName, type Character } from '../../models';
import { abilityToModifierLoookup } from './utils';
import races from "../../Data/races.json"

export default {
    props: {
        character: {
            type: Object as () => Character,
            required: true
        }
    },
    data() {
        const currentRace = races.find((race) => race.name === this.character.race);
        return {
            ClassName,
            abilityToModifierLoookup,
            currentRace
        }
    }
}
</script>

<template>
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
</template>