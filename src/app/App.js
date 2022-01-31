import React from "react";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./components/ui/notfound";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Profile from "./layouts/profile";
import { ProfessionProvider } from "./hooks/useProfessions";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnLoad = this.handleOnLoad.bind(this);
        this.handleOnLoad();
    }

    handleOnLoad() {
        window.onload = () => {
            const tabs = document.querySelectorAll("ul.nav>li>a");

            tabs.forEach((tab) => {
                const curHref = "".concat(
                    "/",
                    tab.href.split("/")[tab.href.split("/").length - 1]
                );
                if (
                    (curHref === location.pathname ||
                        location.pathname.indexOf(curHref) === 0) &&
                    !tab.classList.contains("active")
                ) {
                    tab.classList.toggle("active");
                } else if (
                    curHref !== location.href &&
                    tab.classList.contains("active")
                ) {
                    tab.classList.toggle("active");
                }
            });
        };
    }

    render() {
        return (
            <div>
                <NavBar />
                <BrowserRouter>
                    <ProfessionProvider>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route
                                path="/users/:userId?/edit"
                                /* render={() => (
                                <Users
                                    usersApp={this.state.value}
                                    updateUsers={this.handleUpdateUsers}
                                />
                            )} */
                                component={Profile}
                            />
                            <Route
                                path="/users/:userId?"
                                /* render={() => (
                                <Users
                                    usersApp={this.state.value}
                                    updateUsers={this.handleUpdateUsers}
                                />
                            )} */
                                component={Users}
                            />
                            <Route path="/main" component={Main} />
                            <Route path="/404" component={NotFound} />
                            <Redirect exact from="/" to="/main" />
                            <Redirect to="/404" />
                        </Switch>
                    </ProfessionProvider>
                </BrowserRouter>
                <ToastContainer />
            </div>
        );
    }
}

export default App;
