### Form Palette: Build Forms with InputField (Consumer Guide)

This guide shows how to build forms with @timeax/form-palette. It focuses on InputField usage, variants, and practical recipes taken from the playground’s App.tsx.

If you just want to build forms, start here. Internals and source file locations are intentionally de‑emphasized.

---

### Quick start

Install (from npm):

```bash
npm install @timeax/form-palette
```

Minimal form:

```tsx
import { Form, InputField } from "@timeax/form-palette";

export default function Example() {
  function onSubmit(e: any) {
    // e.form gives you programmatic access
    // e.formData is the values snapshot
    console.log("Submitted", e.formData);
  }

  return (
    <Form wrapped gap={12} onSubmit={onSubmit}>
      <InputField name="email" label="Email" variant="text" required />
      <InputField name="password" label="Password" variant="password" required />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

---

### InputField basics

Use one component for all input types by switching the variant key. InputField wires the value, validation, and a consistent label/description/error layout for you.

Common props (apply to most variants):
- name: unique field key
- variant: which control to render (see Variant reference below)
- label, sublabel: title and a small inline hint
- description, helpText: helper copy under the control
- errorText: force an error message (visual override)
- required, disabled, readOnly
- onChange(e): e.value holds the new value; e.detail provides extra context (source, meta)
- onValidate(value, field, form): custom validation logic (returns string | boolean)
- size: "sm" | "md" | "lg"
- density: "compact" | "comfortable" | "loose"
- labelPlacement, sublabelPlacement, descriptionPlacement, helpTextPlacement, errorTextPlacement: customize layout ("top" | "bottom" | "left" | "right" | "below")
- inline, fullWidth, contain: layout flags
- tags: array of tag objects { label, icon, className, color, bgColor }
- className, labelClassName, sublabelClassName, descriptionClassName, helpTextClassName, errorClassName, groupClassName, contentClassName, variantClassName: targeting specific parts of the field chrome

Input decoration props (available for text, number, color, phone, select, multi-select, date):
- icon, prefix, suffix, leadingControl, trailingControl: decorate the input box
- leadingIcons, trailingIcons: arrays of React nodes
- iconGap, leadingIconSpacing, trailingIconSpacing: spacing controls
- joinControls, extendBoxToControls: visual integration for controls
- leadingControlClassName, trailingControlClassName: decoration styling

Example with decorations and validation:

```tsx
<InputField
  name="username"
  variant="text"
  label="Username"
  sublabel="public handle"
  prefix="@"
  validate={(value, report) => {
    if (!value) return report ? "Required" : false;
    if (value.length < 3) return report ? "Min 3 characters" : false;
    return true;
  }}
  onChange={(e) => console.log("username:", e.value)}
