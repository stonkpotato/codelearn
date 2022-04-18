import './App.css';
import Route from "./route";
import Join from './join'
import Game from "./interpreter/display"

function App() {
  return (
    <>
      <Route path="/">
        <Join></Join>
      </Route>
      <Route path="/test">
        <Game totalSize={400} amount={20}></Game>
      </Route>
    </>
  );
}

export default App;
