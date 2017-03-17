// LeafletPlayback.js line 485, 當點不該被顯示時，Opacity被設為0.25，若要整個消失要設為0

class handle_main{
    constructor(){
        this.main_data = {};
        this.current_data = {};
        this.show_category = {};


        this.data_handler = new handle_data();
    }
}

console.log("hi");
var main_handler = new handle_main();

// var dataset = new vis.DataSet();
// console.log(dataset);
// console.log(vis.moment());
// console.log(vis.moment().add(-30, 'seconds'));


// let center=[44.5, -123.6];
// let zoom=10;
// let data = demoTracks;
// let data = demoTracks2;
// let data = demoTracks3;
// let map = handle_map(center,zoom);
let map = handle_map();
// refresh(data,map);

args = {
    map:map,
    start_time:null,
    end_time:null
}
// main_handler.data_handler.get_data('all_geo_data/',null,refresher,args);
main_handler.data_handler.get_data('all_data/',null,refresher,args);

function refresher(parsed_data,args){
    // console.log(parsed_data);
    refresh(parsed_data,args.map,args.start_time,args.end_time);
}

function refresh(data,map,start_time=null,end_time=null){
    // dates = [];
    // data.forEach( x => dates.push(new Date(x.date)) );
    if(start_time==null){
        // start_time = new Date(Math.min.apply(null,dates));
        // start_time = new Date(data[0].date);
        start_time = new Date(data[0].date_int*1000);
        // console.log( data[0].date );
        // console.log( start_time );
    }
    if(end_time==null){
        // end_time = new Date(Math.max.apply(null,dates));
        // end_time = new Date(data[data.length-1].date);
        end_time = new Date((data[data.length-1].date_int+60*60*24*3)*1000);
    }

    console.log(start_time);
    console.log(end_time);
    console.log(data[data.length-1].date);

    let category = main_handler.data_handler.get_category(data);
    // console.log(category);

    // possible color: ['orange','green','blue','purple','darkred','cadetblue','red','darkgreen','darkblue','darkpurple']
    let colors = [ 'darkred', 'red', 'orange ', 'purple' ];
    // let colors = [ '#8B0000', '#FF0000', '#FFA500 ', '#800080' ];

    let category_color = {};
    for( c in category ){
        category_color[category[c]] = colors[c];
    }
    // console.log(category_color);

    var geo_data = main_handler.data_handler.transform_to_geo(data,data[0].date_int,data[data.length-1].date_int+60*60*24*3);

    console.log(data);
    console.log(geo_data);
    // console.log(start_time);
    // console.log(end_time);

    // var timeline = get_timeline(start_time,end_time,onCustomTimeChange);
    var countline = get_countline(start_time,end_time,data,category,onCustomTimeChange);
    var [bar_chart, bar_chart_category_data] = get_bar_chart(category,category_color,data);
    var playback = get_playback(map,geo_data,category_color,onPlaybackTimeChange,start_time,end_time);
    console.log( bar_chart );
    console.log( bar_chart_category_data );

    console.log( playback._trackController );

    // for( let c in category ){
    //     $(".cat_"+c).css('fill-opacity',0);
    //     $(".cat_"+c).css('stroke-width',"2px");
    //     $(".cat_"+c).css('fill',colors[c]);
    //     $(".cat_"+c).css('stroke',colors[c]);
    //     // .cat_0{
    //     //     :0;
    //     //     :2px;
    //     //     fill: DarkRed;
    //     //     stroke: DarkRed;
    //     // }
    //     console.log(".cat_"+c,colors[c]);
    // }
    // countline.redraw()

    // console.log(playback.getStartTime());
    // console.log(start_time.getTime());
    // console.log(playback.getEndTime());
    // console.log(end_time.getTime());

    // Uncomment to use fency control UI
    // todo: Recover the speed control bar
    //     leaflet_control.js:
    //         line 123: slide
    //         line 130: #speed-input
    //         line 195: _speedToSliderVal
    var control = new L.Playback.Control(playback);
    control.addTo(map);

    // playback.setData(data);
    // playback.addData(blueMountain3);

    // Uncomment to test data reset;
    //playback.setData(blueMountain);

    // A callback so timeline is set after changing playback time
    function onPlaybackTimeChange (ms) {
        // timeline.setCustomTime(new Date(ms));
        countline.setCustomTime(new Date(ms));

        let tmp_date = new Date(ms);
        // console.log(tmp_date);
        // console.log(ms);
        // console.log(tmp_date.getTime());

        let current_time = vis.moment(new Date(ms));
        let range = countline.getWindow();
        let interval = range.end - range.start;
        countline.setWindow(current_time - 0.4 * interval, current_time + 0.5 * interval);

        update_bar_chart(bar_chart, bar_chart_category_data, data, ms);
    }
    //
    function onCustomTimeChange(properties) {
        if (!playback.isPlaying()) {
            playback.setCursor(properties.time.getTime());
            // control.setCursor(properties.time.getTime());

            // let current_time = vis.moment(properties.time.getTime());
            // let range = countline.getWindow();
            // let interval = range.end - range.start;
            // countline.setWindow(current_time - 0.1 * interval, current_time + 0.9 * interval);
        }
    }
}


