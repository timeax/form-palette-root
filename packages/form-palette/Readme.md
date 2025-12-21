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
- description/helpText: helper copy under the control
- errorText: force an error message (or rely on validation)
- required, disabled, readOnly
- icon, prefix, suffix, leadingControl, trailingControl: decorate the input content
- contain: force the input and label to share a tile-like container
- validate(value, report): return true | false | string for simple inline validation
- onChange(detail): detail.value holds the new value; prevent default if you need to override

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
- Nice extras: mask, slotChar, unmask, autoClear (phone-like masking); icon/prefix/suffix; searchable isn’t applicable here
- Example:
```tsx
<InputField name="email" label="Email" variant="text" />
```

2) number
- Value: number | undefined
- Props: min, max, step, showButtons
- Example:
```tsx
<InputField name="age" label="Age" variant="number" min={0} max={120} step={1} showButtons />
```

3) password
- Value: string | undefined
- Props: showToggle; strengthMeter; meterStyle="rules" | "bar" (depending on preset)
- Example:
```tsx
<InputField name="pwd" label="Password" variant="password" showToggle strengthMeter meterStyle="rules" />
```

4) color
- Value: string | undefined (hex or css color)
- Props: showPreview, previewButtonClassName
- Example:
```tsx
<InputField name="color" label="Favorite colour" variant="color" showPreview />
```

5) phone
- Value: string | undefined
- Typical usage uses masking controls the same way as text: mask, slotChar, unmask, autoClear
- Example (from playground labeled "Phone"):
```tsx
<InputField
  name="phone"
  label="Phone"
  variant="text" // or a dedicated phone variant if enabled in your build
  mask="+99 99 999 999? x999"
  slotChar="_"
  autoClear
/>
```

6) textarea
- Value: string | undefined
- Usual textarea props like placeholder, rows, etc.
- Example:
```tsx
<InputField name="bio" label="Bio" variant="textarea" description="Tell us about you" />
```

7) toggle
- Value: boolean | undefined
- Example:
```tsx
<InputField name="tos" variant="toggle" label="Accept Terms" required />
```

8) toggle-group
- Value: string | number | undefined (selected item)
- Props: options (primitives or objects), layout/density sizing depending on preset

9) radio
- Value: string | number | undefined
- Props:
  - options: primitives or objects with { value, label, description?, disabled? }
  - layout?: "list" | "grid" (default "list"); columns?: number (when layout="grid")
  - size?: "sm" | "md" | "lg"; density?: "compact" | "comfortable" | "loose"
  - You can also map custom item shapes via optionValue/optionLabel style mappers depending on preset
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

10) checkbox
- Value: boolean | string[] | number[] depending on single vs group usage
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
    { value: "delete", label: "Delete content" },
  ]}
/> 
```

- Extras:
  - single?: boolean switches to single‑checkbox mode (value becomes boolean | undefined)
  - tristate?: boolean enables an indeterminate state for single or per‑item
  - layout?: "list" | "grid"; columns?: number (grid mode)
  - size?: "sm" | "md" | "lg"; density?: "compact" | "comfortable" | "loose"

11) select
- Value: string | number | undefined
- Props (high‑use):
  - options: (string|number)[] | { label?, value?, description?, disabled?, icon?, ... }[]
  - searchable?: boolean (inline search box)
  - searchPlaceholder?: string (placeholder inside the search box)
  - clearable?: boolean (show clear button)
  - placeholder?: string
  - autoCap?: boolean (capitalise label text)
  - emptyLabel?: React.ReactNode (shown when there are no options)
  - emptySearchText?: React.ReactNode (shown when search returns no results)
  - optionLabel, optionValue, optionDescription, optionDisabled, optionIcon, optionKey: map/compute option pieces
  - renderOption?: (ctx) => ReactNode (custom row rendering; per‑option render overrides this)
- Example:
```tsx
<InputField
  name="country"
  variant="select"
  label="Country"
  options={[{ label: "USA", value: "US" }, { label: "Canada", value: "CA" }]}
  placeholder="Select a country"
  searchable
  clearable
