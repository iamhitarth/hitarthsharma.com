import React from 'react'
import Layout from '../components/layout'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styled from 'styled-components'

import { PostTitle } from '../templates/blogPost'
import coachingPic from '../assets/images/coaching-pic.jpg'

/* TODO
Add coaching pic on desktop
Add FAQs
*/

const SubHeading = styled.h2`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`

const OutboundLinkButton = styled(OutboundLink)`
  color: hsla(0, 0%, 0%, 0.8);
  border-radius: 0.25rem;
  padding: 8px 12px;
  background: #ff9800;
  text-decoration: none;
  text-shadow: none;

  &:hover {
    color: #ff9800;
    background: black;
  }
`

const CoachingPage = ({ location }) => (
  <Layout location={location}>
    <div>
      <PostTitle>Helping You Be The Leader of Your Own Life</PostTitle>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <p>
          If you're not satisfied with where you are,{' '}
          <strong>
            you <em>must</em> take charge of your future.
          </strong>
        </p>
        <p>
          <OutboundLinkButton
            href="https://forms.gle/pQNgyBujuwZbMTiFA/"
            target="_blank"
          >
            Yes, let's do it
          </OutboundLinkButton>
        </p>

        <SubHeading>How does it work?</SubHeading>
        <p>
          Your <strong>first session is free</strong> with no obligations.
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
          Pricing and the term of our engagement will be discussed if we decide
          to continue.
        </p>
        <p>
          <OutboundLinkButton
            href="https://forms.gle/pQNgyBujuwZbMTiFA/"
            target="_blank"
          >
            Get started
          </OutboundLinkButton>
        </p>
        <p>
          <OutboundLink
            href="mailto:hitarth.sharma@outlook.com"
            target="_blank"
          >
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
      </div>
    </div>
  </Layout>
)

export default CoachingPage
