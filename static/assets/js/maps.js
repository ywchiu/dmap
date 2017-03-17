


//var mapStyles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":20},{"color":"#ececec"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"on"},{"color":"#f0f0ef"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#f0f0ef"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#d4d4d4"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ececec"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21},{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#d4d4d4"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#303030"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"saturation":"-100"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"geometry.stroke","stylers":[{"lightness":"-61"},{"gamma":"0.00"},{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#dadada"},{"lightness":17}]}];
//var mapStyles = [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}];
//var mapStyles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dde6e8"},{"visibility":"on"}]}];

var lastClickedMarker;

// Hero Map on Home ----------------------------------------------------------------------------------------------------




function heroMap(_latitude,_longitude, element, markerTarget, sidebarResultTarget, showMarkerLabels, data_option){
    if( document.getElementById(element) != null ){

        // Create google map first -------------------------------------------------------------------------------------
        if( map == null ){
            map = new google.maps.Map(document.getElementById(element), {
                // zoom: 14,
                zoom: 7,
                // scrollwheel: false,
                center: new google.maps.LatLng(_latitude, _longitude),
                // top: 0,
                // left: 0,
                // right: 0,
                // bottom: '220px',
                // bottom: '500px',
                mapTypeId: "roadmap",
                // mapTypeId: google.maps.MapTypeId.SATELLITE,
                styles: [
                    {
                        "featureType":"administrative",
                        "elementType":"labels.text.fill",
                        "stylers":[{
                            "color":"#c6c6c6"
                        }]
                    },{
                        "featureType":"landscape",
                        "elementType":"all",
                        "stylers":[{"color":"#f2f2f2"}]
                    },{
                        "featureType":"poi",
                        "elementType":"all",
                        "stylers":[{"visibility":"off"}]
                    },{
                        "featureType":"road",
                        "elementType":"all",
                        "stylers":[{"saturation":-100},{"lightness":45}]
                    },{
                        "featureType":"road.highway",
                        "elementType":"all",
                        "stylers":[{"visibility":"simplified"}]
                    },{
                        "featureType":"road.highway",
                        "elementType":"geometry.fill",
                        "stylers":[{"color":"#ffffff"}]
                    },{
                        "featureType":"road.arterial",
                        "elementType":"labels.icon",
                        "stylers":[{"visibility":"off"}]
                    },{
                        "featureType":"transit",
                        "elementType":"all",
                        "stylers":[{"visibility":"off"}]
                    },{
                        "featureType":"water",
                        "elementType":"all",
                        "stylers":[{"color":"#dde6e8"},{"visibility":"on"}]
                    }]
            });
        }

        // Load necessary data for markers using PHP (from database) after map is loaded and ready ---------------------
        function ajax_data(){
            $("#overlay").show();

            // =================================================================
            // Set progress
            // ref
            //    http://progressbarjs.readthedocs.io/en/latest/api/parameters/
            //    https://jsfiddle.net/kimmobrunfeldt/72tkyn40/
            function center_pg(){
                $("#pg").css( "left", $(window).width()/2  - $("#pg").width()/2 );
                $("#pg").css( "top",  $(window).height()/2 - $("#pg").height()/2 );
            }
            center_pg();
            window.onresize = function(){
                center_pg();
            }
            var bar = new ProgressBar.Circle('#pg', {
              color: '#20B2AA',
              // This has to be the same size as the maximum width to
              // prevent clipping
              strokeWidth: 4,
              trailWidth: 2,
              easing: 'easeInOut',
              duration: 1400,
              text: {
                autoStyleContainer: false
              },
              from: { color: '#8FBC8F', width: 4 },
              to: { color: '#20B2AA', width: 4 },
              // Set default step function for all animate calls
              step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                  circle.setText('');
                } else {
                  circle.setText(value);
                }

              }
            });
            bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
            bar.text.style.fontSize = '4rem';
            bar.set(0.0);
            // =================================================================

            $.ajax({
                // url: "assets/external/data.php",
                // url: "http://54.201.237.10/all_data2/",
                // url: "/all_data2/",
                url: "/all_light_data2/",
                data: {
                    category: JSON.stringify(data_option.category),
                    start_time: data_option.start_time,
                    end_time: data_option.end_time,
                },
                // dataType: "json",
                dataType: "html",
                // contentType: "json",
                // method: "POST",
                method: "GET",
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();

                   //  // Upload progress
                   //  xhr.upload.addEventListener("progress", function(evt){
                   //      if (evt.lengthComputable) {
                   //          var percentComplete = evt.loaded / evt.total;
                   //          //Do something with upload progress
                   //          console.log(percentComplete);
                   //      }
                   // }, false);

                   // Download progress
                    xhr.addEventListener("progress", function(evt){
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            // Do something with download progress
                            // console.log(evt.loaded,evt.total,percentComplete);
                            bar.set( percentComplete );
                            if( percentComplete == 1 ){
                                bar.destroy();
                            }
                        }
                    }, false);

                    return xhr;
                },
                success: function(response){

                    // console.log( response.substr(57342,57342+100) );
                    // console.log( response.substr(57342-100,57342+100) );
                    // console.log( response.substr(57342-150,57342+100) );
                    response = $.parseJSON(response);

                    // console.log(response);
                    let markers = response.response_data;
                    g0v_heatmap_data = response.heatmap_data;
                    all_data_length = markers.length;
                    for( i in markers ){
                        markers[i]['id'] = parseInt(i);
                    }
                    for( i in g0v_heatmap_data ){
                        g0v_heatmap_data[i]['id'] = parseInt(i);
                        g0v_heatmap_data[i]['position'] = new google.maps.LatLng( g0v_heatmap_data[i]["latitude"], g0v_heatmap_data[i]["longitude"] );
                        g0v_heatmap_data[i]['tm'] = new Date(g0v_heatmap_data[i]['date']).getTime()/1000;
                    }
                    $("#overlay").hide();

                    if( markers.length > 0 ){
                        console.log(markers);
                        console.log(g0v_heatmap_data);
                        all_data = markers;
                        // console.log(data_option);
                        // console.log(all_data);
                        init(all_data,g0v_heatmap_data,map,data_option.start_time,data_option.end_time);
                        placeMarkers(markers,g0v_heatmap_data);
                    }else{
                        alert("Sorry, no data match query");
                    }
                    refresh_all = function(){
                        // console.log( "refresh_all" );
                        let cursor = playback.getTime();
                        for( i in markers ){
                            markers[i]['id'] = parseInt(i);
                        }
                        init(all_data,g0v_heatmap_data,map,data_option.start_time,data_option.end_time);
                        placeMarkers(markers,g0v_heatmap_data);
                        playback.setCursor(cursor);
                    }

                },
                error : function (jqXHR,exception) {
                // error : function (e) {
                    // console.log(e);
                    // console.log(e.error());

                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    console.log(msg);
                }
            });
        }
        ajax_data();
        // google.maps.event.addListenerOnce(map, 'idle', function(){
        //     ajax_data();
        // });

        if( showMarkerLabels == true ){
            $(".hero-section .map").addClass("show-marker-labels");
        }

        // Create and place markers function ---------------------------------------------------------------------------

        var i;
        var a;

        function placeMarkers(markers,g0v_heatmap_data){
            if( newMarkers.length > 0 ){
                for (var i = 0; i < newMarkers.length; i++) {
                    newMarkers[i].setVisible(false);
                }
                delete newMarkers;
            }
            newMarkers = [];
            for (i = 0; i < markers.length; i++) {

                var marker;
                var markerContent = document.createElement('div');
                var thumbnailImage;

                // if( markers[i]["gallery"] != undefined ){
                //     thumbnailImage = markers[i]["gallery"][0];
                // }
                // else {
                //     thumbnailImage = "/static/assets/img/items/default.png";
                // }

                thumbnailImage = "/static/assets/img/items/default.png";
                if( markers[i]["category"] != undefined ){
                    let idx = category_list.indexOf( markers[i]["category"] );
                    thumbnailImage = "/static/icon/" + icon_list[idx];
                    // for(i in category_list){
                    //     // if( markers[i]["category"].includes(category_list[i]) ){
                    //     if( markers[i]["category"] === category_list[i] ){
                    //         thumbnailImage = "/static/icon/" + icon_list[i];
                    //         break;
                    //     }
                    // }
                }
                // thumbnailImage = "/static/icon/" + icon_list[0];

                if( markers[i]["featured"] == 1 ){
                    markerContent.innerHTML =
                    '<div class="marker animated fadeInDown" data-id="'+ markers[i]["id"] +'">' +
                        '<div class="title">'+ markers[i]["title"] +'</div>' +
                        '<div class="marker-wrapper">' +
                            '<div class="tag"><i class="fa fa-check"></i></div>' +
                            '<div class="pin">' +
                                '<div class="image" style="background-image: url('+ thumbnailImage +');"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                }
                else {
                    markerContent.innerHTML =
                        '<div class="marker animated fadeInDown" data-id="'+ markers[i]["id"] +'">' +
                            '<div class="title">'+ markers[i]["title"] +'</div>' +
                            '<div class="marker-wrapper">' +
                                '<div class="pin">' +
                                '<div class="image" style="background-image: url('+ thumbnailImage +');"></div>' +
                            '</div>' +
                        '</div>';
                }

                // Latitude, Longitude and Address

                if ( markers[i]["latitude"] && markers[i]["longitude"] && markers[i]["address"] ){
                    renderRichMarker(i,"latitudeLongitude");
                }

                // Only Address

                else if ( markers[i]["address"] && markers[i]["latitude"] == undefined && markers[i]["longitude"] == undefined ){
                    renderRichMarker(i,"address");
                }

                // Only Latitude and Longitude

                else if ( markers[i]["latitude"] && markers[i]["longitude"] && markers[i]["address"] == undefined ) {
                    renderRichMarker(i,"latitudeLongitude");
                }

                // No coordinates

                else {
                    console.log( "No location coordinates");
                }

            }

            // Create marker using RichMarker plugin -------------------------------------------------------------------

            function renderRichMarker(i,method){
                if( method == "latitudeLongitude" ){
                    //console.log( map.getBounds().contains( new google.maps.LatLng( markers[i]["latitude"], markers[i]["longitude"] ) ) );
                    marker = new RichMarker({
                        position: new google.maps.LatLng( markers[i]["latitude"], markers[i]["longitude"] ),
                        map: map,
                        draggable: false,
                        content: markerContent,
                        flat: true,
                        visible: false,
                    });
                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            if( markerTarget == "sidebar"){
                                openSidebarDetail( $(this.content.firstChild).attr("data-id") );
                            }
                            else if( markerTarget == "infobox" ){
                                openInfobox( $(this.content.firstChild).attr("data-id"), this, i );
                            }
                            else if( markerTarget == "modal" ){
                                openModal($(this.content.firstChild).attr("data-id"), "modal_item.php");
                            }
                        }
                    })(marker, i));
                    newMarkers.push(marker);
                }
                else if ( method == "address" ){
                    a = i;
                    var geocoder = new google.maps.Geocoder();
                    var geoOptions = {
                        address: markers[i]["address"]
                    };
                    geocoder.geocode(geoOptions, geocodeCallback(markerContent));
                }

            }

            // Ajax loading of infobox -------------------------------------------------------------------------------------

            var lastInfobox;

            function openInfobox(id, _this, i){
                $.ajax({
                    url: "assets/external/infobox.php",
                    dataType: "html",
                    data: { id: id },
                    method: "POST",
                    success: function(results){
                        infoboxOptions = {
                            content: results,
                            disableAutoPan: false,
                            pixelOffset: new google.maps.Size(-135, -50),
                            zIndex: null,
                            alignBottom: true,
                            boxClass: "infobox-wrapper",
                            enableEventPropagation: true,
                            closeBoxMargin: "0px 0px -8px 0px",
                            closeBoxURL: "/static/assets/img/close-btn.png",
                            infoBoxClearance: new google.maps.Size(1, 1)
                        };

                        if( lastInfobox != undefined ){
                            lastInfobox.close();
                        }

                        newMarkers[i].infobox = new InfoBox(infoboxOptions);
                        newMarkers[i].infobox.open(map, _this);
                        lastInfobox = newMarkers[i].infobox;

                        setTimeout(function(){
                            //$("div#"+ id +".item.infobox").parent().addClass("show");
                            $(".item.infobox[data-id="+ id +"]").parent().addClass("show");
                        }, 10);

                        google.maps.event.addListener(newMarkers[i].infobox,'closeclick',function(){
                            $(lastClickedMarker).removeClass("active");
                        });
                    },
                    error : function () {
                        console.log("error");
                    }
                });
            }

            // Geocoder callback ---------------------------------------------------------------------------------------

            function geocodeCallback(markerContent) {
                return function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        marker = new RichMarker({
                            position: results[0].geometry.location,
                            map: map,
                            draggable: false,
                            content: markerContent,
                            flat: true,
                        });
                        newMarkers.push(marker);
                        renderResults();
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                if( markerTarget == "sidebar"){
                                    openSidebarDetail( $(this.content.firstChild).attr("data-id") );
                                }
                                else if( markerTarget == "infobox" ){
                                    openInfobox( $(this.content.firstChild).attr("data-id"), this, 0 );
                                }
                                else if( markerTarget == "modal" ){
                                    openModal($(this.content.firstChild).attr("data-id"), "modal_item.php");
                                }

                            }
                        })(marker, i));
                    } else {
                        console.log("Geocode failed " + status);
                    }
                }
            }

            function openSidebarDetail(id){
                $.ajax({
                    url: "assets/external/sidebar_detail.php",
                    data: { id: id },
                    method: "POST",
                    success: function(results){
                        $(".sidebar-wrapper").html(results);
                        $(".results-wrapper").removeClass("loading");
                        initializeOwl();
                        ratingPassive(".sidebar-wrapper .sidebar-content");
                        initializeFitVids();
                        socialShare();
                        $(".sidebar-content .gallery").on("refresh.owl.carousel", function() {
                            $(this).addClass("show");
                        });
                        $(".sidebar-wrapper .back").on("click", function(){
                            $(".results-wrapper").removeClass("show-detail");
                            $(lastClickedMarker).removeClass("active");
                        });
                        $(document).keyup(function(e) {
                            switch(e.which) {
                                case 27: // ESC
                                    $(".sidebar-wrapper .back").trigger('click');
                                    break;
                            }
                        });
                        $(".results-wrapper").addClass("show-detail");
                    },
                    error : function (e) {
                        console.log("error " + e);
                    }
                });
            }

            // Highlight result in sidebar on marker hover -------------------------------------------------------------

            $(".marker").live("mouseenter", function(){
                var id = $(this).attr("data-id");
                $(".results-wrapper .results-content .result-item[data-id="+ id +"] a" ).addClass("hover-state");
            }).live("mouseleave", function(){
                var id = $(this).attr("data-id");
                    $(".results-wrapper .results-content .result-item[data-id="+ id +"] a" ).removeClass("hover-state");
            });

            $(".marker").live("click", function(){
                var id = $(this).attr("data-id");
                $(lastClickedMarker).removeClass("active");
                $(this).addClass("active");
                lastClickedMarker = $(this);
            });

            // Marker clusters -----------------------------------------------------------------------------------------

            // var clusterStyles = [
            //     {
            //         url: '/static/assets/img/cluster.png',
            //         height: 36,
            //         width: 36
            //     }
            // ];
            // for (var i = 0; i < newMarkers.length; i++) {
            //     newMarkers[i].setVisible(false);
            // }
            // var markerCluster = new MarkerClusterer(map, newMarkers, {styles: clusterStyles, maxZoom: 14});
            let styles = [];
            for( i=0;i<5;i++ ){
                styles.push({
                    url: '/static/assets/img/cluster.png',
                    height: 36,
                    width: 36,
                });
            }
            if( markerCluster != null ){
                markerCluster.setMap(null);
                delete markerCluster;
            }
            markerCluster = new MarkerClusterer(map, newMarkers,{
                gridSize: 50,
                minimumClusterSize: 5,
                maxZoom: 14,
                styles:styles,
                cssClass: 'animated fadeInDown',
            });
            // console.log( markerCluster.getStyles() );



            // Heatmap -----------------------------------------------------------------------------------------
            if( heatmap == null ){
                let intensity_list = [];
                g0v_heatmap_data.forEach( x => intensity_list.push(x.frequency) );
                let max_intensity = Math.max( ...intensity_list );
                heatmap = new google.maps.visualization.HeatmapLayer({
                    // data:heatmap_data,
                    "map": map,
                    "maxIntensity": max_intensity,
                });
                console.log(heatmap.get('gradient'));
            }
            // =================================================================


            var heatmap_refresh_time = null;
            renderResults();
            // Show results in sidebar after map is moved --------------------------------------------------------------
            if( map_listener != null ){
                google.maps.event.removeListener(map_listener);
            }
            map_listener = google.maps.event.addListener(map, 'idle', function() {
                renderResults();
            });
            playback.addCallback(renderResults);

            // Results in the sidebar ----------------------------------------------------------------------------------

            function renderResults(){
                // =============================================================
                // handle marker cluster
                var resultsArray = [];
                var visibleMarkersId = [];
                var invisibleMarkersId = [];
                var visibleMarkersOnMap = [];
                for (var i = 0; i < newMarkers.length; i++) {
                    // if ( map.getBounds().contains(newMarkers[i].getPosition()) ){
                    // let idx = $(newMarkers[i].content.firstChild).attr("data-id");
                    // console.log( idx );
                    // console.log( markers );
                    // console.log( markers[idx] );
                    let idx = i;
                    if ( map.getBounds().contains(newMarkers[i].getPosition()) && playback.retain( markers[idx]['tm']*1000 ) ){
                    // if (  in_display_range(idx) ){
                        visibleMarkersOnMap.push(newMarkers[i]);
                        visibleMarkersId.push( idx );
                        newMarkers[i].setVisible(true);
                        // markerCluster.repaint();
                        // console.log( i, 'is visible' );
                    } else {
                        invisibleMarkersId.push( idx );
                        newMarkers[i].setVisible(false);
                        // console.log( i, 'is INvisible' );
                    }
                }

                let invisibleMarkers = [];
                let visibleMarkers = [];
                if( invisibleMarkersId.length > 0 ){
                    invisibleMarkersId.forEach(function(idx){
                        invisibleMarkers.push( newMarkers[idx] );
                    });
                    markerCluster.removeMarkers(invisibleMarkers,true);
                }

                if( visibleMarkersId.length > 0 ){
                    visibleMarkersId.forEach(function(idx){
                        visibleMarkers.push( newMarkers[idx] );
                    });
                    markerCluster.addMarkers(visibleMarkers,true);
                }
                markerCluster.repaint();
                // =============================================================
                // ADD animation of marker cluster

                // console.log( $('.cluster').addClass('animated fadeInDown') );
                // =============================================================
                // handle heatmap

                if( heatmap_refresh_time != playback.getTime() ){
                    heatmap_refresh_time = playback.getTime();
                    let visibleg0vId = [];
                    for (var i = 0; i < g0v_heatmap_data.length; i++) {
                        let idx = i;
                        // if ( map.getBounds().contains(g0v_heatmap_data[idx].position) && playback.retain( g0v_heatmap_data[idx]['tm']*1000 ) ){
                        if ( playback.retain( g0v_heatmap_data[idx]['tm']*1000 ) ){
                        // if ( map.getBounds().contains(g0v_heatmap_data[idx].position) ){
                            visibleg0vId.push( idx );
                        }
                        let t = playback._cursor - g0v_heatmap_data[idx]['tm']*1000;
                    }

                    let heatmap_data = [];
                    visibleg0vId.forEach(function(idx){
                        heatmap_data.push({
                            'location':g0v_heatmap_data[idx].position,
                            'weight':  g0v_heatmap_data[idx].frequency
                        });
                    });
                    // console.log(heatmap_data.length);
                    // console.log(heatmap_data);

                    let animate_heatmap = true;
                    if( animate_heatmap == true && heatmap_data.length > 0 ){
                        let radius = 30 - map.zoom;
                        let times = 1;
                        let iter_times = 5;
                        if( playback.getTime() == playback.getStartTime() ){
                            times = iter_times;
                            heatmap.setData( heatmap_data );
                            var appear_interval = setInterval(function(){
                                appear();
                            }, 50);
                            function appear(){
                                heatmap.set('radius',radius + 0.4*times);
                                heatmap.set('opacity',1-0.15*times);
                                times --;
                                if( times == 0 ){
                                    clearInterval(appear_interval);
                                    heatmap.set('radius',radius);
                                    heatmap.set('opacity',1);
                                }
                            }
                        }else{
                            var disappear_interval = setInterval(function(){
                                disappear();
                            }, 50);
                            function disappear(){
                                heatmap.set('radius',radius + 0.4*times);
                                heatmap.set('opacity',1-0.15*times);
                                times ++;
                                if( times == iter_times ){
                                    clearInterval(disappear_interval);
                                    heatmap.setData( heatmap_data );

                                    var appear_interval = setInterval(function(){
                                        appear();
                                    }, 50);
                                    function appear(){
                                        heatmap.set('radius',radius + 0.4*times);
                                        heatmap.set('opacity',1-0.15*times);
                                        times --;
                                        if( times == 0 ){
                                            clearInterval(appear_interval);
                                            heatmap.set('radius',radius);
                                            heatmap.set('opacity',1);
                                        }
                                    }

                                }
                            }
                        }
                    }else{
                        heatmap.setData( heatmap_data );
                    }



                    // console.log( map.zoom );

                    // heatmap.set('radius', 10);
                    // console.log(map);
                    // heatmap.setMap(map);
                }
                heatmap.set('radius', 30 - map.zoom);
                // =============================================================


                // Ajax load data for sidebar results after markers are placed
                /*
                $.ajax({
                    url: "assets/external/sidebar_results.php",
                    method: "POST",
                    data: { markers: visibleMarkersId },
                    success: function(results){
                        results = sidebar_results_to_html(markers,visibleMarkersId)
                        resultsArray.push(results); // push the results from php into array
                        $(".results-wrapper .results-content").html(results); // render the new php data into html element
                        $(".results-wrapper .section-title h2 .results-number").html(visibleMarkersId.length); // show the number of results
                        ratingPassive(".results-wrapper .results"); // render rating stars

                        // Hover on the result in sidebar will highlight the marker

                        $(".result-item").on("mouseenter", function(){
                            $(".map .marker[data-id="+ $(this).attr("data-id") +"]").addClass("hover-state");
                        }).on("mouseleave", function(){
                                $(".map .marker[data-id="+ $(this).attr("data-id") +"]").removeClass("hover-state");
                        });

                        trackpadScroll("recalculate");

                        // Show detailed information in sidebar

                        $(".result-item").children("a").on("click", function(e){
                            if( sidebarResultTarget == "sidebar" ){
                                e.preventDefault();
                                openSidebarDetail( $(this).parent().attr("data-id") );
                            }
                            else if( sidebarResultTarget == "modal" ){
                                e.preventDefault();
                                openModal( $(this).parent().attr("data-id"), "modal_item.php" );
                            }

                            $(lastClickedMarker).removeClass("active");

                            $(".map .marker[data-id="+ $(this).parent().attr("data-id") +"]").addClass("active");
                            lastClickedMarker = $(".map .marker[data-id="+ $(this).parent().attr("data-id") +"]");
                        });

                    },
                    error : function (e) {
                        console.log(e);
                    }
                });
                */
                let results = sidebar_results_to_html(markers,visibleMarkersId)
                resultsArray.push(results); // push the results from php into array
                $(".results-wrapper .results-content").html(results); // render the new php data into html element
                $(".results-wrapper .section-title h2 .results-number").html(visibleMarkersId.length); // show the number of results
                ratingPassive(".results-wrapper .results"); // render rating stars

                // Hover on the result in sidebar will highlight the marker

                $(".result-item").on("mouseenter", function(){
                    $(".map .marker[data-id="+ $(this).attr("data-id") +"]").addClass("hover-state");
                }).on("mouseleave", function(){
                        $(".map .marker[data-id="+ $(this).attr("data-id") +"]").removeClass("hover-state");
                });

                trackpadScroll("recalculate");

                // Show detailed information in sidebar

                $(".result-item").children("a").on("click", function(e){
                    if( sidebarResultTarget == "sidebar" ){
                        e.preventDefault();
                        openSidebarDetail( $(this).parent().attr("data-id") );
                    }
                    else if( sidebarResultTarget == "modal" ){
                        e.preventDefault();
                        openModal( $(this).parent().attr("data-id"), "modal_item.php" );
                    }

                    $(lastClickedMarker).removeClass("active");

                    $(".map .marker[data-id="+ $(this).parent().attr("data-id") +"]").addClass("active");
                    lastClickedMarker = $(".map .marker[data-id="+ $(this).parent().attr("data-id") +"]");
                });

            }

        }

        // Geo Location ------------------------------------------------------------------------------------------------

        function success(position) {
            var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.panTo(center);
            $('#map').removeClass('fade-map');
        }

        // Geo Location on button click --------------------------------------------------------------------------------

        $('.geo-location').on("click", function() {
            if (navigator.geolocation) {
                $('#map').addClass('fade-map');
                navigator.geolocation.getCurrentPosition(success);
            } else {
                error('Geo Location is not supported');
            }
        });

        // Autocomplete

        // autoComplete(map);
    }
    else {
        console.log("No map element");
    }
}



