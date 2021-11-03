import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import EmailForm from 'react-mailchimp-form'
import styled, { css } from 'styled-components'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { Layout, CenteredContainer, SubHeading, Footer } from '../components'

const StyledButtonBaseStyles = css`
  color: hsla(0, 0%, 0%, 0.8);
  border-color: transparent;
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

  &:focus {
    outline: none;
  }

  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`

const BDCCenteredContainer = styled(CenteredContainer)`
  .email-subscribe-form {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;

    input {
      width: 60%;
      margin: 10px;
      padding: 14px 20px;

      @media (max-width: 900px) {
        width: 100%;
      }
    }

    button {
      ${StyledButtonBaseStyles}
    }
  }
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

const StyledPrimaryButton = styled.button`
  ${StyledButtonBaseStyles}
`

const StyledSecondaryButton = styled(StyledPrimaryButton)`
  color: #ff9800;
  background: black;

  &:hover {
    color: hsla(0, 0%, 0%, 0.8);
    background: #ff9800;
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
      'Loss of interest in family, friends or colleagues',
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
    id: 'no-depression',
    label: 'You are doing great 🎉',
    description: `Awesome! You are in the normal range and feeling great! 
    Ideally this is where you'll emotionally be most of the time - so keep on doing whatever you're 
    doing because it's working 😁`,
    min: 0,
    max: 5,
  },
  {
    id: 'bit-of-depression',
    label: 'Are you feeling a little unhappy? 😶',
    description: `Things are a little bit uneven right now but you're hanging in there. This is pretty 
    normal and nothing to be concerned about. There is room for improvement but chances 
    are that things will most likely get better - especially with a change in your perspective 😀`,
    min: 6,
    max: 10,
  },
  {
    id: 'mild-depression',
    label: 'Are you unhappy? 😐',
    description: `While this is nothing to be super 
    concerned about, it will be useful to try and improve things. You can likely make a 
    lot of progress on your own by learning about negative thinking patterns, how to identify 
    them and then how to fix them 💡 However, if you stay at this level for a weeks in a row, 
    please consider professional treatment.`,
    min: 11,
    max: 25,
  },
  {
    id: 'moderate-depression',
    label: 'You are depressed 😬',
    description: `This is serious 😐 You're likely feeling pretty crappy. Most of us can experience 
  this level of depression for brief periods but then eventually snap out of it. However, if 
  you stay in this range for more than 2 weeks in a row, please seek professional treatment.`,
    min: 26,
    max: 50,
  },
  {
    id: 'severe-depression',
    label: 'You are severly depressed 😫',
    description: `This is the danger zone. Feeling super crappy for long periods combined 
    with feelings of hopelessness and despair is a dangerous recipe. Please seek 
    professional help immediately.`,
    min: 51,
    max: 75,
  },
  {
    id: 'extreme-depression',
    label: 'You are extremely depressed 😨',
    description: `Very dangerous to be and stay in this range. Please seek professional help 
    immediately especially if you chose anything other than "Not at all" on the last 3 items 🙏🏼`,
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
        This checklist (from the book{' '}
        <OutboundLink href="https://amzn.to/36FfjI9" target="_blank">
          Feeling Good
        </OutboundLink>
        ) will help you "measure" how you're feeling. And because what gets
        measured, gets managed this is a great first step to take before diving
        into any sort of self help or even professional treatment.
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
        <h3>{`${result.label}`}</h3>
        <p>{result.description}</p>
      </div>
    )
  } else {
    return
  }
}

const renderSubmit = (result, setResult) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {!result && (
        <StyledPrimaryButton type="submit">See results</StyledPrimaryButton>
      )}
      {result && (
        <StyledSecondaryButton
          type="button"
          onClick={(event) => setResult(null)}
        >
          Reset
        </StyledSecondaryButton>
      )}
    </div>
  )
}

const renderEmailForm = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <hr></hr>
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

const BDCPage = ({ location }) => {
  const [result, setResult] = useState(null)

  return (
    <Layout
      location={location}
      title="Burns Depression Checklist"
      description={`This checklist will help you "measure" how you're feeling - great first step to take before diving into any sort of self help or even professional treatment.`}
      keywords="depression, tool, checklist, burns, form"
    >
      <div>
        <BDCCenteredContainer>
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
          <Footer />
        </BDCCenteredContainer>
      </div>
    </Layout>
  )
}

export default BDCPage
