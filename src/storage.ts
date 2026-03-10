import { defineStore } from "pinia";
import type { Character } from "./models";

export const useCharacterStore = defineStore('character', {
    state: () => {
        let savedCharacters = localStorage.getItem("characters")
        if (savedCharacters === null) {
            return { characters: [] as Array<Character> }
        }
        return { characters: JSON.parse(savedCharacters) as Array<Character> }
    },
    actions: {
        addCharacter(character: Character) {
            if (character === null) {
                return;
            }
            this.characters.push(character);
            this.saveCharacters()
        },
        saveCharacters() {
            localStorage.setItem("characters", JSON.stringify(this.characters))
        },
        deleteCharacter(id: number) {
            this.characters.splice(id, 1)
            this.saveCharacters()
        },
        updateCharacter(idx: number, character: Character) {
            this.characters[idx] = character;
            this.saveCharacters()
        }
    }
})