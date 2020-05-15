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
        <SubHeading>How does it work?</SubHeading>
        <p>
          When it comes to you and your life,{' '}
          <strong>YOU are the subject matter expert.</strong>
        </p>
        <p>
          However, over the years, the external pressures, the failures, the
          heartbreaks and the noise eventually bury this expertise of yours.
        </p>
        <p>
          They bury it so deep that the voice that used to be a roar, is barely
          a whisper now.
        </p>
        <p>
          <em>This</em> is where we want to turn up the volume.
        </p>
        <p>
          Unfortunately, everyone is different and this means that there is no
          silver bullet.
        </p>
        <p>
          But foturnately, with me as your coach,{' '}
          <strong>
            we will use tools and techniques that would be most effective{' '}
            <em>for you</em>.
          </strong>
        </p>
        <blockquote style={{ lineHeight: '1.45' }}>
          Give a man a fish and you feed him for a day; teach a man to fish and
          you feed him for a lifetime.
        </blockquote>
        <p>
          However, nothing worth having comes easy. So while I can be the fuel,{' '}
          <em>you</em> have to bring the fire.
        </p>
        <p>
          This means{' '}
          <strong>committing to one 2-hour session every month</strong> - over
          Zoom or face to face.
        </p>
        <p>Two hours might seem a bit long, but that's what it will take to:</p>
        <ul style={{ textAlign: 'left' }}>
          <li>create the time and space for you to dig deep</li>
          <li>break out of your habitual thinking patterns</li>
          <li>find the direction and guidance you've been looking for</li>
        </ul>
        <p>
          If you're looking for a friendly chat to give you the warm fuzzies,
          then you're looking for a friend, not a coach.
        </p>
        <p>
          However, if you're willing to challenge yourself and work with me to
          push yourself, then <strong>here are the next steps:</strong>
        </p>
        <ol style={{ textAlign: 'left' }}>
          <li>
            Answer these{' '}
            <OutboundLink
              href="https://forms.gle/pQNgyBujuwZbMTiFA/"
              target="_blank"
            >
              four questions
            </OutboundLink>
            .
          </li>
          <li>
            We schedule the <em>free first session</em> within 24 hours.⁣⁣⁣
          </li>
          <li>We have a deep, life-changing coaching session.</li>
          <li>We decide if we carry on working together.</li>
        </ol>
        <p>
          Yes, the <strong>first session is free with no obligations.</strong>
        </p>
        <p>
          My philosophy is
          let's-work-together-and-if-we-like-the-results-then-we-can-keep-working-together.
        </p>
        <p>
          After our first session, we can discuss the term of our engagement,
          the price and the payment method, if we decide to continue. If not,
          then you can reach out to me again whenever you're ready.
        </p>
        <p>Get started!</p>
        <p>Alternatively, reach out to me with any questions on:</p>
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
