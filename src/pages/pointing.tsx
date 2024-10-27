import * as React from "react";
import { generateFibonacci } from "../helpers/generate-fibonacci";
import axios from "axios";
import useFingerprint from "../hooks/useFingerPrint";
import { useParams } from "react-router-dom";
import { useSessionContext } from "../store/session.context";
import { debounce } from "../helpers/debounce";

export interface IPointingProps {}

export default function Pointing(props: IPointingProps) {
  const params = useParams();
  const { session } = useSessionContext();
  const fingerprint = useFingerprint();
  const [description, setDescription] = React.useState(
    session?.activeStory.description || ""
  );
  const [timeOutRef, setTimeOutRef] =
    React.useState<ReturnType<typeof setTimeout>>();
  React.useEffect(() => {
    setDescription(session?.activeStory.description || "");
  }, [session?.activeStory]);

  async function addPoints(point: number) {
    const response = await axios.post(
      `http://127.0.0.1:3000/api/v1/session/add-point/${params.sessionId}`,
      {
        browserId: fingerprint,
        point: String(point),
      }
    );
  }

  function updateServer(value: string) {
    axios.post(
      `http://127.0.0.1:3000/api/v1/session/update-description/${params.sessionId}`,
      {
        description: value,
      }
    );
  }

  const updateServerDebounce = debounce(
    updateServer,
    100,
    setTimeOutRef,
    timeOutRef
  );
  function onChangeDescription(value: string) {
    setDescription(value);
    updateServerDebounce(value);
  }

  return (
    <div>
      <textarea
        value={description}
        onChange={(e) => onChangeDescription(e.currentTarget.value)}
      />
      {generateFibonacci(14).map((number) => {
        return <button onClick={() => addPoints(number)}>{number}</button>;
      })}
      {session?.members.map((members) => {
        return (
          <div style={{ display: "flex", columnGap: "8px" }}>
            <p>{members.name}</p>
            <p>{session.activeStory.votes[members.id]?.vote || 0}</p>
          </div>
        );
      })}
    </div>
  );
}
