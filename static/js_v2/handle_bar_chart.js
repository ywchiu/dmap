/*
//CANVAS version
function get_bar_chart(category,category_color,data){
    let count = {};
    category.forEach( x => count[x] = 0 );
    data.forEach( d => count[d.category]++ );
    let max_show_value = Math.max(...Object.values(count));
    // console.log(max_show_value);
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
    chart.render();
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

*/

function get_bar_chart(category,category_color,data){
    let count = {};
    category.forEach( x => count[x] = 0 );
    data.forEach( d => count[d.category]++ );
    let max_show_value = Math.max(...Object.values(count));
    // console.log(max_show_value);

    let category_color_list = [];
    let data_list = [];
    category.forEach( function(x){
        category_color_list.push( category_color[x] );
        data_list.push(0);
    });

    // console.log( category_color_list );

    $('#bar_chart').html('<canvas id="bar_chart_canvas"></canvas>');
    var myChart = new Chart(document.getElementById("bar_chart_canvas"), {
        // type: 'horizontalBar',
        type: 'bar',
        data: {
            labels: category,
            datasets: [{
                label: '# of doc',
                // data: [12, 19, 3, 5, 2, 3],
                data: data_list,
                backgroundColor: category_color_list,
                borderColor: category_color_list,
                borderWidth: 1,
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],
                // borderColor: [
                //     'rgba(255,99,132,1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                // borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: '輿論數量'
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        max: max_show_value,
                    },
                    height: '200px',
                }],
                xAxes: [{
                    // type: 'logarithmic',
                    // position: 'bottom',
                    ticks: {
                        // max: max_show_value,
                        beginAtZero:true,
                    }
                }],

            },
            // hover: {
            //     mode: 'label'
            // },
        }
    });

    return myChart;
}

function update_bar_chart(chart, category, data, cursor_time){
    for( i in category )
        chart.data.datasets[0].data[ i ] = 0;

    for( d of data ){
        if( d.date_int*1000 > cursor_time ){
            break;
        }
        chart.data.datasets[0].data[ category.indexOf(d.category) ]++;
    }
    chart.update();



    // console.log(myChart.data);
    // myChart.data.datasets[0].data[2] = 25; // Would update the first dataset's value of 'March' to be 50
    // myChart.update();
    // console.log(myChart.generateLegend());
}
