import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import DiaryDetail from './DiaryDetail'

import { Button } from '@/styled-ui'
import dateFormat from '@/utils/dateFormat'

export default class DiaryComponent extends Component {
  render() {
    const {
      diaries,
      diary,
      activeDiaryId,
      diaryComments,
      comment,
      commentPage,
      commentPageSize,
      commentNumberOfPages,
      commentCount
    } = this.props.state
    const {
      user,
      diaryId,
      getDiaryById,
      getDiaryContentComments,
      handleChange,
      handleKeyPress,
      createDiaryComment,
      deleteDiaryCommentById,
      updateDiaryCommentById,
      deleteDiaryById
    } = this.props

    const diaryRows = diaries.map((timeline, index) => {
      return (
        <div className="diary-panel" key={index}>
          <div className="diary-panel__date">{timeline.createdDate}</div>
          <div className="diary-panel__rows">
            {timeline.contents.map((content, cIdx) => {
              const createTime = dateFormat(content.createdAt)
              const time = createTime.split(' ')

              return (
                <div
                  className={`diary ${
                    activeDiaryId === content.id ? 'open' : ''
                  }`}
                  key={cIdx}
                >
                  <div
                    className="diary__info"
                    id={`diary-${content.id}`}
                    onClick={() => getDiaryById(content.id)}
                  >
                    <div className="diary__title">
                      {content.title}{' '}
                      <img
                        src={`/images/feeling/icon_${content.feeling}.png`}
                        alt={content.feeling}
                      />{' '}
                      <img
                        src={`/images/weather/icon_${content.weather}.png`}
                        alt={content.weather}
                      />
                    </div>
                    <div className="diary__creator">
                      {content.User.name} {time[1]}
                    </div>
                  </div>

                  {diary &&
                    activeDiaryId === content.id && (
                      <Fragment>
                        {content.User.id === user.id && (
                          <Fragment>
                            <Button onClick={() => deleteDiaryById(content.id)}>
                              삭제
                            </Button>
                            <Button
                              as={Link}
                              to={`/diaries/edit/${content.id}`}
                            >
                              수정
                            </Button>
                          </Fragment>
                        )}
                        <DiaryDetail
                          user={user}
                          diary={diary}
                          diaryComments={diaryComments}
                          comment={comment}
                          commentPage={commentPage}
                          commentPageSize={commentPageSize}
                          commentNumberOfPages={commentNumberOfPages}
                          commentCount={commentCount}
                          getDiaryContentComments={getDiaryContentComments}
                          handleChange={handleChange}
                          handleKeyPress={handleKeyPress}
                          createDiaryComment={createDiaryComment}
                          deleteDiaryCommentById={deleteDiaryCommentById}
                          updateDiaryCommentById={updateDiaryCommentById}
                        />
                      </Fragment>
                    )}
                </div>
              )
            })}
          </div>
        </div>
      )
    })
    return (
      <Fragment>
        {/* 다이어리 search bar */}
        <div className="diary__search-bar" />

        <div className="btns">
          <Button as={Link} to={`/diaries/new/${diaryId}`}>
            다이어리 쓰기
          </Button>
        </div>
        <div className="diary-timeline">{diaryRows}</div>
      </Fragment>
    )
  }
}
