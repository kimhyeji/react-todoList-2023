import { Tab, Tabs } from "@mui/material";

import { useTodosState, useTodoOptionDrawerState } from "../hooks";
import TodoOptionDrawer from "../components/TodoOptionDrawer";
import TodoListItem from "../components/TodoListItem";
import { TodoList__filterCompletedIndexAtom } from "../atoms";
import { useRecoilState } from "recoil";

export default function TodoList() {
  const todosState = useTodosState();
  const todoOptionDrawerState = useTodoOptionDrawerState();
  const onCompletedBtnClicked = (id) => todosState.toggleTodoCompleteById(id);
  const [filterCompletedIndex, setFilterCompletedIndex] = useRecoilState(
    TodoList__filterCompletedIndexAtom
  );

  return (
    <>
      <TodoOptionDrawer state={todoOptionDrawerState} />

      <Tabs
        variant="fullWidth"
        value={filterCompletedIndex}
        onChange={(event, newValue) => setFilterCompletedIndex(newValue)}
      >
        <Tab
          label={
            <span className="flex">
              <i className="fa-solid fa-list-ul"></i>
              <span className="ml-2">전체</span>
            </span>
          }
          value={0}
        />
        <Tab
          label={
            <span className="flex">
              <i className="fa-regular fa-square"></i>
              <span className="ml-2">미완료</span>
            </span>
          }
          value={1}
        />
        <Tab
          label={
            <span className="flex">
              <i className="fa-regular fa-square-check"></i>
              <span className="ml-2">완료</span>
            </span>
          }
          value={2}
        />
      </Tabs>

      <div className="mt-4 px-4">
        <ul>
          {todosState.todos.map((todo, index) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              index={index}
              openDrawer={todoOptionDrawerState.open}
              onCompletedBtnClicked={onCompletedBtnClicked}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
