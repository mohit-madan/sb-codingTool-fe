import React from "react"
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import UploaderPage from "./Pages/Uploader/UploaderPage";
import { createBrowserHistory } from 'history';
function App() {

  const history = createBrowserHistory();
  return (
    <div className="">
      <header className="">
      <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={UploaderPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
      </header>
    </div>
  );
}

export default App;
