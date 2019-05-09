import React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { PostTitle } from '../templates/blogPost'
import me from '../assets/images/me.jpg'

const CVPage = ({ location }) => (
  <Layout location={location}>
    <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1em' }}>
      <div style={{ width: '35%', paddingRight: '2.5%' }}>
        <p>
          A 28-year-old lead engineer who likes taking charge and delivering
          outcomes. For me, the most satisfying problems to solve are the ones
          solved for people, with people.
        </p>{' '}
        <p>
          Technology is an enabler - not the primary driver – to be leveraged
          for growing the business. Bringing in a "yes we can" attitude to the
          team and being able to get set and go in short spans of time, are my
          trademarks.
        </p>{' '}
        <p>
          My core competency lies within the React.js frontend (web and native)
          side with solid experiences on the .Net stack; however, my consulting
          background and contracting experience have equipped me to comfortably
          pick up new tools/technologies - even in pressure situations.
        </p>
        <h1 style={{ textAlign: 'right' }}>
          Problem Solver.
          <br />
          Astute
          <br /> (Cheer) Leader.
        </h1>
        <p style={{ textAlign: 'right' }}>
          Sydney, NSW, Australia (+61) 43 401 8846 hitarth.sharma@outlook.com
        </p>
      </div>
      <div style={{ width: '65%', paddingLeft: '2.5%' }}>
        <h1>Hitarth Sharma</h1>
        <p>
          Javascript - Very comfortable with React and React Native. Used
          Node.js in places where we needed JS libraries running on the server
          side. Appreciate JavaScript’s syntactical similarity to C# while
          providing functions as first-class objects. Excited about newer
          features such as promises, template strings and generators.
        </p>
        <p>
          C# - Bread and butter of my server side work. Due to its ability to
          abstract away some of the more complex concepts (e.g. pointers) while
          being backed by a solid development environment (VS2017) and
          frameworks, it allows me to focus on solving the business problems at
          hand instead of struggling with the syntax or tools.
        </p>
      </div>
    </div>
  </Layout>
)

export default CVPage
