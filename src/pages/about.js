import React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const AboutPage = ({ location }) => (
  <Layout location={location}>
    <div>
      <h1>Hi this is about me</h1>
      <p>Welcome to About me</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  </Layout>
)

export default AboutPage
