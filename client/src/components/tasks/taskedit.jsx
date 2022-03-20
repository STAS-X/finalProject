import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    SelectInput,
    ArrayInput,
    ReferenceInput,
    required
} from "react-admin";


const TaskEdit = (props) => {
    return (
        <Edit title="Edit a Task" {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="title" validate={required()} />
                <TextInput multiline source="body" validate={required()} />
                <ReferenceInput
                    source="statusId"
                    label="Status"
                    reference="status"
                    validate={required()}
                >
                    <SelectInput optionText="statusName" />
                </ReferenceInput>
                <ReferenceInput
                    source="id"
                    label="Completed"
                    reference="completed"
                    validate={required()}
                >
                    <SelectInput optionText="progress" />
                </ReferenceInput>
                <TextInput source="progress" validate={required()} />
                <DateInput
                    label="Published"
                    source="publishedAt"
                    validate={required()}
                />
            </SimpleForm>
        </Edit>
    );
}
 
export default TaskEdit;