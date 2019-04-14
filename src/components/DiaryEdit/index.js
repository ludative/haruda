import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { FormControl, Textarea, Button } from '@/styled-ui'

import * as types from '@/constants'

import './style.scss'

export default class DiaryEditComponent extends Component {
  render() {
    const {
      title,
      weather,
      feeling,
      content,
      diaryContentImages
    } = this.props.state

    const { handleChange, updateDiary, deleteImage } = this.props

    return (
      <div className="section-diary-edit">
        <div className="container">
          <table className="table table--info">
            <colgroup>
              <col width="20%" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th>제목</th>
                <td>
                  <FormControl
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>오늘의 날씨</th>
                <td>
                  {types.weather.map((wt, index) => {
                    return (
                      <div className="radio" key={index}>
                        <label>
                          <input
                            type="radio"
                            name="weather"
                            value={wt}
                            checked={weather === wt}
                            onChange={handleChange}
                          />
                          <div
                            className="icon"
                            style={{
                              backgroundImage: `url(/images/weather/icon_${wt}.png)`
                            }}
                          />
                        </label>
                      </div>
                    )
                  })}
                </td>
              </tr>
              <tr>
                <th>오늘의 기분</th>
                <td>
                  {types.feeling.map((fl, index) => {
                    return (
                      <div className="radio" key={index}>
                        <label>
                          <input
                            type="radio"
                            name="feeling"
                            value={fl}
                            checked={feeling === fl}
                            onChange={handleChange}
                          />
                          <div
                            className="icon"
                            style={{
                              backgroundImage: `url(/images/feeling/icon_${fl}.png)`
                            }}
                          />
                        </label>
                      </div>
                    )
                  })}
                </td>
              </tr>
              <tr>
                <th>오늘의 하루 기록</th>
                <td>
                  <Textarea
                    name="content"
                    value={content}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  사진 공유<br />(최대 4개까지 공유할 수 있어요!)
                </th>
                <td>
                  {diaryContentImages.map((row, index) => {
                    return (
                      <div className="diary-image" key={index}>
                        <input
                          type="file"
                          accept="image/*"
                          id={`image${index}`}
                          name="image"
                          value={row.name}
                          onChange={e => handleChange(e, index)}
                        />
                        <label
                          htmlFor={`image${index}`}
                          style={{
                            backgroundImage: row.url ? `url(${row.url})` : ''
                          }}
                        />
                        <button onClick={() => deleteImage(index)}>x</button>
                      </div>
                    )
                  })}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="btns">
            <Button onClick={updateDiary}>수정</Button>
            <Button as={Link} to={`/diaries/${this.props.DiaryId}`}>
              취소
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
