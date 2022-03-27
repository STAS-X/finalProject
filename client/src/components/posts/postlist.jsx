import React from "react";
import { useLocation } from "react-router-dom";
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    DateField,
    EditButton,
    DeleteButton,
    useListContext
} from "react-admin";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Avatar
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import TagsField from "../tagsfield";

const PostPanel = ({ record }) => (
    <div dangerouslySetInnerHTML={{ __html: record.detaile }} />
);

const cardStyle = {
    width: 300,
    minHeight: 300,
    margin: "0.5em",
    display: "inline-block",
    verticalAlign: "top"
};

const PostGrid = () => {
    const { ids, data, basePath } = useListContext();
    return (
        <div style={{ margin: "1em" }}>
            {ids.map((id) => (
                <Card key={id} style={cardStyle}>
                    <CardHeader
                        title={<TextField record={data[id]} source="title" />}
                        subheader={
                            <DateField record={data[id]} source="publishedAt" />
                        }
                        avatar={<Avatar icon={<PersonIcon />} />}
                    />
                    <CardContent>
                        <TextField
                            record={data[id]}
                            label="Содержание"
                            source="body"
                        />
                    </CardContent>
                    <CardContent>
                        about&nbsp;
                        <ReferenceField
                            label="Имя автора:"
                            resource="posts"
                            record={data[id]}
                            source="userId"
                            reference="users"
                            basePath={basePath}
                        >
                            <TextField source="name" />
                        </ReferenceField>
                    </CardContent>
                    <CardActions style={{ textAlign: "right" }}>
                        <EditButton
                            resource="posts"
                            basePath={basePath}
                            record={data[id]}
                        />
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};

const PostList = (props) => {
    const search = useLocation().search;
    const showCards = new URLSearchParams(search).get("showCards");

    if (!showCards) {
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
    };
    return (
        <List {...props}>
            <PostGrid />
        </List>
    );
};

export default PostList;
