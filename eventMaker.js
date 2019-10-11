const fs = require('fs');
const faker = require('faker');

const N = process.argv[2];
const output = process.argv[3];

const stream = fs.createWriteStream(output)

stream.write('sg_event_id,pp_practice_id,pp_campaign_id,email,event,category,timestamp\n')

const events = ['processed', 'deferred', 'bounced', 'delivered', 'open', 'clicked'];
const categories = ['first_feedback_request', 'second_feedback_request', 'third_feedback_request', 'category1', 'category2', 'category3', 'category4'];
const writes = [];

for (let i = 0; i < N; i++) {

  const event = [];
  const range = Math.floor(N / 4);
  const eventCategories = categories[Math.floor(Math.random() * categories.length)]
    + (Math.random() > 0.5 ? '|' + categories[Math.floor(Math.random() * categories.length)] : '');

  event.push(i);
  event.push(90000 + Math.floor(1 + Math.random() * range));
  event.push(80000 + Math.floor(1 + Math.random() * range));
  event.push('fake+' + Math.floor(1 + Math.random() * range) + '@gmail.com');
  event.push(events[Math.floor(Math.random() * events.length)]);
  event.push(eventCategories);
  event.push(Math.floor(new Date(faker.date.past()).getTime() / 1000));

  writes.push(stream.write(event.join(',') + '\n', (err) => {
    if (err) {
      console.error(err)
    } else if ( i % 10 === 0) {
      console.log(i);
    }
  }))
}

Promise.all(writes).then(() => console.log('done'))
