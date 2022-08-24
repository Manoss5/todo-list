import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ACTIONS } from "./Todolist";
import { useState } from "react";

export default function Todo({ name, details, color, dispatch }) {
  const [title, setTitle] = useState(name);
  const [text, setText] = useState(details);
  const [editing, setEditing] = useState(false);

  return (
    <div
      className="todo"
      style={{
        boxShadow: `0.1rem  0.1rem ${color}`,
        rowGap: editing && "1.1rem",
      }}
    >
      <span style={{ display: editing ? "none" : "inline" }}>{name}</span>
      <input
        style={{
          border: `1px solid ${color}`,
          display: editing ? "inline" : "none",
        }}
        placeholder={"Add a title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength="30"
      ></input>
      <FontAwesomeIcon
        icon={faPenToSquare}
        style={{ color: color }}
        onClick={() => {
          dispatch({
            type: ACTIONS.EDIT,
            payload: { title: title, text: text, name: name, editing: editing },
          });
          setEditing(!editing);
        }}
      />
      <FontAwesomeIcon
        icon={faTrashCan}
        style={{ color: color }}
        onClick={() => dispatch({ type: ACTIONS.DELETE, payload: name })}
      />
      <p style={{ display: editing ? "none" : "inline" }}>{text}</p>
      <textarea
        style={{
          border: `1px solid ${color}`,
          display: editing ? "inline" : "none",
        }}
        placeholder={"Add some description"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  );
}
