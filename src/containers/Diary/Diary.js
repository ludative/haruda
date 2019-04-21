import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import DiaryContentsActions from '@/actions/DiaryContents'
import DiaryContentCommentsActions from '@/actions/DiaryContentComments'

import DiaryComponent from '@/components/Diary/Diary'

import pagination from '@/utils/pagination'

@inject('authStore')
@observer
export default class DiaryContainer extends Component {
  state = {
    diaries: null,
    page: 1,
    pageSize: 10,
    startDate: '',
    endDate: '',
    title: '',
    diary: null,
    activeDiaryId: '',
    commentPage: 1,
    commentPageSize: 10,
    commentNumberOfPages: 0,
    commentCount: 0,
    diaryComments: [],
    comment: '',
    isEditMode: false
  }

  async componentDidMount() {
    await this.getDiariesById()
  }

  getDiariesById = async page => {
    const { pageSize, startDate, endDate, title } = this.state
    const searchOpion = {
      DiaryId: this.props.diaryId,
      page,
      pageSize,
      startDate,
      endDate,
      title
    }

    try {
      const result = await DiaryContentsActions.getDiariesById(searchOpion)

      const calculatePagination = pagination({
        page,
        pageSize: this.state.pageSize,
        count: result.count
      })

      this.setState({
        diaries: result.rows,
        ...calculatePagination
      })
    } catch (err) {
      alert(err.errorMessage || err.message)
    }
  }

  getDiaryById = async id => {
    if (this.state.activeDiaryId !== id) {
      try {
        const diary = await DiaryContentsActions.getDiaryById({ id })

        this.setState({
          diary,
          activeDiaryId: id
        })
        const activeDiary = document.getElementById(`diary-${id}`)
        window.scrollTo(0, activeDiary.offsetTop - 60)
        await this.getDiaryContentComments(1)
      } catch (err) {
        alert(err.errorMessage || err.message)
      }
    } else {
      this.setState({
        activeDiaryId: ''
      })
    }
  }

  getDiaryContentComments = async page => {
    const { activeDiaryId, commentPageSize } = this.state

    try {
      const searchOption = {
        page,
        pageSize: commentPageSize,
        DiaryContentId: activeDiaryId
      }
      const result = await DiaryContentCommentsActions.getDiaryContentComments(
        searchOption
      )

      const calculatePagination = pagination({
        page,
        pageSize: commentPageSize,
        count: result.count
      })

      this.setState({
        commentPage: calculatePagination.page,
        commentNumberOfPages: calculatePagination.numberOfPages,
        commentCount: calculatePagination.count,
        diaryComments: result.rows
      })
    } catch (err) {
      alert(err.errorMessage || err.message)
    }
  }

  handleChange = e => {
    const state = { ...this.state }
    switch (e.target.name) {
      default:
        state[e.target.name] = e.target.value
        break
    }
    this.setState(state)
  }

  handleKeyPress = async e => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      await this.createDiaryComment()
    }
  }

  createDiaryComment = async () => {
    try {
      await DiaryContentCommentsActions.createDiaryComment({
        comment: this.state.comment,
        DiaryContentId: this.state.activeDiaryId
      })

      this.setState({
        comment: ''
      })
      await this.getDiaryContentComments(1)
    } catch (err) {
      alert(err.errorMessage || err.message)
    }
  }

  deleteDiaryCommentById = async commentId => {
    try {
      await DiaryContentCommentsActions.deleteDiaryCommentById({ commentId })
      alert('댓글 삭제가 완료되었습니다.')
      await this.getDiaryContentComments(1)
    } catch (err) {
      alert(err.errorMessage || err.message)
    }
  }

  startEditMode = () => {
    this.setState({
      isEditMode: true
    })
  }

  cancelEditMode = () => {
    this.setState({
      editComment: '',
      isEditMode: false
    })
  }

  updateeDiaryCommentById = async commentId => {
    try {
      await DiaryContentCommentsActions.updateDiaryCommentById({ commentId })
      alert('댓글 수정이 완료되었습니다.')
      await this.getDiaryContentComments(1)
    } catch (err) {
      alert(err.errorMessage || err.message)
    }
  }

  render() {
    return (
      this.state.diaries && (
        <DiaryComponent
          state={this.state}
          user={this.props.authStore.user}
          diaryId={this.props.diaryId}
          getDiariesById={this.getDiariesById}
          getDiaryById={this.getDiaryById}
          getDiaryContentComments={this.getDiaryContentComments}
          handleChange={this.handleChange}
          handleKeyPress={this.handleKeyPress}
          createDiaryComment={this.createDiaryComment}
          deleteDiaryCommentById={this.deleteDiaryCommentById}
          updateeDiaryCommentById={this.updateeDiaryCommentById}
          startEditMode={this.startEditMode}
          cancelEditMode={this.cancelEditMode}
        />
      )
    )
  }
}
