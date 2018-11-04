import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'

import { get } from '../utils/requestHelper'
import { PostTitle } from '../templates/blogPost'

/* TODO:
Show read and unread links with count of each
Links to Amazon for each book maybe
 */

const MyBooksList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-left: 0;

  li {
    list-style-type: none;
  }

  .book-complete {
    text-decoration: line-through;
  }
`

class BookList extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    const readingListUrl = 'https://runkit.io/iamhitarth/reading-list-api/4.0.0'

    get(readingListUrl, this)
      .then(JSON.parse)
      .then(items => {
        const sorted = items.sort(
          (a, b) =>
            a.state > b.state
              ? -1
              : b.state > a.state
                ? 1
                : a.name > b.name
                  ? -1
                  : 1
        )

        this.setState({
          books: [...sorted],
        })
      })
  }

  componentWillUnmount() {
    if (this.cancelRequest) {
      this.cancelRequest('Cancelled request on unmount')
    }
  }

  renderBooks() {
    return this.state.books.map(book => (
      <li key={book.id} className={`book book-${book.state}`}>
        {book.name}
      </li>
    ))
  }

  render() {
    const { location } = this.props
    const areBooksLoaded = this.state.books.length > 0
    return (
      <Layout location={location}>
        <div>
          <PostTitle>My Book List</PostTitle>
          <p>What I have read, am reading and would like to read.</p>
          {areBooksLoaded ? (
            <MyBooksList>{this.renderBooks()}</MyBooksList>
          ) : (
            <p>Loading books...</p>
          )}
        </div>
      </Layout>
    )
  }
}
export default BookList
