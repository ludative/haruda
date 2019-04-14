import React, { Component } from 'react'

import DiaryContentActions from '@/actions/DiaryContents'
import FileActions from '@/actions/File'

import DiaryNewComponent from '@/components/DiaryNew'

export default class DiaryNewContainer extends Component {
  state = {
    title: '',
    weather: 'sunny',
    feeling: 'normal',
    content: '',
    images: [
      { name: '', file: null, url: null },
      { name: '', file: null, url: null },
      { name: '', file: null, url: null },
      { name: '', file: null, url: null }
    ]
  }

  handleChange = (e, index) => {
    const state = { ...this.state }

    switch (e.target.name) {
      case 'image':
        let file = e.target.files[0]
        const images = state.images.map(image => {
          return { ...image }
        })
        const image = images[index]
        image.name = e.target.value

        images.splice(index, 1, image)
        state.images = images
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
      const images = this.state.images.map(image => {
        return { ...image }
      })

      let reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        const image = images[index]
        image.file = file
        image.url = reader.result

        images.splice(index, 1, image)
        this.setState({
          images
        })
      }
    }
  }

  deleteImage = index => {
    const images = this.state.images.map(image => {
      return { ...image }
    })

    images.splice(index, 1)
    images.push({
      name: '',
      file: null,
      url: null
    })

    this.setState({
      images
    })
  }

  createDiary = async () => {
    try {
      const { title, weather, feeling, content, images } = this.state

      const updateImages = images.filter(image => {
        return image.file && image.url
      })

      const promises = updateImages.map(image => {
        return FileActions.uploadImage({
          file: image.file
        })
      })

      const promisesResult = await Promise.all(promises)

      const imagesUrl = promisesResult.map(res => res.body.url)

      const diary = {
        title,
        weather,
        feeling,
        content,
        images: imagesUrl,
        DiaryId: +this.props.match.params.id
      }

      await DiaryContentActions.createDiary({ diary })
      alert('다이어리 등록이 완료되었어요 :)')
      this.props.history.push(`/diaries/${this.props.match.params.id}`)
    } catch (err) {
      alert(err.errorMessage || err.message)
    }
  }

  render() {
    return (
      <DiaryNewComponent
        state={this.state}
        DiaryId={this.props.match.params.id}
        handleChange={this.handleChange}
        createDiary={this.createDiary}
        deleteImage={this.deleteImage}
      />
    )
  }
}
