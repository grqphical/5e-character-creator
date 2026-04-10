<script lang="ts">
import type { Character } from '../../models';
import { useCharacterStore } from '../../storage';

export default {
    props: {
        character: {
            type: Object as () => Character,
            required: true
        },
        id: {
            type: Number,
            required: true,
        }
    },
    methods: {
        toggleInspiration() {
            const newInspiration = !this.character.inspiration
            this.character.inspiration = newInspiration;
            this.characterStore.updateCharacter(this.id, { ...this.character, inspiration: newInspiration });
        }
    },
    data() {
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
        const characterStore = useCharacterStore();
        return {
            proficiencyBonusLookup,
            characterStore,
        }
    }
}
</script>

<template>
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
</template>