import React, { Component } from "react";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
import PostList from "./components/posts/postlist";
import PostCreate from "./components/posts/postcreate";
import PostEdit from "./components/posts/postedit";
import UserList from "./components/users/userlist";
import UserCreate from "./components/users/usercreate";
import UserEdit from "./components/users/useredit";
import TaskList from "./components/tasks/tasklist";
import TaskCreate from "./components/tasks/taskcreate";
import TaskEdit from "./components/tasks/taskedit";
import PostIcon from "@material-ui/icons/Book";
import TaskIcon from "@material-ui/icons/Queue";
import UserIcon from "@material-ui/icons/Group";

class App extends Component {
    render() {
        return (
            <Admin dataProvider={restProvider("http://localhost:3000")}>
                <Resource
                    name="users"
                    sorted={true}
                    icon={UserIcon}
                    list={UserList}
                    create={UserCreate}
                    edit={UserEdit}
                    icon={UserIcon}
                />
                <Resource
                    name="posts"
                    sorted={true}
                    icon={PostIcon}
                    list={PostList}
                    create={PostCreate}
                    edit={PostEdit}
                />
                <Resource
                    name="tasks"
                    sorted={true}
                    icon={TaskIcon}
                    list={TaskList}
                    create={TaskCreate}
                    edit={TaskEdit}
                    icon={TaskIcon}
                />
                <Resource name="status" />
                <Resource name="completed" />
            </Admin>
        );
    }
}

export default App;
