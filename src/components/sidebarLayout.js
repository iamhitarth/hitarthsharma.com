import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

/*
This layout will have no header
It will have a sidebar
Sidebar will contain
- an avatar
- site title
- navigation

- recent posts
- categories
*/

const SidebarLayout = ({ children, location }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: "Hitarth Sharma's site" },
              {
                name: 'keywords',
                content: 'hitarth, sharma, blog, software, engineer',
              },
            ]}
          />
          <div
            style={{
              margin: '0 auto',
              maxWidth: 960,
              padding: '0px 1.0875rem 1.45rem',
              paddingTop: 0,
            }}
          >
            {children}
          </div>
        </div>
      )}
    />
  )
}

SidebarLayout.propTypes = {
  children: PropTypes.node,
}

export default SidebarLayout
