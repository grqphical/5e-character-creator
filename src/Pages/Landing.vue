<script setup lang="ts">
import { useCharacterStore } from "../storage"
const characterStore = useCharacterStore();

const handleDeleteButton = (id: number) => {
    if (!confirm("Are you sure you wish to delete this character")) {
        return;
    }
    characterStore.deleteCharacter(id)
}

const importCharacter = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = false;

    fileInput.onchange = async (e) => {
        const file = (e.target as HTMLInputElement)?.files?.[0];
        if (!file) return;

        const characterJSON = JSON.parse(await file.text())
        if (characterJSON._meta.source !== "CharacterForge" || characterJSON._meta.version !== 1) {
            console.error("Invalid character uploaded")
            return
        }
        const character = characterJSON.character
        characterStore.addCharacter(character)
    };

    fileInput.click();
};
</script>

<template>
    <div class="w-150 mh-90 m-auto p-6 mt-24 rounded-md shadow-xl bg-white flex flex-col">
        <a href="/"><img src="/logo.webp" alt="logo" width="84" height="84"></a>
        <h1 class="text-5xl mb-10 font-bold">CharacterForge</h1>
        <h2 class="text-3xl" v-if="characterStore.characters.length !== 0">Characters:</h2>
        <div class="py-4 flex flex-col gap-2 min-h-64">
            <div v-if="characterStore.characters.length === 0">Hmm no characters have been created...</div>
            <div v-for="(character, i) in characterStore.characters"
                class="px-2 py-3 bg-gray-100 rounded md flex flex-row items-center gap-2">
                <p class="text-lg">{{ character.name }}</p>
                <RouterLink :to="`/character-sheet/${i}`"
                    class="text-lg px-3 py-2 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600 ml-auto text-white">
                    View
                </RouterLink>
                <button class="text-lg px-3 py-2 bg-red-500 rounded-md cursor-pointer hover:bg-red-600 text-white"
                    v-on:click="(_) => handleDeleteButton(i)">
                    Delete
                </button>
            </div>
        </div>
        <div class="flex flex-row gap-2 mt-auto">
            <RouterLink to="/create" class="text-lg px-3 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
                New
                Character</RouterLink>
            <button class="text-lg px-3 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
                @click="importCharacter">Import
                Character</button>
        </div>
        <p class="mt-4">Made by <a class="underline" href="https://nathanjacobson.ca">Nathan Jacobson</a>. <a
                class="underline" href="https://github.com">GitHub</a></p>
    </div>


</template>

<style scoped></style>