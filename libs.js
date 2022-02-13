const sort = (data) => {
  const { slate_events, sporting_events } = data;
  const events = [
    ...Object.values(sporting_events).map((event) => {
      event.isSlate = true;
      return event;
    }),
    ...slate_events,
  ].sort((a, b) => {
    if (a.teams === b.teams) {
      if (a.date === b.date) {
        return a.time - b.time;
      }
      return a.date - b.date;
    }
    return a.teams - b.teams;
  });
  let output = [];
  let group = [events[0]];

  for (let i = 1; i < events.length; i++) {
    if (
      events[i].date === events[i - 1].date &&
      events[i].time === events[i - 1].time &&
      events[i].teams === events[i - 1].teams
    ) {
      group.push(events[i]);
    } else {
      output.push(group);
      group = [events[i]];
    }
  }

  if (group.length > 0) {
    output.push(group);
  }

  return output.map((a) => {
    if (a.length === 1) {
      return { event: a[0] };
    } else {
      return { event: a };
    }
  });
};

export { sort };
