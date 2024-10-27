import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  async function onCreateSession() {
    const sessionData = await axios.post(
      "http://127.0.0.1:3000/api/v1/session/create",
      {
        name: "Ishan Jirety",
        browserId: "8878005371",
      }
    );
    const session = sessionData.data as TSession;

    navigate(`/join/${session.id}`);
  }

  return (
    <>
      <div>
        <button onClick={() => onCreateSession()}>Create Session</button>
      </div>
    </>
  );
}

export default App;
