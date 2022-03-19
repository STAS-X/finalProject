import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    DateInput,
    SelectInput,
    ArrayInput,
    ReferenceInput
} from "react-admin";


const TaskCreate = (props) => {
    return (
        <Create title="Create a Task" {...props}>
            <SimpleForm>
                <TextInput source="title" />
                <TextInput multiline source="body" />
                <ReferenceInput
                    source="statusId"
                    label="Status"
                    reference="status"
                >
                    <SelectInput optionText="statusName" />
                </ReferenceInput>
                <ReferenceInput
                    source="id"
                    label="Completed"
                    reference="completed"
                >
                    <SelectInput optionText="progress" />
                </ReferenceInput>
                <DateInput label="Published" source="publishedAt" />
            </SimpleForm>
        </Create>
    );
}
 
export default TaskCreate;