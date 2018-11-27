import React from 'react'

import SidebarLayout from '../components/sidebarLayout'

const Category = ({ pageContext, data, location }) => {
  return (
    <SidebarLayout location={location}>
      This is a category template
    </SidebarLayout>
  )
}

export default Category
