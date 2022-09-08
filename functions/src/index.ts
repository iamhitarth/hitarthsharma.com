import * as functions from 'firebase-functions';
import {Client} from '@notionhq/client';
import * as cors from 'cors';
// eslint-disable-next-line max-len
import {QueryDatabaseParameters} from '@notionhq/client/build/src/api-endpoints';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const corsMiddleware = cors({origin: '*'});
type SORT_DIRECTION = 'ascending' | 'descending'

export const helloWorld = functions
    .runWith({secrets: ['NOTION_CLIENT_SECRET']})
    .https.onRequest((request, response) => {
      corsMiddleware(request, response, () => {
        functions.logger.info('Hello logs!', {
          structuredData: true,
          queryParams: request.query,
        });

        const booksReadFilter = {
          or: [
            {property: 'Status', select: {equals: 'Finished'}},
            {property: 'Status', select: {equals: 'Didn\'t finish'}},
          ],
        };

        const booksUnreadFilter = {
          and: [
            {property: 'Status', select: {does_not_equal: 'Finished'}},
            {property: 'Status', select: {does_not_equal: 'Didn\'t finish'}},
          ],
        };

        const booksDidntFinishFilter = {
          property: 'Status',
          select: {equals: 'Didn\'t finish'},
        };

        const booksFavouriteFilter = {
          property: 'Favourite?',
          checkbox: {equals: true},
        };

        const startCursor = request.query.startCursor ?
        request.query.startCursor.toString() :
        undefined;

        const filterBy = request.query.filterBy ?
        request.query.filterBy.toString().toLowerCase() :
        'all';

        const notion = new Client({
          auth: process.env.NOTION_CLIENT_SECRET,
        });

        const getBooksFilter = () => {
          if (filterBy === 'read') {
            return booksReadFilter;
          } else if (filterBy === 'unread') {
            return booksUnreadFilter;
          } else if (filterBy === 'favourites') {
            return booksFavouriteFilter;
          } else if (filterBy === 'didnt_finish') {
            return booksDidntFinishFilter;
          }

          return {
            property: 'Status',
            select: {is_not_empty: true as const},
          };
        };

        const getQuery = () => {
          const filter = {
            and: [
              {
                property: 'Type',
                select: {
                  equals: 'Book',
                },
              },
              getBooksFilter(),
            ],
          };

          const sorts = [
            {
              property: 'Status',
              direction: 'ascending' as SORT_DIRECTION,
            },
            {
              property: 'Name',
              direction: 'ascending' as SORT_DIRECTION,
            },
          ];

          const query: QueryDatabaseParameters = {
            database_id: '43e867884f434c77b3e73c0297ffe6f4',
            start_cursor: startCursor,
            filter,
            sorts,
          };

          return query;
        };

        notion.databases.query(getQuery()).then((data) => {
          console.log('### Sending data again');
          response.send(data);
        });
      });
    });
