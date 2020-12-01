import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import EmailForm from 'react-mailchimp-form'
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

  .email-subscribe-form {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;

    input,
    button {
      width: 60%;
      margin: 10px;
    }
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

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const Question = styled.div`
  width: 35%;
  padding-top: 10px;

  @media (max-width: 900px) {
    width: 100%;
  }
`

const AnswerContainer = styled.div`
  width: 65%;
  display: flex;

  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
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

  @media (max-width: 900px) {
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 5px;

    input {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
`

const StyledButton = styled.button`
  color: hsla(0, 0%, 0%, 0.8);
  border-color: transparent;
  border-radius: 0.25rem;
  padding: 14px 20px;
  margin-right: 20px;
  font-weight: bold;
  background: #ff9800;
  text-decoration: none;
  text-shadow: none;

  &:hover {
    color: #ff9800;
    background: black;
  }

  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`

const FooterContainer = styled.p`
  text-align: center;
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

const bdcNumQuestions = bdcSectionsData.reduce((numQs, section) => {
  return numQs + section.questions.length
}, 0)

const bdcScoringData = [
  { label: 'Not at all', score: 0 },
  { label: 'Somewhat', score: 1 },
  { label: 'Moderately', score: 2 },
  { label: 'A lot', score: 3 },
  { label: 'Extremely', score: 4 },
]

const bdcScoringCriteria = [
  {
    label: 'No depression',
    description: `Awesome! You are obviously in the normal range and feeling great! 
    Ideally this is where you'll be most of the time - so keep on doing whatever you're 
    doing because it's working 😁`,
    min: 0,
    max: 5,
  },
  {
    label: 'Normal but unhappy',
    description: `Ah.. things are a little bit uneven right now but hang in there. This is pretty 
    normal and nothing to be concerned about. There is room for improvement but chances 
    are that things will most likely get better - especially with a change in perspective 😀`,
    min: 6,
    max: 10,
  },
  {
    label: 'Mild depression',
    description: `Hmm while this is nothing to be super 
    concerned about, it will be useful to try and improve things. You can likely make a 
    lot of progress on your own by learning about negative thinking patterns, how to identify 
    them and then how to fix them 💡 However, if you stay at this level for a weeks in a row, 
    please consider professional treatment.`,
    min: 11,
    max: 25,
  },
  {
    label: 'Moderate depression',
    description: `This is serious 😐 You're likely feeling pretty crappy. Most of us can experience 
  this level of depression for brief periods but then eventually snap out of it. However, if 
  you stay in this range for more than 2 weeks in a row, please seek professional treatment.`,
    min: 26,
    max: 50,
  },
  {
    label: 'Severe depression',
    description: `This is the danger zone. Feeling super crappy for long periods combined 
    with feelings of hopelessness and despair is a dangerous recipe. Please seek 
    professional help immediately.`,
    min: 51,
    max: 75,
  },
  {
    label: 'Extreme depression',
    description: `Very dangerous to be and stay in this range. Please seek professional help 
    immediately especially if you chose anything other than "Not at all" on the last 3 items.`,
    min: 76,
    max: 100,
  },
]

const handleOnSubmit = async (values, setResult) => {
  const scores = Object.values(values)
  if (scores.length < bdcNumQuestions) {
    alert(`Please make sure you've answered all items 🙏🏼`)
  } else {
    const totalScore = scores.reduce((total, val) => {
      return total + parseInt(val)
    }, 0)
    for (let i = 0; i < bdcScoringCriteria.length; i++) {
      const criteria = bdcScoringCriteria[i]
      if (totalScore >= criteria.min && totalScore <= criteria.max) {
        console.log('Your depression level is: ', criteria.label, totalScore)
        setResult(criteria)
        break
      }
    }
  }
}

const renderQuestions = (sectionId, questions) => {
  return questions.map((question, questionIndex) => (
    <QuestionContainer
      key={`${sectionId}${questionIndex}`}
      style={{
        background:
          questionIndex % 2 === 0 ? 'rgba(130, 190, 237, 0.3)' : 'none',
      }}
    >
      <Question>{question}</Question>
      <AnswerContainer>
        {bdcScoringData.map((option, optionIndex) => (
          <Answer key={`${sectionId}${questionIndex}${optionIndex}`}>
            <Field name={`${sectionId}${questionIndex}`}>
              {(props) => {
                const { field } = props
                return <input {...field} type="radio" value={option.score} />
              }}
            </Field>
            {option.label}
          </Answer>
        ))}
      </AnswerContainer>
    </QuestionContainer>
  ))
}

const renderSections = () => {
  return (
    <>
      <p>
        This checklist will help you figure out and "measure" how you're
        feeling. And because what gets measured, gets managed this is a great
        first step to take before diving into any sort of self help or even
        professional treatment.
      </p>
      <p>
        Choose the answer that best describes how much you've experienced each
        symptom during the past week, including today and please answer all 25
        items.
      </p>
      {bdcSectionsData.map((section) => (
        <Section key={`${section.id}`}>
          <h4>{section.title}</h4>
          <div>{renderQuestions(section.id, section.questions)}</div>
        </Section>
      ))}
    </>
  )
}

const renderResult = (result) => {
  if (result) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>{`Your depression level is: ${result.label}`}</h3>
        <p>{result.description}</p>
      </div>
    )
  } else {
    return
  }
}

const renderEmailForm = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <p>For more tools and tips like these consider subscribing below:</p>
      <EmailForm
        action="https://hitarthsharma.us2.list-manage.com/subscribe/post?u=19e012b673b0effce4e606498&amp;id=8cd1d0fb63"
        fields={[
          {
            name: 'FNAME',
            placeholder: 'First name',
            type: 'text',
            required: true,
          },
          {
            name: 'EMAIL',
            placeholder: 'Email',
            type: 'email',
            required: true,
          },
        ]}
        messages={{
          sending: 'Sending...',
          success: 'Thank you for subscribing!',
          error: 'An unexpected internal error has occurred.',
          empty: 'You must provide an e-mail.',
          duplicate: `You're already subscribed.`,
          button: 'Subscribe!',
        }}
        className="email-subscribe-form"
      />
    </div>
  )
}

const renderSubmit = (result, setResult) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {!result && <StyledButton type="submit">See results</StyledButton>}
      {result && (
        <StyledButton type="button" onClick={(event) => setResult(null)}>
          Reset
        </StyledButton>
      )}
    </div>
  )
}

const renderFooter = () => (
  <FooterContainer>
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
  </FooterContainer>
)

const BDCPage = ({ location }) => {
  const [result, setResult] = useState(null)

  return (
    <Layout location={location}>
      <div>
        <CenteredContainer>
          <SubHeading>Burns Depression Checklist</SubHeading>
          <Formik
            initialValues={{}}
            onSubmit={(values) => handleOnSubmit(values, setResult)}
          >
            <>
              <Form>
                {!!result ? renderResult(result) : renderSections()}
                {renderSubmit(result, setResult)}
              </Form>
              {!!result ? renderEmailForm() : null}
            </>
          </Formik>
          {renderFooter()}
        </CenteredContainer>
      </div>
    </Layout>
  )
}

export default BDCPage
