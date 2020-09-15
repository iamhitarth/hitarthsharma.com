import React from 'react'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import Layout from '../components/layout'
import { NavList, NavItem } from '../components/sidebarLayout'

import dp from '../assets/images/dp-bw.png'
import links from '../../config/links.json'

const IndexPage = ({ location }) => {
  return (
    <Layout location={location}>
      <div style={{ textAlign: 'center' }}>
        <img
          src={dp}
          alt="hitarth sharma"
          style={{ height: '10rem', width: '10rem', borderRadius: '50%' }}
        />
        <NavList>
          {links.map(
            (linkItem) =>
              linkItem.isShownOnHome && (
                <NavItem key={linkItem.displayName}>
                  {linkItem.isExternal ? (
                    <OutboundLink href={linkItem.href} target="_blank">
                      {linkItem.displayName}
                    </OutboundLink>
                  ) : (
                    <Link to={linkItem.href}>{linkItem.displayName}</Link>
                  )}
                </NavItem>
              )
          )}
        </NavList>
      </div>
    </Layout>
  )
}

export default IndexPage
