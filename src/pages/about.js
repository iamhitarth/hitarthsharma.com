import React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { PostTitle } from '../templates/blogPost'
import me from '../assets/images/me.jpg'

const AboutPage = ({ location }) => (
  <Layout location={location}>
    <div>
      <PostTitle>Hi.</PostTitle>
      <div style={{ textAlign: 'center' }}>
        <img
          src={me}
          alt="hitarth sharma"
          style={{ height: '15rem', width: '15rem', borderRadius: '50%' }}
        />
        <p>
          My name is Hitarth and this is my place on the internet{' '}
          <span role="img" aria-label="home">
            🏡
          </span>
        </p>
        <p>I have just started setting things up here.</p>
        <p>
          For now, you can read my <Link to="/">blog posts</Link> and check out
          my <Link to="/book-list">book list</Link>.
        </p>
        <p>
          I will be writing about <i>things</i> from a software engineer's{' '}
          prespective{' '}
          <span role="img" aria-label="weird creature">
            👾
          </span>
        </p>
        <p>
          Things that make us tick{' '}
          <span role="img" aria-label="ticking clock">
            ⏰
          </span>
        </p>
        <p>
          Hope you enjoy having a look around{' '}
          <span role="img" aria-label="shakalaka hand gesture">
            🤙🏼
          </span>
        </p>
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

export default AboutPage
