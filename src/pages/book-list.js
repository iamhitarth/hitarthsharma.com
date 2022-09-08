import { FilterToSchema } from 'graphql-tools'
import React, { useState } from 'react'
import { useInView } from 'react-cool-inview'
import styled from 'styled-components'

import Layout from '../components/layout'
import {
  useBooksFromNotion,
  FILTER_ALL,
  FILTER_READ,
  FILTER_UNREAD,
  FILTER_DIDNT_FINISH,
  FILTER_FAVOURITES,
} from '../hooks/useBooksFromNotion'
import { PostTitle } from '../templates/blogPost'

/* TODO:
Add top 5 books
Links to Amazon for each book in the list maybe
Use something like OpenLibrary to pull through thumbnail and summary etc.
 */

const MyBooks = styled.div`
  .book-filters {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

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
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease-out;
    margin: 0 0.25rem 0.25rem 0.25rem;
  }

  label.radio-active {
    background: #82beed;
    color: white;
  }

  @media (max-width: 900px) {
    p {
      text-align: center;
    }

    .book-filters {
      justify-content: center;
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

  .book-status {
    background-color: hotpink;
    padding: 0.1rem 0.5rem;
    border-radius: 0.25rem;
    margin: 0 0.5rem;
    font-size: 0.75rem;
    vertical-align: text-bottom;
  }

  .book-complete {
    text-decoration: line-through;
  }
`

const Loading = styled.p`
  @media (max-width: 900px) {
    text-align: center;
  }
`

const BookList = ({ location }) => {
  const [startCursor, setStartCursor] = useState(undefined)
  const [filterBy, setFilterBy] = useState(FILTER_ALL)
  const { books, hasMore, loading, nextCursor } = useBooksFromNotion(
    startCursor,
    filterBy
  )

  const { observe, unobserve } = useInView(
    {
      rootMargin: '200px 0px',
      onEnter: ({ observe, unobserve }) => {
        if (hasMore && !loading) {
          setStartCursor(nextCursor)
        }
      },
    },
    [hasMore, loading]
  )

  const handleFilterChange = (e) => {
    if (filterBy != e.target.value) {
      setFilterBy(e.target.value)
      setStartCursor(undefined)
    }
  }

  const renderFilter = () => {
    const filters = [
      { label: `📚 all`, value: FILTER_ALL },
      { label: `✅ read`, value: FILTER_READ },
      { label: `🤓 unread`, value: FILTER_UNREAD },
      { label: `❤️ favourites`, value: FILTER_FAVOURITES },
      { label: `💀 didn't finish`, value: FILTER_DIDNT_FINISH },
    ]

    return (
      <p className="book-filters">
        <span>Show&nbsp;</span>
        {filters.map((f) => (
          <label
            key={f.value}
            className={`radio-label${
              filterBy === f.value ? ' radio-active' : ''
            }`}
          >
            <input
              type="radio"
              value={f.value}
              checked={filterBy === f.value}
              onChange={handleFilterChange}
            />
            {f.label}
          </label>
        ))}
      </p>
    )
  }

  const renderStatusEmoji = (status) => {
    let emojiText = ''
    if (status === 'Reading') emojiText = '👀\u00A0\u00A0'
    if (status === 'Finished') emojiText = `✅\u00A0\u00A0`
    if (status === `Didn't finish`) emojiText = `💀\u00A0\u00A0`
    return <span title={status}>{emojiText}</span>
  }

  const renderBooks = () => {
    return books.map((book) => (
      <li key={book.name} className={`book`}>
        {renderStatusEmoji(book.status)}
        {book.name}
        {book.author ? ` - ${book.author}` : ''}
      </li>
    ))
  }

  return (
    <Layout location={location}>
      <div>
        <PostTitle>My Book List</PostTitle>
        <p>What I have read, am reading and would like to read.</p>
        <MyBooks>
          {renderFilter()}
          <MyBooksList>{renderBooks()}</MyBooksList>
        </MyBooks>
        {loading ? <Loading>Loading...</Loading> : null}
      </div>
      <div ref={observe} style={{ opacity: 0 }}>
        ---Bottom Bar----
      </div>
    </Layout>
  )
}

export default BookList
