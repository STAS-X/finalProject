import React from 'react';
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton, ReferenceField, NumberField } from 'react-admin';


const TaskList = (props) => {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
                <TextField multiline source="body" />
                <ReferenceField
                    source="statusId"
                    label="Status"
                    reference="status"
                >
                    <TextField source="statusName" />
                </ReferenceField>
                <NumberField source="progress"  />
                <DateField source="publishedAt" />
                <EditButton basePath="/tasks" />
                <DeleteButton basePath="/tasks" />
            </Datagrid>
        </List>
    );
}
 
export default TaskList;