import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./styles.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear-",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentResult: payload.digit,
          overwrite: false
        };
      }
      if (payload.digit === "0" && state.currentResult === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentResult.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentResult: `${state.currentResult || ""}${payload.digit}`
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentResult == null && state.previousResult == null) {
        return state;
      }

      if (state.currentResult == null)
        return {
          ...state,
          operation: payload.operation
        };

      if (state.previousResult == null) {
        return {
          ...state,
          operation: payload.operation,
          previousResult: state.currentResult,
          currentResult: null
        };
      }

      return {
        ...state,
        previousResult: evaluate(state),
        operation: payload.operation,
        currentResult: null
      };
    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentResult: null
        };
      }

      if (state.currentResult == null) return state;
      if (state.currentResult.length == 1) {
        return { ...state, currentResult: null };
      }

      return {
        ...state,
        currentResult: state.currentResult.slice(0, -1)
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentResult == null ||
        state.previousResult == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousResult: null,
        operation: null,
        currentResult: evaluate(state)
      };
  }
}

function evaluate({ currentResult, previousResult, operation }) {
  const prev = parseFloat(previousResult);
  const current = parseFloat(currentResult);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;

    case "-":
      computation = prev - current;
      break;

    case "*":
      computation = prev * current;
      break;

    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

function App() {
  const [{ currentResult, previousResult, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-result">
          {" "}
          {previousResult} {operation}
        </div>
        <div className="current-result">{currentResult}</div>
      </div>

      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} className="button" />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
