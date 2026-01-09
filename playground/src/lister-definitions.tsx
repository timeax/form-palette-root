import { ListerDefinition } from "@timeax/form-palette/presets/lister";

export const characterLister: ListerDefinition<any, number> = {
    id: "characters",
    title: "Characters",
    source: {
        endpoint: "https://rickandmortyapi.com/api/character",
        method: "GET",
    },
    selector: "results",
    mapping: {
        optionLabel: "name",
        optionValue: "id",
        optionDescription: (raw) => `${raw.species} • ${raw.status}`,
        optionIcon: "image",
        optionGroup: "gender",
    },
    search: {
        default: "name",
    },
};
