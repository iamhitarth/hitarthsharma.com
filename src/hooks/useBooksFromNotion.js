import { useState, useEffect } from 'react'
import { get } from '../utils/requestHelper'

export const FILTER_ALL = 'all'
export const FILTER_READ = 'read'
export const FILTER_UNREAD = 'unread'
export const FILTER_DIDNT_FINISH = 'didnt_finish'
export const FILTER_FAVOURITES = 'favourites'

const getNameFor = (book) => {
  const titles = book.properties['Name'].title
  let name = ''
  for (const t in titles) {
    name += titles[t].plain_text
  }
  return name
}

const getAuthorFor = (book) => {
  const authors = book.properties['Author'].multi_select
  let authorList = []
  for (const a in authors) {
    authorList.push(authors[a].name)
  }
  return authorList.join(', ')
}

export const useBooksFromNotion = (startCursor, filterBy) => {
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [nextCursor, setNextCursor] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const readingListUrl = `${process.env.GATSBY_NOTION_API_BASE_URL}helloWorld?${
    startCursor ? `startCursor=${startCursor}` : ``
  }&${filterBy ? `filterBy=${filterBy}` : ``}`

  useEffect(() => {
    setBooks([])
  }, [filterBy])

  useEffect(() => {
    setLoading(true)

    get(readingListUrl, this)
      .then(JSON.parse)
      .then((readingListData) => {
        const results = readingListData.results
        const myBooks = []

        for (const i in results) {
          const bookTitle = getNameFor(results[i])
          const author = getAuthorFor(results[i])
          const status = results[i].properties['Status'].select.name
          myBooks.push({ name: bookTitle, author, status })
        }

        setBooks((b) => [...b, ...myBooks])
        setHasMore(readingListData['has_more'])
        setNextCursor(readingListData['next_cursor'])
        setLoading(false)
      })
  }, [startCursor, readingListUrl])

  return { books, hasMore, loading, nextCursor }
}
