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
    complete: 0,
    incomplete: 0,
    filterBy: 'all',
  }

  componentDidMount() {
    const readingListUrl = 'https://runkit.io/iamhitarth/reading-list-api/4.0.0'
    let booksComplete = 0
    let booksIncomplete = 0

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
          book =>
            book.state === 'complete' ? booksComplete++ : booksIncomplete++
        )

        this.setState({
          books: [...sorted],
          complete: booksComplete,
          incomplete: booksIncomplete,
        })
      })
  }

  componentWillUnmount() {
    if (this.cancelRequest) {
      this.cancelRequest('Cancelled request on unmount')
    }
  }

  handleFilterChange = event => {
    this.setState({
      filterBy: event.target.value,
    })
  }

  renderFilter() {
    const { complete, incomplete, filterBy } = this.state

    return (
      <p>
        Show{' '}
        <label className="button">
          <input
            type="radio"
            value="all"
            checked={filterBy === 'all'}
            onChange={this.handleFilterChange}
          />
          {`All (${complete + incomplete})`}
        </label>{' '}
        <label className="button">
          <input
            type="radio"
            value="complete"
            checked={filterBy === 'complete'}
            onChange={this.handleFilterChange}
          />
          {`Read (${complete})`}
        </label>{' '}
        <label className="button">
          <input
            type="radio"
            value="incomplete"
            checked={filterBy === 'incomplete'}
            onChange={this.handleFilterChange}
          />
          {`Unread (${incomplete})`}
        </label>
      </p>
    )
  }

  renderBooks() {
    const { filterBy } = this.state
    return this.state.books
      .filter(book => filterBy === 'all' || filterBy === book.state)
      .map(book => (
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
            <MyBooks>
              {this.renderFilter()}
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