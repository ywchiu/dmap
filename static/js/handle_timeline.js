function get_timeline(startTime,endTime,onCustomTimeChange){
    // Set timeline options
    let timelineOptions = {
      "width":  "100%",
      "height": "120px",
      "style": "box",
      "axisOnTop": true,
      "showCustomTime":true
    };

    // Create a DataSet with data
    let timelineData = new vis.DataSet([{ start: startTime, end: endTime, content: 'Demo GPS Tracks' }]);

    // Setup timeline
    let timeline = new vis.Timeline(document.getElementById('timeline'), timelineData, timelineOptions);

    // Set custom time marker (blue)
    timeline.setCustomTime(startTime);

    // Set timeline time change event, so cursor is set after moving custom time (blue)
    timeline.on('timechange', onCustomTimeChange);

    return timeline;
}
