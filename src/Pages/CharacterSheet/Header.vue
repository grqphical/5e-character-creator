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
        exportCharacter() {
            const exportObject = {
                "_meta": {
                    "source": "CharacterForge",
                    "version": 1,
                },
                "character": this.character

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
    }
}
</script>

<template>
    <div v-if="character !== undefined">
        <div class="w-full flex flex-row gap-3">
            <div class=" min-w-90 bg-white rounded-md shadow-xl p-2 flex flex-row items-center gap-2">
                <a href="/"><img src="/logo.webp" alt="logo" width="64" height="64"></a>
                <h2 class="font-bold text-3xl">{{ character?.name }}</h2>
            </div>
            <div class="w-160 bg-white rounded-md shadow-xl p-2 grid grid-cols-3">
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
    </div>
</template>