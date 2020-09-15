import React from 'react'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import Layout from '../components/layout'
import { NavList, NavItem } from '../components/sidebarLayout'

import dp from '../assets/images/dp-bw.png'
import HomePageNavItems from '../../config/homePageNavItems.json'

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
          {HomePageNavItems.map(
            (navItem) =>
              navItem.isShown && (
                <NavItem key={navItem.displayName}>
                  {navItem.isExternal ? (
                    <OutboundLink href={navItem.href} target="_blank">
                      {navItem.displayName}
                    </OutboundLink>
                  ) : (
                    <Link to={navItem.href}>{navItem.displayName}</Link>
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
