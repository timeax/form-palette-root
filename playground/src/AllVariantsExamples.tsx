//@ts-nocheck

import * as React from "react";
import { Form, InputField } from "@timeax/form-palette";

const listerHost = {
    can: () => true,
    log: (entry: any) => console.log("[Lister]", entry),
};

const listerDef = {
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

const treeOptions = [
    {
        value: "africa",
        label: "Africa",
        tags: [{ label: "Region", bgColor: "#f3f4f6" }],
        children: [
            {
                value: "ng",
                label: "Nigeria",
                tags: [{ label: "West", bgColor: "#dbeafe", color: "#1e3a8a" }],
            },
            {
                value: "gh",
                label: "Ghana",
                tags: [{ label: "West", bgColor: "#d1fae5", color: "#065f46" }],
            },
        ],
    },
    {
        value: "europe",
        label: "Europe",
        tags: [{ label: "Region", bgColor: "#f3f4f6" }],
        children: [
            {
                value: "uk",
                label: "United Kingdom",
                tags: [{ label: "English", bgColor: "#fef3c7", color: "#92400e" }],
            },
            {
                value: "de",
                label: "Germany",
                tags: [{ label: "EU", bgColor: "#ede9fe", color: "#5b21b6" }],
            },
        ],
    },
];

const selectOptions = [
    {
        value: "active",
        label: "Active",
        tags: [{ label: "Live", bgColor: "#dcfce7", color: "#166534" }],
    },
    {
        value: "paused",
        label: "Paused",
        tags: [{ label: "Pending", bgColor: "#fef3c7", color: "#92400e" }],
    },
    {
        value: "disabled",
        label: "Disabled",
        tags: [{ label: "Blocked", bgColor: "#fee2e2", color: "#991b1b" }],
    },
];

const countryOptions = [
    {
        value: "ng",
        label: "Nigeria",
        tags: [{ label: "Africa", bgColor: "#dbeafe", color: "#1e40af" }],
    },
    {
        value: "gh",
        label: "Ghana",
        tags: [{ label: "Africa", bgColor: "#dbeafe", color: "#1e40af" }],
    },
    {
        value: "ke",
        label: "Kenya",
        tags: [{ label: "East", bgColor: "#e0e7ff", color: "#3730a3" }],
    },
];

const customTagKeyOptions = [
    {
        value: "free",
        label: "Free",
        badges: [{ text: "Starter", bg: "#f3f4f6", fg: "#374151" }],
    },
    {
        value: "pro",
        label: "Pro",
        badges: [{ text: "Popular", bg: "#dbeafe", fg: "#1e3a8a" }],
    },
    {
        value: "enterprise",
        label: "Enterprise",
        badges: [{ text: "Premium", bg: "#ede9fe", fg: "#5b21b6" }],
    },
];

const fieldTags = [
    { label: "Field tag", bgColor: "#f3f4f6", color: "#111827" },
    { label: "Demo", bgColor: "#e0e7ff", color: "#312e81" },
];

type PillToggleProps = {
    checked?: boolean;
    onCheckedChange?: (next: boolean) => void;
    disabled?: boolean;
};

const PillToggle = React.forwardRef<HTMLButtonElement, PillToggleProps>(
    function PillToggle(props, ref) {
        const { checked = false, onCheckedChange, disabled } = props;
        return (
            <button
                ref={ref}
                type="button"
                disabled={disabled}
                onClick={() => onCheckedChange?.(!checked)}
                className="rounded border px-3 py-1 text-sm"
            >
                {checked ? "On" : "Off"}
            </button>
        );
    },
);

export function AllVariantsExamples() {
    return (
        <div className="space-y-8 mx-6">
            <h2 className="text-xl font-bold">All Variants Showcase</h2>

            <Form wrapped gap={12} onSubmit={(e) => console.log(e)}>
                <InputField
                    name="text_default"
                    variant="text"
                    label="Text"
                    prefix={'$'}
                    placeholder="Enter text"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="number_default"
                    variant="number"
                    label="Number"
                    prefix={'#'}
                    min={0}
                    max={100}
                    showButtons
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="phone_default"
                    variant="phone"
                    label="Phone"
                    showToggle
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="color_default"
                    variant="color"
                    label="Color"
                    showPreview
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="password_default"
                    variant="password"
                    label="Password"
                    strengthMeter
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="date_default"
                    variant="date"
                    label="Date"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="chips_default"
                    variant="chips"
                    label="Chips"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="textarea_default"
                    variant="textarea"
                    label="Textarea"
                    rows={3}
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="toggle_default"
                    variant="toggle"
                    label="Toggle"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="toggle_group_single"
                    variant="toggle-group"
                    label="Toggle Group (Single)"
                    tags={fieldTags}
                    options={customTagKeyOptions}
                    optionTags="badges"
                    optionTagLabel="text"
                    optionTagBgColor="bg"
                    optionTagColor="fg"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="toggle_group_multiple"
                    variant="toggle-group"
                    label="Toggle Group (Multiple)"
                    tags={fieldTags}
                    options={[
                        {
                            value: "read",
                            label: "Read",
                            tags: [{ label: "Safe", bgColor: "#dcfce7", color: "#166534" }],
                        },
                        {
                            value: "write",
                            label: "Write",
                            tags: [{ label: "Edit", bgColor: "#fef3c7", color: "#92400e" }],
                        },
                        {
                            value: "delete",
                            label: "Delete",
                            tags: [{ label: "Danger", bgColor: "#fee2e2", color: "#991b1b" }],
                        },
                    ]}
                    multiple
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="radio_default"
                    variant="radio"
                    label="Radio"
                    tags={fieldTags}
                    items={[
                        {
                            value: "monthly",
                            label: "Monthly",
                            tags: [{ label: "Flex", bgColor: "#dbeafe", color: "#1e3a8a" }],
                        },
                        {
                            value: "yearly",
                            label: "Yearly",
                            tags: [{ label: "Save", bgColor: "#dcfce7", color: "#166534" }],
                        },
                    ]}
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="checkbox_single"
                    variant="checkbox"
                    label="Checkbox (Single)"
                    single
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="checkbox_single_tristate"
                    variant="checkbox"
                    label="Checkbox (Single Tristate)"
                    single
                    tristate
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="checkbox_group"
                    variant="checkbox"
                    label="Checkbox (Group)"
                    tags={fieldTags}
                    items={[
                        {
                            value: "viewer",
                            label: "Viewer",
                            tags: [{ label: "Read-only", bgColor: "#f3f4f6", color: "#374151" }],
                        },
                        {
                            value: "editor",
                            label: "Editor",
                            tags: [{ label: "Edit", bgColor: "#fef3c7", color: "#92400e" }],
                        },
                        {
                            value: "admin",
                            label: "Admin",
                            tags: [{ label: "Full", bgColor: "#fee2e2", color: "#991b1b" }],
                        },
                    ]}
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="checkbox_group_tristate"
                    variant="checkbox"
                    label="Checkbox (Group Tristate)"
                    tristate
                    tags={fieldTags}
                    items={[
                        {
                            value: "read",
                            label: "Read",
                            tags: [{ label: "Access", bgColor: "#dbeafe", color: "#1e3a8a" }],
                        },
                        {
                            value: "write",
                            label: "Write",
                            tags: [{ label: "Change", bgColor: "#fef3c7", color: "#92400e" }],
                        },
                        {
                            value: "delete",
                            label: "Delete",
                            tags: [{ label: "Risk", bgColor: "#fee2e2", color: "#991b1b" }],
                            tristate: false,
                        },
                    ]}
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="select_default"
                    variant="select"
                    label="Select (Default)"
                    tags={fieldTags}
                    options={selectOptions}
                    searchable
                    clearable
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="select_button"
                    variant="select"
                    label="Select (Button Mode)"
                    mode="button"
                    button="Choose status"
                    tags={fieldTags}
                    options={customTagKeyOptions}
                    optionTags="badges"
                    optionTagLabel="text"
                    optionTagBgColor="bg"
                    optionTagColor="fg"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="multi_select_default"
                    variant="multi-select"
                    label="Multi Select (Default)"
                    tags={fieldTags}
                    options={countryOptions}
                    showSelectAll
                    searchable
                    clearable
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="multi_select_button"
                    variant="multi-select"
                    label="Multi Select (Button Mode)"
                    mode="button"
                    button="Choose countries"
                    tags={fieldTags}
                    options={customTagKeyOptions}
                    optionTags="badges"
                    optionTagLabel="text"
                    optionTagBgColor="bg"
                    optionTagColor="fg"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="slider_default"
                    variant="slider"
                    label="Slider"
                    min={0}
                    max={100}
                    step={5}
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="keyvalue_default"
                    variant="keyvalue"
                    label="Key Value"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="custom_default"
                    variant="custom"
                    label="Custom"
                    component={PillToggle}
                    valueProp="checked"
                    changeProp="onCheckedChange"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="treeselect_single"
                    variant="treeselect"
                    label="Tree Select (Single)"
                    tags={fieldTags}
                    options={treeOptions}
                    multiple={false}
                    searchable
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="treeselect_multiple_button"
                    variant="treeselect"
                    label="Tree Select (Multiple Button Mode)"
                    tags={fieldTags}
                    options={treeOptions}
                    multiple
                    mode="button"
                    button="Pick regions"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="file_single"
                    variant="file"
                    label="File (Single)"
                    multiple={false}
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="file_multiple"
                    variant="file"
                    label="File (Multiple)"
                    multiple
                    showCheckboxes
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="file_button_mode"
                    variant="file"
                    label="File (Button Mode)"
                    multiple
                    mode="button"
                    button="Upload files"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="editor_default"
                    variant="editor"
                    label="Editor"
                    onChange={(e) => console.log(e)}
                />

                <div className="space-y-3 rounded-md border p-3">
                    <p className="text-sm font-medium">Editor Theme Demo</p>
                    <InputField
                        name="editor_auto_theme"
                        variant="editor"
                        label="Editor (Auto Theme)"
                        theme="auto"
                        onChange={(e) => console.log(e)}
                    />
                    <div className="dark rounded-md border bg-background p-3">
                        <InputField
                            name="editor_forced_dark"
                            variant="editor"
                            label="Editor (Forced Dark)"
                            theme="dark"
                            onChange={(e) => console.log(e)}
                        />
                    </div>
                </div>

                <InputField
                    name="json_accordion"
                    variant="json-editor"
                    mode="accordion"
                    label="JSON Editor (Accordion)"
                    defaultValue={{ theme: "dark" }}
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="json_popover"
                    variant="json-editor"
                    mode="popover"
                    label="JSON Editor (Popover)"
                    triggerLabel="Edit JSON"
                    defaultValue={{ timezone: "UTC" }}
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="lister_single"
                    variant="lister"
                    label="Lister (Single)"
                    host={listerHost}
                    def={listerDef}
                    mode="single"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="lister_multiple"
                    variant="lister"
                    label="Lister (Multiple)"
                    host={listerHost}
                    def={listerDef}
                    mode="multiple"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="icon_default"
                    variant="icon"
                    label="Icon (Default)"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="icon_button"
                    variant="icon"
                    label="Icon (Button Mode)"
                    mode="button"
                    button="Pick icon"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="image_icon_default"
                    variant="image-icon"
                    label="Image Icon (Default)"
                    onChange={(e) => console.log(e)}
                />

                <InputField
                    name="image_icon_button"
                    variant="image-icon"
                    label="Image Icon (Button Mode)"
                    mode="button"
                    button="Pick image or icon"
                    onChange={(e) => console.log(e)}
                />
            </Form>
        </div>
    );
}
