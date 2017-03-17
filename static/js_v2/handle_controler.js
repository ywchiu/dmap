function get_controler_template(){
    let width = $('#page-content').width() - $('.results-wrapper').width();
    let left = (width-570)/2;
    return '<footer class="lp" style="display:inline">' +
'  <div class="transport" style="height:40px">' +
`    <div class="navbar" style="position:absolute;left:${left}px">` +
'        <ul class="nav navbar-inner navbar-form navbar-nav">' +
'          <li class="ctrl" style="height:40px;width:40px;">' +
'            <a id="play-pause" href="#" style="height:30px;width:25px;display:flex;"><i id="play-pause-icon" class="fa fa-play fa-lg" style="width:25px"></i></a>' +
'          </li>' +
'          <li class="ctrl dropup">' +
'            <a id="clock-btn" class="clock" data-toggle="dropdown" href="#" style="height:40px;width:120px;">' +
'              <span id="cursor-date"></span>'+
'              <br/>' +
'              <span id="cursor-time"></span>' +
'            </a>' +
'            <div class="dropdown-menu" role="menu" aria-labelledby="clock-btn">' +
'              <label>Playback Cursor Time</label>' +
'              <div class="input-append bootstrap-timepicker">' +
'                <input id="timepicker" type="text" class="input-small span2">' +
'                <span class="add-on"><i class="fa fa-clock-o"></i></span>' +
'              </div>' +
'              <div id="calendar"></div>' +
'              <div class="input-append">' +
'                <input id="date-input" type="text" class="input-small">' +
'                <span class="add-on"><i class="fa fa-calendar"></i></span>' +
'              </div>' +
'            </div>' +
'          </li>' +
'          <li class="ctrl dropup" style="height:40px">' +
'            <div id="time-slider"></div>' +
'          </li>' +
'          <li class="ctrl dropup" style="height:40px;width:80px;">' +
'            <a id="play-pause" data-toggle="dropdown" style="height:30px;width:80px;display:flex;" href="#">'+
'              <i class="fa fa-dashboard fa-lg">&nbsp;&nbsp;</i>'+
'              <span id="speed-icon-val" class="speed">1</span>x'+
'            </a>'+
'            <div class="speed-menu dropdown-menu" role="menu" aria-labelledby="speed-btn" style="width:170px;height:100px">' +
'              <div class="row">'+
'                <div class="col-md-6 col-sm-6">'+
'                  <label>Playback<br/>Speed</label>' +
// '                  <div id="speed-slider"></div>' +
'                </div>' +
'                <div class="col-md-6 col-sm-6">'+
'                  <input id="speed-input" class="span1 speed form-control" type="text" value="1" style="width:50px" />' +
'                </div>' +
'              </div>' +
'              <div class="row">'+
'                <div id="speed-slider" style="width:150px"></div>' +
'              </div>' +
// '              <hr>' +
// '              <div class="row">'+
// '                <p>123</p>'
// '              </div>' +
'            </div>' +
'          </li>' +
'        </ul>' +
'    </div>' +
'  </div>' +
'</footer>'


/*
`
<footer class="lp">
  <div class="transport" style="background-color:white">
  <div class="container-fluid">
    <div class="collapse navbar-collapse">
      <button><a id="play-pause" href="#"><i id="play-pause-icon" class="fa fa-play fa-lg"></i></a></button>

     <div class="navbar-form navbar-nav">
      <div class="form-group">
       <input class="form-control" placeholder="Search">
       <button type="submit" class="btn btn-default">Submit 1</button>
      </div>
      <button type="submit" class="btn btn-default">Submit 2</button>
     </div>



    </div>
  </div>
  </div>
</footer>
`*/
}


function playback_handler(option){
    this._StartTime = option.start_time;
    this._EndTime = option.end_time;
    this._tickLen = option.tickLen;
    this._speed = option.speed;
    this._display_interval = option.display_interval;
    this._display_retain = option.display_retain;

    if( this._StartTime instanceof Date ){
        this._StartTime = this._StartTime.getTime();
    }
    if( this._EndTime instanceof Date ){
        this._EndTime = this._EndTime.getTime();
    }

    this._cursor = this._StartTime;
    this._transitionTime = this._tickLen / this._speed;
    this._intervalID = null;
    this._callbacksArry = [];
}

playback_handler.prototype.retain = function(ms){
    let t = this._cursor - ms;
    if(  0 <= t && t <= this._display_retain  ){
        return true;
    }
    return false;
}

playback_handler.prototype.isPlaying = function() {
    return this._intervalID ? true : false;
}

