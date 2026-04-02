<script setup lang="ts">
import { computed, reactive } from 'vue' // Import reactive
import { Class, type Character, Alignment } from "../models"
import races from "../Data/races.json"
import { useCharacterStore } from "../storage"
import { useRouter } from 'vue-router'

const router = useRouter()
const charactersStore = useCharacterStore();

const character = reactive<Character>({
    name: '',
    level: 1,
    class: Class.Fighter,
    race: races[0]?.name || '',
    alignment: Alignment.TrueNeutral,
    stats: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        cha: 0,
        wis: 0,
    },
    xp: 0,
    inspiration: false,
    proficiency_bonus: 0,
    speed: 0,
    initiative: 0,
    armor_class: 0,
} as Character)


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


const handleSubmit = (e: Event) => {
    e.preventDefault()

    Object.entries(preBonusStats).forEach(([stat, value]) => {
        const key = stat as keyof typeof character.stats
        character.stats[key] += value
    })

    character.armor_class = 10 + abilityToModifierLoookup.get(character.stats.dex)!

    const race = races.find((value) => value.name === character.race)!
    if (race === undefined) {
        console.error("Error looking up race data")
    }

    if (typeof (race.speed) === "number") {
        character.speed = race.speed;
    } else {
        character.speed = race.speed?.walk!
    }

    character.initiative = abilityToModifierLoookup.get(character.stats.dex)!

    charactersStore.addCharacter(character)
    const idx = charactersStore.characters.length - 1;

    router.push(`/character-sheet/${idx}`)
}

let pointBuyPrices: Record<number, number> = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9
}

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

let preBonusStats = reactive({
    str: 8,
    dex: 8,
    con: 8,
    int: 8,
    cha: 8,
    wis: 8,

})

const totalSpent = computed(() => {
    return Object.values(preBonusStats).reduce((sum, score) => {
        return sum + (pointBuyPrices[score] || 0);
    }, 0);
});

const handleAbilityChange = (stat: string, e: Event) => {
    const target = e.target as HTMLInputElement;
    const newValue = parseInt(target.value);
    const statKey = stat as keyof typeof preBonusStats
    const oldValue = preBonusStats[statKey];

    const currentCost = pointBuyPrices[oldValue] || 0;
    const newCost = pointBuyPrices[newValue] || 0;
    const costDifference = newCost - currentCost;

    // Check if current total + the increase fits in the 27 point budget
    if (totalSpent.value + costDifference <= 27) {
        preBonusStats[statKey] = newValue;
    } else {
        // Snap back if over budget
        target.value = oldValue.toString();
    }
}

const applyRacialBonuses = () => {
    Object.entries(character.stats).forEach(([keyName]) => {
        const key = keyName as keyof typeof character.stats;
        character.stats[key] = 0
    })
    const race = character.race;
    const raceData = races.find((r) => r.name == race);
    if (raceData?.ability) {
        raceData.ability.forEach((value) => {
            Object.entries(value).forEach(([statName, statValue]) => {
                const stat = statName as keyof typeof character.stats
                character.stats[stat] = statValue as number
            })
        });
    }
}

const filteredRacialBonuses = computed(() => {
    return Object.fromEntries(
        Object.entries(character.stats).filter(([_, value]) => value !== 0)
    );
});

const handleLevelChange = () => {
    const profBonus = proficiencyBonusLookup[character.level];
    character.proficiency_bonus = profBonus!;
}

const handleDynamicAbilityChange = (payload: Event) => {
    const target = payload.target as HTMLSelectElement;
    const selectedAbility = target.value as keyof typeof character.stats;
    character.stats[selectedAbility] += (character.stats[selectedAbility] > 0 ? 0 : 1);
}

applyRacialBonuses();

</script>

