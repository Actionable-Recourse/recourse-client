import './App.css';
// import SubmitButton from './SubmitButtom.js';
import ActionForm from './Form.js';
import Summary from './pages/Summary.js';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Summary />
      <ActionForm />
        <br />
        <br />
        <br /><br /><br /><Link to="/contact">Contact (testing routing)</Link>
    </div>
  );
}

export default App;
