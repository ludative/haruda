import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/styled-ui'

import './style.scss'

export default class HomeComponent extends Component {
  render() {
    return (
      <div className="section-main">
        {/* 메인 섹션 1 */}
        <div className="main-info">
          <div className="container">
            <Button blue="true" as={Link} to="/signup">
              하루다 시작하기
            </Button>
            <div className="main-info__img" />
          </div>
        </div>
      </div>
    )
  }
}
