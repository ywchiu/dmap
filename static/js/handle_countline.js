// Ref: http://visjs.org/docs/graph2d/

function trans_geo_data_for_countline(data){
    let dates = {};
    for( d of data ){
        let date = d.data.date.split(" ")[0];
        if( date in dates ){
            dates[date] += 1;
        }
        else{
            dates[date] = 1;
        }
    }
    let date_key = Object.keys(dates).sort();

    let return_data = [];
    date_key.forEach( d => return_data.push({x:d,y:dates[d]}) );
    console.log(return_data);
    return return_data;
}

function trans_data_for_countline(data,category){
    let date_range = new Set([]);
    for( d of data ){
        date_range.add( d.date.split(" ")[0] );
        // date_range.add( new Date(d.date_int) );
    }
    date_range = [...date_range].sort();

    let dates = {};
    for( d of data ){
        let date = d.date.split(" ")[0];
        let group = d.category;
        if( !(group in dates) ){
            dates[group] = {}
            for( let dr of date_range ){
                dates[group][dr] = 0;
            }
        }
        dates[group][date] += 1;
    }
    // console.log(dates);

    let vis_data = new vis.DataSet();
    let groups = new vis.DataSet();
    let colors = ['green','black','blue','yellow'];
    let color_i = 0;
    for( let group in dates ){
        // if(group=="其他")
        //     continue;
        let tmp = [];
        date_range.forEach( d => tmp.push({x:new Date(d),y:dates[group][d],group:group}) );

        // date_range.forEach( function(d){
        //     if(dates[group][d] > 0){
        //         tmp.push({x:d,y:dates[group][d],group:group});
        //     }
        // });

        // tmp.push({x:'2015-07-07',y:10,group:group});

        vis_data.add(tmp);

        // console.log( 'cat_'+category.indexOf(group) );

        groups.add({
            id: group,
            content: group,
            className: 'cat_'+category.indexOf(group),
            options: {
            //     drawPoints: false,
            //     interpolation: {
            //         parametrization: 'centripetal'
            //     }
                drawPoints: {
                    style: 'circle',
                    size: 2
                },
                shaded: {
                    orientation: 'bottom' // top, bottom
                }

            },
        });
        color_i += 1;

        // console.log(vis_data);
        // let count = 0;
        // for( d of vis_data ){
        //     count += d.y;
        // }
        // console.log(count);
    }

    return [vis_data, groups];
}

function get_countline(startTime,endTime,data,category,onCustomTimeChange){
    let [vis_data, groups] = trans_data_for_countline(data,category);
    // console.log(vis_data);
    // console.log(groups);

    // Set options
    let options = {
        "width":  "100%",
        "height": "200px",
        // "style": "box",
        // "axisOnTop": true,

        // "showCustomTime":true,
        // "showCurrentTime":true,

        dataAxis: {
            left: {
                range: {min:0}
            }
        },
        // dataAxis: {visible: false},
        // "min":0,
        'legend': true,
        'stack': false,

        'start': startTime,
        'end': endTime,
        // 'end': vis.moment(data[Math.floor(data.length/4)].x),
    };

    let countline = new vis.Graph2d(document.getElementById('vis_stream'), vis_data, groups, options);
    // countline.setOptions( { Stack: true } );

    // let countline = new vis.Graph2d(document.getElementById('vis_stream'), vis_data, options);

    // Set custom time marker (blue)
    // countline.setCustomTime(startTime);
    countline.addCustomTime(startTime);
    countline.on('timechange', onCustomTimeChange);

    return countline;
}



