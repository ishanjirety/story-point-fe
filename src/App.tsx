import { useState } from "react";
import "./App.css";
import axios from "axios";
import useFingerprint from "./hooks/useFingerPrint";

function App() {
  const [isSessionCreated, setIsSessionCreated] = useState<TSession | null>(
    null
  );

  const [sessionId, setSessionId] = useState<null | string>(null);
  const fingerprint = useFingerprint();
  const [name, setName] = useState("");

  async function onCreateSession() {
    const sessionData = await axios.post(
      "http://127.0.0.1:3000/api/v1/session/create",
      {
        name: "Ishan Jirety",
        browserId: "8878005371",
      }
    );
    const session = sessionData.data as TSession;

    setIsSessionCreated(session);
  }

  async function onJoinSession(sessionId?: string) {
    const source = new EventSource(
      `http://127.0.0.1:3000/api/v1/session/join/${
        sessionId || isSessionCreated?.id
      }?name=${name}&browserId=${fingerprint}`,
      {
        withCredentials: true,
      }
    );

    if (source) {
      source.onmessage = (event) => {
        console.log(event.data);
      };

      source.onerror = (error) => {
        console.error("EventSource error:", error);
      };
    }
  }

  return (
    <>
      <div>
        {!isSessionCreated && (
          <button onClick={() => onCreateSession()}>Create Session</button>
        )}

        <div>
          <input
            type="text"
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="Enter session id"
          />
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={() => sessionId && onJoinSession(sessionId)}>
            Join Session
          </button>
        </div>

        {isSessionCreated && (
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => onJoinSession()}>Join Session</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