/>
```

12) multi-select
- Value: (string|number)[] | undefined
- Props: same mapping props as select (optionLabel, optionValue, optionDescription, optionDisabled, optionIcon, optionKey)
  - searchable?: boolean; searchPlaceholder?: string
  - clearable?: boolean; placeholder?: React.ReactNode
  - autoCap?: boolean
  - emptyLabel?: React.ReactNode; emptySearchText?: React.ReactNode
  - renderOption?: (ctx) => ReactNode (custom row rendering; per‑option render overrides this)
- Example:
```tsx
<InputField
  name="tags"
  label="Tags"
  variant="multi-select"
  options={["red", "green", "blue"]}
/>
```

13) chips
- Value: string[] | number[] | undefined
- Free‑form or from options; often used to add/remove tokens

14) treeselect
- Value: (string|number)[] | string | number | undefined (single or multiple tree selection)
- Option type: TreeSelectOption = { label, value, icon?, description?, children?: TreeSelectOption[] }
- Example:
```tsx
import { TreeSelectOption } from "@timeax/form-palette/presets/shadcn-variants/tree-select-types";

const regionOptions: TreeSelectOption[] = [
  { label: "Africa", value: "africa", children: [{ label: "Nigeria", value: "ng" }] },
  { label: "Europe", value: "europe" },
];

<InputField
  name="regions"
  label="Regions"
  variant="treeselect"
  options={regionOptions}
/> 
```

- Props (high‑use):
  - multiple?: boolean (default true). If false, single‑select behaviour.
  - searchable?: boolean; searchPlaceholder?: string
  - clearable?: boolean; placeholder?: React.ReactNode
  - autoCap?: boolean
  - optionLabel, optionValue, optionDescription, optionDisabled, optionIcon, optionKey
  - emptyLabel?: React.ReactNode; emptySearchText?: React.ReactNode
  - renderOption?: ({ item, selected, option, click }) => ReactNode
  - renderValue?: ({ selectedItems, placeholder }) => ReactNode (custom trigger content)
  - expandAll?: boolean; defaultExpandedValues?: (string|number)[]
  - leafOnly?: boolean (only leaf nodes are selectable)
  - mode?: "default" | "button"; when "button", you can provide a custom trigger and show a selected‑count badge

15) slider
- Value: number | [number, number] depending on range mode
- Props: min, max, step; possibly range/multiple depending on preset

16) file
- Value: File | File[] | Custom file shape depending on configuration
- Types: FileItem, CustomFileLoader, FileLike are exported from the preset if you need advanced control
- Example (simple):
```tsx
<InputField name="avatar" label="Avatar" variant="file" />
```

17) keyvalue
- Value: Record<string, string> | undefined
- Use to capture arbitrary key/value pairs

18) editor
- Value: string | undefined (HTML or Markdown)
- Requires host CSS import once in your app:
  - import "@toast-ui/editor/dist/toastui-editor.css";
- Props (high‑use):
  - format?: "html" | "markdown" (stored value format; default "html")
  - toolbar?: "default" | "none" | ToastToolbarItem[][]
  - height?: string (e.g., "400px"), placeholder?: string
  - editType?: "wysiwyg" | "markdown"; previewStyle?: "vertical" | "tab"
  - pastePlainText?: boolean (force plain text on paste)
- Example:
```tsx
<InputField
  name="content"
  label="Content"
  variant="editor"
  format="markdown"
  toolbar="default"
  height="400px"
/>
```

19) custom
- Bring your own control but still benefit from InputField’s layout and validation chrome

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
- For grouped controls (radios/checkbox groups), pass options; for a single boolean, omit options.
- Keep labels short and place longer helper copy into description/helpText.

---

### FAQ
- Can I access values without submitting? Yes, via the programmatic API exposed in events like onChange at the form level, or by reading e.form.values() from handlers inside the form.
- Can I bring my own input component? Yes. Use the "custom" variant or build a dedicated preset and still place it inside InputField to reuse layout and validation.
- Do I need to register adapters? Not for basic local use. Adapters matter when you integrate with external routers or clients; see the package’s adapters folder if needed.

---

This document intentionally centers on how to use the package to build forms. For deeper internals and extension points, browse the source or the developer docs in the repository.