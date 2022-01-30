import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Container from "./components/common/container";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/NavBar";
import {QualitiesProvider, useQualities} from "./hooks/useQualities";
import routes from "./routes";

const getRoutes = (routes) => {
	return routes.map((prop, key) => {
		return <Route path={prop.path} component={prop.component} key={key} />;
	});
};

function App() {
	return (
		<div className="App">
			<NavBar routes={routes} />
			<QualitiesProvider>
				<Container>
					<Switch>
						{getRoutes(routes)}
						<Redirect to="/" />
					</Switch>
				</Container>
			</QualitiesProvider>
			<ToastContainer />
		</div>
	);
}

export default App;
