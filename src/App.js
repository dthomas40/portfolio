import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/projects" component={Projects} />
        </div>
      </Router>
    </div>
  );
}

export default App;
