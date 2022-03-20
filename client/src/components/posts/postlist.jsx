import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    DeleteButton    
} from "react-admin";
import TagsField from "../tagsfield"

const PostPanel = ({ id, record, resource }) => (
    <div dangerouslySetInnerHTML={{ __html: record.detaile }} />
);

const PostList = (props) => {
    return (
        <List {...props}>
            <Datagrid
                rowClick="edit"
                expand={<PostPanel />}
                isRowExpandable={(row) => row.detaile}
            >
                <TextField sortByOrder="ASC" source="id" />
                <TextField
                    style={{
                        className: `badge bg-primary round-pill m-2 `,
                        fontSize: `14px`
                    }}
                    source="title"
                />
                <TagsField
                    source="Tags"
                    textAlign="left"
                    cellClassName="wrapCustomCell"
                />
                <DateField source="publishedAt" />
                <EditButton basePath="/posts" />
                <DeleteButton basePath="/posts" />
            </Datagrid>
        </List>
    );
}
 
export default PostList;