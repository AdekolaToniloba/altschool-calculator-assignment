import { ACTIONS } from "./App";

export default function DigitButton({ dispatch, digit }) {
  return (
    <buuton
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </buuton>
  );
}
