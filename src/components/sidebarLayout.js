import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'

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
              <div>
                {/* Navigation */}
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/about">My Book List</Link>
                  </li>
                  <li>
                    <Link to="/about">Productivity</Link>
                  </li>
                  <li>
                    <Link to="/about">Inspiration</Link>
                  </li>
                  <li>
                    <Link to="/about">Tech</Link>
                  </li>
                  <li>
                    <Link to="/about">Quotes</Link>
                  </li>
                  <li>
                    <Link to="/about">Movies</Link>
                  </li>
                  <li>
                    <Link to="/about">TV Series</Link>
                  </li>
                </ul>
              </div>
              <div>{/* Recent Posts */}</div>
              <div>{/* Categories */}</div>
              <div>{/* Copyright */}</div>
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
