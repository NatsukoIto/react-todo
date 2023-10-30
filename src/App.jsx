import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  // 入力エリア
  const [todoText, setTodoText] = useState("");
  // 未完了リスト
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了リスト
  const [completeTodos, setCompleteTodos] = useState([]);
  // inputないのテキストの変更の検知
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタン押した時のイベント処理
  const onClickAdd = () => {
    // 入力値が空だったら追加処理にしない。（returnを返す。）
    if (todoText === "") return;
    // 追加したTodoも含めた新しい配列の作成
    const newTodos = [...incompleteTodos, todoText];
    // 未完了のTODOに追加したTodoも含めて表示
    setIncompleteTodos(newTodos);
    // inputエリアの入力値をクリアにする。
    setTodoText("");
  };

  // 削除ボタン押した時のイベント処理
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // 削除ボタンを押したTODOを削除
    newTodos.splice(index, 1);
    // 新しい配列
    setIncompleteTodos(newTodos);
  };

  // 完了ボタン押した時のイベント処理
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    // 勘定ボタンを押したTODOを未完了エリアからクリア
    newIncompleteTodos.splice(index, 1);
    // 完了のTODOに未完了TODOから「完了」ボタンを押されたTODOも並べる。
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    // 新しい配列
    // 未完了リスト
    setIncompleteTodos(newIncompleteTodos);
    // 完了リスト
    setCompleteTodos(newCompleteTodos);
  };

  // 戻るボタンを押した時の処理
  const onclickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    // 完了リストからの削除処理
    newCompleteTodos.splice(index, 1);
    // 未完了リストへの追加処理
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    // 新しい配列
    // 未完了リスト
    setIncompleteTodos(newIncompleteTodos);
    // 完了リスト
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        // 未完了todoの登録上限を超えた時は登録できないようにする。
        disabled={incompleteTodos.length >= 5}
      />
      {/* 未完了todoの登録上限設定 */}
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは５個までです！消化してください！！
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onclickBack={onclickBack} />
    </>
  );
};
