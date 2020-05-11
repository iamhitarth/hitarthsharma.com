import React from 'react'
import Layout from '../components/layout'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styled from 'styled-components'

import { PostTitle } from '../templates/blogPost'
import coachingPic from '../assets/images/coaching-pic.jpg'

const SubHeading = styled.h2`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`

const CoachingPage = ({ location }) => (
  <Layout location={location}>
    <div>
      <PostTitle>Where do you see yourself in the next 5 years?⁣⁣⁣</PostTitle>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <img
          src={coachingPic}
          alt="hitarth sharma"
          style={{
            height: '15rem',
            width: '15rem',
            borderRadius: '50%',
          }}
        />
        <p>If you don't know the answer, then you are there already.</p>
        <p>You see, our happiness depends on 3 factors:⁣⁣⁣</p>
        <ol style={{ textAlign: 'left' }}>
          <li>
            The satisfaction we draw from our <strong>past</strong> 🕰 ⁣⁣⁣
          </li>
          <li>
            The joy we're experiencing in the <strong>present</strong> moment
            ⚡️⁣⁣⁣
          </li>
          <li>
            And, the hope and optimism we have for our <strong>future</strong>{' '}
            🚀
          </li>
        </ol>

        <p>
          A therapist can help you deal with the <em>past</em> and make sense of
          it.⁣⁣⁣ Your current circumstances dictate how you feel in the{' '}
          <em>present</em>.⁣⁣⁣ But as a coach,{' '}
          <strong>I focus on the future.</strong>
        </p>
        <p>Why?</p>
        <p>
          Because your future is the one factor that <em>you</em> can control -
          and it also happens to be what eventually shapes your past and present
          🤯⁣⁣⁣
        </p>
        <p>
          If you're not satisfied with where you are,{' '}
          <strong>
            you <em>must</em> take charge of your future.
          </strong>
        </p>
        <p>
          The question is, how? How can you take charge of the future? The
          answer can be a tough one to find - but{' '}
          <strong>that’s where I come in as a coach.</strong>
        </p>
        <p>Are you ready to take control?</p>
        <p>
          Then,{' '}
          <OutboundLink
            href="https://forms.gle/pQNgyBujuwZbMTiFA/"
            target="_blank"
          >
            get in touch 👋
          </OutboundLink>
        </p>
        <p>Alternatively, reach out to me on:</p>
        <p>
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
      </div>
    </div>
  </Layout>
)

export default CoachingPage