playback_handler.prototype.start = function () {
    // console.log('start');
    if (this._intervalID) return;
    if (this.cursor == this._EndTime) return;
    // console.log('set interval');
    this._intervalID = window.setInterval(
      this._tick,
      this._transitionTime,
      this);
}

playback_handler.prototype._tick = function (self) {
    // console.log('tick');
    // console.log( self._cursor );
    // console.log( self.getEndTime() );
    if (self._cursor > self.getEndTime()) {
      self._cursor = self.getEndTime();
      self._callbacks(self._cursor);
      clearInterval(self._intervalID);
      // console.log('clearInterval');
      $('#play-pause-icon').removeClass('fa-pause');
      $('#play-pause-icon').addClass('fa-play');
      self._intervalID = null;
      return;
    }else{
      // console.log('call tock');
      self.tock(self._cursor);
      // self._trackController.tock(self._cursor);
      self._callbacks(self._cursor);
      // self._cursor += self._tickLen;
      self._cursor += self._display_interval;
    }
}

playback_handler.prototype.tock = function (cursor) {
    // console.log( new Date(cursor) );
}

playback_handler.prototype.stop = function () {
    if (!this._intervalID) return;
    clearInterval(this._intervalID);
    this._intervalID = null;
}

playback_handler.prototype.setCursor = function (ms) {
    if( ms instanceof Date ){
        var time = ms.getTime();
    }
    else{
        var time = parseInt(ms);
    }
    if (!time) return;
    var mod = time % this._tickLen;
    if (mod !== 0) {
      time += this._tickLen - mod;
    }
    this._cursor = time;
    // this._trackController.tock(this._cursor, 0);
    this.tock(this._cursor);
    this._callbacks(this._cursor);
}

playback_handler.prototype.getTime = function() {
    return this._cursor;
}

playback_handler.prototype.getStartTime = function() {
    // return this._trackController.getStartTime();
    return this._StartTime
}

playback_handler.prototype.getEndTime = function() {
    // return this._trackController.getEndTime();
    return this._EndTime
}

playback_handler.prototype.getTickLen = function() {
    return this._tickLen;
}

playback_handler.prototype.getSpeed = function() {
    return this._speed;
}

playback_handler.prototype.setSpeed = function (speed) {
    this._speed = speed;
    this._transitionTime = this._tickLen / speed;
    if (this._intervalID) {
      this.stop();
      this.start();
    }
}


playback_handler.prototype._callbacks = function(cursor) {
    var arry = this._callbacksArry;
    for (var i=0, len=arry.length; i<len; i++) {
      arry[i].fn(cursor,arry[i].option);
    }
}


playback_handler.prototype.addCallback = function(fn,option=null) {
    this._callbacksArry.push({'fn':fn,'option':option});
}

