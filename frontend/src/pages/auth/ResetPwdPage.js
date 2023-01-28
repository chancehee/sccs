import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'components/common/Button'
import AuthInput from 'components/auth/AuthInput'
import { useNavigate } from 'react-router-dom'
import IconButton from 'components/common/IconButton'
import { RiArrowGoBackFill } from 'react-icons/ri'
import axios from 'libs/axios'
import api from 'apis/api'

export default function ResetPasswordForm() {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  // useState
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isValid: false,
  })

  // 비밀번호 초기화 서버 요청
  const resetPassword = () => {
    if (!id || !email) {
      const newMsg = { ...message }
      newMsg.text = '아이디와 이메일을 모두 입력해주세요'
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }
    const data = {
      id,
      email,
    }
    const [url, method] = api('resetPassword')
    const config = { method, data }
    axios(url, config)
      .then((res) => {
        const newMsg = { ...message }
        newMsg.text = `입력하신 이메일로 임시 비밀번호가 발급되었습니다.`
        newMsg.isValid = true
        setMessage(newMsg)
      })
      .catch((err) => {
        const newMsg = { ...message }
        newMsg.text = '해당 정보의 회원이 존재하지 않습니다.'
        newMsg.isValid = false
        setMessage(newMsg)
      })
  }

  return (
    <Flexbox>
      <IconButton
        icon={<RiArrowGoBackFill />}
        size={'small'}
        text={'로그인으로'}
        onClick={() => {
          navigate('/auth/login')
        }}
      />
      <h1>Password Reset</h1>
      <p>
        If you enter your ID and email,
        <br /> a temporary password will be issued
      </p>
      <Form>
        <AuthInput
          type="id"
          value={id}
          onChange={(e) => {
            setId(e.target.value)
          }}
        ></AuthInput>
        <AuthInput
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          result={message}
        ></AuthInput>
        <p color={message.isValid ? 'pass' : 'error'} value={message.text} />
      </Form>

      <ButtonContainer>
        <Button onClick={resetPassword} value="Submit" size="medium"></Button>
      </ButtonContainer>
    </Flexbox>
  )
}

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  padding: 0rem 8rem;
`
const Form = styled.div`
  margin: 3rem 0rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`