import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Avatar from '../assets/images/avatar.jpg'
import Favicon from '../assets/images/favicon.ico'
import NavItems from '../../config/sideNavItems.json'

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

const SiteTitle = styled.h1`
  margin-top: 0.25rem;
  font-size: 1.65rem;

  @media (max-width: 900px) {
    font-size: 2rem;
  }
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
  border: solid 1px #82beed;
  border-radius: 0.25rem;
  padding: 6px;
  color: hsla(0%, 0%, 0%, 1);

  a {
    background: none;
  }

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

const MainContent = styled.main`
  flex: 2.5;
  padding-left: 2rem;
  padding-right: 2rem;
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
            filter: {
              fileAbsolutePath: { regex: "//posts//" }
              frontmatter: { isDraft: { ne: true } }
            }
            sort: { fields: [fields___postDate], order: DESC }
            limit: 4
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
      render={(data) => (
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
            link={[
              {
                rel: 'shortcut icon',
                href: `${Favicon}`,
                type: 'image/x-icon',
              },
              { rel: 'icon', href: `${Favicon}`, type: 'image/x-icon' },
            ]}
          />
          <Container>
            <Sidebar>
              <AvatarWrapper>
                <img src={Avatar} alt="Hitarth Sharma" />
              </AvatarWrapper>

              <SiteTitleWrapper>
                <SiteTitleLink to="/">
                  <SiteTitle>{data.site.siteMetadata.title}</SiteTitle>
                </SiteTitleLink>
              </SiteTitleWrapper>

              <NavList>
                {NavItems.map(
                  (navItem) =>
                    navItem.isShown && (
                      <NavItem key={navItem.displayName}>
                        <Link to={navItem.href}>{navItem.displayName}</Link>
                      </NavItem>
                    )
                )}
              </NavList>

              <RecentPostsWrapper className="recent-posts">
                <h3>Recent posts</h3>
                <ul>
                  {data.allMarkdownRemark.edges.map(({ node }) => (
                    <Link key={node.fields.slug} to={node.fields.slug}>
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

            <MainContent>{children}</MainContent>
          </Container>
        </div>
      )}
    />
  )
}

SidebarLayout.propTypes = {
  children: PropTypes.node,
}

export default SidebarLayout
