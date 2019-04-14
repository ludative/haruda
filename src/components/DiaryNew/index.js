import React, { Component } from 'react'

import { FormControl, Textarea, Button } from '@/styled-ui'

import * as types from '@/constants'

import './style.scss'

export default class DiaryNewComponent extends Component {
  render() {
    const {
      title,
      weather,
      feeling,
      content,
      image1,
      image2,
      image3,
      image4
    } = this.props.state
    const { handleChange, createDiary } = this.props

    return (
      <div className="section-diary-new">
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
                  <div className="diary-image">
                    <input
                      type="file"
                      accept="image/*"
                      id="image1"
                      name="image1"
                      value={image1}
                      onChange={handleChange}
                    />
                    <label htmlFor="image1" />
                  </div>
                  <div className="diary-image">
                    <input
                      type="file"
                      accept="image/*"
                      id="image2"
                      name="image2"
                      value={image2}
                      onChange={handleChange}
                    />
                    <label htmlFor="image2" />
                  </div>
                  <div className="diary-image">
                    <input
                      type="file"
                      accept="image/*"
                      id="image3"
                      name="image3"
                      value={image3}
                      onChange={handleChange}
                    />
                    <label htmlFor="image3" />
                  </div>
                  <div className="diary-image">
                    <input
                      type="file"
                      accept="image/*"
                      id="image4"
                      name="image4"
                      value={image4}
                      onChange={handleChange}
                    />
                    <label htmlFor="image4" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="btns">
            <Button onClick={createDiary}>추가</Button>
            <Button>취소</Button>
          </div>
        </div>
      </div>
    )
  }
}
