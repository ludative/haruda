import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'
import { Button, FormControl } from '@/styled-ui'
import dateFormat from '@/utils/dateFormat'

import DiaryCommentRow from './DiaryCommentRow'
import Pagination from '@/components/Common/Pagination'

export default class DiaryDetail extends Component {
  render() {
    const {
      user,
      diary,
      diaryComments,
      comment,
      commentPage,
      commentPageSize,
      commentNumberOfPages,
      commentCount,
      isEditMode,
      editComment,

      getDiaryContentComments,
      handleChange,
      handleKeyPress,
      createDiaryComment,
      deleteDiaryCommentById,
      updateDiaryCommentById,
      startEditMode,
      cancelEditMode
    } = this.props

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    const diaryCommentRows = diaryComments.map((comment, index) => {
      return (
        <DiaryCommentRow
          key={index}
          comment={comment}
          isEditMode={isEditMode}
          editComment={editComment}
          user={user}
          startEditMode={startEditMode}
          cancelEditMode={cancelEditMode}
          updateDiaryCommentById={updateDiaryCommentById}
          deleteDiaryCommentById={deleteDiaryCommentById}
        />
      )
    })

    return (
      <div className="diary__content">
        {diary.diaryContentImages.length > 0 && (
          <Slider {...settings}>
            {diary.diaryContentImages.map((image, index) => {
              return (
                <div key={index}>
                  <div
                    className="diary__thumbnail"
                    style={{ backgroundImage: `url(${image.imageUrl})` }}
                  />
                </div>
              )
            })}
          </Slider>
        )}
        <p>{diary.content}</p>

        <div className="diary__comments">
          {commentCount} 댓글
          {diaryCommentRows.length > 0 && (
            <ul className="comments">{diaryCommentRows}</ul>
          )}
          <div className="comment-input">
            <FormControl
              type="text"
              name="comment"
              value={comment}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          {commentCount > commentPageSize && (
            <Pagination
              page={commentPage}
              numberOfPages={commentNumberOfPages}
              prev={true}
              next={true}
              getNewPage={getDiaryContentComments}
            />
          )}
        </div>
      </div>
    )
  }
}
