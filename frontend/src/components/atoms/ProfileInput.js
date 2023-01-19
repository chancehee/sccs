import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const typeObj = {
  name: {
    type: 'text',
    label: 'Name',
    placeholder: 'user.name',
  },
  nickname: {
    type: 'text',
    label: 'Nickname',
    placeholder: 'user.nickname',
  },
  id: {
    type: 'text',
    label: 'ID',
    placeholder: 'user.id',
  },
  email: {
    type: 'Email',
    label: 'Email',
    placeholder: 'user.email@email.com',
  },
  password: {
    type: 'password',
    label: 'Password',
    placeholder: 'user.password',
  },
  newpassword: {
    type: 'password',
    label: 'NewPassword',
    placeholder: 'user.newpassword',
  },
  confirmpassword: {
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'user.confirmpassowrd',
  },
}

const ProfileInput = ({ type, value, onChange, disabled }) => {
  return (
    <InputBox>
      <Label>{typeObj[type].label}</Label>
      
        
      <Input
        type={typeObj[type].type}
        placeholder={typeObj[type].placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    
    </InputBox>
  )
}

const InputBox = styled.div`
  
  border: 1px;
`

ProfileInput.propTypes = {
  type: PropTypes.oneOf([
    'name',
    'nickname',
    'id',
    'email',
    'password',
    'newpassword',
    'confirmPassword',
  ]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  message: PropTypes.object,
  disabled: PropTypes.bool,
}

ProfileInput.defaultProps = {
  type: 'id',
  value: '',
  onChange: undefined,
  message: { text: '', isValid: false },
  disabled: true,
}



const Input = styled.input`
  font-size: 1.5rem;
  padding: 0.2rem 0.1rem;
  height: 3rem;
  border: 1px solid;
  border-radius: 10px;
  background-color: ${({disabled}) => disabled ? '#CCCCCC' : 'white'}
`

const Label = styled.div`
  font-size: 1.4rem;
  color: black;
  margin-top: 1rem;
`


export default ProfileInput

