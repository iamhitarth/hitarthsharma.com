import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Avatar from '../assets/images/avatar.jpg'

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 3rem 0;
  display: flex;

  @media (max-width: 900px) {
    display: block;
  }
`

const Sidebar = styled.aside`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 900px) {
    .recent-posts,
    .copyright {
      display: none;
    }
  }
`

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
          <Container>
            <Sidebar>
              <div>
                {/* Avatar */}
                <img src={Avatar} style={styles.avatar} alt="Hitarth Sharma" />
              </div>
              <div>
                {/* Site title */}
                <h1 style={styles.titleWrapper}>
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
              <div class="recent-posts">
                <h3 style={styles.recentPostsTitle}>Recent posts</h3>
                <ul>
                  {data.allMarkdownRemark.edges.map(({ node }) => (
                    <Link to={node.fields.slug}>
                      <li>{node.frontmatter.title}</li>
                    </Link>
                  ))}
                </ul>
              </div>
              <div>{/* TODO: Categories */}</div>
              <div class="copyright">
                <small>
                  Copyright © {new Date().getFullYear()} Hitarth Sharma
                </small>
              </div>
            </Sidebar>
            <main style={styles.main}>{children}</main>
          </Container>
        </div>
      )}
    />
  )
}

SidebarLayout.propTypes = {
  children: PropTypes.node,
}

const styles = {
  avatar: {
    height: '11.25rem',
    width: '11.25rem',
    borderRadius: '50%',
    marginBottom: '1rem',
  },
  titleWrapper: {
    textAlign: 'center',
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
  recentPostsTitle: { textAlign: 'center' },
  main: { flex: 2.5, paddingLeft: '2rem', paddingRight: '0.25rem' },
}

export default SidebarLayout
