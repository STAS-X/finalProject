import React from "react";
import NavBar from "./components/navBar";
import Main from "./components/main";
import Login from "./components/login";
import Users from "./components/users";
import UserProfile from "./components/userProfile";
import NotFound from "./components/notfound";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
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

    return (
        <div>
            <NavBar />
            <BrowserRouter>
                <Switch>
                    <Route path="/main" component={Main} />
                    <Route path="/login" component={Login} />
                    <Route path="/404" component={NotFound} />
                    <Route path="/users/:userId?" component={Users} />
                    <Route
                        path="/userProfile/:userId?"
                        component={UserProfile}
                    />
                    <Redirect exact from="/" to="/main" />
                    <Redirect to="/404" />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
