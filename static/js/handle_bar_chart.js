function get_bar_chart(category,category_color,data){
    let count = {};
    category.forEach( x => count[x] = 0 );
    data.forEach( d => count[d.category]++ );
    let max_show_value = Math.max(...Object.values(count));
    console.log(max_show_value);
    let chart = new CanvasJS.Chart("bar_chart", {
        backgroundColor: "#F5FFFA",
        title:{
            text:"Volumn of Disease"
        },
        animationEnabled: true,
        axisX:{
            interval: 1,
            gridThickness: 0,
            labelFontSize: 10,
            labelFontStyle: "normal",
            labelFontWeight: "normal",
            labelFontFamily: "Lucida Sans Unicode",
        },
        axisY2:{
            // interlacedColor: "rgba(1,77,101,.2)",
            gridColor: "rgba(1,77,101,.1)",
            maximum: max_show_value,
        },
    });

    let category_data = {
        type: "bar",
        // name: "companies",
        // axisYType: "secondary",
        // color: "#014D65",
        name: c,
        axisYType: "secondary",
        dataPoints: []
    };
    category.forEach(function(c){
        category_data.dataPoints.push({label: c, y: 0, color:category_color[c]});
    });

    chart.options.data = [category_data];
    return [chart, category_data];
}

function update_bar_chart(chart, category_data, data, cursor_time){
    // cursor_time = new Date(cursor_time);
    let tmp = {};
    for( dp of category_data.dataPoints ){
        dp.y = 0;
        tmp[dp.label] = dp;
    }

    for( d of data ){
        if( d.date_int*1000 > cursor_time ){
            break;
        }
        tmp[d.category].y++;
    }
    // console.log(category_data.dataPoints);
    chart.render();
}
