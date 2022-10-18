import { ACTIONS } from "./App";

export default function OperationButton({ dispatch, operation }) {
  return (
    <buuton
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </buuton>
  );
}