/>
```

Programmatic control during submit:

```tsx
function onSubmit(e: any) {
  // Programmatically set a value
  e.form.inputs.getByName("email").setValue("demo@example.com");
  console.log(e.formData);
}
```

---

### Variant reference (what value they hold and unique props)

Below are the built‑in variants with the props you’ll use most often. Examples mirror the playground App.tsx.

Note on options: selection controls accept options as primitives ("US") or objects ({ label, value, ...extra }).

1) text
- Value: string | undefined
- Props: mask, slotChar, unmask, autoClear (phone-like masking); prefix, suffix, stripPrefix, stripSuffix, inputClassName
- Example:
```tsx
<InputField name="email" label="Email" variant="text" />
```

2) number
- Value: number | undefined
- Props: 
  - min, max, step, showButtons, buttonLayout ("stacked" | "inline")
  - mode: "decimal" | "currency"
  - currency, currencyDisplay, currencySymbol
  - locale, useGrouping, minFractionDigits, maxFractionDigits
  - roundingMode, allowEmpty
- Example:
```tsx
<InputField name="age" label="Age" variant="number" min={0} max={120} step={1} showButtons />
```

3) password
- Value: string | undefined
- Props:
  - revealToggle: boolean (show eye icon); default true
  - defaultRevealed, onRevealChange, renderToggleIcon, toggleAriaLabel, toggleButtonClassName
  - strengthMeter: boolean | StrengthOptions (calc, labels, thresholds, minScore, showLabel, display)
  - meterStyle: "simple" | "rules"
  - ruleDefinitions, ruleUses: customize validation rules
  - meterWrapperClassName, meterContainerClassName, meterBarClassName, meterLabelClassName
- Example:
```tsx
<InputField name="pwd" label="Password" variant="password" revealToggle strengthMeter meterStyle="rules" />
```

4) date
- Value: Date | DateRange | undefined
- Props:
  - mode: "single" | "range"
  - kind: "date" | "datetime" | "time" | "hour" | "monthYear" | "year"
  - formatSingle, formatRange, rangeSeparator
  - minDate, maxDate, disabledDays, stayOpenOnSelect
  - showTime, timeMode ("dropdown" | "input"), timeStep, timeLabel
  - clearable, calendarClassName, popoverClassName
- Example:
```tsx
<InputField name="appointment" variant="date" kind="datetime" label="Appointment" />
```

5) color
- Value: string | undefined (hex or css color)
- Props: showPreview, showPickerToggle, previewSize, previewButtonClassName, previewSwatchClassName, pickerInputClassName, pickerToggleIcon, wrapperClassName
- Example:
```tsx
<InputField name="color" label="Favorite colour" variant="color" showPreview />
```

6) phone
- Value: string | undefined
- Props:
  - countries: PhoneCountry[] (custom list of available countries)
  - defaultCountry: string (ISO code, e.g. "US")
  - valueMode: "masked" | "e164" | "national"
  - showFlag, showSelectedDial, showDialInList, showCountry, showSelectedLabel
  - keepCharPositions, countrySelectClassName, countryTriggerClassName
- Typical usage:
```tsx
<InputField
  name="phone"
  label="Phone"
  variant="phone"
  defaultCountry="US"
  valueMode="e164"
/>
```

7) textarea
- Value: string | undefined
- Usual textarea props like placeholder, rows, cols, resize, etc.
- Example:
```tsx
<InputField name="bio" label="Bio" variant="textarea" description="Tell us about you" />
```

8) toggle
- Value: boolean | undefined
- Props: size, density, controlPlacement ("left" | "right"), onText, offText, switchClassName, switchThumbClassName
- Example:
```tsx
<InputField name="tos" variant="toggle" label="Accept Terms" onText="Yes" offText="No" required />
```

9) toggle-group
- Value: string | string[] | number | undefined
- Props:
  - options: primitives or objects
  - multiple, variant ("default" | "outline"), layout ("horizontal" | "vertical" | "grid"), gridCols, fillWidth
  - optionValue, optionLabel, optionIcon, optionDisabled, optionTooltip, optionMeta: mapping keys
- Example:
```tsx
<InputField
  name="size"
  variant="toggle-group"
  options={["sm", "md", "lg"]}
/>
```

10) radio
- Value: any (selected value)
- Props:
  - options: primitives or objects
  - layout: "list" | "grid"; columns, itemGapPx
  - size, density, autoCap
  - optionValue, optionLabel, optionDescription, optionDisabled
  - mappers: { getValue, getLabel, getDescription, isDisabled, getKey }
  - renderOption: (ctx) => ReactNode
  - groupClassName, optionClassName, labelClassName, descriptionClassName
- Example:
```tsx
<InputField
  name="role"
  label="Role"
  variant="radio"
  options={[
    { value: "reader", label: "Reader" },
    { value: "editor", label: "Editor" },
  ]}
/> 
```

11) checkbox
- Value: boolean (single) | CheckboxGroupEntry[] (group)
- Props:
  - options: primitives or objects (for group mode)
  - single: boolean (switches to single-checkbox mode)
  - tristate: boolean (enables indeterminate state)
  - layout: "list" | "grid"; columns, itemGapPx
  - size, density, autoCap
  - optionValue, optionLabel, renderOption
  - mappers: { getValue, getLabel, getDescription, isDisabled, getKey, getTristate }
  - groupClassName, optionClassName, labelClassName, optionLabelClassName, descriptionClassName
- Single boolean checkbox:
```tsx
<InputField variant="checkbox" label="Remember me" />
```
- Group example:
```tsx
<InputField
  name="perms"
  variant="checkbox"
  label="Permissions"
  options={[
    { value: "read", label: "Read content" },
    { value: "write", label: "Write content" },
  ]}
