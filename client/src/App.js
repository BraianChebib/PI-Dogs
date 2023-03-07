import "./App.css";
import { Route, useLocation } from "react-router-dom";
import { Home, LandingPage, Detail, Form } from "./components";

function App() {
  // usamos un hook para que el NavBar no se vea en el landing
  const location = useLocation();

  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/Home" render={() => <Home />} />

      <Route exact path="/Detail/:id" render={() => <Detail />} />
      <Route exact path="/Form" render={() => <Form />} />
    </div>
  );
}

export default App;
