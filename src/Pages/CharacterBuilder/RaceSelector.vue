<script lang="ts">
import races from "../../Data/races.json"
import { type Character } from '../../models';
import type { Race } from "../../types/races";

type StatKey = keyof Character["stats"];

export default {
    props: {
        character: {
            type: Object as () => Character,
            required: true
        }
    },
    data() {
        return {
            races
        }
    },
    methods: {
        applyRacialBonuses() {
            Object.entries(this.character.stats).forEach(([keyName]) => {
                let key = keyName as keyof typeof this.character.chosen_stats_bonuses;
                this.character.chosen_stats_bonuses[key] = 0
            })
            const race = this.character.race;
            const raceData = races.find((r) => r.name == race);
            if (raceData?.ability) {
                raceData.ability.forEach((value) => {
                    Object.entries(value).forEach(([statName, statValue]) => {
                        if (!(statName in this.character.stats)) {
                            return;
                        }
                        if (typeof statValue !== "number") {
                            return;
                        }
                        const stat = statName as StatKey;
                        this.character.chosen_stats_bonuses[stat] += statValue;
                    })
                });
            }
        },
        handleDynamicAbilityChange(payload: Event) {
            const target = payload.target as HTMLSelectElement;
            const selectedAbility = target.value as StatKey;
            this.character.chosen_stats_bonuses[selectedAbility] += (this.character.chosen_stats_bonuses[selectedAbility] > 0 ? 0 : 1);
        }
    },
    computed: {
        currentRace(): Race | undefined {
            return races.find((race) => race.name === this.character.race) as Race | undefined
        }
    }
}
</script>

<template>
    <div class="flex flex-col gap-1">
        <label for="race" class="text-xl">Race:</label>
        <select v-model="character.race" class="bg-gray-200 p-1 rounded-md w-1/3" required @change="applyRacialBonuses">
            <option v-for="race in races" :value="race.name" :key="race.name">
                {{ race.name }} ({{ race.source }})
            </option>
        </select>
    </div>
    <h3 class="font-bold text-lg">Racial Bonuses:</h3>
    <div class="flex flex-row gap-2 mb-3 items-center">
        <div v-for="(value, idx) in currentRace?.ability" :key="idx" class="flex flex-row gap-2">
            <p v-if="value.str !== undefined">STR {{ value.str >= 0 ? "+" : "" }}{{ value.str }}</p>
            <p v-if="value.dex !== undefined">DEX {{ value.dex >= 0 ? "+" : "" }}{{ value.dex }}</p>
            <p v-if="value.con !== undefined">CON {{ value.con >= 0 ? "+" : "" }}{{ value.con }}</p>
            <p v-if="value.int !== undefined">INT {{ value.int >= 0 ? "+" : "" }}{{ value.int }}</p>
            <p v-if="value.wis !== undefined">WIS {{ value.wis >= 0 ? "+" : "" }}{{ value.wis }}</p>
            <p v-if="value.cha !== undefined">CHA {{ value.cha >= 0 ? "+" : "" }} {{ value.cha }}</p>
            <div v-for="i in value.choose?.count" :key="i">
                <select class="bg-gray-200 p-1 rounded-md" @change="handleDynamicAbilityChange" required="true">
                    <option value="">Select an ability</option>
                    <option v-for="ability in value.choose?.from" :key="ability" :value="ability">
                        {{ ability.toUpperCase() }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>