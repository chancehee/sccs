import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { useOutletContext } from 'react-router-dom'

import Button from 'components/common/Button'
import RoomInfo from 'components/study/RoomInfo'
import Chat from 'components/study/Chat'
import Announcement from 'components/study/Announcement'

export default function WaitingPage() {
  const {
    user,
    studyroomId,
    roomInfo,
    stomp,
    connected,
    members,
    setMembers,
    problems,
    setProblems,
    message,
    setMessage,
    chatList,
    sendChat,
    disconnect,
  } = useOutletContext()
  const navigate = useNavigate()

  const [ready, setReady] = useState(false)
  const [readyList, setReadyList] = useState([])
  const [subscription, setSubscription] = useState(null)
  console.log(roomInfo)
  const toggleReady = () => {
    const newReady = !ready
    setReady(newReady)
    sendReady(newReady)
  }

  // 웹 소켓 send: 테스트 준비
  const sendReady = (ready) => {
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'ready',
        studyroomId: studyroomId,
        nickname: user.nickname,
        ready: ready,
      }),
    )
  }

  // 웹 소켓 send: 테스트 시작
  const sendStart = () => {
    if (roomInfo.hostId !== user.id) return
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        status: 'start',
        studyroomId: studyroomId,
        nickname: user.nickname,
        membersNickname: [...readyList, user.nickname],
      }),
    )
  }

  // 웹 소켓 subscribe
  useEffect(() => {
    setSubscription(
      stomp.subscribe('/sub/studyroom/' + studyroomId, (chatDto) => {
        const content = JSON.parse(chatDto.body)
        if (content.status === 'ready') {
          // 준비 되었을 경우
          if (content.ready) {
            setReadyList((readyList) => [...readyList, content.nickname])
            return
          }
          // 준비되지 않았을 경우
          setReadyList((readyList) =>
            readyList.filter((nickname) => nickname !== content.nickname),
          )
          return
        }
        if (content.status === 'start') {
          setMembers(content.membersNickname)
          navigate(`/room/${studyroomId}/test`)
        }
      }),
    )
    return () => {
      subscription && subscription.unsubscribe()
    }
  }, [])

  return (
    <Container>
      <FlexBox>
        <RoomInfo
          id={roomInfo.id}
          title={roomInfo.title}
          languageIds={roomInfo.languageIds}
          algoIds={roomInfo.algoIds}
          hostNickname={roomInfo.hostNickname}
          personnel={roomInfo.personnel}
        />
        {roomInfo.hostId === user.id ? (
          <Button
            onClick={sendStart}
            type="primary"
            size="small"
            value={
              roomInfo.personnel === readyList.length + 1
                ? '테스트 시작'
                : '준비 안됨'
            }
            disabled={
              roomInfo.personnel === readyList.length + 1 ? false : true
            }
          />
        ) : (
          <Button
            onClick={toggleReady}
            type="primary"
            size="small"
            value={ready ? 'Ready 취소' : 'Ready'}
          />
        )}
      </FlexBox>
      <FlexBox2>
        <Announcement
          roomInfo={roomInfo}
        ></Announcement>
        <Chat
          chatList={chatList}
          message={message}
          onChangeMsg={(e) => setMessage(e.target.value)}
          sendChat={sendChat}
          user={user}
        />
      </FlexBox2>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
  height: 100%;
`

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

const FlexBox2 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
`
