import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navabr from "./Components/Navbar";
import Login from "./Login/Login";
import Create from "./Create/Create";
import Update from "./Update/Update";
import Home from "./Home/Home";

const App = () => {
  return (
    <Router>
      <Navabr />
      <div className="home d-flex justify-content-center align-items-center   mx-4  ">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
