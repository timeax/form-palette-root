import * as React from "react";
import "./index.css";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import { Form } from "@timeax/form-palette";
import { InputField } from "@timeax/form-palette/input/input-field";
import { keyBy } from "lodash";
import {AllVariantsExamples} from "@app/AllVariantsExamples";

const Select = () => {
    const languages = ["a", "b", "c", "d", "e"].map((lang) => ({
        label: lang,
        value: lang,
        icon: <span>{lang + "i"}</span>,
    }));

    const langMap = React.useMemo(() => keyBy(languages, "value"), [languages]);

    const [selectedLanguages, setSelectedLanguages] = React.useState();
    return (
        <Form>
            <InputField
                onChange={(e: any) => {
                    console.log(e);
                }}
                variant={"multi-select"}
                label="Phone number"
                options={['test', 'none'].map(item => ({label: item.toUpperCase(), value: item, id: item}))}
                autoCap
                name="phone"
                placeholder="Enter your phone number"
                required
            />
        </Form>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
