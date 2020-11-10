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

const SubHeading = styled.h2`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
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

const bdcSectionsData = [
  {
    title: 'Thoughts and feelings',
    questions: [
      'Feeling sad or down in the dumps',
      'Feeling unhappy or blue',
      'Crying spells or tearfulness',
      'Feeling discouraged',
      'Feeling hopeless',
      'Low self esteem',
      'Feeling worthless or inadequate',
      'Guilt or shame',
      'Criticizing yourself or blaming others',
      'Difficulty making decisions',
    ],
  },
  {
    title: 'Activities and personal relationships',
    questions: [
      'Loss of interested in family, friends or colleagues',
      'Loneliness',
      'Spending less time with family or friends',
      'Loss of motivation',
      'Loss of interest in work or other activities',
      'Avoiding work or other activities',
      'Loss of pleasure or satisfaction in life',
    ],
  },
  {
    title: 'Physical symptoms',
    questions: [
      'Feeling tired',
      'Difficulty sleeping or sleeping too much',
      'Decreased or increased appetite',
      'Loss of interest in sex',
      'Worrying about your health',
    ],
  },
  {
    title: 'Suicidal urges',
    questions: [
      'Do you have any suicidal thoughts?',
      'Would you like to end your life?',
      'Do you have a plan for harming yourself?',
    ],
  },
]

const bdcScoringData = [
  { label: 'Not at all', score: 0 },
  { label: 'Somewhat', score: 1 },
  { label: 'Moderately', score: 2 },
  { label: 'A lot', score: 3 },
  { label: 'Extremely', score: 4 },
]

const bdcScoringCriteria = [
  { label: 'No depression', min: 0, max: 5 },
  { label: 'Normal but unhappy', min: 6, max: 10 },
  { label: 'Mild depression', min: 11, max: 25 },
  { label: 'Moderate depression', min: 26, max: 50 },
  { label: 'Severe depression', min: 51, max: 75 },
  { label: 'Extreme depression', min: 76, max: 100 },
]

const BDCPage = ({ location }) => {
  return (
    <Layout location={location}>
      <div>
        <CenteredContainer>
          <SubHeading>Burns Depression Checklist</SubHeading>

          {renderFooter()}
        </CenteredContainer>
      </div>
    </Layout>
  )
}

export default BDCPage