<template>
    <div class="w-full rounded-md p-4 bg-white flex flex-col gap-2">
        <h1 class="font-bold text-3xl mb-4">Create New Character</h1>
        <form class="flex flex-col gap-2" @submit="handleSubmit">

            <div class="flex flex-col gap-1">
                <label for="name" class="text-xl">Name:</label>
                <input v-model="character.name" type="text" class="bg-gray-200 p-1 rounded-md w-1/3" required>
            </div>

            <div class="flex flex-col gap-1">
                <label for="class" class="text-xl">Class:</label>
                <select v-model="character.class" class="bg-gray-200 p-1 rounded-md w-1/3" required>
                    <option v-for="charClass in Object.keys(Class)" :value="charClass" :key="charClass">
                        {{ charClass }}
                    </option>
                </select>
            </div>

            <div class="flex flex-col gap-1">
                <label for="race" class="text-xl">Race:</label>
                <select v-model="character.race" class="bg-gray-200 p-1 rounded-md w-1/3" required
                    @change="applyRacialBonuses">
                    <option v-for="race in races" :value="race.name" :key="race.name">
                        {{ race.name }} ({{ race.source }})
                    </option>
                </select>
            </div>

            <div class="flex flex-col gap-1">
                <label for="level" class="text-xl">Level:</label>
                <input v-bind:value="character.level" @change="handleLevelChange" type="number"
                    class="bg-gray-200 p-1 rounded-md w-1/3" max="20" min="1" required>
            </div>
            <div class="flex flex-col gap-1">
                <label for="level" class="text-xl">Alignment:</label>
                <select v-model="character.alignment" class="bg-gray-200 p-1 rounded-md w-1/3" required>
                    <option value="Chaotic Good">Chaotic Good</option>
                    <option value="Lawful Good">Lawful Good</option>
                    <option value="Neutral Good">Neutral Good</option>
                    <option value="Chaotic Neutral">Chaotic Neutral</option>
                    <option value="Neutral Evil">Neutral Evil</option>
                    <option value="Lawful Neutral">Lawful Neutral</option>
                    <option value="True Neutral">True Neutral</option>
                    <option value="Lawful Evil">Lawful Evil</option>
                    <option value="Chaotic Evil">Chaotic Evil</option>
                </select>
            </div>
            <div class="flex flex-col gap-1 mt-4">
                <label for="abilities" class="text-xl font-bold">Abilities:</label>
                <div>Point Buy Points Remaining: {{ 27 - totalSpent }} / 27</div>
                <div id="abilities" class="flex flex-row gap-2 w-1/3">
                    <div class="flex flex-col">
                        <input type="number" name="str" id="str" class="bg-gray-200 p-1 rounded-md w-full"
                            @input="handleAbilityChange('str', $event)" :value="preBonusStats.str" min="8" max="15">
                        <label for="str">STR</label>

                    </div>
                    <div class="flex flex-col">
                        <input type="number" name="dex" id="dex" class="bg-gray-200 p-1 rounded-md w-full"
                            @input="handleAbilityChange('dex', $event)" :value="preBonusStats.dex" min="8" max="15">
                        <label for="dex">DEX</label>
                    </div>
                    <div class="flex flex-col">
                        <input type="number" name="con" id="con" class="bg-gray-200 p-1 rounded-md w-full"
                            @input="handleAbilityChange('con', $event)" :value="preBonusStats.con" min="8" max="15">
                        <label for="con">CON</label>
                    </div>
                    <div class="flex flex-col">
                        <input type="number" name="int" id="int" class="bg-gray-200 p-1 rounded-md w-full"
                            @input="handleAbilityChange('int', $event)" :value="preBonusStats.int" min="8" max="15">
                        <label for="int">INT</label>
                    </div>
                    <div class="flex flex-col">
                        <input type="number" name="wis" id="wis" class="bg-gray-200 p-1 rounded-md w-full"
                            @input="handleAbilityChange('wis', $event)" :value="preBonusStats.wis" min="8" max="15">
                        <label for="wis">WIS</label>
                    </div>
                    <div class="flex flex-col">
                        <input type="number" name="cha" id="cha" class="bg-gray-200 p-1 rounded-md w-full"
                            @input="handleAbilityChange('cha', $event)" :value="preBonusStats.cha" min="8" max="15">
                        <label for="cha">CHA</label>
                    </div>
                </div>
                <h3 class="font-bold text-lg">Racial Bonuses:</h3>
                <div class="flex flex-row gap-1">
                    <div v-for="(value, stat) in filteredRacialBonuses" :key="stat">
                        <p v-if="stat !== 'choose'">{{ stat.toUpperCase() }}: {{ value }}</p>
                        <div v-if="stat === 'choose'">
                            <select class="bg-gray-200 p-1 rounded-md" @change="handleDynamicAbilityChange">
                                <option value="">Select an ability</option>
                                <option v-for="ability in value.from" :key="ability" :value="ability">
                                    {{ ability.toUpperCase() }}
                                </option>
                            </select>
                            
                        </div>
                    </div>
                </div>

                <button type="submit" class="text-lg px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 w-48">
                    Create
                </button>
            </div>
        </form>
    </div>
</template>