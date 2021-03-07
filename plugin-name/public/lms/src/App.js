import './App.css';

import Course from "./components/courses"
import Lessons from "./components/lessons"
import Lesson from "./components/lesson"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
    </div>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/:courseSlug/lessons/:lessonSlug">
            <Lesson />
          </Route>
          <Route path="/:slug/lessons">
            <Lessons />
          </Route>
          <Route path="/">
            <Course />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
