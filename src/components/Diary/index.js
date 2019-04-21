import React, { Component } from 'react'

import DiaryContainer from '@/containers/Diary/Diary'
import DiaryTodoListContainer from '@/containers/Diary/TodoList'
import DiaryScheduleContainer from '@/containers/Diary/Schedule'

import './style.scss'
import dateFormat from '@/utils/dateFormat'

export default class DiaryMainComponent extends Component {
  render() {
    const { selectedDiaryTab, diary } = this.props.state
    const { diaryId, selectDiaryTab } = this.props

    return (
      <div className="section-diary">
        <div className="container">
          {diary.title} {diary.desc} {dateFormat(diary.createdAt)}
          {/* 다이어리 탭 */}
          <ul className="diary__tab">
            <li
              className={selectedDiaryTab === 'diary' ? 'active' : ''}
              onClick={() => selectDiaryTab('diary')}
            >
              Diary
            </li>
            <li
              className={selectedDiaryTab === 'schedule' ? 'active' : ''}
              onClick={() => selectDiaryTab('schedule')}
            >
              Schedule
            </li>
            <li
              className={selectedDiaryTab === 'todo' ? 'active' : ''}
              onClick={() => selectDiaryTab('todo')}
            >
              To do list
            </li>
          </ul>
          {/* 다이어리 */}
          {selectedDiaryTab === 'diary' && <DiaryContainer diaryId={diaryId} />}
          {/* 일정 */}
          {selectedDiaryTab === 'schedule' && (
            <DiaryScheduleContainer diaryId={diaryId} />
          )}
          {/* 투두리스트 */}
          {selectedDiaryTab === 'todo' && (
            <DiaryTodoListContainer diaryId={diaryId} />
          )}
        </div>
      </div>
    )
  }
}
