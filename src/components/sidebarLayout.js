import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Avatar from '../assets/images/avatar.jpg'

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 2rem 0;
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

const AvatarWrapper = styled.div`
  img {
    height: 11.25rem;
    width: 11.25rem;
    border-radius: 50%;
    margin-bottom: 1rem;
  }
`

const SiteTitleWrapper = styled.div`
  h1 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 1rem;
  }
`

const SiteTitleLink = styled(Link)`
  text-decoration: none;
  color: hsla(0, 0%, 0%, 1);
`

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
  margin-left: 0;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

const NavItem = styled.li`
  margin: 5px;
  border: solid 1px blue;
  border-radius: 0.25rem;
  padding: 6px;
  color: hsla(0, 0%, 0%, 1);

  @media (max-width: 900px) {
    margin: 7px;
  }
`

const RecentPostsWrapper = styled.div`
  h3 {
    text-align: center;
  }

  ul {
    list-style-type: none;
    margin-left: 0;
    text-align: center;
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
              <AvatarWrapper>
                <img src={Avatar} alt="Hitarth Sharma" />
              </AvatarWrapper>

              <SiteTitleWrapper>
                <SiteTitleLink to="/">
                  <h1>{data.site.siteMetadata.title}</h1>
                </SiteTitleLink>
              </SiteTitleWrapper>

              <NavList>
                <NavItem>
                  <Link to="/about">About</Link>
                </NavItem>
                <NavItem>
                  <Link to="/">My Book List</Link>
                </NavItem>
                <NavItem>
                  <Link to="/">Productivity</Link>
                </NavItem>
                <NavItem>
                  <Link to="/">Inspiration</Link>
                </NavItem>
                <NavItem>
                  <Link to="/">Tech</Link>
                </NavItem>
                <NavItem>
                  <Link to="/">Quotes</Link>
                </NavItem>
                <NavItem>
                  <Link to="/">Movies</Link>
                </NavItem>
                <NavItem>
                  <Link to="/">TV Series</Link>
                </NavItem>
              </NavList>

              <RecentPostsWrapper className="recent-posts">
                <h3>Recent posts</h3>
                <ul>
                  {data.allMarkdownRemark.edges.map(({ node }) => (
                    <Link to={node.fields.slug}>
                      <li>{node.frontmatter.title}</li>
                    </Link>
                  ))}
                </ul>
              </RecentPostsWrapper>

              <div>{/* TODO: Categories */}</div>

              <div className="copyright">
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
  main: { flex: 2.5, paddingLeft: '2rem', paddingRight: '1rem' },
}

export default SidebarLayout
