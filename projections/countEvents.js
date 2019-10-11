const CountEvents = function () {
  let counter = 0;
  return {
    projection: _ => counter++,
    result: () => { return counter }
  }
}

exports.Projection = CountEvents;