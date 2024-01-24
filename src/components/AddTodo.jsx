import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, updateTodo } from "../redux/actions/actionCreator";

export const AddTodo = () => {
  const [value, setValue] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state.isEdit);
  const editTodo = useSelector((state) => state.editTodo);
 
  useEffect(() => {
    editTodo && setValue(() => editTodo);
  }, [editTodo]);

  const onSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!value.title) {
        setError({ title: "Please enter your Todolist" });
        return;
      }

      if (isEdit) {
        dispatch(updateTodo(editTodo.id, value));
      } else {
        dispatch(addNewTodo(value));
      }

      setValue({ title: "" });
    }
  };

  const changeEvent = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    if (e.target.name !== "") {
      setError({
        title: "",
      });
    }
  };

  return (
    <div className="container my-4 py-1 border">
      <form className="mt-3 mb-2" id="todoForm" onKeyDown={onSubmit}>
        <div className="row">
          <div className="col-xl-3">
            <label className="sr-only">Todo</label>
            <input
              type="text"
              name="title"
              className="form-control mb-2 mr-sm-3"
              placeholder="What needs to be done"
              value={value.title}
              onChange={(e) => changeEvent(e)}
            />
            <span className="text-danger ">{error.title}</span>
          </div>
        </div>
      </form>
    </div>
  );
};
