//@ts-nocheck

import * as React from "react";
import { Form, Input, InputField } from "@timeax/form-palette";
import {
    Check,
    Globe2,
    Hash,
    Info,
    MapPin,
    SearchIcon,
    Volume2,
    VolumeX,
} from "lucide-react";
import { Textarea } from "@timeax/form-palette";
import { cn } from "@timeax/form-palette/lib/utils";
import { TreeSelectOption } from "@timeax/form-palette/presets/shadcn-variants/treeselect";
import {
    FileItem,
    CustomFileLoader,
    FileLike,
} from "@timeax/form-palette/presets/shadcn-variants/file";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@radix-ui/react-popover";
import { HeadlessResponsiveDialog } from "./dialog";

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
        // optionValue: (raw: any) => raw.id,
        optionLabel: (raw: any) => raw.name,
        optionDescription: (raw: any) => raw.email,
    },
};

export const App: React.FC = () => {
    function handleSubmit(e: any) {
        // later we'll wire actual values here
        e.form.inputs.getByName("email").setValue("this is nice");
        // alert("Submitted (dummy)");
        console.log(e.form.inputs.getByName("email"), e.formData);
    }
    const [regions, setRegions] = React.useState<
        (string | number)[] | undefined
    >();
    const [openDialog, setOpenDialog] = React.useState(false);
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

    return (
        <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
            <h1>@timeax/form-palette playground</h1>
            <p style={{ marginBottom: 16 }}>
                This is a simple live playground. Editing{" "}
                <code>packages/form-palette/src</code> will hot-reload this
                page.
            </p>

            <div className="mb-4">
                <button
                    className="rounded-md border px-3 py-1 text-sm"
                    type="button"
                    onClick={() => setOpenDialog(true)}
                >
                    Open Form Dialog
                </button>
            </div>
            <InputField variant={"checkbox"} label={"Remember me"} single />
            {/*<InputField*/}
            {/*    variant={"select"}*/}
            {/*    label={"Remember me"}*/}
            {/*    mode={"button"}*/}
            {/*    options={["name", "email", "value"]}*/}
            {/*/>*/}
            <HeadlessResponsiveDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                title="Playground Form"
                description="All form fields wrapped in a responsive dialog."
                drawerAt={640}
                drawerSide="bottom"
                maxVh={90}
            >
                <Form wrapped gap={15} onSubmit={handleSubmit}>
                    <InputField
                        contain
                        icon={
                            <>
                                <SearchIcon /> icon detected
                            </>
                        }
                        name="email"
                        label="Email"
                        sublabel="@example.com"
                        helpText="This is all fake for now."
                        onChange={(e: any) => {
                            console.log("Changed value:", e);
                            // e.preventDefault()
                        }}
                        errorText="This field is required."
                        variant="text"
                    />
                    <InputField
                        name="phone"
                        label="Phone"
                        variant="text"
                        mask="+99 99 999 999? x999"
                        slotChar="_"
                        onChange={(e: any) => {
                            console.log("Phone changed:", e);
                            // e.preventDefault();
                        }}
                        // unmask="raw" // form gets only digits
                        leadingControl={<span>Leading control</span>}
                        prefix="number: "
                        autoClear // clears if incomplete on blur
                    />
                    <InputField
                        name="password"
                        label="Password"
                        variant="phone"
                        onChange={(e: any) => {
                            console.log("Password changed:", e);
                            // e.preventDefault();
                        }}
                        showToggle
                    />
                    <InputField
                        name="age"
                        label="Age"
                        variant="number"
                        onChange={(e: any) => {
                            console.log("Age changed:", e);
                            // e.value = 42;
                            // e.detail.nativeEvent.preventDefault();
                        }}
                        showButtons
                        min={0}
                        max={120}
                        step={1}
                    />
                    <InputField
                        name="color"
                        label="Favorite colour"
                        variant="color"
                        onChange={(e: any) => {
                            console.log("Color changed:", e);
                            // e.preventDefault();
                        }}
                        showPreview
                        previewButtonClassName="bg-gray-200 hover:bg-gray-300"
                    />
                    <InputField
                        name="phone-variant"
                        label="Password variant"
                        variant="password"
                        placeholder="Enter your password "
                        strengthMeter
                        meterStyle="rules"
                        onChange={(e: any) => {
                            console.log("Phone variant changed:", e);
                            // e.preventDefault();
                        }}
                    />
                    <InputField
                        name="birthdate"
                        label="Birthdate"
                        variant="date"
                        onChange={(e: any) => {
                            console.log("Date changed:", e);
                            // e.preventDefault();
                        }}
                    />
                    <InputField
                        name="tags"
                        label="Tags"
                        variant="chips"
                        textareaMode
                        maxChipWidth={150}
                        onChange={(e: any) => {
                            console.log("Tags changed:", e);
                            // e.preventDefault();
                        }}
                    />
                    <InputField
                        name="notes"
                        label="Notes"
                        variant="textarea"
                        rows={4}
                        autoResize={false}
                        placeholder="Write your notes here…"
                        onChange={(e: any) => {
                            console.log("Notes changed:", e);
                            // e.preventDefault();
                        }}
                    />
                    <InputField
                        name="subscribe"
                        helpText={
                            <span>
                                You agree to our{" "}
                                <a href="#">terms of service</a>
                            </span>
                        }
                        label="Subscribe to newsletter"
                        variant="toggle"
                        onChange={(e: any) => {
                            console.log("Subscribe changed:", e);
                            // e.preventDefault();
                        }}
                    />
                    <SubscribeField />
                    <InputField
                        name="plan"
                        variant="radio"
                        label="Choose a plan"
                        items={[
                            {
                                value: "free",
                                label: "Free",
                                description: "Basic features",
                            },
                            {
                                value: "pro",
                                label: "Pro",
                                description: "Advanced tools",
                            },
                        ]}
                        renderOption={({ item, selected, disabled, radio }) => (
                            <label className="flex w-full cursor-pointer items-center gap-3">
                                {radio}
                                <div className="flex flex-col">
                                    <span className="font-medium">
                                        {item.label} {selected && "✓"}
                                    </span>
                                    {item.description && (
                                        <span className="text-xs text-muted-foreground">
                                            {item.description}
                                        </span>
                                    )}
                                </div>
                            </label>
                        )}
                        onChange={(e) => {
                            console.log(e);
                        }}
                    />
                    <InputField
                        name="newsletter"
                        variant="checkbox"
                        label="Subscribe to newsletter"
                        helpText="We only email occasionally."
                        // single-mode checkbox
                        single
                        // non-tristate (default)
                        defaultValue={false} // unchecked (or omit)
                    />
                    <InputField
                        name="gdpr_consent"
                        variant="checkbox"
                        label="GDPR consent"
                        description="You can explicitly accept or reject."
                        // single checkbox tri-state
                        single
                        tristate
                        // undefined → internal "none"
                        defaultValue={undefined}
                        onChange={(e) => {
                            console.log(e.value);
                        }}
                    />
                    <InputField
                        name="roles"
                        variant="checkbox"
                        label="Roles"
                        description="Select the roles assigned to this user."
                        // non-tristate group
                        items={[
                            { value: "viewer", label: "Viewer" },
                            { value: "editor", label: "Editor" },
                            {
                                value: "admin",
                                label: "Admin",
                                description: "Full access",
                            },
                        ]}
                        defaultValue={[{ value: "viewer", state: true }]}
                    />
                    <InputField
                        name="permissions"
                        variant="checkbox"
                        label="Permissions"
                        sublabel="Tri-state aware"
                        helpText="True/false both have meaning; 'none' is not stored."
                        tristate // default for all items
                        items={[
                            {
                                value: "read",
                                label: "Read",
                                description: "Can view content",
                                // inherits tristate: true
                            },
                            {
                                value: "write",
                                label: "Write",
                                description: "Can modify content",
                                // inherits tristate: true
                            },
                            {
                                value: "delete",
                                label: "Delete",
                                description: "Can remove content",
                                tristate: false, // specific item is normal on/off
                            },
                        ]}
                        defaultValue={[
                            { value: "read", state: true },
                            { value: "write", state: false },
                            // "delete" starts at "none" (no entry)
                        ]}
                        onChange={(e) => {
                            console.log(e.value);
                        }}
                    />
                    <InputField
                        name="permissions2"
                        variant="checkbox"
                        label="Permissions (optionValue/optionLabel)"
                        items={permissionOptions}
                        tristate
                        optionValue="code" // maps to TValue
                        optionLabel="title" // label to display
                        renderOption={({
                            item,
                            checkbox,
                            state,
                            effectiveTristate,
                        }) => (
                            <div className="flex w-full items-start gap-3">
                                {checkbox}
                                <div className="flex min-w-0 flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">
                                            {item.label}
                                        </span>
                                        {effectiveTristate && (
                                            <span className="text-[0.7rem] text-muted-foreground">
                                                {state === "none"
                                                    ? "No stance"
                                                    : state === true
                                                      ? "Allowed"
                                                      : "Explicitly denied"}
                                            </span>
                                        )}
                                    </div>

                                    {item.description && (
                                        <span className="mt-0.5 text-xs text-muted-foreground">
                                            {item.description}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    />
                    <InputField
                        name="marketing_optin"
                        variant="checkbox"
                        label="Marketing emails"
                        helpText="We might send you updates about new features."
                        single
                        // inline row: checkbox + label on one row
                        inline
                        labelPlacement="right"
                    />
                    <InputField
                        name="country"
                        variant="select"
                        label="Country"
                        helpText="Used for billing & tax."
                        // ⬇️ These are SELECT VARIANT props, but they live directly on InputField
                        options={[]}
                        optionValue="code"
                        optionLabel="name"
                        searchable
                        searchPlaceholder="Search countries..."
                        emptyLabel="No country selected"
                        emptySearchText="No countries found"
                        clearable
                        // still works with shared props like disabled, required, size, density, etc.
                        required
                    />
                    <InputField
                        name="status"
                        variant="select"
                        label="Status"
                        // options={["active", "paused", "disabled"]}
                        searchable={false}
                        clearable
                        icon={<span>O</span>}
                        autoCap
                    />
                    <BigSelectPrimitiveDemo />
                    <InputField
                        variant="multi-select"
                        name="countries"
                        options={["ng", "gh", "ke", "tz"]}
                        autoCap
                        showSelectAll
                        clearable
                        searchable
                    />
                    <InputField
                        variant="slider"
                        name="volume"
                        label="Volume"
                        helpText="Drag to adjust"
                        min={0}
                        max={100}
                        step={5}
                    />
                    <InputField
                        variant="slider"
                        name="volume"
                        label="Volume"
                        helpText="Drag to adjust"
                        min={0}
                        max={100}
                        step={5}
                        // variant props – all flat, no wrapper
                        leadingIcons={[
                            <VolumeX key="quiet" className="h-4 w-4" />,
                        ]}
                        trailingIcons={[
                            <Volume2 key="loud" className="h-4 w-4" />,
                        ]}
                        leadingControl={
                            <button
                                type="button"
                                className="px-2 text-xs"
                                onClick={() => {
                                    // your own handler via onChange if you want
                                }}
                            >
                                -10
                            </button>
                        }
                        trailingControl={
                            <button
                                type="button"
                                className="px-2 text-xs"
                                onClick={() => {
                                    // your own handler via onChange if you want
                                }}
                            >
                                +10
                            </button>
                        }
                    />
                    // Boxed (first sketch)
                    <InputField
                        variant="slider"
                        name="counter"
                        min={0}
                        max={100}
                        step={5}
                        label="Counter"
                        controlVariant="boxed"
                    />
                    // Edge / loose (second sketch)
                    <InputField
                        variant="slider"
                        name="counterLoose"
                        min={0}
                        max={100}
                        step={5}
                        label="Counter"
                        controlVariant="edge"
                    />
                    <InputField variant="keyvalue" label="Key values" />
                    <AppCustomVariantDemo />
                    <InputField
                        name="regions"
                        label="Regions"
                        description="Pick one or more regions / countries."
                        variant="treeselect" // <-- your ShadcnTreeSelectVariant, wired in the registry
                        value={regions}
                        onValue={(next, detail) => {
                            // `next` is (string | number)[] | undefined
                            // `detail.raw` is the last toggled node's raw option object
                            console.log("TREE VALUE:", next);
                            console.log("LAST TOGGLED RAW:", detail.raw);
                            setRegions(next);
                        }}
                        // Tree-select specific props (merged into InputField props)
                        options={regionOptions}
                        searchable
                        searchPlaceholder="Search regions…"
                        placeholder="Select regions…"
                        clearable
                        autoCap
                        emptySearchText="No matching region"
                        // Only leaf nodes are selectable (countries, not continents)
                        leafOnly
                        expandAll
                        // Icons & controls (same pattern as text/select/slider)
                        icon={
                            <Globe2 className="h-4 w-4 text-muted-foreground" />
                        }
                        trailingIcons={[
                            <MapPin
                                key="pin"
                                className="h-3.5 w-3.5 text-muted-foreground"
                            />,
                        ]}
                        joinControls
                        // extendBoxToControls
                        size="md"
                        multiple={false}
                        density="comfortable"
                    />
                    <InputField
                        variant="file"
                        multiple={false}
                        placeholder="Load file"
                        onChange={(e) => console.log(e)}
                    />
                    <InputField
                        variant="toggle-group"
                        options={["light", "dark"]}
                        autoCap
                        itemClassName="bg-amber-600"
                        activeClassName="data-[state=on]:bg-[red]"
                        fillWidth
                    />
                    <InputField variant={"editor"} />
                    <InputField
                        variant="json-editor"
                        label="Configuration (Popover)"
                        description="Advanced JSON configuration with schema validation (Popover mode)"
                        defaultValue={{
                            api: {
                                endpoint: "https://api.example.com",
                                timeout: 5000,
                                retry: true,
                            },
                            features: ["auth", "logging"],
                        }}
                        schema={{
                            type: "object",
                            properties: {
                                api: {
                                    type: "object",
                                    properties: {
                                        endpoint: {
                                            type: "string",
                                            format: "uri",
                                        },
                                        timeout: { type: "number", minimum: 0 },
                                        retry: { type: "boolean" },
                                    },
                                    required: ["endpoint"],
                                },
                                features: {
                                    type: "array",
                                    items: { type: "string" },
                                },
                            },
                        }}
                    />
                    <InputField
                        variant="json-editor"
                        mode="accordion"
                        label="Settings (Accordion)"
                        description="Inline JSON editor with accordion-like expansion"
                        defaultValue={{
                            theme: "dark",
                            notifications: {
                                email: true,
                                push: false,
                            },
                        }}
                    />
                    <ListerSample />
                    <AppSamples />
                    <button type="submit">Submit</button>
                </Form>
            </HeadlessResponsiveDialog>

            <div className="mt-10 p-6 border-t">
                <h2 className="text-xl font-bold mb-4">
                    JSON Editor Samples (Outside Dialog)
                </h2>
                <Form
                    valueBag={{status: 'disabled', statuses: ['disabled']}}
                    onSubmit={(e) =>
                        console.log("Outside form submit", e.formData)
                    }
                >
                    <InputField
                        variant={"select"}
                        name={"status"}
                        autoCap
                        label={"Status"}
                        options={["active", "inactive", "disabled"]}
                    />

                    <InputField
                        variant={"multi-select"}
                        name={"statuses"}
                        autoCap
                        label={"Status"}
                        options={["active", "inactive", "disabled"]}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Accordion Mode</h3>
                            <InputField
                                variant="json-editor"
                                mode="accordion"
                                label="Project Config"
                                description="Directly embedded in the layout"
                                defaultValue={{
                                    name: "form-palette",
                                    version: "1.0.0",
                                    dependencies: {
                                        react: "^18.0.0",
                                        ajv: "^8.0.0",
                                    },
                                }}
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-semibold">Popover Mode</h3>
                            <InputField
                                variant="json-editor"
                                mode="popover"
                                label="User Metadata"
                                description="Opens in a popover for better space usage"
                                triggerLabel="Edit Metadata"
                                optionValue={"id"}
                                defaultValue={{
                                    lastLogin: "2023-10-27T10:00:00Z",
                                    preferences: {
                                        language: "en",
                                        timezone: "UTC",
                                    },
                                }}
                            />
                        </div>
                    </div>
                </Form>

                <h2 className="text-xl font-bold mt-12 mb-4">
                    Lister Samples (Outside Dialog)
                </h2>
                <Form
                    onSubmit={(e) =>
                        console.log("Lister form submit", e.formData)
                    }
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Single Selection</h3>
                            <InputField
                                variant="lister"
                                label="Remote User"
                                description="Select a single user from API"
                                host={dummyListerHost}
                                onChange={(e) =>
                                    console.log("Lister change", e)
                                }
                                def={userListerDef}
                                mode="single"
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-semibold">
                                Multiple Selection
                            </h3>
                            <InputField
                                variant="lister"
                                label="Remote Users"
                                description="Select multiple users from API"
                                host={dummyListerHost}
                                optionValue={"id"}
                                def={userListerDef}
                                mode="multiple"
                                defaultValue={[1, 2]}
                            />
                        </div>
                    </div>

                    <InputField
                        variant="lister"
                        label="Remote Users"
                        description="Select multiple users from API"
                        host={dummyListerHost}
                        optionValue="id"
                        def={userListerDef}
                        mode="multiple"
                        defaultValue={[1, 2]}
                        filtersSpec={{
                            options: [
                                // input-based filter (bindKey => filter column/key)
                                {
                                    value: "name",
                                    label: "Name",
                                    description: "Filter by name",
                                    input: {
                                        variant: "text",
                                        bindKey: "name",
                                        unsetOnEmpty: true,
                                        props: {
                                            placeholder: "e.g. Leanne",
                                        },
                                    },
                                },

                                {
                                    value: "email_domain",
                                    label: "Email domain",
                                    bindKey: "email_domain",
                                    children: [
                                        {
                                            id: "email_domain.email_gmail", // ✅ matches UI generated id
                                            value: "email_gmail",
                                            label: "Gmail",
                                            kind: "value",
                                            dbValue: "gmail.com",
                                            bindKey: "email_domain", // ✅ add if inheritance isn't working yet
                                        },
                                        {
                                            id: "email_domain.email_yahoo",
                                            value: "email_yahoo",
                                            label: "Yahoo",
                                            kind: "value",
                                            dbValue: "yahoo.com",
                                            bindKey: "email_domain",
                                        },
                                        {
                                            id: "email_domain.email_org",
                                            value: "email_org",
                                            label: ".org",
                                            kind: "value",
                                            dbValue: "org",
                                            bindKey: "email_domain",
                                        },
                                    ],
                                },

                                // simple toggle (true => applied; click again => unset)
                                {
                                    value: "has_phone",
                                    label: "Has phone",
                                    description: "Applies has_phone=true",
                                    kind: "value",
                                    bindKey: "has_phone",
                                    dbValue: true,
                                    apply: { toggleable: true },
                                },
                            ],
                        }}
                    />
                </Form>
            </div>
        </div>
    );
};

export function AppSamples() {
    const [files, setFiles] = React.useState<FileItem[]>([]);

    // Custom media-manager loader (no native file dialog)
    const mediaManagerLoader = React.useCallback<CustomFileLoader>(
        async ({ multiple, current }) => {
            // In reality: open your media manager and resolve with user choices
            const base: FileItem[] = [
                {
                    id: "hero-banner",
                    kind: "external",
                    name: "banner-hero.jpg",
                    size: 256_000,
                    type: "image/jpeg",
                    path: "/uploads/banner-hero.jpg",
                    meta: { source: "media-manager" },
                },
                {
                    id: "logo-dark",
                    kind: "external",
                    name: "logo-dark.svg",
                    size: 14_000,
                    type: "image/svg+xml",
                    path: "/uploads/logo-dark.svg",
                    meta: { source: "media-manager" },
                },
            ];

            return multiple ? base : base[0];
        },
        [],
    );

    return (
        <div className="space-y-6 p-6">
            <InputField
                variant="file"
                name="hero_media"
                label="Hero media"
                description="Selected via custom media manager, but drag-and-drop still works."
                // value + change
                value={files}
                onValue={(next, detail) => {
                    setFiles(next);
                    console.log("file change", next, detail);
                }}
                // core file behaviour (all flat props – NO variantProps)
                multiple
                customLoader={mediaManagerLoader}
                mergeMode="append" // or "replace"
                showDropArea
                dropTitle="Click to open media manager or drop files"
                dropDescription="You can mix uploads with existing media files."
                showCheckboxes // enable multi-select + bulk delete
                accept={["image/*", ".pdf"]}

                // optional: custom item renderer etc. (if you expose them)
                // renderFileItem={({ item }) => <div>{item.name}</div>}
            />
        </div>
    );
}

const bigCountryList = Array.from(
    { length: 2000 },
    (_, i) => `country-${i + 1}`,
);

export function BigSelectPrimitiveDemo() {
    return (
        <div className="max-w-md space-y-4">
            <InputField
                variant="select"
                name="country"
                label="Select a country"
                description="2,000 items, searchable + virtual scroll"
                // core select props
                options={bigCountryList}
                autoCap
                searchable
                clearable
                placeholder="Choose one…"
                // performance bits
                virtualScroll
                virtualScrollPageSize={80} // show 80 at a time
                virtualScrollThreshold={64} // load more when ~64px from bottom
                // just to show the value coming back
                onChange={(e) => {
                    // e.value is string | undefined here
                    // console.log("selected:", e.value);
                }}
            />
        </div>
    );
}

type SubscribeDecision = "yes" | "no";

const subscribeOptions = [
    {
        value: "yes" as SubscribeDecision,
        label: "Yes, keep me updated",
        description: "We’ll send occasional product updates.",
    },
    {
        value: "no" as SubscribeDecision,
        label: "No, don’t send me emails",
        description: "You can still see updates in your dashboard.",
    },
];

export function SubscribeField() {
    return (
        <InputField
            name="subscribe"
            variant="radio"
            // chrome
            label="Subscribe to product updates?"
            helpText="You can toggle this off anytime."
            // everything else (sublabel, description, helpText, error)
            // will be positioned by the smart layout graph

            // you can still override placements if desired:
            // sublabelPlacement="right"
            // descriptionPlacement="below"
            // helpTextPlacement="below"

            defaultValue={"yes" as SubscribeDecision}
            items={subscribeOptions}
        />
    );
}

function CommentBox() {
    const [value, setValue] = React.useState("");

    return (
        <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Leave a comment…"
            size="md"
            density="normal"
            upperLeadingControl={
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Info className="h-3 w-3" />
                    <span>Markdown supported</span>
                </div>
            }
            upperTrailingControl={
                <span className="text-xs text-muted-foreground tabular-nums">
                    {value.length}/280
                </span>
            }
        />
    );
}

function NotesWithAction() {
    const [value, setValue] = React.useState("");

    return (
        <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add some internal notes…"
            size="sm"
            joinControls={true}
            extendBoxToControls={true}
            trailingControl={
                <button
                    type="button"
                    className="inline-flex h-full items-center px-3 text-xs font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setValue("")}
                >
                    Clear
                </button>
            }
        />
    );
}

function RichCommentBox() {
    const [value, setValue] = React.useState("");

    return (
        <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your update…"
            size="md"
            density="normal"
            upperLeadingIcons={[
                <Hash key="tag" className="h-3 w-3 text-muted-foreground" />,
                <Info key="info" className="h-3 w-3 text-muted-foreground" />,
            ]}
            extendBoxToToolbox
            upperControl={
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-[0.7rem] text-muted-foreground hover:bg-muted/80"
                >
                    Preview
                </button>
            }
            trailingControl={
                <button
                    type="button"
                    className="inline-flex h-full items-center px-3 text-xs font-medium text-primary hover:text-primary/80"
                >
                    Post
                </button>
            }
            joinControls={true}
            extendBoxToControls={true}
        />
    );
}

function LimitedTextarea() {
    const [value, setValue] = React.useState("");

    return (
        <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Max 200 chars, single line only…"
            rows={1}
            keyFilter={(next, { input }) => {
                if (next.length > 200) return false;
                if (/\r|\n/.test(next)) return false;
                return true;
            }}
            keyFilterOn="beforeinput"
            keyFilterOnPaste={true}
        />
    );
}

function HexDumpTextarea() {
    const [value, setValue] = React.useState("");

    return (
        <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter hex data (0–9, A–F)…"
            size="md"
            density="compact"
            keyFilter="hex" // preset from the textarea
            keyFilterOn="beforeinput"
            keyFilterOnPaste={true}
        />
    );
}

/**
 * Example custom control that doesn't know anything
 * about the form system. It just speaks:
 *
 *   - checked: boolean
 *   - onCheckedChange(next: boolean)
 */
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
                <span className="truncate">{children}</span>
            </button>
        );
    },
);

/**
 * Demo: using the "custom" variant with ShadcnCustomVariant.
 *
 * Assumes your variants registry maps:
 *   custom → ShadcnCustomVariant
 */
export function AppCustomVariantDemo() {
    return (
        <div className="space-y-6 p-6">
            <h2 className="text-lg font-semibold">Custom variant demo</h2>

            <InputField
                variant="custom"
                name="pill-toggle"
                label="Join beta program"
                description="This field uses a completely custom React component wired through the custom variant."
                defaultValue={false}
                // --- custom variant wiring ---
                component={PillToggle}
                valueProp="checked"
                changeProp="onCheckedChange"
                disabledProp="disabled"
                // optional: enrich ChangeDetail
                mapDetail={(raw) => ({
                    source: "variant",
                    raw,
                    nativeEvent: undefined,
                    meta: { from: "PillToggle" },
                })}
                // Just to see what comes out on the host side:
                onChange={(e) => {
                    // e.value is the next field value (boolean)
                    // e.detail is the ChangeDetail from mapDetail
                    // eslint-disable-next-line no-console
                    console.log("custom field changed:", e.value, e.detail);
                }}
            >
                what eber
                {/* You can also ignore children entirely; this is just to show it works */}
            </InputField>
        </div>
    );
}

const ListerSample = () => {
    return "";
    return (
        <>
            <InputField
                variant="lister"
                label="User (Single Select)"
                description="Select a user via Lister"
                host={dummyListerHost}
                def={userListerDef}
                mode="single"
            />
            <InputField
                variant="lister"
                label="Users (Multi Select)"
                description="Select multiple users via Lister"
                host={dummyListerHost}
                def={userListerDef}
                mode="multiple"
            />
        </>
    );
};
