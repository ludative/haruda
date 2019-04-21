import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import './style.scss'

export default class FooterComponent extends PureComponent {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <ul className="footer__reference">
            <li>
              icons by. <Link to="https://icons8.com/">icons8.com</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
