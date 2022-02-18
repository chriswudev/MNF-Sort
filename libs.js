const sort = (data) => {
  const { slate_events, sporting_events } = data;
  const events = [
    ...slate_events.map((event) => {
      event.date = formatDateTime(event.date, event.time);
      event.teams = event.szDescriptor;
      return event;
    }),
    ...Object.values(sporting_events).map((event) => {
      event.date = formatDateTime(event.date, event.time);
      event.isSlate = true;
      return event;
    }),
  ].sort((a, b) => {
    if (a.date === b.date) {
      return a.teams > b.teams ? 1 : a.teams === b.teams ? 0 : -1;
    }
    return a.date > b.date ? 1 : a.date === b.date ? 0 : -1;
  });

  const result = events.reduce((output, event) => {
    if (output.length === 0) {
      output.push({ event });
    } else {
      let perviousEvent = output[output.length - 1].event;
      let isArray = false;
      if (Array.isArray(perviousEvent)) {
        perviousEvent = perviousEvent[0];
        isArray = true;
      }
      if (
        perviousEvent.date === event.date &&
        perviousEvent.time === event.time &&
        perviousEvent.teams === event.teams
      ) {
        if (isArray) {
          output[output.length - 1].event.push(event);
        } else {
          output[output.length - 1].event = [perviousEvent, event];
        }
      } else {
        output.push({ event });
      }
    }
    return output;
  }, []);
  return result;
};

const formatDateTime = (date, time) => {
  let dateArray = date.split('/');
  const dateStr = [dateArray[2], dateArray[0], dateArray[1]].join('/');
  const timeArray = time.split(' ');
  const timeStr = [timeArray[0], timeArray[1]].join(' ');
  return new Date(`${dateStr} ${timeStr}`).toISOString();
};

export { sort };
