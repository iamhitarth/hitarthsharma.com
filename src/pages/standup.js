import React from 'react'
import Layout from '../components/layout'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styled from 'styled-components'

import { PostTitle } from '../templates/blogPost'
import coachingPic from '../assets/images/coaching-pic.jpg'

const CenteredContainer = styled.div`
  position: relative;
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

const ResetButton = styled.button`
  color: hsla(0, 0%, 0%, 0.8);
  border-color: transparent;
  border-radius: 0.25rem;
  padding: 14px 20px;
  font-weight: bold;
  background: #ff9800;
  text-decoration: none;
  text-shadow: none;
  position: absolute;
  right: 0;
  top: -14px;

  &:hover {
    color: #ff9800;
    background: black;
  }

  @media (max-width: 900px) {
    width: 100%;
    position: static;
    margin-bottom: 1rem;
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

const STANDUP_STATE_KEY = 'standupState'
const TODAY_KEY = 'standupToday'
const BLOCKERS_KEY = 'standupBlockers'
const PREVIOUSLY_KEY = 'standupPreviously'
const LAST_EDITED_ON_KEY = 'standupLastEditedOn'

const getUpdatedPreviousData = (parsed) => {
  return `[${parsed[LAST_EDITED_ON_KEY]}]\n${parsed[TODAY_KEY]}${
    parsed[BLOCKERS_KEY] ? `\n|Blockers|\n${parsed[BLOCKERS_KEY]}` : ''
  }\n\n${parsed[PREVIOUSLY_KEY]}`
}

const getUpdatedState = (rawState) => {
  const parsed = JSON.parse(rawState)
  if (!parsed) return parsed

  const lastEditedOnDate = new Date(parsed[LAST_EDITED_ON_KEY])
  const todayDate = new Date(new Date().toDateString())
  const isTodayDataOutdated = todayDate > lastEditedOnDate
  console.log(parsed)
  if (isTodayDataOutdated && parsed[TODAY_KEY]) {
    return {
      ...parsed,
      [PREVIOUSLY_KEY]: getUpdatedPreviousData(parsed),
      [TODAY_KEY]: '',
      [BLOCKERS_KEY]: '',
      [LAST_EDITED_ON_KEY]: new Date().toDateString(),
    }
  }

  return parsed
}

const initialState = {
  [TODAY_KEY]: '',
  [BLOCKERS_KEY]: '',
  [PREVIOUSLY_KEY]: '',
  [LAST_EDITED_ON_KEY]: new Date().toDateString(),
}

const standupReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { ...state, [action.name]: action.value }
    case 'reset':
      return action.toState || initialState
    default:
      return state
  }
}

const DailyStandupPage = ({ location }) => {
  const [state, dispatch] = React.useReducer(standupReducer, initialState)
  /* Note:
  It looks like the order of the effects matters and so setting intial state in localstorage before retrieving 
  state previously saved in localstorage will overwrite it (obv)
  */
  React.useEffect(() => {
    const updatedState = getUpdatedState(
      localStorage.getItem(STANDUP_STATE_KEY)
    )
    console.log('Got state from localstorage', updatedState)
    dispatch({ type: 'reset', toState: updatedState })
  }, [dispatch])
  React.useEffect(() => {
    console.log('storing state in localstorage')
    localStorage.setItem(STANDUP_STATE_KEY, JSON.stringify(state))
  }, [state])

  const isScreenWidthLessThan900 = window
    ? window.matchMedia('(max-width: 900px)').matches
    : true

  const onChangeTextBox = (event) => {
    const name = event.target.name
    const value = event.target.value
    dispatch({ type: 'update', name, value })
  }

  const onResetAll = () => {
    if (
      window.confirm(
        'This will reset everything. Are you sure you want to do this?'
      )
    ) {
      dispatch({ type: 'reset' })
    }
  }

  const renderResetButton = () => (
    <ResetButton onClick={onResetAll}>Reset all</ResetButton>
  )

  return (
    <Layout location={location}>
      <div>
        <CenteredContainer>
          <SubHeading>What do you want to do today?</SubHeading>
          {!isScreenWidthLessThan900 && renderResetButton()}
          <TextBox
            name={TODAY_KEY}
            style={{ height: '300px' }}
            onChange={onChangeTextBox}
            value={state[TODAY_KEY]}
            placeholder={'Thing I want to get done today'}
          />

          <SubHeading>Any blockers?</SubHeading>
          <TextBox
            name={BLOCKERS_KEY}
            style={{ height: '150px' }}
            onChange={onChangeTextBox}
            value={state[BLOCKERS_KEY]}
            placeholder={'Things that could get in the way today'}
          />

          {isScreenWidthLessThan900 && renderResetButton()}

          {state[PREVIOUSLY_KEY] && (
            <>
              <SubHeading>What you did yesterday.</SubHeading>
              <p style={{ whiteSpace: 'pre-line' }}>{state[PREVIOUSLY_KEY]}</p>
            </>
          )}
          {renderFooter()}
        </CenteredContainer>
      </div>
    </Layout>
  )
}

export default DailyStandupPage