/> 
```

12) select
- Value: string | number | undefined
- Props:
  - options: primitives or objects
  - searchable, searchPlaceholder, clearable, placeholder, autoCap
  - emptyLabel, emptySearchText
  - mode: "default" | "button"; button: ReactNode | ((ctx) => ReactNode)
  - virtualScroll, virtualScrollPageSize, virtualScrollThreshold
  - optionLabel, optionValue, optionDescription, optionDisabled, optionIcon, optionKey
  - renderOption, renderValue: custom renderers
  - triggerClassName, contentClassName
- Example:
```tsx
<InputField
  name="country"
  variant="select"
  label="Country"
  options={[{ label: "USA", value: "US" }, { label: "Canada", value: "CA" }]}
  searchable
  clearable
/>
```

13) multi-select
- Value: (string | number)[] | undefined
- Props:
  - options: primitives or objects
  - searchable, searchPlaceholder, clearable, placeholder, autoCap
  - showSelectAll, selectAllLabel, selectAllPosition
  - mode: "default" | "button"; button: ReactNode | ((ctx) => ReactNode)
  - maxListHeight
  - optionLabel, optionValue, optionDescription, optionDisabled, optionIcon, optionKey
  - renderOption, renderValue, renderCheckbox
  - triggerClassName, contentClassName
- Example:
```tsx
<InputField
  name="tags"
  label="Tags"
  variant="multi-select"
  options={["red", "green", "blue"]}
/>
```

14) chips
- Value: string[] | undefined
- Props:
  - placeholder, separators (string | RegExp), allowDuplicates, maxChips
  - addOnEnter, addOnTab, addOnBlur, backspaceRemovesLast
  - clearable, textareaMode, placement ("inline" | "below")
  - maxVisibleChips, maxChipChars, maxChipWidth
  - renderChip, renderOverflowChip
  - onAddChips, onRemoveChips
  - chipsClassName, chipClassName, chipLabelClassName, chipRemoveClassName, inputClassName
- Example:
```tsx
<InputField name="keywords" variant="chips" label="Keywords" />
```

15) treeselect
- Value: TreeKey | TreeKey[] | undefined
- Props:
  - options: TreeSelectOption[]
  - multiple, searchable, clearable, placeholder, autoCap
  - expandAll, defaultExpandedValues, leafOnly
  - mode: "default" | "button"; button: ReactNode | ((ctx) => ReactNode)
  - selectedBadge, selectedBadgeVariant, selectedBadgePlacement
  - optionLabel, optionValue, optionDescription, optionDisabled, optionIcon, optionKey
  - renderOption, renderValue
  - triggerClassName, contentClassName
- Example:
```tsx
<InputField name="regions" variant="treeselect" options={regionOptions} />
```

16) slider
- Value: number | undefined
- Props:
  - min, max, step
  - showValue, valuePlacement ("start" | "end")
  - formatValue: (val) => ReactNode
  - sliderClassName, valueClassName
- Example:
```tsx
<InputField name="volume" variant="slider" min={0} max={100} />
```

17) file
- Value: FileItem[] | undefined
- Props:
  - multiple, accept, maxFiles, maxTotalSize
  - showDropArea, dropIcon, dropTitle, dropDescription
  - renderDropArea, renderFileItem, showCheckboxes
  - onFilesAdded, customLoader, mergeMode ("append" | "replace")
  - formatFileName, formatFileSize
  - mode: "default" | "button"; button: ReactNode | ((ctx) => ReactNode)
  - selectedBadge, selectedBadgeVariant, selectedBadgePlacement
  - dropAreaClassName, listClassName, triggerClassName
- Example:
```tsx
<InputField name="attachments" variant="file" multiple />
```

18) keyvalue
- Value: Record<string, string> | undefined
- Props:
  - min, max, minVisible, maxVisible
  - showAddButton, showMenuButton, dialogTitle
  - keyLabel, valueLabel, submitLabel, emptyLabel, moreLabel
  - chipsClassName, chipClassName, renderChip
- Example:
```tsx
<InputField name="headers" variant="keyvalue" label="HTTP Headers" />
```

19) editor
- Value: string | undefined (HTML or Markdown)
- Props:
  - format: "html" | "markdown"
  - toolbar: "default" | "none" | ToastToolbarItem[][]
  - height, placeholder, editType ("wysiwyg" | "markdown"), previewStyle ("vertical" | "tab")
  - pastePlainText, useCommandShortcut
- Example:
```tsx
<InputField name="content" variant="editor" format="markdown" />
```

20) lister
- Value: ListerId | ListerId[] | undefined
- Advanced picker for remote/large datasets. Requires `ListerProvider` and `ListerUI` from `@timeax/form-palette/extra`.
- Props:
  - def: `ListerDefinition` (the remote data engine)
  - endpoint, method, buildRequest, selector: inline remote config
  - filters, filtersSpec, initialQuery: initial state and filter UI configuration
  - search, searchTarget, searchMode: control search behavior and targets
  - mode: "single" | "multiple"
  - confirm: boolean (for single mode); permissions: array of strings
  - title, clearable, maxDisplayItems, showRefresh, refreshMode
  - optionValue, optionLabel, optionIcon, optionDescription, optionDisabled, optionGroup, optionMeta: mapping keys (accepts key string or mapper function)
  - renderTrigger, renderOption: custom rendering hooks
  - panelClassName, contentClassName, triggerClassName
  - leadingIcons, trailingIcons, icon, leadingControl, trailingControl, joinControls, extendBoxToControls: standard input decoration
- Example:
```tsx
<InputField
  name="user"
  variant="lister"
  endpoint="/api/users"
  optionLabel="fullName"
  optionValue="id"
