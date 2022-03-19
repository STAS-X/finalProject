import React from 'react';
import {
    List,
    Pagination,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    DeleteButton
} from "react-admin";
import Typography from "@material-ui/core/Typography";
import BadgeField from "../myfield";


const PostPagination = (props) => (
    <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
);

const Aside = () => (
    <div style={{ width: 200, margin: "1em" }}>
        <Typography variant="h6">Post details</Typography>
        <Typography variant="body2">
            Posts will only be published once an editor approves them
        </Typography>
    </div>
);


const UserList = (props) => {

    return (
        <List
            aside={<Aside />}
            {...props}
            perPage={5}
            pagination={<PostPagination />}
            sort={{ field: "email", order: "ASC" }}
        >
            <Datagrid>
                <TextField source="id" />
                <BadgeField sortable={true} source="name" />
                <EmailField
                    sortable={true}
                    emptyText="jhondoe@sample.com"
                    source="email"
                />
                <EditButton basePath="/users" />
                <DeleteButton basePath="/users" />
            </Datagrid>
        </List>
    );
}
 
export default UserList;