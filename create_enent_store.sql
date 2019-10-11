DROP TABLE IF EXISTS event_store;

CREATE TABLE IF NOT EXISTS event_store (
  _id SERIAL PRIMARY KEY,
  sg_event_id bigint NOT NULL,
  pp_practice_id bigint,
  pp_campaign_id bigint,
  email varchar(255),
  event varchar(255),
  category text,
  timestamp BIGINT NOT NULL
);

SELECT * from event_store
WHERE pp_practice_id=90008;


