function EventStore(...projections) {
  const project = event => projections.forEach(projection => projection(event));

  const replay = (cursor, callback) => {
    cursor.read(1, (err, rows) => {
      if(err) {
        console.error(err)
        return;
      }
      if(rows.length === 0) {
        cursor.close(callback);
        return;
      }
      project(rows[0]);
      replay(cursor, callback);
    })
  };
  return {replay}
}

module.exports = EventStore;