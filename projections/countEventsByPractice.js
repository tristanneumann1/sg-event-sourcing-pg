const CountEventsByPractice = function () {
  const practiceEvents = {};
  return {
    projection: event => {
      const practiceId = event.payload.pp_practice_id;
      practiceEvents[practiceId] = practiceEvents[practiceId]? practiceEvents[practiceId] + 1 : 1;
    },
    result: () => practiceEvents
  }
}

exports.Projection = CountEventsByPractice;