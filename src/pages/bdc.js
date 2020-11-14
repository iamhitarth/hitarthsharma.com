import React from 'react'
import Layout from '../components/layout'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styled from 'styled-components'

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

const Section = styled.div``

const QuestionContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px 0px 10px 10px;
`

const Question = styled.div`
  width: 35%;
  padding-top: 10px;
`

const AnswerContainer = styled.div`
  width: 65%;
  display: flex;
`

const Answer = styled.label`
  margin-right: 15px;
  margin-left: 5px;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    margin-bottom: 5px;
  }
`

const bdcSectionsData = [
  {
    id: 'tnf',
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
    id: 'aapr',
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
    id: 'ps',
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
    id: 'su',
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

const renderQuestions = (sectionId, questions) => {
  return questions.map((question, index) => (
    <QuestionContainer
      style={{
        background: index % 2 === 0 ? 'rgba(130, 190, 237, 0.3)' : 'none',
      }}
    >
      <Question>{question}</Question>
      <AnswerContainer>
        {bdcScoringData.map((option) => (
          <Answer>
            <input
              type="radio"
              value={option.score}
              name={`${sectionId}${index}`}
            />
            {option.label}
          </Answer>
        ))}
      </AnswerContainer>
    </QuestionContainer>
  ))
}

const renderSections = () => {
  return bdcSectionsData.map((section) => (
    <Section>
      <h4>{section.title}</h4>
      <div>{renderQuestions(section.id, section.questions)}</div>
    </Section>
  ))
}

const renderSubmit = () => {
  return (
    <div>
      <button>Submit</button>
      <button>Reset</button>
    </div>
  )
}

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

const BDCPage = ({ location }) => {
  return (
    <Layout location={location}>
      <div>
        <CenteredContainer>
          <SubHeading>Burns Depression Checklist</SubHeading>
          {renderSections()}
          {renderSubmit()}
          {renderFooter()}
        </CenteredContainer>
      </div>
    </Layout>
  )
}

export default BDCPage
