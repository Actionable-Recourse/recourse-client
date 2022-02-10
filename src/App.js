import './App.css';
// import SubmitButton from './SubmitButtom.js';
import ActionForm from './Form.js';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h2>Actionable Recourse</h2>
      <ActionForm />
        <br />
        <br />
        <br /><br /><br /><Link to="/contact">Contact (testing routing)</Link>
    </div>
  );
}

export default App;
