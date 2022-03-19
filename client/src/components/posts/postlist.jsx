import React from 'react';
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin';


const PostList = (props) => {
    console.log(...props);
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField
                    sortable={true}
                    sortBy="id"
                    sortByOrder="ASC"
                    source="id"
                />
                <TextField
                    style={{
                        class: `badge m-1 bg-primary round-pill m-2 `,
                        fontSize: `24px`
                    }}
                    source="title"
                />
                <DateField source="publishedAt" />
                <EditButton basePath="/posts" />
                <DeleteButton basePath="/posts" />
            </Datagrid>
        </List>
    );
}
 
export default PostList;