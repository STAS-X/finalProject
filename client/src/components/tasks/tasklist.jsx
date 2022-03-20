import React from "react";
import {
    List,
    SearchInput,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    DeleteButton,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    NumberField,
    ChipField,
    SingleFieldList,
    ReferenceArrayField,
    useTranslate
} from "react-admin";
//import { DeleteOutlined } from "@mui/icons-material";
import ProgressField from "../progress";
import HomeIcon from "../ui/svghomeicon";
import { makeStyles, Chip } from "@material-ui/core";

const useQuickFilterStyles = makeStyles((theme) => ({
    chip: {
        marginBottom: theme.spacing(1)
    }
}));
const QuickFilter = ({ label }) => {
    const translate = useTranslate();
    const classes = useQuickFilterStyles();
    return <Chip className={classes.chip} label={translate(label)} />;
};

const postFilters = [
    <SearchInput source="q" alwaysOn />,
    <QuickFilter source="title" label="Title" defaultValue={"Task One"} />,
    <ReferenceInput
        source="statusId"
        label="Status"
        defaultValue={"3"}
        allowEmpty={false}
        reference="status"
    >
        <SelectInput optionText="statusName" />
    </ReferenceInput>
];

const TaskList = (props) => {
    return (
        <List {...props} perPage={5} filters={postFilters}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField className="badge bg-warning m-2" source="title" />
                <TextField multiline={3} source="body" />
                <ReferenceField
                    source="statusId"
                    label="Status"
                    reference="status"
                >
                    <TextField source="statusName" />
                </ReferenceField>
                <ProgressField
                    cellClassName="wrapProgressCell"
                    source="Progress"
                />
                <ReferenceArrayField
                    label="PerformedBy"
                    reference="users"
                    source="user_ids"
                >
                    <SingleFieldList>
                        <ChipField
                            color="primary"
                            deleteIcon={<HomeIcon color="error" />}
                            clickable={false}
                            onDelete={(e) => {
                                e.preventDefault();
                                console.log(e);
                            }}
                            source="name"
                        />
                    </SingleFieldList>
                </ReferenceArrayField>
                <DateField source="publishedAt" />
                <EditButton basePath="/tasks" />
                <DeleteButton basePath="/tasks" />
            </Datagrid>
        </List>
    );
};

export default TaskList;
