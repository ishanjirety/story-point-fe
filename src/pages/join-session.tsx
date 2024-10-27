import * as React from "react";
import useFingerprint from "../hooks/useFingerPrint";
import { useNavigate, useParams } from "react-router-dom";
import { useSessionContext } from "../store/session.context";

export interface IJoinSessionProps {}

export default function JoinSession(props: IJoinSessionProps) {
  const fingerprint = useFingerprint();
  const { setSession } = useSessionContext();
  const params = useParams();
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!params.sessionId) {
      navigate("/");
    }
  }, []);

  async function onJoinSession(sessionId: string) {
    const source = new EventSource(
      `http://127.0.0.1:3000/api/v1/session/join/${sessionId}?name=${name}&browserId=${fingerprint}`,
      {
        withCredentials: true,
      }
    );

    if (source) {
      source.onmessage = (event) => {
        console.log(event.data);
        const session = JSON.parse(event.data) as TSession;
        setSession(session);
      };

      source.onerror = (error) => {
        console.error("EventSource error:", error);
      };
    }

    navigate(`/session/${sessionId}`);
  }
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button
        onClick={() => params.sessionId && onJoinSession(params.sessionId)}
      >
        Join Session
      </button>
    </div>
  );
}
