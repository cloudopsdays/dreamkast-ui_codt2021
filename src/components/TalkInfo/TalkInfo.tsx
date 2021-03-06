import React from 'react'
import * as Styled from './styled'
import { Talk } from '../../client-axios'

type Props = {
  selectedTalk?: Talk
}

export const TalkInfo: React.FC<Props> = ({ selectedTalk }) => {
  const twitterURL = (trackName?: string) => {
    const base =
      'http://twitter.com/share?url=https://cloudopsdays.com&related=@cloudopsdays&hashtags=codt2021'
    if (!trackName) return base
    return base + '_' + trackName
  }

  return (
    <Styled.OuterContainer>
      <Styled.Container>
        <Styled.Title>{selectedTalk?.title}</Styled.Title>
        <Styled.SpeakerContainer>
          <Styled.Speaker>
            {selectedTalk?.speakers
              .map((speaker) => {
                return speaker.name
              })
              .join(' / ')}
          </Styled.Speaker>
          <div style={{ paddingRight: '20px' }} />
          {selectedTalk?.documentUrl && (
            <Styled.DocsLink href={selectedTalk?.documentUrl} target="_blank">
              登壇資料はこちら
            </Styled.DocsLink>
          )}
        </Styled.SpeakerContainer>
        <Styled.Content>{selectedTalk?.abstract}</Styled.Content>
        <Styled.SocialHeader>
          <Styled.TalkIcon src="/codt2021/ui/images/talk_icon.png" />
          一緒に盛り上がろう
        </Styled.SocialHeader>
        <Styled.ButtonContainer>
          <div style={{ paddingRight: '8px' }} />
          <Styled.ButtonLink href={twitterURL()} target="_blank">
            <Styled.TweetButton>
              <Styled.TwitterImg src="/codt2021/ui/images/twitter_logo.png" />
              tweet #codt2021
            </Styled.TweetButton>
          </Styled.ButtonLink>
        </Styled.ButtonContainer>
      </Styled.Container>
    </Styled.OuterContainer>
  )
}
