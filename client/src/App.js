import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navabr from "./Components/Navbar";
import Login from "./Login/Login";
import Create from "./Create/Create";
import Update from "./Update/Update";
import Home from "./Home/Home";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <Router>
    
      
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/create" exact component={Create} />
          <PrivateRoute path="/update" exact component={Update} />
        </Switch>
      
    </Router>
  );
};

export default App;
