import * as React from "react";
import { useState } from "react";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const changeField = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (field) {
      case "id":
        setId(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };
  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={changeField.bind(this, "id")}
      ></input>
      <input
        type="password"
        value={password}
        onChange={changeField.bind(this, "password")}
      ></input>
    </div>
  );
}
