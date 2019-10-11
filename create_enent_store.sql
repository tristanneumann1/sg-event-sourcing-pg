DROP TABLE IF EXISTS event_store;

CREATE TABLE IF NOT EXISTS event_store (
  version SERIAL PRIMARY KEY,
  event_type VARCHAR(255) NOT NULL,
  payload JSONB NOT NULL
);

SELECT * FROM event_store;
