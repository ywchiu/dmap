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

function trans_data_for_countline(data,g0v_heatmap_data,category,start_time,end_time){
    // =========================================================================
    // init date range and its granurity(by day, week, ... etc)
    let date_range = new Set([]);
    for( dd of [data,g0v_heatmap_data] ){
        for( d of dd ){
            date_range.add( d.date.split(" ")[0] );
            // date_range.add( new Date(d.date_int) );
        }
    }
    let endDate = new Date(end_time);
    for (var iDate = new Date(start_time); iDate < endDate; iDate.setDate(iDate.getDate() + 30)) {
        let year = iDate.getFullYear();
        let month = '0' + (iDate.getMonth()+1);
        let day = '0' + iDate.getDate();
        let tmp_date = year +'-'+ month.substr( month.length-2, month.length ) +'-'+ day.substr( day.length-2, day.length );
        date_range.add( tmp_date );
        // console.log(tmp_date);
    }
    date_range = [...date_range].sort();
    // console.log(endDate);
    // console.log(date_range);
    // =========================================================================
    // init frequency
    let dates = {};
    let tmp_category_H = new Set();
    for( d of data ){
        let date = d.date.split(" ")[0];
        let group = d.category;
        if( !(group in dates) ){
            dates[group] = {}
            for( let dr of date_range ){
                dates[group][dr] = 0;
            }
        }
        dates[group][date]++;
    }
    for( d of g0v_heatmap_data ){
        let date = d.date.split(" ")[0];
        let c = null;
        for( cat of category_list ){
            if( d.category.includes(cat) ){
                c = cat;
                break
            }
        }
        let group = 'H.'+c;
        tmp_category_H.add(group);
        if( !(group in dates) ){
            dates[group] = {}
            for( let dr of date_range ){
                dates[group][dr] = 0;
            }
        }
        dates[group][date]++;
    }
    // console.log(dates);
    // =========================================================================
    // handle category
    tmp_category_H = [...tmp_category_H];
    tmp_category_H.sort(function(a,b){
        a = a.substr(2,a.length);
        b = b.substr(2,b.length);
        if(category.indexOf(a) > category.indexOf(b))
            return -1;
        return 1;
    });
    let tmp_category = [];
    category.forEach( x => tmp_category.push(x) );
    tmp_category_H.forEach( x => tmp_category.push(x) );
    // console.log(category);
    // console.log(tmp_category);
    // =========================================================================

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
        let orien = 'left';
        if( group.substr(0,2) === 'H.' ){
            orien = 'right';
        }
        // console.log( group,orien);
        groups.add({
            id: group,
            content: group,
            className: 'cat_'+tmp_category.indexOf(group),
            options: {
            //     drawPoints: false,
            //     interpolation: {
            //         parametrization: 'centripetal'
            //     }
                // interpolation: {
                //     parametrization: 'disabled'
                // },
                interpolation: false,
                drawPoints: {
                    style: 'circle',
                    size: 2
                },
                shaded: {
                    orientation: 'bottom' // top, bottom
                },
                yAxisOrientation: orien, // left, right
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
    // =========================================================================
    // handle computing max
    let left = [];
    let right = [];
    // console.log(dates);
    for( let group in dates ){
        if( group.substr(0,2) === 'H.' ){ // right
            right.push.apply( right, Object.values( dates[group] ) );
        }else{ // left
            left.push.apply( left, Object.values( dates[group] ) );
        }
    }

    left = Math.max.apply(null, left);
    right = Math.max.apply(null, right);
    // console.log(left);
    // console.log(right);

    left = left + parseInt( left * 0.5 );
    right = right + parseInt( right * 0.5 );

    // console.log(left);
    // console.log(right);


    return [tmp_category,dates,vis_data, groups, left, right];
}

function get_countline(startTime,endTime,data,g0v_heatmap_data,category,onCustomTimeChange){
    let [loc_cat,loc_data,vis_data, groups, max_left, max_right ] = trans_data_for_countline(data,g0v_heatmap_data,category,startTime,endTime);
    // console.log(vis_data);
    // console.log(groups);
    // console.log(max_left, max_right);

    // Set options
    let options = {
        // autoResize: true,
        "width":  $(window).width() - $("#bar_chart").width(),
        "height": "200px",
        // "style": "box",
        // "axisOnTop": true,

        // "showCustomTime":true,
        // "showCurrentTime":true,

        'dataAxis': {
            'left': {
                'range': {
                    'min':0,
                    // 'max':5,
                }
            },
            'right': {
                'range': {
                    'min':0,
                    // 'max':max_right,
                }
            },
            // 'showMinorLabels': false,
        },
        // dataAxis: {visible: false},
        // "min":0,
        'legend': true,
        // 'legend': false,

        // legend.enabled
        'stack': false,

        'start': startTime,
        'end': endTime,
        // 'end': vis.moment(data[Math.floor(data.length/4)].x),
        // 'autoResize': true,
        'showCurrentTime': false,
    };

    $('#vis_stream').html('');
    let countline = new vis.Graph2d(document.getElementById('vis_stream'), vis_data, groups, options);
    // countline.setOptions( { Stack: true } );

    // let countline = new vis.Graph2d(document.getElementById('vis_stream'), vis_data, options);

    // Set custom time marker (blue)
    // countline.setCustomTime(startTime);
    countline.addCustomTime(startTime);
    countline.on('timechange', onCustomTimeChange);
    countline.on('doubleClick', function(e){
    // countline.on('click', function(e){
        if (!playback.isPlaying()) {
            playback.setCursor(e.time.getTime());
        }
    });

    let tooltip = null;
    try{
        $( '#vis_stream' ).tooltip( "destroy" );
    }
    catch(e){}

    // console.log(loc_data);
    function onMousemove (event) {
        var properties = countline.getEventProperties(event);
        // properties contains things like node id, group, x, y, time, etc.
        // console.log('mouseover properties:', properties);
        function digit(d){
            d = '0' + d
            return d.substr(d.length-2,d.length);
        }

        let date = new Date(properties.time);
        let year = date.getFullYear();
        let month = digit(date.getMonth() + 1);
        let day = digit(date.getDate());
        let datestr = year+'-'+month+'-'+day;
        // console.log(datestr);
        // console.log(loc_data[cat]);

        // let content = '<span class="vis_tooltiptext">';
        let content = '<center>'+datestr+'</center>';
        for( cat of loc_cat ){
            content += `
                <b>${cat}</b>:
                ${loc_data[cat][datestr]}
            `;
            content += '<br>';
        }
        for( cat of category ){
            let a = loc_data[cat][datestr];
            let b = loc_data['H.'+cat][datestr] + 1;

            if( b > 0 ){
                content += `
                    <b>${cat}/${'H.'+cat}</b>: ${ Math.round((a/b)*10000)/10000 }
                <br>`;
            }
            // else{
            //     content += `
            //         <b>${cat}/${'H.'+cat}</b>: 0
            //     <br>`;
            // }
        }

        // content += '</span>';
        content += '';
        // console.log(content);

        // console.log( properties.what === "background" || properties.what === "legend" );
        //
        // if( loc_data[cat][datestr] !== undefined && ( properties.what === "background" || properties.what === "legend" ) ){
        //     $( "#vis_stream" ).tooltip( "enable" );
        // }else{
        //     $( "#vis_stream" ).tooltip( "disable" );
        // }

        if( !(properties.what === "custom-time") && !(properties.what === "current-time") ){
            // $( "#vis_stream" ).tooltip( "enable" );
            if( tooltip === null ){
                tooltip = $( '#vis_stream' ).tooltip({
                    track: true,
                    classes: {
                        // "ui-tooltip": ""
                        "ui-tooltip": "ui-corner-all .ui-widget-overlay"
                        // "ui-tooltip": "ui-corner-all .vis_tooltiptext",
                        // "span": ".vis_tooltiptext",
                    },
                });
            }
            if( loc_data[cat][datestr] !== undefined && tooltip !==null ){
                $( '#vis_stream' ).prop('title','');
                $( '#vis_stream' ).tooltip( "option", "content", content );
                $(".ui-tooltip").position({
                    my: "left+3 bottom-3",
                    of: event,
                    collision: "fit"
                });
            }

        }else if( tooltip !== null ){
            try{
                $( '#vis_stream' ).tooltip( "destroy" );
                tooltip = null;
            }catch(e){}
        }



    }
    document.getElementById('vis_stream').addEventListener('mousemove', onMousemove)

    // populateExternalLegend(groups,countline);
    // resize_countline_legend(category);

    $(window).resize(function(){
        countline.setOptions({"width":  $(window).width() - $("#bar_chart").width()})
        countline.redraw();
        //resize_countline_legend
    });

    return countline;
}

function resize_countline_legend(category){
    let left_id_list = [];
    let right_id_list = [];
    category.forEach( x => left_id_list.push( x+'_legendContainer' ) );
    category.forEach( x => right_id_list.push( 'H.'+x+'_legendContainer' ) );
    for( idx of left_id_list ){

    }
}

function populateExternalLegend(groups,graph2d) {
    var groupsData = groups.get();
    var legendDiv = document.getElementById("Legend");
    $('#left_legend').html('');
    $('#right_legend').html('');
    legendDiv.innerHTML = "";

    // get for all groups:
    for (var i = 0; i < groupsData.length; i++) {
        // create divs
        var containerDiv = document.createElement("div");
        var iconDiv = document.createElement("div");
        var descriptionDiv = document.createElement("div");

        // give divs classes and Ids where necessary
        containerDiv.className = 'legend-element-container';
        containerDiv.id = groupsData[i].id + "_legendContainer"
        iconDiv.className = "icon-container";
        descriptionDiv.className = "description-container";

        // get the legend for this group.
        var legend = graph2d.getLegend(groupsData[i].id,30,30);

        // append class to icon. All styling classes from the vis.css/vis-timeline-graph2d.min.css have been copied over into the head here to be able to style the
        // icons with the same classes if they are using the default ones.
        legend.icon.setAttributeNS(null, "class", "legend-icon");

        // append the legend to the corresponding divs
        iconDiv.appendChild(legend.icon);
        descriptionDiv.innerHTML = legend.label;

        // determine the order for left and right orientation
        if (legend.orientation == 'left') {
            descriptionDiv.style.textAlign = "left";
            containerDiv.appendChild(iconDiv);
            containerDiv.appendChild(descriptionDiv);
        }
        else {
            descriptionDiv.style.textAlign = "right";
            containerDiv.appendChild(descriptionDiv);
            containerDiv.appendChild(iconDiv);
        }

          // append to the legend container div
        legendDiv.appendChild(containerDiv);

          // bind click event to this legend element.
        containerDiv.onclick = toggleGraph.bind(this,groupsData[i].id,graph2d,groups);
        console.log( containerDiv );
    }
}

/**
* This function switchs the visible option of the selected group on an off.
* @param groupId
*/
function toggleGraph(groupId,graph2d,groups) {
    // get the container that was clicked on.
    var container = document.getElementById(groupId + "_legendContainer")
    // if visible, hide
    if (graph2d.isGroupVisible(groupId) == true) {
      groups.update({id:groupId, visible:false});
      // container.className = container.className + " hidden";
    }
    else { // if invisible, show
      groups.update({id:groupId, visible:true});
      container.className = container.className.replace("hidden","");
    }
}


