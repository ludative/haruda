import React, { Fragment } from 'react'
import { Button, FormControl } from '@/styled-ui'
import dateFormat from '@/utils/dateFormat'

export default ({
  comment,
  isEditMode,
  editComment,
  user,
  startEditMode,
  cancelEditMode,
  updateDiaryCommentById,
  deleteDiaryCommentById
}) => {
  return (
    <li>
      {comment.comment} by. {comment.User.name} {dateFormat(comment.createdAt)}{' '}
      {user.id === comment.User.id && (
        <Fragment>
          {/* {isEditMode ? (
            <Fragment>
              <Button onClick={() => updateDiaryCommentById(comment.id)}>
                확인
              </Button>
              <Button onClick={cancelEditMode}>취소</Button>
            </Fragment>
          ) : (
            <Button onClick={startEditMode}>수정</Button>
          )} */}
          <Button onClick={() => deleteDiaryCommentById(comment.id)}>
            삭제
          </Button>
        </Fragment>
      )}
    </li>
  )
}
