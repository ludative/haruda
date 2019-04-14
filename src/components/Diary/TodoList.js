import React, { Component } from 'react'

import { Button } from '@/styled-ui'
import dateFormat from '@/utils/dateFormat'

export default class DiaryTodoListComponent extends Component {
  render() {
    const { todoList, completedTodoList } = this.props.state
    const {
      user,
      completeTodoList,
      deleteDiaryTodoList,
      openPopup
    } = this.props

    const todoListRows = todoList.map((todo, index) => {
      return (
        <div key={index} className="todo">
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onClick={() => completeTodoList(todo)}
              />
              <div className="icon" />
              <span>{todo.title}</span>
            </label>
          </div>
          <p className="user">
            added by. {`${todo.User.name} (${todo.User.email})`}
          </p>
          <p>{dateFormat(todo.createdAt)}</p>
          {user.id === todo.UserId && (
            <div className="btns">
              <Button mode="edit" onClick={() => openPopup(todo)}>
                수정
              </Button>
              {/* <Button onClick={() => completeTodoList(todo)}>완료</Button> */}
              <Button
                mode="delete"
                onClick={() => deleteDiaryTodoList(todo.id)}
              >
                삭제
              </Button>
            </div>
          )}
        </div>
      )
    })

    const completedTodoListRows = completedTodoList.map((todo, index) => {
      return (
        <div key={index} className="todo">
          <div className="checkbox">
            <label>
              <input type="checkbox" checked={todo.isCompleted} />
              <div className="icon" />
              <span>{todo.title}</span>
            </label>
          </div>
          <p className="user">
            added by. {`${todo.User.name} (${todo.User.email})`}
          </p>
          <p>{dateFormat(todo.updatedAt)}</p>
          {user.id === todo.UserId && (
            <div className="btns">
              <Button
                mode="delete"
                onClick={() => deleteDiaryTodoList(todo.id)}
              >
                삭제
              </Button>
            </div>
          )}
        </div>
      )
    })

    return (
      <div className="diary__todo-list diary-list">
        <div>다이어리 투두 리스트</div>
        <div className="section-btn">
          <Button onClick={() => openPopup()}>추가</Button>
        </div>
        <div className="list-wrapper">
          <div className="list incompleted">{todoListRows}</div>
          <div className="list completed">{completedTodoListRows}</div>
        </div>
      </div>
    )
  }
}
