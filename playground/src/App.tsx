//@ts-nocheck

import * as React from "react";
import { Form, InputField } from "@timeax/form-palette";
import {
    Check,
    Globe2,
    Hash,
    Info,
    MapPin,
    SearchIcon,
    Volume2,
    VolumeX,
    Sun,
    Moon,
    Sparkles,
    RefreshCw,
    CheckCircle,
    AlertCircle,
    FileJson,
    LayoutDashboard,
    Type,
    ToggleLeft,
    Layers,
    FileCode2,
    Play
} from "lucide-react";
import { Textarea } from "@timeax/form-palette";
import { cn } from "@timeax/form-palette/lib/utils";
import { TreeSelectOption } from "@timeax/form-palette/presets/shadcn/variants/treeselect";
import {
    FileItem,
    CustomFileLoader,
    FileLike,
} from "@timeax/form-palette/presets/shadcn/variants/file";

// Options
const permissionOptions = [
    { code: "read", title: "Read content", notes: "View only" },
    { code: "write", title: "Write content", notes: "Create & edit" },
    { code: "delete", title: "Delete content", notes: "Remove items" },
] as const;

const dummyListerHost = {
    can: () => true,
    log: (entry: any) => console.log("[Lister]", entry),
};

const userListerDef = {
    source: {
        endpoint: "https://jsonplaceholder.typicode.com/users",
        method: "GET",
    },
    mapping: {
        optionValue: (raw: any) => raw.id,
        optionLabel: (raw: any) => raw.name,
        optionDescription: (raw: any) => raw.email,
    },
};

const largeSelectOptions = Array.from({ length: 2000 }, (_, i) => ({
    value: `opt-${i + 1}`,
    label: `Option #${i + 1}`,
    description: `This is the description for option number ${i + 1}`,
}));

const regionOptions: TreeSelectOption[] = [
    {
        label: "Africa",
        value: "africa",
        icon: <Globe2 className="h-3.5 w-3.5" />,
        children: [
            {
                label: "Nigeria",
                value: "ng",
                description: "Lagos, Abuja, Port Harcourt",
                icon: <MapPin className="h-3.5 w-3.5" />,
            },
            {
                label: "Ghana",
                value: "gh",
                description: "Accra, Kumasi",
            },
            {
                label: "Kenya",
                value: "ke",
                description: "Nairobi, Mombasa",
            },
        ],
    },
    {
        label: "Europe",
        value: "europe",
        icon: <Globe2 className="h-3.5 w-3.5" />,
        children: [
            {
                label: "United Kingdom",
                value: "uk",
                description: "England, Scotland, Wales, NI",
            },
            {
                label: "Germany",
                value: "de",
            },
            {
                label: "France",
                value: "fr",
            },
        ],
    },
    {
        label: "Asia",
        value: "asia",
        icon: <Globe2 className="h-3.5 w-3.5" />,
        children: [
            {
                label: "India",
                value: "in",
            },
            {
                label: "Japan",
                value: "jp",
            },
            {
                label: "Singapore",
                value: "sg",
            },
        ],
    },
];

type PillToggleProps = {
    checked?: boolean;
    onCheckedChange?: (next: boolean) => void;
    disabled?: boolean;
    children?: React.ReactNode;
};

const PillToggle = React.forwardRef<HTMLButtonElement, PillToggleProps>(
    function PillToggle(props, ref) {
        const { checked = false, onCheckedChange, disabled, children } = props;

        return (
            <button
                ref={ref}
                type="button"
                disabled={disabled}
                onClick={() => onCheckedChange?.(!checked)}
                className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    checked
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-input hover:bg-muted",
                    disabled && "opacity-50 cursor-not-allowed",
                )}
            >
                <span
                    className={cn(
                        "flex size-3.5 items-center justify-center rounded-full border",
                        checked
                            ? "border-primary-foreground bg-primary-foreground text-primary"
                            : "border-muted-foreground/40 text-muted-foreground",
                    )}
                >
                    {checked && <Check className="size-3" />}
                </span>
                <span className="truncate">{children ?? "Toggle"}</span>
            </button>
        );
    },
);

