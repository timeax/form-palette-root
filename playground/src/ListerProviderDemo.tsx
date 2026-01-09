// demo/components/ListerProviderDemo.tsx

import {
    ListerProvider,
    ListerUI,
    useLister,
} from "@timeax/form-palette/presets/lister";
import React from "react";
import { Button } from "@timeax/form-palette/presets/ui/button";

export function ListerProviderDemo() {
    return (
        <ListerProvider>
            <ListerBootstrap />
            <div className="p-6 space-y-4 max-w-xl">
                <h2 className="text-lg font-semibold">Lister Demo</h2>
                <ListerTrigger />
                <ListerUI /> {/* the popover portal */}
            </div>
        </ListerProvider>
    );
}

function ListerTrigger() {
    const { api } = useLister<any>();

    const open = React.useCallback(() => {
        console.log("clicked");
        void api.open(
            "characters", // kind
            {}, // filters
            {
                title: "Select Character",
                mode: "multiple",
                confirm: true,
                permissions: [],
                filtersSpec: {
                    options: [
                        { label: "Alive only", value: "alive" },
                        { label: "Dead only", value: "dead" },
                    ],
                },
                searchMode: "remote",
            },
        );
    }, [api]);

    return <Button onClick={open}>Open Lister</Button>;
}

import { characterLister } from "./lister-definitions";

function ListerBootstrap() {
    const { api } = useLister<any>();

    React.useEffect(() => {
        api.registerPreset("characters", characterLister);
    }, [api]);

    return null;
}
