import React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { PostTitle } from '../templates/blogPost'
import me from '../assets/images/me.jpg'

/* TODO:
Add primary skills with description e.g. JS with TypeScript and C# using DDD
Add education section
Add Personal Projects section with new sections for this site and coaching
Add professional experience section 
*/
const techSkillsObj = {
  Frontend: {
    'React.js': 4,
    'React Native': 4,
    Redux: 4,
    'Redux Sagas': 4,
    'Javascript (Vanilla)': 4,
    'Styled Components': 3,
  },
  Backend: {
    'ASP.Net (Core 1.0)': 4,
    'ASP.Net Web API': 4,
    'ASP.Net MVC': 4,
    'Node.js': 3,
    MongoDB: 3,
    'SQL Server': 3,
    Firebase: 4,
  },
  Tooling: {
    Git: 4,
    TypeScript: 4,
    Webpack: 3,
    'VS Code': 4,
    AWS: 3,
    Azure: 3,
  },
  Other: {
    Jest: 4,
    Storybook: 4,
    'Socket.io': 4,
    'Entity Framework': 3,
  },
}

const skillCategoryNames = Object.keys(techSkillsObj)
const skillCategories = Object.values(techSkillsObj)

const renderSkillsForCategory = skill => {
  const skillNames = Object.keys(skill)
  const skillValues = Object.values(skill)

  return skillNames.map((skillName, index) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTop: 'solid 1px black',
        paddingTop: '0.25rem',
      }}
    >
      <span>{skillName}</span>
      <span style={{ textAlign: 'right' }}>{skillValues[index]}</span>
    </div>
  ))
}

const CVPage = ({ location }) => (
  <Layout location={location}>
    <div style={{ display: 'flex', flexDirection: 'row', fontSize: '1em' }}>
      <aside style={{ width: '35%', paddingRight: '2.5%' }}>
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
        <h1 style={{ fontSize: '3.5rem', textAlign: 'right' }}>
          Problem Solver.
          <br />
          Astute
          <br /> (Cheer) Leader.
        </h1>
        <br />
        <small style={{ textAlign: 'right', display: 'block' }}>
          Sydney, NSW, Australia <br />
          (+61) 43 401 8846
          <br />
          hitarth.sharma@outlook.com
        </small>
      </aside>
      <div style={{ width: '65%', paddingLeft: '2.5%' }}>
        <h1 style={{ fontSize: '3.5rem', marginTop: '0' }}>Hitarth Sharma</h1>
        <div>
          <h3 style={{ marginTop: '0' }}>Technical Skills (Out of 5)</h3>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: '0.5rem',
            }}
          >
            {skillCategories.map((skillCategory, index) => {
              return (
                <div
                  style={{
                    width: '50%',
                    padding: '0.5rem',
                    paddingRight: '1.5rem',
                    border: 'solid 1px black',
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>
                    {skillCategoryNames[index]}
                  </div>
                  {renderSkillsForCategory(skillCategory)}
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <p>
            <strong>Javascript</strong> - Very comfortable with React and React
            Native. Used Node.js in places where we needed JS libraries running
            on the server side. Appreciate JavaScript’s syntactical similarity
            to C# while providing functions as first-class objects. Now in
            combination with TypeScript, Javascript has become better than ever.
          </p>
          <p>
            <strong>C#</strong> - Bread and butter of my server side work. Due
            to its ability to abstract away some of the more complex concepts
            (e.g. pointers) while being backed by a solid development
            environment (VS2017) and frameworks, it allows me to focus on
            solving the business problems at hand instead of struggling with the
            syntax or tools.
          </p>
        </div>
        <div>
          <h3 style={{ marginTop: '0' }}>Education</h3>
          <p>
            <strong>Bachelor of Engineering (Honours)</strong>
            <br />
            University of Auckland, Auckland, NZ
            <br />
            2009 – 2012, majoring in Software Engineering
          </p>
          <p>
            <strong>
              Programming with HTML5 with JavaScript and CSS3 Specialist
            </strong>
            <br />
            Microsoft
            <br />
            2013
          </p>
        </div>
      </div>
    </div>
  </Layout>
)

export default CVPage
