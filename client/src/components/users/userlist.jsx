import React from "react";
import {
    List,
    TopToolbar,
    SortButton,
    CreateButton,
    ExportButton,
    Pagination,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    DeleteButton,
    useResourceContext
} from "react-admin";
import Typography from "@material-ui/core/Typography";
import BadgeField from "../myfield";

const PostPagination = (props) => (
    <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
);

const Aside = () => (
    <div style={{ width: 200, margin: "1em" }}>
        <Typography variant="h6">User details</Typography>
        <Typography variant="body2">
            Posts will only be published once an editor approves them
        </Typography>
    </div>
);

const ListActions = () => (
    <TopToolbar>
        <SortButton fields={["name", "email"]} />
        <CreateButton basePath="/users" />
        <ExportButton />
    </TopToolbar>
);


const UserList = (props) => {
    return (
        <List
            actions={<ListActions />}
            aside={<Aside />}
            {...props}
            perPage={5}
            pagination={<PostPagination />}
            sort={{ field: "email", order: "ASC" }}
        >
                <Datagrid>
                    <TextField source="id" />
                    <BadgeField source="name" />
                    <EmailField emptyText="jhondoe@sample.com" source="email" />
                    <EditButton basePath="/users" />
                    <DeleteButton basePath="/users" />
                </Datagrid>
        </List>
    );
};

export default UserList;