export const App: React.FC = () => {
    const formRef = React.useRef<any>(null);
    const [activeTab, setActiveTab] = React.useState<"dashboard" | "text" | "choice" | "advanced">("dashboard");
    const [darkMode, setDarkMode] = React.useState<boolean>(false);
    const [tick, setTick] = React.useState<number>(0);
    const [outputLog, setOutputLog] = React.useState<string[]>([]);
    
    // Controlled states
    const [regions, setRegions] = React.useState<(string | number)[] | undefined>();

    const forceUpdate = () => setTick(t => t + 1);

    const logOutput = (msg: string) => {
        setOutputLog(prev => [ `[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 15) ]);
    };

    const handleFormSubmit = (e: any) => {
        console.log("Form Submitted:", e.formData);
        logOutput(`Form Submitted: ${JSON.stringify(e.formData)}`);
    };

    // Pre-fill profile mock values
    const handlePreFill = () => {
        if (!formRef.current) return;
        formRef.current.persist({
            email: "david@example.com",
            phone: "08012345678",
            password: "SecurePassword123!",
            age: 28,
            color: "#6366f1",
            birthdate: "1998-05-12",
            tags: ["React", "Typescript", "Tailwind"],
            notes: "Developing high-performance, modular UI form components with state adapters.",
            subscribe: true,
            plan: "pro",
            newsletter: true,
            gdpr_consent: true,
            volume: 75,
            countries: ["ng", "ke"]
        });
        logOutput("Pre-filled form values programmatically.");
        forceUpdate();
    };

    const handleReset = () => {
        if (!formRef.current) return;
        // Call reset on each field
        formRef.current.inputs.all().forEach((f: any) => {
            if (typeof f.reset === "function") f.reset();
        });
        logOutput("Reset form state.");
        forceUpdate();
    };

    const handleValidate = () => {
        if (!formRef.current) return;
        const valid = formRef.current.validate(true);
        logOutput(`Validation run completed. Form is ${valid ? "VALID" : "INVALID"}.`);
        forceUpdate();
    };

    // Form states
    const currentValues = formRef.current ? formRef.current.values() : {};
    const isDirty = formRef.current ? formRef.current.isDirty() : false;
    const registeredFields = formRef.current ? formRef.current.inputs.all() : [];

    const fieldErrors = registeredFields.reduce((acc: any, field: any) => {
        if (field.error) acc[field.name || field.bindId] = field.error;
        return acc;
    }, {});

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="size-4" /> },
        { id: "text", label: "Text & Fields", icon: <Type className="size-4" /> },
        { id: "choice", label: "Choices & Inputs", icon: <ToggleLeft className="size-4" /> },
        { id: "advanced", label: "Advanced Controls", icon: <Layers className="size-4" /> },
    ] as const;

    return (
        <div className={cn("min-h-screen flex flex-col font-sans transition-colors duration-200", darkMode ? "dark bg-neutral-950 text-neutral-50" : "bg-neutral-50 text-neutral-900")}>
            
            {/* Glossy Glassmorphism Header */}
            <header className="sticky top-0 z-40 border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground p-2 rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
                        <Sparkles className="size-5" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
                            @timeax/form-palette
                            <span className="text-[10px] bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full font-semibold">
                                v0.2.2
                            </span>
                        </h1>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Interactive Form Runtime Showcase</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400 transition-all active:scale-95"
                        title="Toggle dark mode"
                    >
                        {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
                    </button>
                </div>
            </header>

            {/* Main Layout Grid */}
            <div className="flex-1 max-w-8xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-[240px_1fr_400px] gap-6">
                
                {/* 1. Sidebar Navigation */}
                <aside className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 px-3 mb-2">Showcase Sections</p>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-98",
                                activeTab === item.id
                                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm"
                                    : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-150 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </aside>

                {/* 2. Active Preview Canvas */}
                <main className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl p-6 shadow-sm flex-1 flex flex-col">
                        
                        <Form 
                            formRef={formRef} 
                            onSubmit={handleFormSubmit}
                            onChange={() => {
                                forceUpdate();
                            }}
                            wrapped 
                            gap={20}
                        >
                            {activeTab === "dashboard" && (
                                <div className="space-y-6 flex-1 flex flex-col justify-center">
                                    <div className="text-center max-w-md mx-auto space-y-3">
                                        <div className="bg-neutral-100 dark:bg-neutral-800 size-16 rounded-full flex items-center justify-center mx-auto text-primary">
                                            <Sparkles className="size-8" />
                                        </div>
                                        <h3 className="text-xl font-bold">Form Palette Engine</h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Explore registered layout variants, real-time validation feedback, schema binding, and state inspections. Toggle tabs on the left to configure fields.
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto w-full pt-4">
                                        <button
                                            type="button"
                                            onClick={handlePreFill}
                                            className="flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-sm font-medium py-3 px-4 rounded-2xl transition-all active:scale-95 cursor-pointer"
                                        >
                                            <Sparkles className="size-4 text-indigo-500" />
                                            Fill Mock Data
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-sm font-medium py-3 px-4 rounded-2xl transition-all active:scale-95 cursor-pointer"
                                        >
                                            <RefreshCw className="size-4 text-emerald-500" />
                                            Reset State
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "text" && (
                                <div className="space-y-5">
                                    <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Text & Textarea Fields</h3>
                                    
                                    <InputField
                                        name="email"
                                        label="Email Address"
                                        description="Standard text field with format check."
                                        variant="text"
                                        placeholder="david@example.com"
                                        required
                                    />
                                    
                                    <InputField
                                        name="phone"
                                        label="Phone Number"
                                        description="Uses local masking pattern and digit filters."
                                        variant="text"
                                        mask="+99 99 999 999"
                                        slotChar="_"
                                        placeholder="+23 48 012 345"
                                        autoClear
                                    />
                                    
                                    <InputField
                                        name="password"
                                        label="Password"
                                        description="Secure entry with password strength indicators."
                                        variant="password"
                                        placeholder="Enter secure password"
                                        strengthMeter
                                        meterStyle="rules"
                                        showToggle
                                    />

                                    <InputField
                                        name="notes"
                                        label="Bio/Notes"
                                        description="Custom Textarea variant with automatic resize features."
                                        variant="textarea"
                                        placeholder="Add some details about yourself..."
                                        rows={3}
                                    />

                                    <InputField
                                        name="tags"
                                        label="Skills/Tags"
                                        description="Chip creator. Press Enter or comma to create chips."
                                        variant="chips"
                                        placeholder="React, Typescript, Tailwind"
                                        clearable
                                    />
                                </div>
                            )}

                            {activeTab === "choice" && (
                                <div className="space-y-5">
                                    <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Choices & Selection Fields</h3>

                                    <InputField
                                        name="subscribe"
                                        label="Subscribe to Product Updates"
                                        description="Simple toggle switch variant."
                                        variant="toggle"
                                    />

                                    <InputField
                                        name="plan"
                                        variant="radio"
                                        label="Pricing Plan"
                                        description="Choose your account tier."
                                        items={[
                                            { value: "free", label: "Free Plan", description: "Basic access limit" },
                                            { value: "pro", label: "Pro Plan", description: "All variants unlocked" },
                                        ]}
                                    />

                                    <InputField
                                        name="volume"
                                        variant="slider"
                                        label="Volume/Intensity"
                                        description="Slider variant with leading & trailing icons."
                                        min={0}
                                        max={100}
                                        step={5}
                                        leadingIcons={[<VolumeX key="v-off" className="size-4 text-muted-foreground" />]}
                                        trailingIcons={[<Volume2 key="v-on" className="size-4 text-muted-foreground" />]}
                                    />

                                    <InputField
                                        name="newsletter"
                                        variant="checkbox"
                                        label="Newsletter opt-in"
                                        description="Single boolean checkbox."
                                        single
                                    />

                                    <InputField
                                        name="gdpr_consent"
                                        variant="checkbox"
                                        label="GDPR Tri-state Consent"
                                        description="Checkbox supporting True, False, and undefined (none)."
                                        single
                                        tristate
                                    />
                                </div>
                            )}

                            {activeTab === "advanced" && (
                                <div className="space-y-5">
                                    <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Advanced Selectors</h3>

                                    <InputField
                                        name="age"
                                        label="Age (Numeric)"
                                        description="InputNumber supporting locale fraction controls and vertically stacked buttons."
                                        variant="number"
                                        min={0}
                                        max={120}
                                        step={1}
                                        showButtons
                                    />

                                    <InputField
                                        name="color"
                                        label="Swatch Color Picker"
                                        description="HEX color picker with visible palette toggle."
                                        variant="color"
                                        showPreview
                                    />

                                    <InputField
                                        name="birthdate"
                                        label="Birthdate"
                                        description="Shadcn Popover Calendar picker."
                                        variant="date"
                                    />

                                    <InputField
                                        name="countries"
                                        variant="multi-select"
                                        label="Target Regions"
                                        description="Searchable multiselect dropdown option."
                                        options={[
                                            { label: "Nigeria", value: "ng" },
                                            { label: "Ghana", value: "gh" },
                                            { label: "Kenya", value: "ke" },
                                            { label: "Tanzania", value: "tz" }
                                        ]}
                                        showSelectAll
                                        clearable
                                        searchable
                                    />

                                    <InputField
                                        name="regions"
                                        label="Locations (TreeSelect)"
                                        description="Hierarchical dropdown with collapsible parent-nodes."
                                        variant="treeselect"
                                        value={regions}
                                        onValue={(next) => {
                                            setRegions(next);
                                            forceUpdate();
                                        }}
                                        options={regionOptions}
                                        searchable
                                        clearable
                                        expandAll
                                        leafOnly
                                        icon={<Globe2 className="size-4 text-muted-foreground" />}
                                    />

                                    <InputField
                                        name="icon_picker"
                                        label="Icon Picker (Virtualized Grid)"
                                        description="Uses custom VirtualScrollGrid with custom ScrollArea layout scrollbars to display thousands of icons."
                                        variant="icon"
                                    />

                                    <InputField
                                        name="lister_select"
                                        label="Lister User Select (Virtualized List)"
                                        description="Uses custom VirtualScroll component for high-performance virtual selection of remote options."
                                        variant="lister"
                                        host={dummyListerHost}
                                        def={userListerDef}
                                        mode="multiple"
                                    />

                                    <InputField
                                        name="large_select"
                                        variant="select"
                                        label="Large Select List (Virtualized)"
                                        description="A select dropdown with 2,000 dynamically generated options showing the custom ScrollArea virtual scroller."
                                        options={largeSelectOptions}
                                        searchable
                                        clearable
                                        virtualScroll
                                    />
                                </div>
                            )}

                            {/* Sticky footer action button in non-dashboard views */}
                            {activeTab !== "dashboard" && (
                                <div className="pt-4 mt-auto border-t border-neutral-200/50 dark:border-neutral-800/50 flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-semibold px-6 py-2.5 rounded-2xl flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                                    >
                                        <Play className="size-3.5 fill-current" />
                                        Submit Form
                                    </button>
                                </div>
                            )}
                        </Form>

                    </div>
                </main>

                {/* 3. Live State Inspector Card */}
                <aside className="flex flex-col gap-6">
                    
                    {/* Console & Quick Actions */}
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                                <Sparkles className="size-3.5 text-indigo-500" />
                                Controls
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={handleValidate}
                                className="bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-950 dark:hover:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 text-xs font-medium py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
                            >
                                Validate Form
                            </button>
                            <button
                                onClick={handleReset}
                                className="bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-950 dark:hover:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 text-xs font-medium py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
                            >
                                Reset Form
                            </button>
                        </div>
                    </div>

                    {/* Metadata & Status Card */}
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl p-5 shadow-sm space-y-4">
                        <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                            <FileJson className="size-3.5 text-emerald-500" />
                            Live State Inspector
                        </span>

                        {/* Status badges */}
                        <div className="flex flex-wrap gap-2 pt-1">
                            <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5",
                                isDirty 
                                    ? "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400" 
                                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                            )}>
                                <span className={cn("size-1.5 rounded-full", isDirty ? "bg-amber-500" : "bg-neutral-400")} />
                                {isDirty ? "DIRTY" : "PRISTINE"}
                            </span>

                            <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5",
                                Object.keys(fieldErrors).length > 0
                                    ? "bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400"
                                    : "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                            )}>
                                {Object.keys(fieldErrors).length > 0 ? (
                                    <>
                                        <AlertCircle className="size-3 shrink-0" />
                                        INVALID ({Object.keys(fieldErrors).length})
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="size-3 shrink-0" />
                                        VALID
                                    </>
                                )}
                            </span>

                            <span className="text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full">
                                FIELDS: {registeredFields.length}
                            </span>
                        </div>

                        {/* Values JSON */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold text-neutral-400">Current Values</span>
                            </div>
                            <pre className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl p-4 text-xs overflow-x-auto max-h-[300px] select-text text-neutral-700 dark:text-neutral-300">
                                {JSON.stringify(currentValues, null, 2)}
                            </pre>
                        </div>

                        {/* Error Log */}
                        {Object.keys(fieldErrors).length > 0 && (
                            <div className="space-y-1.5">
                                <span className="text-[11px] font-semibold text-rose-500">Active Errors</span>
                                <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 rounded-2xl p-4 space-y-2 max-h-[200px] overflow-y-auto">
                                    {Object.entries(fieldErrors).map(([key, msg]) => (
                                        <div key={key} className="text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2">
                                            <span className="font-semibold">{key}:</span>
                                            <span>{msg as string}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Console logs */}
                        <div className="space-y-1.5">
                            <span className="text-[11px] font-semibold text-neutral-400">Activity Log</span>
                            <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl p-3 text-[10px] h-[120px] overflow-y-auto space-y-1">
                                {outputLog.length === 0 ? (
                                    <div className="text-neutral-400 italic text-center py-8">No actions logged yet</div>
                                ) : (
                                    outputLog.map((log, idx) => (
                                        <div key={idx} className="text-neutral-500 dark:text-neutral-400 break-words leading-tight">{log}</div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                </aside>

            </div>
        </div>
    );
};
