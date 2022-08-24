import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Todo from "./Todo";
import { useReducer, useRef, useState } from "react";

function randomColor() {
  const randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  return `rgb(${r},${g},${b})`;
}

export const ACTIONS = {
  ADD: "add",
  DELETE: "delete",
  EDIT: "edit",
  ID: "0",
};

function reducer(state, action) {
  const todos = state.todos;
  const todosDetails = state.todosDetails;
  switch (action.type) {
    case ACTIONS.ADD:
      if (todos.includes(action.payload)) {
        alert("Todo already exists!");
        return { ...state };
      } else {
        todos.push(action.payload);
        todosDetails[action.payload] = {
          id: ACTIONS.ID,
          details: "Add some details!",
          color: randomColor(),
          editing: false,
        };
        ACTIONS.ID++;
        return { ...state, todos, todosDetails };
      }
    case ACTIONS.DELETE:
      if (todos.includes(action.payload)) {
        todos.splice(todos.indexOf(action.payload), 1);
        delete todosDetails[action.payload];
        return { ...state, todos, todosDetails };
      }
      return { ...state };
    case ACTIONS.EDIT:
      if (!action.payload.editing) {
        return { ...state };
      } else if (action.payload.name !== action.payload.title) {
        todos[todos.indexOf(action.payload.name)] = action.payload.title;
        todosDetails[action.payload.name].details = action.payload.text;
        todosDetails[action.payload.title] = todosDetails[action.payload.name];
        delete todosDetails[action.payload.name];
        return { ...state, todos, todosDetails };
      } else {
        todosDetails[action.payload.name].details = action.payload.text;
        return { ...state };
      }
    default:
      throw new Error();
  }
}

export default function Todolist() {
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    todosDetails: {},
  });
  const ref = useRef(null);
  const [input, setInput] = useState("");

  const TodosList = state.todos.map((todo) => {
    return (
      <Todo
        key={state.todosDetails[todo].id}
        name={todo}
        details={state.todosDetails[todo].details}
        color={state.todosDetails[todo].color}
        dispatch={dispatch}
      />
    );
  });

  return (
    <div className="todolist">
      <form
        className="add-todo"
        onSubmit={(e) => {
          e.preventDefault();
          input !== "" && dispatch({ type: ACTIONS.ADD, payload: input });
          setInput("");
          ref.current.focus();
        }}
      >
        <input
          placeholder="what do you want to do..."
          autoFocus={true}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          ref={ref}
          maxLength="30"
        ></input>
        <button type="submit">
          <FontAwesomeIcon icon={faFileCirclePlus} size="2x" />
        </button>
      </form>
      {TodosList}
    </div>
  );
}
