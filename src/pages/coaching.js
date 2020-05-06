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
          If you're not satisfied with where you are, you <em>must</em> take
          charge of your future.
        </p>
        <p>
          The question is, how? How can you take charge of the future? And the
          answer can be a tough one to find - but that’s where I come in as a
          coach.
        </p>
        <p>
          The answer can be a tough one to find - and that’s where I come in as
          a coach.
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
        <h2>What is coaching?</h2>
        <p>
          There are many types of coaches and many types of coaching. The
          general idea of coaching is that it's not about telling you what you
          need to do - rather it's about asking the right questions so that you
          can figure out on your own what it is that you need to do. Why? Two
          reason. First, you're a lot more likely to stay the course and be
          persistent with something if you came up with the answer yourself - as
          opposed to someone spoon feeding it to you. And second, plausible
          deniability.
        </p>
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
