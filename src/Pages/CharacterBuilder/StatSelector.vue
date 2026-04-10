<script lang="ts">
import { type Character } from '../../models';

export default {
    props: {
        character: {
            type: Object as () => Character,
            required: true
        }
    },
    methods: {
        handleAbilityChange(stat: string, e: Event) {
            const target = e.target as HTMLInputElement;
            const newValue = parseInt(target.value);
            const statKey = stat as keyof Character['stats']
            const oldValue = this.character.stats[statKey];

            const pointBuyPrices: Record<number, number> = {
                8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
            };

            const currentCost = pointBuyPrices[oldValue] || 0;
            const newCost = pointBuyPrices[newValue] || 0;
            const costDifference = newCost - currentCost;

            // Check if current total + the increase fits in the 27 point budget
            if (this.totalSpent + costDifference <= 27) {
                this.character.stats[statKey] = newValue;
            } else {
                // Snap back if over budget
                target.value = oldValue.toString();
            }

        }
    },
    computed: {
        totalSpent() {
            const pointBuyPrices: Record<number, number> = {
                8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
            };
            return Object.values(this.character.stats)
                .reduce((sum, val) => sum + (pointBuyPrices[val] || 0), 0);
        }
    },
}
</script>

<template>
    <div class="flex flex-col gap-1 mt-4">
        <label for="abilities" class="text-xl font-bold">Abilities:</label>
        <div>Point Buy Points Remaining: {{ 27 - totalSpent }} / 27</div>
        <div id="abilities" class="flex flex-row gap-2 w-1/3">
            <div class="flex flex-col">
                <input type="number" name="str" id="str" class="bg-gray-200 p-1 rounded-md w-full"
                    @input="handleAbilityChange('str', $event)" :value="character.stats.str" min="8" max="15">
                <label for="str">STR</label>

            </div>
            <div class="flex flex-col">
                <input type="number" name="dex" id="dex" class="bg-gray-200 p-1 rounded-md w-full"
                    @input="handleAbilityChange('dex', $event)" :value="character.stats.dex" min="8" max="15">
                <label for="dex">DEX</label>
            </div>
            <div class="flex flex-col">
                <input type="number" name="con" id="con" class="bg-gray-200 p-1 rounded-md w-full"
                    @input="handleAbilityChange('con', $event)" :value="character.stats.con" min="8" max="15">
                <label for="con">CON</label>
            </div>
            <div class="flex flex-col">
                <input type="number" name="int" id="int" class="bg-gray-200 p-1 rounded-md w-full"
                    @input="handleAbilityChange('int', $event)" :value="character.stats.int" min="8" max="15">
                <label for="int">INT</label>
            </div>
            <div class="flex flex-col">
                <input type="number" name="wis" id="wis" class="bg-gray-200 p-1 rounded-md w-full"
                    @input="handleAbilityChange('wis', $event)" :value="character.stats.wis" min="8" max="15">
                <label for="wis">WIS</label>
            </div>
            <div class="flex flex-col">
                <input type="number" name="cha" id="cha" class="bg-gray-200 p-1 rounded-md w-full"
                    @input="handleAbilityChange('cha', $event)" :value="character.stats.cha" min="8" max="15">
                <label for="cha">CHA</label>
            </div>
        </div>
    </div>
</template>