import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'

import { get } from '../utils/requestHelper'
import { PostTitle } from '../templates/blogPost'

/* TODO:
Add top 5 books
Links to Amazon for each book in the list maybe
Use something like OpenLibrary to pull through thumbnail and summary etc.
 */

const STATUS_COMPLETED = 'x'
const STATUS_INCOMPLETE = '0'

const MyBooks = styled.div`
  input[type='radio'] {
    position: absolute;
    top: auto;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
    clip-path: rect(1px, 1px, 1px, 1px);
    width: 1px;
    height: 1px;
    white-space: nowrap;
  }

  label.radio-label {
    border: solid 1px #82beed;
    border-radius: 0.25rem;
    padding: 0.25rem;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }

  label.radio-active {
    background: #82beed;
    color: white;
  }

  @media (max-width: 900px) {
    p {
      text-align: center;
    }
  }
`

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
    const readingListUrl = 'https://runkit.io/iamhitarth/reading-list-api/5.1.0'
    let booksComplete = 0
    let booksIncomplete = 0

    get(readingListUrl, this)
      .then(JSON.parse)
      .then((items) => {
        const books = items.rows
        books.forEach((book) =>
          book.completed === STATUS_COMPLETED
            ? booksComplete++
            : booksIncomplete++
        )

        this.setState({
          books: [...books],
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

  handleFilterChange = (event) => {
    this.setState({
      filterBy: event.target.value,
    })
  }

  renderFilter() {
    const { complete, incomplete, filterBy } = this.state

    return (
      <p>
        Show{' '}
        <label
          className={`radio-label${filterBy === 'all' ? ' radio-active' : ''}`}
        >
          <input
            type="radio"
            value="all"
            checked={filterBy === 'all'}
            onChange={this.handleFilterChange}
          />
          {`All (${complete + incomplete})`}
        </label>{' '}
        <label
          className={`radio-label${
            filterBy === STATUS_COMPLETED ? ' radio-active' : ''
          }`}
        >
          <input
            type="radio"
            value={STATUS_COMPLETED}
            checked={filterBy === STATUS_COMPLETED}
            onChange={this.handleFilterChange}
          />
          {`Read (${complete})`}
        </label>{' '}
        <label
          className={`radio-label${
            filterBy === STATUS_INCOMPLETE ? ' radio-active' : ''
          }`}
        >
          <input
            type="radio"
            value={STATUS_INCOMPLETE}
            checked={filterBy === STATUS_INCOMPLETE}
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
      .filter((book) => filterBy === 'all' || filterBy === book.completed)
      .map((book) => (
        <li
          key={book.name}
          className={`book book-${
            book.completed === STATUS_COMPLETED && filterBy !== STATUS_COMPLETED
              ? 'complete'
              : 'incomplete'
          }`}
        >
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