/>
```

21) json-editor
- Value: JsonObject | undefined
- Advanced visual editor for complex JSON structures.
- Props:
  - title, schema: header text and validation schema (JSON Schema or ID)
  - fieldMap, layout, defaults: configure how JSON keys are rendered as form fields
  - nav, filters, permissions, callbacks: behavior and access control
  - mode: "popover" | "accordion" (wrapper display mode)
  - triggerLabel, triggerVariant, triggerSize: customize the trigger button (popover mode)
  - route, defaultRoute, onRouteChange: navigation control (JSON path)
  - viewMode, defaultViewMode, onViewModeChange: "split" | "visual" | "raw"
  - renderRouteLabel, renderField: custom rendering hooks
  - contentClassName, navClassName, triggerClassName, popoverClassName, panelClassName
  - leadingIcons, trailingIcons, icon, leadingControl, trailingControl, joinControls, extendBoxToControls: standard input decoration (for popover trigger)
- Example:
```tsx
<InputField
  name="config"
  variant="json-editor"
  title="App Configuration"
  mode="popover"
  triggerLabel="Edit App Config"
/>
```

22) custom
- Props:
  - component: ReactComponent to render
  - valueProp, changeProp, disabledProp, readOnlyProp, errorProp, idProp, nameProp, placeholderProp
  - mapValue, mapDetail: transform values on the way out/in
- Example:
```tsx
<InputField
  name="custom"
  variant="custom"
  component={MyCustomInput}
  valueProp="currentValue"
  changeProp="onMyChange"
/>
```

---

### Recipes from the playground

Masking a phone‑like input:
```tsx
<InputField
  name="phone"
  label="Phone"
  variant="text"
  mask="+99 99 999 999? x999"
  slotChar="_"
  autoClear
  leadingControl={<span>Leading control</span>}
  prefix="number: "
/>
```

Password with strength meter:
```tsx
<InputField
  name="password"
  label="Password"
  variant="password"
  placeholder="Enter your password"
  strengthMeter
  meterStyle="rules"
  revealToggle
/>
```

Selects and multi‑selects:
```tsx
<InputField
  name="country"
  variant="select"
  label="Country"
  options={[{ label: "USA", value: "US" }, { label: "Canada", value: "CA" }]}
  placeholder="Select a country"
  searchable
