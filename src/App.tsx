import "./App.css";
import Webcam from "./components/Webcam";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Rubik's cube solver!</h1>
      </header>
      <Webcam />
    </div>
  );
}

export default App;
