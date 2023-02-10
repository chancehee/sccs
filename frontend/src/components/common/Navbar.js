import React from 'react'
import Logo from 'components/common/Logo'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import IconButton from 'components/common/IconButton'
import { BsCloudSun, BsCloudMoon } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from 'redux/themeSlice'
import { deleteUserInfo } from 'redux/userSlice'

/*
상단 네비게이션바 컴포넌트
*/

export default function Navbar() {
  const navigate = useNavigate()

  // 리덕스 -> theme정보
  const theme = useSelector((state) => state.theme)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(deleteUserInfo())
    navigate('/')
  }

  return (
    <Nav>
      <Flexbox>
        <Logo></Logo>
        <IconButton
          icon={theme === 'light' ? <BsCloudSun /> : <BsCloudMoon />}
          type={theme === 'light' ? 'primary' : 'secondary'}
          size={'medium'}
          onClick={() => {
            dispatch(toggleTheme())
          }}
        />
      </Flexbox>
      <NavContent>
        <NavStyle to="/">Home</NavStyle>
        {user ? (
          <>
            <NavStyle to="/mypage/study">MyPage</NavStyle>
            <StyledDiv onClick={logout}>Logout</StyledDiv>
          </>
        ) : (
          <StyledDiv onClick={() => navigate('/auth/login')}>Login</StyledDiv>
        )}
      </NavContent>
    </Nav>
  )
}
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'bigjohn';
  margin: 1.5rem 0rem;
  padding: 0rem 2rem;
`
const Flexbox = styled.div`
  display: flex;
  align-items: center;
`

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;

  min-width: 400px;
`

const NavStyle = styled(NavLink)`
  padding: 1rem;

  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryFontColor};

  &.active {
    color: ${({ theme }) => theme.primaryFontColor};
    font-weight: 600;
  }
`
const StyledDiv = styled.div`
  padding: 1rem;

  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryFontColor};

  cursor: pointer;
`
