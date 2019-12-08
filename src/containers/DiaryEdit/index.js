import React, { Component } from 'react'

import DiaryContentActions from '@/actions/DiaryContents'
import FileActions from '@/actions/File'

import DiaryEditComponent from '@/components/DiaryEdit'

export default class DiaryEditContainer extends Component {
  state = {
    title: '',
    weather: 'sunny',
    feeling: 'normal',
    content: '',
    diaryContentImages: []
  }

  async componentDidMount() {
    await this.getDiaryById()
  }

  getDiaryById = async () => {
    try {
      let diaryContentImages = []
      const result = await DiaryContentActions.getDiaryById({
        id: this.props.match.params.id
      })

      for (let i = 0; i < result.diaryContentImages.length; i++) {
        diaryContentImages.push({
          url: result.diaryContentImages[i].imageUrl
        })
      }
      for (let j = 0; j < 4 - result.diaryContentImages.length; j++) {
        diaryContentImages.push({
          file: null,
          url: null
        })
      }

      result.diaryContentImages = diaryContentImages

      this.setState({
        ...result
      })
    } catch (err) {
      alert(err.errorMessage || err.message)
    }
  }

  handleChange = (e, index) => {
    const state = { ...this.state }

    switch (e.target.name) {
      case 'image':
        let file = e.target.files[0]
        const diaryContentImages = state.diaryContentImages.map(image => {
          return { ...image }
        })
        const image = diaryContentImages[index]

        diaryContentImages.splice(index, 1, image)
        state.diaryContentImages = diaryContentImages
        this.setState(state, () => {
          this.readFile(file, index)
        })
        break
      default:
        state[e.target.name] = e.target.value
        this.setState(state)
        break
    }
  }

  readFile = (file, index) => {
    if (file) {
      const diaryContentImages = this.state.diaryContentImages.map(image => {
        return { ...image }
      })

      let reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        const image = diaryContentImages[index]
        image.file = file
        image.url = reader.result

        diaryContentImages.splice(index, 1, image)
        this.setState({
          diaryContentImages
        })
      }
    }
  }

  deleteImage = index => {
    const diaryContentImages = this.state.diaryContentImages.map(image => {
      return { ...image }
    })

    diaryContentImages.splice(index, 1)
    diaryContentImages.push({
      file: null,
      url: null
    })

    this.setState({
      diaryContentImages
    })
  }

  updateDiary = async () => {
    try {
      const {
        title,
        weather,
        feeling,
        content,
        diaryContentImages
      } = this.state

      let updateImages = []
      let images = []

      diaryContentImages.forEach(image => {
        if (image.file) {
          updateImages.push(image)
        } else if (image.url) {
          images.push(image.url)
        }
      })

      const promises = updateImages.map(image => {
        return FileActions.uploadImage({
          file: image.file
        })
      })

      const promisesResult = await Promise.all(promises)

      const imagesUrl = promisesResult.map(res => res.body.url)
      images.forEach(image => {
        imagesUrl.push(image)
      })

      const diary = {
        title,
        weather,
        feeling,
        content,
        images: imagesUrl,
        DiaryId: +this.state.DiaryId
      }

      console.log('diary', diary)

      await DiaryContentActions.updateDiary({
        id: this.props.match.params.id,
        diary
      })
      this.props.history.push(`/diaries/${+this.state.DiaryId}`)
      alert('다이어리 수정이 완료되었어요 :)')
    } catch (err) {
      alert(err.errorMessage || err.message)
    }
  }

  render() {
    return (
      <DiaryEditComponent
        state={this.state}
        handleChange={this.handleChange}
        updateDiary={this.updateDiary}
        deleteImage={this.deleteImage}
      />
    )
  }
}
