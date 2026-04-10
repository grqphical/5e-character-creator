
export interface Race {
    name: string;
    source: string;
    page: number;
    size: string[];
    speed: {
        walk?: number;
        fly?: number;
    };
    ability: Array<{
        str?: number;
        dex?: number;
        con?: number;
        int?: number;
        wis?: number;
        cha?: number;
        choose?: {
            from: Array<string>,
            count: number,
        }
    }>;
    traitTags: string[];
    languageProficiencies: Array<{
        [key: string]: boolean;
    }>;
    entries: Array<{
        name: string;
        entries: string[];
        type: string;
    }>;
}