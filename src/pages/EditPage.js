import { TextField, Button } from "@mui/material";

import { useTodosState } from "../hooks";
import { useNoticeSnackbarState } from "../components/NoticeSnackbar";
import { useParams } from "react-router-dom";

export default function EditPage() {
  const { id } = useParams();
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();

  const todo = todosState.findTodoById(id);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.performDate.value.length == 0) {
      alert("날짜를 입력해주세요.");
      form.performDate.focus();
      return;
    }

    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요.");
      form.content.focus();
      return;
    }

    const newTodoId = todosState.modifyTodoById(
      todo.id,
      form.regDate.value,
      form.content.value
    );

    noticeSnackbarState.open(`${todo.id}번 할 일이 수정되었습니다.`, "info");
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex-1 flex flex-col gap-7 p-10">
        <TextField
          label="언제 해야 하나요?"
          focused
          type="datetime-local"
          name="regDate"
        />

        <TextField
          name="content"
          label="무엇을 해야 하나요?"
          className="flex-1 flex"
          InputProps={{ className: "flex-1 flex-col" }}
          inputProps={{ className: "flex-1" }}
          multiline
        />

        <Button type="submit" variant="contained">
          <span>
            <i className="fa-solid fa-pencil"></i>
          </span>
          <span>&nbsp;</span>
          <span>{todo.id}번 할 일 수정</span>
        </Button>
      </form>
    </>
  );
}