// Simple map ----------------------------------------------------------------------------------------------------------

function simpleMap(_latitude,_longitude, element, markerDrag, place){

    if (!markerDrag){
        markerDrag = false;
    }
    var mapCenter, geocoder, geoOptions;

    if( place ){
        geocoder = new google.maps.Geocoder();
        geoOptions = {
            address: place
        };
        geocoder.geocode(geoOptions, getCenterFromAddress());
        function getCenterFromAddress() {
            return function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    mapCenter = new google.maps.LatLng( results[0].geometry.location.lat(), results[0].geometry.location.lng() );
                    drawMap(mapCenter);
                } else {
                    console.log("Geocode failed");
                    console.log(status);
                }
            };
        }
    }
    else {
        mapCenter = new google.maps.LatLng(_latitude,_longitude);
        drawMap(mapCenter);
    }

    function drawMap(mapCenter){
        var mapOptions = {
            zoom: 14,
            center: mapCenter,
            disableDefaultUI: true,
            scrollwheel: true,
            styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":20},{"color":"#ececec"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"on"},{"color":"#f0f0ef"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#f0f0ef"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#d4d4d4"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ececec"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21},{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#d4d4d4"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#303030"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"saturation":"-100"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"geometry.stroke","stylers":[{"lightness":"-61"},{"gamma":"0.00"},{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#dadada"},{"lightness":17}]}]
        };
        var mapElement = document.getElementById(element);
        var map = new google.maps.Map(mapElement, mapOptions);
        var marker = new RichMarker({
            position: mapCenter,
            map: map,
            draggable: markerDrag,
            content: "<img src='/static/assets/img/marker.png'>",
            flat: true
        });
        google.maps.event.addListener(marker, "dragend", function () {
            var latitude = this.position.lat();
            var longitude = this.position.lng();
            $('#latitude').val( this.position.lat() );
            $('#longitude').val( this.position.lng() );
        });
        autoComplete(map, marker);
    }

}

//Autocomplete ---------------------------------------------------------------------------------------------------------

function autoComplete(map, marker){
    if( $("#address-autocomplete").length ){
        if( !map ){
            map = new google.maps.Map(document.getElementById("address-autocomplete"));
        }
        var input = document.getElementById('address-autocomplete');
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            if( marker ){
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                $('#latitude').val( marker.getPosition().lat() );
                $('#longitude').val( marker.getPosition().lng() );
            }
            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
        });


        function success(position) {
            map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            //initSubmitMap(position.coords.latitude, position.coords.longitude);
            $('#latitude').val( position.coords.latitude );
            $('#longitude').val( position.coords.longitude );
        }

        $('.geo-location').on("click", function() {
            if (navigator.geolocation) {
                $('#'+element).addClass('fade-map');
                navigator.geolocation.getCurrentPosition(success);
            } else {
                console.log('Geo Location is not supported');
            }
        });
    }
}
