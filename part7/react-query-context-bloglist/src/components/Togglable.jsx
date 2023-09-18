import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  font-size: 0.8rem;
  padding: 0.5rem;
  background: darkslategrey;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1rem;
  &:hover {
    opacity: 80%;
  }
`

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <Button onClick={toggleVisibility} style={hideWhenVisible}>
        {buttonLabel}
      </Button>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
export default Togglable
