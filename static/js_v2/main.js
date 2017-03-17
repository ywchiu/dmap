/*

折線圖
    max會超出邊界
    加入篩選功能
    mouse移到哪要能夠顯示當下各條線的值


heatmap
    mouse過去要能夠顯示次數
    顯示熱量對照(legend)



將沒有ip的資料產生經緯度
產生人工資料
看看有沒有什麼功能可以讓他變得炫一點


playback control加上一些控制
    'display_interval':60*60*24*1000,
    'display_retain':60*60*24*1000*3,

//marker依照類別放上照片
//分類機制優化
//使用者回報
一個類一個marker cluster
=================================================
肝炎
    A型肝炎
        http://data.gov.tw/node/8892
        //A型肝炎（週）http://data.gov.tw/node/9874
登革熱
    登革熱1998年起每日確定病例統計
        https://data.cdc.gov.tw/dataset/dengue-daily-determined-cases-1998/resource/4d762382-ec3c-4651-8d8e-e0a058502ac5?view_id=d3dee4fe-8d19-42c9-a9c9-cd3df94a7edb
流感
    流感併發重症(csv) 縣市 鄉鎮 月
        https://data.cdc.gov.tw/dataset/aagstable-influenza/resource/4acfe966-63a4-4236-9403-2c3de192468a
    //http://data.gov.tw/node/gov/resource/3145
    //流感併發重症(csv) 縣市 鄉鎮 週
        http://data.gov.tw/node/9925
腸病毒
    腸病毒感染併發症(csv) 縣市 鄉鎮 月
        https://data.cdc.gov.tw/dataset/aagstable-enterovirus/resource/5736f39a-ed58-465a-8d3f-892694c57005
    //腸病毒（週）http://data.gov.tw/node/14587
=================================================
資料比較多
https://disp.cc/b/Gossiping
腸病毒
https://disp.cc/b/BabyMother
有一些疾病的討論
https://disp.cc/b/PttHot
也有一些疾病的討論，但是討論比較少
https://disp.cc/b/Public_Issues
*/


function get_category(data){
    let tmp = {};
    data.forEach( function(x){
        if( x.category in tmp ){
            tmp[x.category] += 1;
        }
        else{
            tmp[x.category] = 1;
        }
    });
    let categories = Object.keys(tmp);
    categories.sort(function(a,b){
        if(tmp[a] > tmp[b])
            return -1;
        return 1;
    })
    // console.log(tmp);
    // console.log(categories);
    return categories;
}



function init(data,g0v_heatmap_data,map,start_time=undefined,end_time=undefined){
    dates = [];
    data.forEach( x => dates.push(new Date(x.date)) );
    g0v_heatmap_data.forEach( x => dates.push(new Date(x.date)) );
    // console.log(dates);
    // console.log(start_time);
    if(start_time===undefined){
        start_time = new Date(Math.min.apply(null,dates));
        // start_time = new Date(data[0].date);
        // start_time = new Date(data[0].date_int*1000);
    }else{
        start_time = new Date(start_time);
    }
    if(end_time===undefined){
        end_time = new Date(Math.max.apply(null,dates));
        // end_time = new Date(data[data.length-1].date);
        // end_time = new Date((data[data.length-1].date_int+60*60*24*3)*1000);
    }else{
        end_time = new Date(end_time);
    }
    $('input[name="start_time"]').val( (start_time.getMonth() + 1) + '/' + start_time.getDate() + '/' +  start_time.getFullYear() );
    $('input[name="end_time"]').val( (end_time.getMonth() + 1) + '/' + end_time.getDate() + '/' +  end_time.getFullYear() );

    // console.log(start_time);
    // console.log(end_time);
    // console.log(data[data.length-1].date);

    let category = get_category(data);
    // console.log(category);

    // possible color: ['orange','green','blue','purple','darkred','cadetblue','red','darkgreen','darkblue','darkpurple']
    // let colors = [ 'darkred', 'red', 'orange ', 'purple', 'green' ];
    // let colors = [ '#8B0000', '#FF0000', '#FFA500', '#800080', '#008000' ];
    let colors = [ 'rgb(139,0,0)', 'rgb(255,0,0)', 'rgb(255,165,0)', 'rgb(128,0,128)', 'rgb(0,128,0)' ];

    let category_color = {};
    for( c in category ){
        category_color[category[c]] = colors[c];
    }
    // console.log(category_color);

    ////////// var geo_data = main_handler.data_handler.transform_to_geo(data,data[0].date_int,data[data.length-1].date_int+60*60*24*3);

    // console.log(data);
    // console.log(geo_data);
    // console.log(start_time);
    // console.log(end_time);

    // var timeline = get_timeline(start_time,end_time,onCustomTimeChange);
    // console.log( countline );
    if( countline != null ){
        // countline.destroy();
        delete countline;
    }
    countline = get_countline(start_time,end_time,data,g0v_heatmap_data,category,onCustomTimeChange);

    // CANVAS version
    // let [a,b] = get_bar_chart(category,category_color,data);
    // bar_chart = a;
    // bar_chart_category_data = b;
    // END CANVAS version
    if( bar_chart != null ){
        delete bar_chart;
    }
    bar_chart = get_bar_chart(category,category_color,data);

    if( playback != null ){
        delete playback;
    }
    playback = new playback_handler({
        'start_time': start_time,
        'end_time': end_time,
        // 'tickLen': 60*60*24*1000,
        // 'tickLen': 200,
        'tickLen': 1000,
        'speed': 1,
        'display_interval':60*60*24*1000*30,
        'display_retain':60*60*24*1000*30,
    });
    // console.log(playback);
    init_controler(playback);


    // console.log( bar_chart );
    // console.log( bar_chart_category_data );

    // console.log( playback._trackController );

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


    // Uncomment to test data reset;
    //playback.setData(blueMountain);

    // A callback so timeline is set after changing playback time
    function onPlaybackTimeChange (ms,option) {
        // timeline.setCustomTime(new Date(ms));
        // console.log(option);
        let countline = option.countline;
        countline.setCustomTime(new Date(ms));

        // let tmp_date = new Date(ms);
        // console.log(tmp_date);
        // console.log(ms);
        // console.log(tmp_date.getTime());

        let current_time = vis.moment(new Date(ms));
        let range = countline.getWindow();
        let interval = range.end - range.start;

        // console.log( current_time );
        // console.log( interval );

        // if( current_time < current_time - 0.2 * interval || current_time > current_time + 0.8 * interval ){
        //     countline.setWindow(current_time - 0.2 * interval, current_time + 0.8 * interval);
        // }
        countline.setWindow(current_time - 0.2 * interval, current_time + 0.8 * interval);
        // CANVAS version
        // update_bar_chart(bar_chart, bar_chart_category_data, data, ms);

        update_bar_chart(bar_chart, category, data, ms);
    }


    playback.addCallback( onPlaybackTimeChange, {"countline":countline} );
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

    init_editable_table();
}
