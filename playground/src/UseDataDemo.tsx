// demo/components/UseDataDemo.tsx


import { useData } from "@timeax/form-palette/presets/lister";
import { Input } from "@timeax/form-palette/presets/ui/input";
import { Button } from "@timeax/form-palette/presets/ui/button";
import { cn } from "@timeax/form-palette/lib/utils";

export function UseDataDemo() {
    const data = useData({
        id: "demo_characters",
        endpoint: "https://rickandmortyapi.com/api/character",
        method: "GET",
        selector: "results", // the JSON path: { info, results: [...] }

        search: { default: "name" },
        fetchOnMount: true,
        searchMode: "local",
        selection: { mode: "multiple", key: "id" },
    });

    return (
        <div className="p-6 space-y-4 max-w-xl">
            <h2 className="text-lg font-semibold">useData Demo</h2>

            <div className="flex gap-2">
                <Input
                    value={data.query}
                    onChange={(e) => data.setQuery(e.target.value)}
                    placeholder="Search characters…"
                    className="flex-1"
                />
                <Button onClick={() => data.refresh()}>Refresh</Button>
            </div>

            {data.loading && <p className="text-sm opacity-60">Loading…</p>}
            {data.error && (
                <p className="text-sm text-red-500">
                    Error: {String(data.error.message ?? data.error)}
                </p>
            )}

            <ul className="divide-y border rounded-md">
                {data.visible.map((char: any) => (
                    <li
                        key={char.id}
                        className={cn(
                            "flex items-center gap-3 p-3 cursor-pointer",
                            data.isSelected(char.id) && "bg-muted",
                        )}
                        onClick={() => data.toggle(char.id)}
                    >
                        <img
                            src={char.image}
                            alt={char.name}
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="truncate font-medium">
                                {char.name}
                            </div>
                            <div className="text-xs opacity-70">
                                {char.species} · {char.status}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="text-sm mt-2 opacity-70">
                Selected:{" "}
                {Array.isArray(data.selected)
                    ? data.selected.map((c: any) => c.name).join(", ")
                    : ((data.selected as any)?.name ?? "None")}
            </div>
        </div>
    );
}
