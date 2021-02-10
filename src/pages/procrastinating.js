import React, { useState } from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styled, { css } from 'styled-components'
import { Layout, CenteredContainer, SubHeading, Footer } from '../components'

const Procrastinating = ({ location }) => {
  return (
    <Layout
      location={location}
      title="Step by step process to stop procrastinating"
      description={`This is a guided walkthrough of steps to overcome procrastination and stop procrastinating.`}
      keywords="procrastination, procrastinating, step by step, process, tool, overcome, stop"
    >
      <div>
        <CenteredContainer>
          <SubHeading>How to Stop Procrastinating</SubHeading>
          <div>Are you in bed?</div>
          <Footer />
        </CenteredContainer>
      </div>
    </Layout>
  )
}

export default Procrastinating
