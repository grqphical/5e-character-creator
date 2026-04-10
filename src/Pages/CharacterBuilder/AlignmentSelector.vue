<script lang="ts">
import { type Character } from '../../models';

export default {
    props: {
        character: {
            type: Object as () => Character,
            required: true
        }
    }
}
</script>

<template>
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
</template>