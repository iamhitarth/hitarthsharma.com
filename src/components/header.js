import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <h1 style={styles.heading}>
        <Link to="/" style={styles.headerLink}>
          {siteTitle}
        </Link>
      </h1>
      <ul style={styles.nav}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.headerLink}>
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about" style={styles.headerLink}>
            About
          </Link>
        </li>
      </ul>
    </div>
  </div>
)

export default Header

const styles = {
  heading: { margin: 0 },
  headerLink: {
    color: 'white',
    textDecoration: 'none',
  },
  nav: {
    margin: 0,
    listStyleType: 'none',
    display: 'flex',
    alignItems: 'flex-end',
  },
  navItem: { display: 'inline ', margin: 0, paddingLeft: 20 },
}