/>

<InputField
  name="languages"
  variant="multi-select"
  label="Languages"
  options={["English", "French", "German"]}
/>
```

Tree select with icons and descriptions:
```tsx
<InputField name="regions" label="Regions" variant="treeselect" options={regionOptions} />
```

Single checkbox:
```tsx
<InputField variant="checkbox" label="Remember me" />
```

Number with buttons:
```tsx
<InputField name="age" label="Age" variant="number" min={0} max={120} step={1} showButtons />
```

---

### Submitting the form

Form wraps your fields and provides a submit event that carries both the values and utilities.

```tsx
import { Form, InputField } from "@timeax/form-palette";

function Example() {
  function handleSubmit(e: any) {
    // values snapshot
    console.log(e.formData);
    // programmatic API
    e.form.inputs.getByName("email").setValue("this is nice");
  }

  return (
    <Form wrapped onSubmit={handleSubmit}>
      <InputField name="email" label="Email" variant="text" />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

---

### Tips and best practices
- Prefer InputField over wiring controls by hand; it gives you consistent labels, descriptions, and error placement.
- Use options as primitives for quick setups, or objects when you need description/disabled/icon per item.
- Use validate for quick client checks; you can also set errorText manually.
- For grouped controls (radios/checkbox groups), pass `options`; for a single boolean, omit `options` and use `variant="checkbox"`.
- Use `variant="date"` with `kind` to switch between date, time, and datetime pickers.
- For complex data, `variant="lister"` provides a powerful remote search/picker UI.
- Use `onValidate` for quick client checks; return a string for the error message or `true` if valid.

---

### Advanced providers and standalone usage

Some components like `lister` or `json-editor` can be used as standalone utilities outside of `InputField` or even outside of a `Form`.

#### 1. Lister System (ListerProvider & ListerUI)

The `lister` variant relies on a global engine for remote data fetching, caching, and state management. You must place `ListerProvider` at the root of your app and include `ListerUI` to render the floating selection panels.

```tsx
import { ListerProvider, ListerUI } from "@timeax/form-palette/extra";

const listerHost = {
  can: (perms) => true,
  log: (entry) => console.log(entry.message),
};

function App() {
  return (
    <ListerProvider host={listerHost}>
      {/* ... your app ... */}
      <ListerUI />
    </ListerProvider>
  );
}
```

**ListerProvider props:**
- `host`: `ListerProviderHost` (Required) - Handles permissions (`can`) and global logging (`log`).
- `presets`: `PresetMap` - Registry of named `ListerDefinition` objects.
- `http`: `ListerHttpClient` - Custom HTTP client (e.g., axios wrapper).
- `remoteDebounceMs`: `number` (default: 300).

**Programmatic usage with `useLister`:**

You can trigger a lister picker from anywhere in your app (e.g., a custom button) using the `useLister` hook.

```tsx
import { useLister } from "@timeax/form-palette/extra";

function CustomButton() {
  const { api } = useLister();

  async function pickUser() {
    // Open the lister UI and wait for selection
    const result = await api.open({
      source: { endpoint: "/api/users" },
      mapping: { optionLabel: "fullName", optionValue: "id" }
    }, {}, {
      title: "Select a User",
      mode: "single"
    });

    if (result.reason === "apply") {
      console.log("Selected user ID:", result.value);
      console.log("Full user object:", result.details.raw);
    }
  }

  return <button onClick={pickUser}>Choose User</button>;
}
```

- `api.open(def | kind, filters, options)`: Returns a promise that resolves when the user applies, cancels, or closes the lister.
- `api.fetch(def | kind, filters, options)`: Fetches data using the lister engine without opening the UI.

---

#### 2. JSON Editor Standalone

While `InputField variant="json-editor"` is convenient for forms, you can use the `JsonEditor` component directly for full-page editors or custom configuration screens.

```tsx
import { JsonEditor } from "@timeax/form-palette/extra";

function ConfigPage() {
  const [config, setConfig] = useState({ theme: "dark", notifications: true });

  return (
    <div className="h-[600px] border rounded">
      <JsonEditor
        root={config}
        onRoot={setConfig}
        title="Site Configuration"
        mode="accordion"
        viewMode="split"
        fieldMap={{
          "theme": { variant: "select", options: ["light", "dark"] },
          "notifications": { variant: "toggle" }
        }}
      />
    </div>
  );
}
```

##### Props for `JsonEditor` (Standalone)

| Prop | Type | Description |
| :--- | :--- | :--- |
| `root` | `JsonObject` | The JSON object to edit (Controlled). |
| `onRoot` | `(next: JsonObject, detail: ChangeDetail) => void` | Callback when the JSON structure changes. |
| `title` | `ReactNode` | Header title displayed at the top. |
| `schema` | `string \| JsonObject` | Optional JSON Schema for validation. |
| `mode` | `"popover" \| "accordion"` | `"popover"` shows a trigger; `"accordion"` is inline. |
| `viewMode` | `"split" \| "visual" \| "raw"` | Visual vs Code editor vs both. |
| `fieldMap` | `JsonEditorFieldMap` | Map JSON paths to specific `InputField` variants. |
| `layout` | `JsonEditorLayoutMap` | Define the visual order and grouping of fields. |
| `defaults` | `JsonEditorDefaults` | Default values and variant-level defaults. |
| `nav` | `JsonEditorNavOptions` | Configure sidebar navigation and hierarchical views. |
| `filters` | `JsonEditorFilters` | Include or exclude specific JSON paths. |
| `permissions` | `JsonEditorPermissions` | Read-only vs Read-Write controls per path. |
| `callbacks` | `JsonEditorCallbacks` | Callbacks for `onAdd`, `onDelete`, `onEdit`. |

---

### Full Technical Reference (Advanced)

#### Lister System Types

**ListerProvider Props**

| Prop | Type | Description |
| :--- | :--- | :--- |
| `host` | `ListerProviderHost` | **Required**. Handles permissions (`can`) and logging (`log`). |
| `presets` | `PresetMap` | Map of pre-defined lister configurations. |
| `http` | `ListerHttpClient` | Custom client for data fetching. |
| `remoteDebounceMs`| `number` | Debounce for remote search (default 300ms). |

**ListerDefinition (Engine config)**

| Prop | Type | Description |
| :--- | :--- | :--- |
| `source` | `ListerSource` | Remote URL and request builder. |
| `mapping` | `ListerMapping` | How raw data maps to value/label/icon/etc. |
| `selector` | `Selector` | Extraction path from API response (default `body.data`). |
| `search` | `ListerSearchSpec` | Search behavior and column targets. |

**ListerOpenOptions (api.open / api.fetch options)**

| Prop | Type | Description |
| :--- | :--- | :--- |
| `mode` | `"single" \| "multiple"` | Selection mode. |
| `confirm` | `boolean` | Require explicit "Apply" button in single mode. |
| `defaultValue`| `any` | Initial selection. |
| `permissions`| `string[]` | Permission keys required for this session. |
| `searchMode` | `ListerSearchMode` | "local", "remote", or "hybrid". |
| `title` | `string` | UI title for the popover. |
| `filtersSpec` | `ListerFilterSpec` | Specification for the filter UI. |

#### JSON Editor Types

**JsonEditorFieldMap Entry**

| Prop | Type | Description |
| :--- | :--- | :--- |
| `variant` | `VariantKey` | Which `@timeax/form-palette` variant to use. |
| `props` | `VariantProps` | Props passed to the variant. |
| `label` | `string` | Display label for this field. |
| `description`| `string` | Help text shown under the field. |

---

### FAQ
- Can I access values without submitting? Yes, via the programmatic API exposed in events like onChange at the form level, or by reading e.form.values() from handlers inside the form.
- Can I bring my own input component? Yes. Use the "custom" variant or build a dedicated preset and still place it inside InputField to reuse layout and validation.
- Do I need to register adapters? Not for basic local use. Adapters matter when you integrate with external routers or clients; see the package’s adapters folder if needed.

---

This document intentionally centers on how to use the package to build forms. For deeper internals and extension points, browse the source or the developer docs in the repository.