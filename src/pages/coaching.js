import React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { PostTitle } from '../templates/blogPost'
import coachingPic from '../assets/images/coaching-pic.jpg'

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
          <li>Past - Satisfaction we draw from our past 🕰 ⁣⁣⁣</li>
          <li>Present - Joy we're experiencing in the present moment ⚡️⁣⁣⁣</li>
          <li>Future - Hope and optimism for our future 🚀</li>
        </ol>

        <p>
          A therapist can help you deal with the past and make sense of it.⁣⁣⁣
          Your current circumstances dictate how you feel in the present.⁣⁣⁣ But
          as a coach, I focus on the future.
        </p>
        <p>Why?</p>
        <p>
          Because your future is the one factor that you can control - and it
          also happens to be what eventually shapes your past and present 🤯⁣⁣⁣
        </p>
        <p>
          If you're not satisfied with where you are, you <em>must</em> take
          charge of your future.
        </p>
        <p>The question is, how? How can you take charge of the future?</p>
        <p>
          The answer can be a tough one to find - and that’s where I come in as
          a coach.
        </p>
        <p>Are you ready to take control?</p>

        <p>
          <OutboundLink href="https://www.instagram.com/disruptive.kiwi/">
            Instagram
          </OutboundLink>{' '}
          |{' '}
          <OutboundLink href="https://www.linkedin.com/in/hitarthsharma/">
            LinkedIn
          </OutboundLink>{' '}
          |{' '}
          <OutboundLink href="https://twitter.com/iamhitarth">
            Twitter
          </OutboundLink>
        </p>
      </div>
    </div>
  </Layout>
)

export default CoachingPage
