import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Heading = styled.h2`
  margin: 0;
`

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  text-shadow: none;
  background: none;
`

const NavList = styled.ul`
  margin: 0;
  list-style-type: 'none';
  display: flex;
  align-items: flex-end;
`

const NavItem = styled.li`
  display: inline;
  margin: 0;
  padding-left: 1.5rem;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
`

const Container = styled.div`
  background-color: white;
  margin-bottom: 1.2rem;
`

const Header = ({ siteTitle }) => (
  <Container>
    <Wrapper>
      <Heading>
        <NavLink to="/">{siteTitle}</NavLink>
      </Heading>
      <NavList>
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about">About</NavLink>
        </NavItem>
      </NavList>
    </Wrapper>
  </Container>
)

export default Header
