import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'

import Avatar from '../assets/images/avatar.jpg'

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
          allMarkdownRemark(
            limit: 4
            sort: { fields: [fields___postDate], order: DESC }
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
                }
                fields {
                  slug
                }
              }
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
          <div style={styles.content}>
            <aside style={styles.sidebar}>
              <div>
                {/* Avatar */}
                <img src={Avatar} style={styles.avatar} alt="Hitarth Sharma" />
              </div>
              <div>
                {/* Site title */}
                <h1>
                  <Link to="/" style={styles.titleLink}>
                    {data.site.siteMetadata.title}
                  </Link>
                </h1>
              </div>
              <div>
                {/* Navigation */}
                <ul style={styles.nav}>
                  <li style={styles.navItem}>
                    <Link to="/about">About</Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/">My Book List</Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/">Productivity</Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/">Inspiration</Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/">Tech</Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/">Quotes</Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/">Movies</Link>
                  </li>
                  <li style={styles.navItem}>
                    <Link to="/">TV Series</Link>
                  </li>
                </ul>
              </div>
              <div>
                {/* Recent posts */}
                <h3>Recent posts</h3>
                <ul>
                  {data.allMarkdownRemark.edges.map(({ node }) => (
                    <Link to={node.fields.slug}>
                      <li>{node.frontmatter.title}</li>
                    </Link>
                  ))}
                </ul>
              </div>
              <div>{/* TODO: Categories */}</div>
              <div>
                {/* Copyright */}
                <small>
                  Copyright © {new Date().getFullYear()} Hitarth Sharma
                </small>
              </div>
            </aside>
            <main style={styles.main}>{children}</main>
          </div>
        </div>
      )}
    />
  )
}

SidebarLayout.propTypes = {
  children: PropTypes.node,
}

const styles = {
  content: {
    margin: '0 auto',
    maxWidth: 960,
    padding: '3rem 0',
    display: 'flex',
  },
  sidebar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    height: '11.25rem',
    width: '11.25rem',
    borderRadius: '50%',
    marginBottom: '1rem',
  },
  titleLink: {
    textDecoration: 'none',
    color: 'hsla(0,0%,0%,1)',
  },
  nav: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 0,
    marginBottom: '2rem',
  },
  navItem: {
    margin: 5,
    border: 'solid 1px blue',
    borderRadius: 4,
    padding: 6,
    coolor: 'hsla(0,0%,0%,1)',
  },
  main: { flex: 2.5, paddingLeft: '2rem' },
}

export default SidebarLayout
