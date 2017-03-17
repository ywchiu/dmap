// Ref: https://github.com/hallahan/LeafletPlayback



function get_playback(map,data,category_color,onPlaybackTimeChange,start_time,end_time){
    // Playback options

    // console.log(data);
    var color_array = [];
    data.forEach(function(d){
        if( d.data ){
            color_array.push(category_color[d.data.category]);
        }else{
            color_array.push('darkblue');
        }

    });
    // console.log(color_array);
    var _colorIdx = 0;

    function _assignColor() {
        // console.log(color_array[_colorIdx]);
        return color_array[_colorIdx++];
    }

    var playbackOptions = {
        // 'start': start_time,
        // 'end': end_time,
        // tickLen: 250,
        tickLen: 60*60*24*1000,
        // speed:1,
        fadeMarkersWhenStale: true,

        // playControl: true,
        // dateControl: true,
        // sliderControl: true,

        // staleTime: 10,
        staleTime: 60*60*24*1000*3,
        labels: true,
        popups: true,
        // layer and marker options
        // layer : {
        //     pointToLayer : function(featureData, latlng) {
        //         var result = {};

        //         if (featureData && featureData.properties && featureData.properties.path_options) {
        //             result = featureData.properties.path_options;
        //         }

        //         if (!result.radius){
        //             result.radius = 5;
        //         }

        //         return new L.CircleMarker(latlng, result);
        //     }
        // },

        marker: function(){
            return {
                getPopup: function(featureData) {
                    // var result = '';

                    // if (featureData && featureData.properties && featureData.properties.title) {
                    //     result = featureData.properties.title;
                    // }

                    let d = featureData.data;
                    if(d){
                        // console.log(featureData.data.title);
                        return `<b><a href="${d.url}">[${d.category}]${d.title}</a></b>`;
                    }
                    // console.log("None");
                    // return '<p>None</p>';
                    return '';

                },
                getPopup_content: function(featureData){
                    // let d = featureData.data;
                    // if(d){
                    //     // let content = `<b><a href="${featureData.data.url}">[${d.category}]${d.title}</a></b><p>[${new Date(d.date_int*1000)}][${d.date}]${d.author}</p><p>${d.content}</p>`
                    //     let content = `<b><a href="${featureData.data.url}">[${d.category}]${d.title}</a></b><p>[${d.date}]${d.author}</p><p>${d.content}</p>`
                    //     // console.log(featureData.data.title);
                    //     return content;
                    // }

                    if(featureData.data){
                        // let content = `<b><a href="${featureData.data.url}">[${d.category}]${d.title}</a></b><p>[${new Date(d.date_int*1000)}][${d.date}]${d.author}</p><p>${d.content}</p>`
                        let content = `<b><a href="${featureData.data.url}">[${featureData.data.category}]${featureData.data.title}</a></b><p>[${featureData.data.date}]${featureData.data.author}</p><p>${featureData.data.content}</p>`
                        // console.log(featureData.data.title);
                        return content;
                    }
                    // console.log("None");
                    // return '<p>None</p>';
                    return '';

                },
                bindPopup_option: {
                    maxHeight: 300,
                },
                // Ref: https://github.com/lvoogdt/Leaflet.awesome-markers
                icon: L.AwesomeMarkers.icon({
                    prefix: 'fa',
                    icon: 'bullseye',
                    markerColor: _assignColor()
                    // iconColor: _assignColor()
                })
            }
        }
    };

    // Initialize playback
    // let playback = new L.Playback(map, null, onPlaybackTimeChange, playbackOptions);
    let playback = new L.Playback(map, data, onPlaybackTimeChange, playbackOptions);
    playback.setSpeed(60*60*24*1000/2);
    return playback;
}
