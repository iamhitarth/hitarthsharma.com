import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Favicon from '../assets/images/favicon.ico'

const Layout = ({ children, location, title, description, keywords }) => {
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
      render={(data) => (
        <div>
          <Helmet
            title={
              title
                ? `${data.site.siteMetadata.title} - ${title}`
                : data.site.siteMetadata.title
            }
            meta={[
              {
                name: 'description',
                content: description || "Hitarth Sharma's site",
              },
              {
                name: 'keywords',
                content: `hitarth, sharma, blog, software, engineer, ${keywords}`,
              },
            ]}
            link={[
              {
                rel: 'shortcut icon',
                href: `${Favicon}`,
                type: 'image/x-icon',
              },
              { rel: 'icon', href: `${Favicon}`, type: 'image/x-icon' },
            ]}
          />
          <Header siteTitle={data.site.siteMetadata.title} />
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

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
