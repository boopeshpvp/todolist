import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  editTodo,
  clearAlltodo,
  seleceteddata,
} from "../redux/actions/actionCreator";

export const TodoLists = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [filteredatas, setFiltereDatas] = useState({
    all: true,
    iscompl: false,
    ispend: false,
  });

  const actionClick = (data) => {
    if (data && data.type === "edit") {
      dispatch(editTodo(data.todo.id));
    } else if (data && data.type === "delete") {
      dispatch(deleteTodo(data.todo.id));
    }
  };

  const changeEvent = (e, id, iscompl, ispen) => {
    let checked = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !iscompl, isPending: !ispen };
      } else {
        return item;
      }
    });
    dispatch(seleceteddata(checked));
  };

  const handleClearCompleted = () => {
    let clearCompleted = todos.filter((data) => {
      return data.isPending === true;
    });
    dispatch(clearAlltodo(clearCompleted));
  };

  return (
    <div className="container my-2">
      <div className="row pb-4" style={{ height: "60px" }}>
        <div className="col-xl-12 text-right">
          {todos.length > 0 ? (
            <button className="btn btn-danger" onClick={handleClearCompleted}>
              Clear Todos
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th width="3%"></th>
            <th width="30%">Title</th>
            <th width="20%">Action</th>
          </tr>
        </thead>
        <tbody>
          {todos
            .filter((data) => {
              if (filteredatas.iscompl) {
                return data.isCompleted === true;
              } else if (filteredatas.ispend) {
                return data.isPending === true;
              } else if (filteredatas.all) {
                return data;
              }
            })
            .map((todo, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      type={"checkbox"}
                      value={todo.id}
                      onChange={(e) =>
                        changeEvent(
                          e,
                          todo.id,
                          todo.isCompleted,
                          todo.isPending
                        )
                      }
                      checked={todo.isCompleted ? true : false}
                      name={`todo_${index}`}
                    />
                  </td>
                  <td>{todo.title}</td>
                  <td>
                    <div className="flex">
                      <div>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            actionClick({ todo: todo, type: "edit" })
                          }
                        >
                          Edit
                        </button>
                      </div>
                      <div>
                        <button
                          className="btn btn-danger btn-sm ml-1"
                          onClick={() =>
                            actionClick({ todo: todo, type: "delete" })
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="flex">
        <div>
          <button
            className="btn btn-success"
            onClick={() =>
              setFiltereDatas({ all: false, iscompl: true, ispend: false })
            }
          >
            Completed
          </button>
        </div>
        <div>
          <button
            className="btn btn-info"
            onClick={() =>
              setFiltereDatas({ all: false, iscompl: false, ispend: true })
            }
          >
            Active
          </button>
        </div>
        <div>
          <button
            className="btn btn-warning"
            onClick={() =>
              setFiltereDatas({ all: true, iscompl: false, ispend: false })
            }
          >
            All
          </button>
        </div>
      </div>
    </div>
  );
};
