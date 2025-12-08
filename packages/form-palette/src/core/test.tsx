import { InputField } from "@/index";
import { Form } from "@/index";

const Test = () => {
    return (
        <Form adapter="inertia">
            <InputField
                variant={"select"}
                options={[{ label: 'name', value: 'string' }] as const}
                optionValue='label'
                onChange={e => {
                    e.detail.raw
                }}
            />
        </Form>
    )
}