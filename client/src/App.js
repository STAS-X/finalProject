import React, { Component } from "react";
//import { browserHistory } from "react-router";
import { fetchUtils, Admin, Login, Resource } from "react-admin";
//import createHistory from "history/createBrowserHistory";
//import restProvider from "ra-data-simple-rest";
import { createTheme } from "@material-ui/core/styles";
import customProvider from "./dataprovider/customprovider"
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
import "./index.css";

const history = require("history").createBrowserHistory();

const fetchJson = (url, options = {}) => {
    console.log(url);
    if (!options.headers) {
        options.headers = new Headers({
            Accept: "application/json",
            "Content-Range": "users 0-5/10"
        });
    }
    // add your own headers here
    options.headers.set("Access-Control-Expose-Headers", "Content-Range");
    options.headers.set("Content-Range", "posts 0-5/10");
    options.headers.set("Content-Range", "tasks 0-5/10");
    console.log(options);
    return fetchUtils.fetchJson(url, options);
};

function getTheme(theme) {
    return createTheme({
        palette: {
            type: theme.paletteType,
            background: {
                default: theme.paletteType === "light" ? "#ddd" : "#fff"
            },
            secondary: {
                light: "#5f5fc4",
                main: "#283593",
                dark: "#001064",
                contrastText: "#fff"
            }
        }
    });
}
const theme = getTheme({
    paletteType: "light"
});

const MyLoginPage = () => (
    <Login
        // A random image that changes everyday
        backgroundImage="https://source.unsplash.com/random/1600x900/daily"
    />
);

const dataProvider = customProvider("http://localhost:3000");

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Admin
                dataProvider={dataProvider}
                loginPage={MyLoginPage}
                history={history}
                theme={theme}
                title="Example Admin"
            >
                <Resource
                    name="users"
                    sorted={true}
                    icon={UserIcon}
                    list={UserList}
                    create={UserCreate}
                    edit={UserEdit}
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
                />
                <Resource name="status" />
                <Resource name="completed" />
            </Admin>
        );
    }
}

export default App;
