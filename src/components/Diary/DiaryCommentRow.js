import React, { Component, Fragment } from 'react'
import { Button, FormControl } from '@/styled-ui'
import dateFormat from '@/utils/dateFormat'

export default class DiaryCommentRow extends Component {
  state = {
    isEditMode: false,
    editComment: ''
  }

  startEditMode = () => {
    this.setState({
      isEditMode: true,
      editComment: this.props.comment.comment
    })
  }

  cancelEditMode = () => {
    this.setState({
      isEditMode: false,
      editComment: ''
    })
  }

  handleChangeForEdit = e => {
    const state = { ...this.state }
    switch (e.target.name) {
      default:
        state[e.target.name] = e.target.value
        break
    }
    this.setState(state)
  }

  render() {
    const { isEditMode, editComment } = this.state
    const {
      comment,
      user,
      updateDiaryCommentById,
      deleteDiaryCommentById
    } = this.props

    return (
      <li>
        {isEditMode ? (
          <FormControl
            type="text"
            name="editComment"
            value={editComment}
            onChange={this.handleChangeForEdit}
          />
        ) : (
          comment.comment
        )}
        by. {comment.User.name} {dateFormat(comment.createdAt)}{' '}
        {user.id === comment.User.id && (
          <Fragment>
            {isEditMode ? (
              <Fragment>
                <Button
                  onClick={() =>
                    updateDiaryCommentById(editComment, comment.id)
                  }
                >
                  확인
                </Button>
                <Button onClick={this.cancelEditMode}>취소</Button>
              </Fragment>
            ) : (
              <Button onClick={this.startEditMode}>수정</Button>
            )}
            <Button onClick={() => deleteDiaryCommentById(comment.id)}>
              삭제
            </Button>
          </Fragment>
        )}
      </li>
    )
  }
}
