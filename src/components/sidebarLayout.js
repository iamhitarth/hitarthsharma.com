import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'

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
              paddingTop: '3rem',
              display: 'flex',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div>
                <img
                  src="http://www.thecodetoawesome.com/wp-content/uploads/2015/04/cropped-208191_4324406504567_1758127073_n1.jpg"
                  style={{
                    height: '11.25rem',
                    width: '11.25rem',
                    borderRadius: '50%',
                  }}
                  alt="Hitarth Sharma"
                />
              </div>
              <div>
                <h1>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'hsla(0,0%,0%,1)' }}
                  >
                    {data.site.siteMetadata.title}
                  </Link>
                </h1>
              </div>
            </div>
            <div style={{ flex: 2.5, paddingLeft: '2rem' }}>{children}</div>
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
