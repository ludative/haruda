import React, { Component } from 'react'

import DiaryContentActions from '@/actions/DiaryContents'

import DiaryNewComponent from '@/components/DiaryNew'

export default class DiaryNewContainer extends Component {
  state = {
    title: '',
    weather: 'sunny',
    feeling: 'normal',
    content: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image1Url: '',
    image2Url: '',
    image3Url: '',
    image4Url: ''
  }

  handleChange = e => {
    const state = { ...this.state }

    switch (e.target.name) {
      case 'image1':
      case 'image2':
      case 'image3':
      case 'image4':
        let file = e.target.files[0]
        this.readFile(e.target.name, file)

        state[e.target.name] = e.target.value
        break
      default:
        state[e.target.name] = e.target.value
        break
    }

    this.setState(state)
  }

  readFile = (target, file) => {
    if (file) {
      const state = { ...this.state }

      let reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        this.setState({
          file,
          imgUrl: reader.result
        })
      }
    }
  }

  createDiary = async () => {
    try {
      const { title, weather, feeling, content, images } = this.state
      const diary = {
        title,
        weather,
        feeling,
        content,
        images,
        DiaryId: this.props.match.params.id
      }
      console.log('diary', diary)
      // await DiaryContentActions.createDiary({ diary })
      // alert('다이어리 등록이 완료되었어요 :)')
      // this.props.history.push(`/diaries/${this.props.match.params.id}`)
    } catch (err) {
      alert(err.errorMessage || err.message)
    }
  }

  render() {
    return (
      <DiaryNewComponent
        state={this.state}
        handleChange={this.handleChange}
        createDiary={this.createDiary}
      />
    )
  }
}
