import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navabr from "./Components/Navbar";
import Login from "./Login/Login";
import Create from "./Create/Create";
import Update from "./Update/Update";
import Home from "./Home/Home";

const App = () => {
  return (
    <>
      <Navabr />
      <div className=" d-flex justify-content-center mx-4 ">
      <Router >
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
     
        </Switch>
      </Router>
      </div>
  
    </>
  );
};

export default App;
