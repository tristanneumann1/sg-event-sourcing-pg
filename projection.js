const EventStore = require('./eventStore');
const { Pool } = require('pg');
const Cursor = require('pg-cursor');

// Projection
const CountEvents = function () {
  let counter = 0;
  return {
    projection: _ => counter++,
    result: () => { return counter }
  }
}

const eventscount = new CountEvents();


// Connection
const query = 'SELECT * FROM event_store'
const pool = new Pool({
  database: 'sg_event_store',
  user: 'tristan.neumann',
  password: '',
  port: 5432,
});
pool.connect((err, client) => {
  if (err) {
    throw err;
  }
  const cursor = client.query(new Cursor(query))
  runProjection(eventscount, cursor)
});

function runProjection(projector, cursor) {
  new EventStore(projector.projection).replay(cursor, () => {
    const result = projector.result();
    console.log(result);
    process.exit();
  })
}