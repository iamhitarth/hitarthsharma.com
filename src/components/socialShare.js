import React from 'react'
import styled from 'styled-components'
import { SocialIcon } from 'react-social-icons'

const SocialShareWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;

  a {
    margin: 0.25rem 0.5rem;
    background-image: none;
  }
`

const SocialShare = ({ title, url, excerpt }) => {
  const siteUrl = url.split('/')[0]
  return (
    <SocialShareWrapper>
      <SocialIcon
        network="facebook"
        url={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
      />
      <SocialIcon
        network="twitter"
        url={`https://twitter.com/home?status=Check%20out%20this%20post%20${title}%0A${url}`}
      />
      <SocialIcon
        network="linkedin"
        url={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${excerpt}&source=${siteUrl}`}
      />
    </SocialShareWrapper>
  )
}

export default SocialShare
