import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Heading = styled.h1`
  margin: 0;
`

const HeaderLink = styled(Link)`
  color: white;
  text-decoration: none;
  text-shadow: none;
`

const HeaderNavList = styled.ul`
  margin: 0;
  list-style-type: 'none';
  display: flex;
  align-items: flex-end;
`

const HeaderNavItem = styled.li`
  display: inline;
  margin: 0;
  padding-left: 1.5rem;
`

const HeaderWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
`

const HeaderContainer = styled.div`
  background: black;
  margin-bottom: 1.2rem;
`

const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <HeaderWrapper>
      <Heading>
        <HeaderLink to="/">{siteTitle}</HeaderLink>
      </Heading>
      <HeaderNavList>
        <HeaderNavItem>
          <HeaderLink to="/">Home</HeaderLink>
        </HeaderNavItem>
        <HeaderNavItem>
          <HeaderLink to="/about">About</HeaderLink>
        </HeaderNavItem>
      </HeaderNavList>
    </HeaderWrapper>
  </HeaderContainer>
)

export default Header
