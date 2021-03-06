/**
 * Form ui
 */
import styled, { css } from 'styled-components'

// buttons
export const Button = styled.button`
  background-color: ${props =>
    props.blue ? '#0984e3' : props.red ? '#d63031' : '#6c5ce7'};
  color: #ffffff;
  padding: 10px 20px;
  font-size: 15px;
  display: inline-block;
  min-width: 60px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  outline: 0;

  &:hover {
    background-color: ${props =>
      props.blue ? '#74b9ff' : props.red ? '#ff7675' : '#a29bfe'};
  }

  img {
    width: 20px;
    vertical-align: middle;
  }

  ${props =>
    props.mode &&
    css`
      min-width: auto;
      width: 20px;
      height: 20px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('/images/common/icon_${props.mode}.png');
      background-size: cover;
      padding: 0;
      font-size: 0;

      &:hover {
        background-color: transparent;
      }
    `};
`

// link style
export const LinkButton = styled.a`
  text-decoration: underline;
  cursor: pointer;
`

// input wrapper div
export const FormGroup = styled.div`
  margin: 0 0 15px;

  &:last-child {
    margin-bottom: 0;
  }
`

// input
export const FormControl = styled.input`
  border-radius: 3px;
  border: 1px solid #b2bec3;
  padding: 0 10px;
  height: 34px;
  font-size: 15px;
  outline: 0;
  width: 100%;
  transition: 0.3s;

  &:focus {
    border-color: #a29bfe;
  }
`

// input
export const Textarea = styled.textarea`
  border-radius: 3px;
  border: 1px solid #b2bec3;
  padding: 5px 10px;
  height: 200px;
  font-size: 15px;
  outline: 0;
  width: 100%;
  transition: 0.3s;
  resize: none;

  &:focus {
    border-color: #a29bfe;
  }
`

// export default { Button, LinkButton, FormGroup, FormControl }
