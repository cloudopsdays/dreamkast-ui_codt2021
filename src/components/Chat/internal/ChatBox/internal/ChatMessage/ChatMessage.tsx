import React from 'react'
import * as Styled from './styled'
import {
  ChatMessageMessageTypeEnum,
  Talk,
} from '../../../../../../client-axios/api'
import { ChatMessageClass } from '../../../../../../util/chat'
import ReplyIcon from '@material-ui/icons/Reply'

type Props = {
  talk?: Talk
  chatMessage?: ChatMessageClass
  selected: boolean
  onClickMessage: (event: React.MouseEvent<HTMLInputElement>) => void
}

export const ChatMessage: React.FC<Props> = ({
  talk,
  chatMessage,
  selected,
  onClickMessage,
}) => {
  const isSpeakerMessage = () => {
    const speakerIds = talk?.speakers.map((speaker) => {
      return speaker.id
    })
    if (!speakerIds) return false
    return (
      !!chatMessage?.speakerId && speakerIds.includes(chatMessage.speakerId)
    )
  }
  const isChat = chatMessage?.messageType === ChatMessageMessageTypeEnum.Chat

  return (
    <div>
      <Styled.ChatMessage isChat={isChat} isSelected={selected}>
        {moment(chatMessage?.createdAt).format('YYYY-MM-DD HH:MM')}
        {!selected && (
          <Styled.ReplyButton
            data-messageId={chatMessage?.id}
            onClick={onClickMessage}
          >
            <ReplyIcon fontSize="small" />
          </Styled.ReplyButton>
        )}
        <Styled.MessageBody>
          {isSpeakerMessage() ? '[スピーカー] ' : ''}
          {chatMessage?.body}
        </Styled.MessageBody>
      </Styled.ChatMessage>
      {chatMessage?.children?.map((msg) => {
        return (
          <Styled.ChatReplyMessage key={msg.id} isChat={isChat}>
            <Styled.MessageBody>
              {isSpeakerMessage() ? '[スピーカー] ' : ''}
              {msg.body}
            </Styled.MessageBody>
          </Styled.ChatReplyMessage>
        )
      })}
    </div>
  )
}
