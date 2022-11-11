# Arknights Poll

Website: https://arknights-poll.net/

A simple Node.js webapp for collecting and visualizing Arknight players' operator data. Deployed on Google App Engine with Google Cloud Datastore as the backing datastore.

## Development

1. Install [Node.js](https://nodejs.org/) and [Google Cloud Datastore emulator](https://cloud.google.com/datastore/docs/tools/datastore-emulator)
2. Install dependencies `npm install`
3. Update the base data `npm run update-base-data`
4. Start the dev server `npm run dev`
5. Run the webapp at http://localhost:8080/
