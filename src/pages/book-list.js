import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'

import { get } from '../utils/requestHelper'
import { PostTitle } from '../templates/blogPost'

/* TODO:
Show read and unread links with count of each
Links to Amazon for each book maybe
 */

const MyBooks = styled.div``

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
    read: 0,
    unread: 0,
    filterBy: 'all',
  }

  componentDidMount() {
    const readingListUrl = 'https://runkit.io/iamhitarth/reading-list-api/4.0.0'
    let booksRead = 0
    let booksUnread = 0

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
        sorted.forEach(
          book => (book.state === 'complete' ? booksRead++ : booksUnread++)
        )

        this.setState({
          books: [...sorted],
          read: booksRead,
          unread: booksUnread,
        })
      })
  }

  componentWillUnmount() {
    if (this.cancelRequest) {
      this.cancelRequest('Cancelled request on unmount')
    }
  }

  handleFilterChange(target) {
    console.log('Filter changed to', target)
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
    const { unread, read, filterBy } = this.state
    console.log('Checked for all', this.state)
    return (
      <Layout location={location}>
        <div>
          <PostTitle>My Book List</PostTitle>
          <p>What I have read, am reading and would like to read.</p>
          {areBooksLoaded ? (
            <MyBooks>
              <p>
                Show{' '}
                <label className="button">
                  <input
                    type="radio"
                    checked={filterBy === 'all'}
                    onChange={this.handleFilterChange}
                  />
                  {`All (${read + unread})`}
                </label>{' '}
                <label className="button">
                  <input
                    type="radio"
                    checked={filterBy === 'read'}
                    onChange={this.handleFilterChange}
                  />
                  {`Read (${read})`}
                </label>{' '}
                <label className="button">
                  <input
                    type="radio"
                    checked={filterBy === 'unread'}
                    onChange={this.handleFilterChange}
                  />
                  {`Unread (${unread})`}
                </label>
              </p>
              <MyBooksList>{this.renderBooks()}</MyBooksList>
            </MyBooks>
          ) : (
            <p>Loading books...</p>
          )}
        </div>
      </Layout>
    )
  }
}
export default BookList
