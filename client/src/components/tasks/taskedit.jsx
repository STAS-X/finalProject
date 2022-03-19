import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    SelectInput,
    ArrayInput,
    ReferenceInput
} from "react-admin";


const TaskEdit = (props) => {
    return (
        <Edit title="Edit a Task" {...props}>
            <SimpleForm>
                <TextInput disabled source="id" />
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
                <TextInput source="progress" />
                <DateInput label="Published" source="publishedAt" />
            </SimpleForm>
        </Edit>
    );
}
 
export default TaskEdit;