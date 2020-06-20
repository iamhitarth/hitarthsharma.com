import React from 'react'
import Layout from '../components/layout'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styled from 'styled-components'

import { PostTitle } from '../templates/blogPost'
import coachingPic from '../assets/images/coaching-pic.jpg'

const CenteredContainer = styled.div`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

const TextBox = styled.textarea`
  padding: 0.25rem;
  width: 100%;
  margin-bottom: 1.5rem;
  outline: none;

  @media (max-width: 900px) {
    width: 100%;
  }
`

const SubHeading = styled.h2`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`

const OutboundLinkButton = styled(OutboundLink)`
  color: hsla(0, 0%, 0%, 0.8);
  border-radius: 0.25rem;
  padding: 14px 20px;
  font-weight: bold;
  background: #ff9800;
  text-decoration: none;
  text-shadow: none;

  &:hover {
    color: #ff9800;
    background: black;
  }
`

const renderFooter = () => (
  <p>
    <OutboundLink href="mailto:hitarth.sharma@outlook.com" target="_blank">
      Email
    </OutboundLink>{' '}
    |{' '}
    <OutboundLink
      href="https://www.instagram.com/disruptive.kiwi/"
      target="_blank"
    >
      Instagram
    </OutboundLink>{' '}
    |{' '}
    <OutboundLink
      href="https://www.linkedin.com/in/hitarthsharma/"
      target="_blank"
    >
      LinkedIn
    </OutboundLink>{' '}
    |{' '}
    <OutboundLink href="https://twitter.com/iamhitarth" target="_blank">
      Twitter
    </OutboundLink>
  </p>
)

const TODAY_KEY = 'today'
const BLOCKERS_KEY = 'blockers'
const PREVIOUSLY_KEY = 'previously'
const LAST_EDITED_ON_KEY = 'lastEditedOn'

const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  )

  //new Date("Fri Jun 19 2020") > new Date() = false when current date was 20 Jun

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value)
    localStorage.setItem(`ds-${LAST_EDITED_ON_KEY}`, new Date().toDateString())
  }, [localStorageKey, value])

  return [value, setValue]
}

const DailyStandupPage = ({ location }) => {
  const [data] = React.useState({})

  data[TODAY_KEY] = useStateWithLocalStorage(`ds-${TODAY_KEY}`)
  data[BLOCKERS_KEY] = useStateWithLocalStorage(`ds-${BLOCKERS_KEY}`)

  const onChangeTextBox = (event) => {
    const [value, setValue] = data[event.target.name]
    setValue(event.target.value)
  }

  return (
    <Layout location={location}>
      <div>
        <CenteredContainer>
          <SubHeading>What do you want to do today?</SubHeading>
          <TextBox
            name={TODAY_KEY}
            style={{ height: '300px' }}
            onChange={onChangeTextBox}
            value={data[TODAY_KEY][0]}
          />

          <SubHeading>Any blockers?</SubHeading>
          <TextBox
            name={BLOCKERS_KEY}
            style={{ height: '150px' }}
            onChange={onChangeTextBox}
            value={data[BLOCKERS_KEY][0]}
          />

          <SubHeading>What you did yesterday.</SubHeading>
          <p>Not much...</p>

          {renderFooter()}
        </CenteredContainer>
      </div>
    </Layout>
  )
}

export default DailyStandupPage