function init_controler(playback){
    $('#controler').html('');
    $('#controler').html(get_controler_template());
    $("footer.lp").css( "bottom", $("#vis_stream").height()+50 );

// if( $(".hero-section .form").find("select").length ){
//         $(".search-form select").on("rendered.bs.select", function () {
//             $(".search-form").addClass("show");
//             if( !viewport.is('xs') ){
//                 $(".search-form.vertical").css( "top", ($(".hero-section").height()/2) - ($(".search-form .wrapper").height()/2) );
//             }
//             trackpadScroll("initialize");
//         });
//     }
    // else {
    //     $(".search-form").addClass("show");
    //     if( !viewport.is('xs') ){
    //         $(".search-form.vertical").css( "top", ($(".hero-section").height()/2) - ($(".search-form .wrapper").height()/2) );
    //     }
    //     trackpadScroll("initialize");
    // }

    // window.onresize = relocation_navbar();
    window.onresize = function(){
        let width = $('#page-content').width() - $('.results-wrapper').width();
        let left = (width-570)/2;
        $('div.navbar').css('left', left+'px');
    }

    // $('.results-wrapper').resize(relocation_navbar());
    // $('#page-content').on('resize', relocation_navbar());
    // $(window).on('resize', relocation_navbar());


    // var self = this;
    // var playback = this.playback;
    $('#play-pause').click(function() {
      // console.log(playback.isPlaying());
      if (playback.isPlaying() === false) {
        playback.start();
        $('#play-pause-icon').removeClass('fa-play');
        $('#play-pause-icon').addClass('fa-pause');
      } else {
        playback.stop();
        $('#play-pause-icon').removeClass('fa-pause');
        $('#play-pause-icon').addClass('fa-play');
      }
    });

    var startTime = playback.getStartTime();
    $('#cursor-date').html(DateStr(startTime));
    $('#cursor-time').html(TimeStr(startTime));

    // let slider_min = playback.getStartTime() / playback._display_interval;
    // console.log((playback.getEndTime() / playback._display_interval) - slider_min);

    $('#time-slider').slider({
      // min: playback.getStartTime() / playback._display_interval,
      min: playback.getStartTime(),
      // max: (playback.getEndTime() / playback._display_interval),
      max: playback.getEndTime(),
      // step: playback.getTickLen(),
      // step: 1,
      step: playback._display_interval,
      // value: playback.getTime() / playback._display_interval,
      value: playback.getTime(),
      slide: function( event, ui ) {
        // console.log(event);
        // let v = (ui.value)*playback._display_interval;
        let v = ui.value;
        playback.setCursor(v);
        $('#cursor-time').val( v.toString());
        $('#cursor-time-txt').html(new Date(v).toString());
      }
    });

    $('#speed-slider').slider({
      min: -9,
      max: 9,
      step: .1,
      value: speedToSliderVal(playback.getSpeed()),
      orientation: 'horizontal',
      slide: function( event, ui ) {
        var speed = sliderValToSpeed(parseFloat(ui.value));
        playback.setSpeed(speed);
        $('.speed').html(speed).val(speed);
      }
    });

    $('#speed-input').on('keyup', function(e) {
      var speed = parseFloat($('#speed-input').val());
      if (!speed) return;
      playback.setSpeed(speed);
      $('#speed-slider').slider('value', speedToSliderVal(speed));
      $('#speed-icon-val').html(speed);
      if (e.keyCode === 13) {
        $('.speed-menu').dropdown('toggle');
      }
    });

    $('#calendar').datepicker({
      changeMonth: true,
      changeYear: true,
      altField: '#date-input',
      altFormat: 'mm/dd/yy',
      defaultDate: new Date(playback.getTime()),
      onSelect: function(date) {
        var date = new Date(date);
        var time = $('#timepicker').data('timepicker');
        var ts = combineDateAndTime(date, time);
        playback.setCursor(ts);
        // $('#time-slider').slider('value', ts * playback._display_interval);
        $('#time-slider').slider('value', ts);
      }
    });

    $('#date-input').on('keyup', function(e) {
      $('#calendar').datepicker('setDate', $('#date-input').val());
    });

    $('.dropdown-menu').on('click', function(e) {
      e.stopPropagation();
    });

    $('#timepicker').timepicker({
      showSeconds: true
    });

    $('#timepicker').timepicker('setTime',
        new Date(playback.getTime()).toTimeString());

    $('#timepicker').timepicker().on('changeTime.timepicker', function(e) {
      var date = $('#calendar').datepicker('getDate');
      var ts = combineDateAndTime(date, e.time);
      playback.setCursor(ts);
      // $('#time-slider').slider('value', ts * playback._display_interval);
      $('#time-slider').slider('value', ts);
    });

    $(document).keydown(function(evt) {
        if (evt.keyCode == 32) {
            document.getElementById('play-pause').click();
            // $('#play-pause').click
        }
    });


    playback.addCallback(function(ms) {
      $('#cursor-date').html(DateStr(ms));
      $('#cursor-time').html(TimeStr(ms));
      // $('#time-slider').slider('value', ms * playback._display_interval);
      $('#time-slider').slider('value', ms);
    });

}

function speedToSliderVal(speed) {
    if (speed < 1) return -10+speed*10;
    return speed - 1;
}

function sliderValToSpeed(val) {
    if (val < 0) return parseFloat((1+val/10).toFixed(2));
    return val + 1;
}

function combineDateAndTime(date, time) {
    var yr = date.getFullYear();
    var mo = date.getMonth();
    var dy = date.getDate();
    // the calendar uses hour and the timepicker uses hours...
    var hr = time.hours || time.hour;
    if (time.meridian === 'PM' && hr !== 12) hr += 12;
    var min = time.minutes || time.minute;
    var sec = time.seconds || time.second;
    return new Date(yr, mo, dy, hr, min, sec).getTime();
}

function DateStr(time) {
    // return new Date(time).toDateString();
    let d = new Date(time);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    return month + '/' + day + '/' + year;
}

function TimeStr(time) {
    var d = new Date(time);
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var tms = time / 1000;
    var dec = (tms - Math.floor(tms)).toFixed(2).slice(1);
    var mer = 'AM';
    if (h > 11) {
      h %= 12;
      mer = 'PM';
    }
    if (h === 0) h = 12;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    // return h + ':' + m + ':' + s + dec + ' ' + mer;
    return h + ':' + m + ':' + s + ' ' + mer;
}


