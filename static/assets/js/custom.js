////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var resizeId;
var lastModal;
$(document).ready(function($) {
    "use strict";


    let select_category_option = '';
    // console.log( data_option.category );
    for( i in category_list ){
        // console.log(category_list[i]);
        // console.log( $.inArray(category_list[i], data_option.category) > -1 );
        if( $.inArray(category_list[i], data_option.category) > -1 ){
            select_category_option += `<option value="${category_list[i]}" selected="selected">${category_list[i]}</option>`
        }else{
            select_category_option += `<option value="${category_list[i]}">${category_list[i]}</option>`
        }
    }
    // console.log( select_category_option );
    $("#select_category").html(select_category_option);
    // for (i in data_option.category) {
    //     $('#select_category').select('select', data_option.category[i]);
    // }
    let d = null;
    if(data_option.start_time){
        d = new Date(data_option.start_time);
        $('input[name="start_time"]').val( (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear() );
    }
    if(data_option.end_time){
        d = new Date(data_option.end_time);
        $('input[name="end_time"]').val( (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear() );
    }

    $('form').submit(function (event) {
        event.preventDefault();
        // console.log( $(this) );
        // console.log( $(this).attr('class') );
        let start_time = undefined;
        let end_time = undefined;
        // console.log( $('input[name="start_time"]').val().length );
        if( $('input[name="start_time"]').val().length > 0 ){
            start_time = $('input[name="start_time"]').datepicker('getDate').getTime();
        }
        if( $('input[name="end_time"]').val().length > 0 ){
            end_time = $('input[name="end_time"]').datepicker('getDate').getTime();
        }
        // console.log(start_time);

        data_option = {
            category: $('#select_category').val(),
            start_time: start_time,
            end_time: end_time,
        }
        heroMap(_latitude,_longitude, element, markerTarget, sidebarResultTarget, showMarkerLabels, data_option);
        // alert('SUBMIT');
    });

    $('button[type="s"]').click(function(event){
        event.preventDefault();
        // // $('#jsGrid_wrapper').show();
        // // $("#jsGrid").jsGrid("refresh");
        // $('#jsGrid').trigger('resize');
        // console.log('hiiiiiiii');
        // // console.log( $('#jsGrid').trigger('resize') );
        // let w = $(window).width();
        // console.log(w);
        // // $(window).width(w);


        // window.resizeTo(1280,1024);

        // console.log( $(window).width() );
    });


    if( $(".tse-scrollable").length ){
        $(".tse-scrollable").TrackpadScrollEmulator();
    }

    if( $(".date-picker").length ){
        $(".date-picker").datepicker();
    }

    // console.log($(window).height());
    // console.log($("#page-header").height());
    // console.log($("#vis_stream").height());


    if( viewport.is('xs') ){
        $(".map-wrapper").height( $(window).height() - $("#page-header").height() - $("#vis_stream").height() );
        $(".has-background").height( $(window).height() - $("#page-header").height() - $("#vis_stream").height() );
    }
    else {
        $(".hero-section.full-screen").height( $(window).height() - $("#page-header").height() - $("#vis_stream").height() );
        // console.log( $(".hero-section.full-screen").height() );
    }

//  Social Share -------------------------------------------------------------------------------------------------------

    if( $(".social-share").length ){
        socialShare();
    }

//  Count down  --------------------------------------------------------------------------------------------------------

    if( $(".count-down").length ){
        /*

        REMOVE THIS COMMENT IN YOUR PROJECT

        var year = parseInt( $(".count-down").attr("data-countdown-year"), 10 );
        var month = parseInt( $(".count-down").attr("data-countdown-month"), 10 ) - 1;
        var day = parseInt( $(".count-down").attr("data-countdown-day"), 10 );
         $(".count-down").countdown( {until: new Date(year, month, day), padZeroes: true, format: 'HMS'} );
        */
        var date = new Date();
        $(".count-down").countdown( {until: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2 ), padZeroes: true, format: 'HMS'} );
    }

// Render hero search form ---------------------------------------------------------------------------------------------
    if( $(".hero-section .form").find("select").length ){
        $(".search-form select").on("rendered.bs.select", function () {
            $(".search-form").addClass("show");
            if( !viewport.is('xs') ){
                $(".search-form.vertical").css( "top", ($(".hero-section").height()/2) - ($(".search-form .wrapper").height()/2) );
            }
            trackpadScroll("initialize");
        });
    }
    else {
        $(".search-form").addClass("show");
        if( !viewport.is('xs') ){
            $(".search-form.vertical").css( "top", ($(".hero-section").height()/2) - ($(".search-form .wrapper").height()/2) );
        }
        trackpadScroll("initialize");
    }

//  iCheck -------------------------------------------------------------------------------------------------------------

    if ($("input[type=checkbox]").length > 0) {
        $("input").iCheck();
    }

    if ($("input[type=radio]").length > 0) {
        $("input").iCheck();
    }

//  Smooth Scroll ------------------------------------------------------------------------------------------------------

    $('.main-nav a[href^="#"], a[href^="#"].scroll').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 2000, 'swing', function () {
            window.location.hash = target;
        });
    });

//  Modal after click --------------------------------------------------------------------------------------------------

    $("[data-modal-external-file], .quick-detail").live("click", function(e){
        e.preventDefault();
        var modalTarget, modalFile;
        if( $(this).closest(".item").attr("data-id") ){
            modalTarget = $(this).closest(".item").attr("data-id");
            modalFile = "modal_item.php";
        }
        else {
            modalTarget = $(this).attr("data-target");
            modalFile = $(this).attr("data-modal-external-file");
        }
        if( $(this).attr("data-close-modal") == "true" ){
            lastModal.modal("hide");
            setTimeout(function() {
                openModal(modalTarget, modalFile);
            }, 400);
        }
        else {
            openModal(modalTarget, modalFile);
        }
    });

//  Multiple modal hack ------------------------------------------------------------------------------------------------

    $(document).on('show.bs.modal', '.modal', function () {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

//  Map in Row listing -------------------------------------------------------------------------------------------------

    $(".item.item-row").each(function() {
        var element = "map"+$(this).attr("data-id");
        var place;
        $(this).find(".map").attr("id", element );
        var _latitude = $(this).attr("data-latitude");
        var _longitude = $(this).attr("data-longitude");
        if( $(this).attr("data-address") ){
            place = $(this).attr("data-address");
        }
        else {
            place = false;
        }
        simpleMap(_latitude,_longitude, element, false, place);
    });

//  Close "More" menu on click anywhere on page ------------------------------------------------------------------------

    $(document).on("click", function(e){
        if( e.target.className == "controls-more" ){
            $(".controls-more.show").removeClass("show");
            $(e.target).addClass("show");

        }
        else {
            $(".controls-more.show").each(function() {
                $(this).removeClass("show");
            });
        }
    });

// Mobile navigation button --------------------------------------------------------------------------------------------

    $(".nav-btn").on("click", function(){
        $(this).toggleClass("active");
        $(".primary-nav").toggleClass("show");
    });

//  Duplicate desired element ------------------------------------------------------------------------------------------

    $(".duplicate").live("click", function(e){
        e.preventDefault();
        var duplicateElement = $(this).attr("href");
        var parentElement = $(duplicateElement)[0].parentElement;
        $(parentElement).append( $(duplicateElement)[0].outerHTML );
    });

//  Enable image previews in multi file input --------------------------------------------------------------------------

    if( $("input[type=file].with-preview").length ){
        $("input.file-upload-input").MultiFile({
            list: ".file-upload-previews"
        });
    }

//  No UI Slider -------------------------------------------------------------------------------------------------------

    if( $('.ui-slider').length > 0 ){
        $('.ui-slider').each(function() {
            var step;
            if( $(this).attr('data-step') ) {
                step = parseInt( $(this).attr('data-step') );
            }
            else {
                step = 10;
            }
            var sliderElement = $(this).attr('id');
            var element = $( '#' + sliderElement);
            var valueMin = parseInt( $(this).attr('data-value-min') );
            var valueMax = parseInt( $(this).attr('data-value-max') );
            $(this).noUiSlider({
                start: [ valueMin, valueMax ],
                connect: true,
                range: {
                    'min': valueMin,
                    'max': valueMax
                },
                step: step
            });
            if( $(this).attr('data-value-type') == 'price' ) {
                if( $(this).attr('data-currency-placement') == 'before' ) {
                    $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ prefix: $(this).attr('data-currency'), decimals: 0, thousand: '.' }));
                    $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ prefix: $(this).attr('data-currency'), decimals: 0, thousand: '.' }));
                }
                else if( $(this).attr('data-currency-placement') == 'after' ){
                    $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ postfix: $(this).attr('data-currency'), decimals: 0, thousand: ' ' }));
                    $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ postfix: $(this).attr('data-currency'), decimals: 0, thousand: ' ' }));
                }
            }
            else {
                $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ decimals: 0 }));
                $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ decimals: 0 }));
            }
        });
    }

//  Calendar

    if( $(".calendar").length ){
        var date = new Date();
        var month = date.getMonth();
        for( var i = 1 ; i<=12 ; i++ ){
            $('.calendar-wrapper').append('<div id="month_'+i+'" class="month"></div>');
            $("#month_"+i).zabuto_calendar({
                ajax: {
                    url: "/static/assets/php/calendar.php",
                    modal: true
                },
                action: function () {
                    var date = $("#" + this.id).data("date");
                    $("#modal-date").val(date);
                    return checkDate(this.id);
                },
                language: "en",
                month: i,
                show_previous: false,
                show_next: false,
                today: true,
                nav_icon: {
                    prev: '<i class="arrow_left"></i>',
                    next: '<i class="arrow_right"></i>'
                }
            });
        }
        $(".calendar-wrapper").owlCarousel({
            items: 2,
            nav: true,
            autoHeight: true,
            navText: [],
            startPosition: month
        });
    }

//  Form Validation

    $(".form-email .btn[type='submit']").on("click", function(){
        var button = $(this);
        var form = $(this).closest("form");
        button.prepend("<div class='status'></div>");
        form.validate({
            submitHandler: function() {
                $.post("/static/assets/external/email.php", form.serialize(),  function(response) {
                    //console.log(response);
                    //$('#form-subscribe .form-contact-status').html(response);
                    button.find(".status").append(response);
                    form.addClass("submitted");
                });
                return false;
            }
        });
    });

    equalHeight(".container");
    ratingPassive("body");
    bgTransfer();
    responsiveNavigation();

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function(){
    initializeOwl();
});

$(window).resize(function(){
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);
    responsiveNavigation();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function openModal(target, modalPath){

    $("body").append('<div class="modal modal-external fade" id="'+ target +'" tabindex="-1" role="dialog" aria-labelledby="'+ target +'"><i class="loading-icon fa fa-circle-o-notch fa-spin"></i></div>');

    $("#" + target + ".modal").on("show.bs.modal", function () {
        var _this = $(this);
        lastModal = _this;
        /*
        $.ajax({
            url: "assets/external/" + modalPath,
            method: "POST",
            //dataType: "html",
            data: { id: target },
            success: function(results){
                _this.append(modal_to_html(results));
                $(".selectpicker").selectpicker();
                _this.find(".gallery").addClass("owl-carousel");
                ratingPassive(".modal");
                var img = _this.find(".gallery img:first")[0];
                if( img ){
                    $(img).load(function() {
                        timeOutActions(_this);
                    });
                }
                else {
                    timeOutActions(_this);
                }
                socialShare();
                _this.on("hidden.bs.modal", function () {
                    $(lastClickedMarker).removeClass("active");
                    $(".pac-container").remove();
                    _this.remove();
                });
            },
            error : function (e) {
                console.log(e);
            }
        });
        */

        $.ajax({
            url: "/get_content",
            method: "GET",
            //dataType: "html",
            data: { "url": all_data[target]['url'] },
            success: function(content){
                let results = all_data[target];
                if( content != 'None' ){
                    results['description'] = content;
                }
                // results['content']
                // console.log(all_data);
                // console.log(target);
                // console.log(all_data[target]);

                _this.append(modal_to_html(results));
                $(".selectpicker").selectpicker();
                _this.find(".gallery").addClass("owl-carousel");
                ratingPassive(".modal");
                var img = _this.find(".gallery img:first")[0];
                if( img ){
                    $(img).load(function() {
                        timeOutActions(_this);
                    });
                }
                else {
                    timeOutActions(_this);
                }
                socialShare();
                _this.on("hidden.bs.modal", function () {
                    $(lastClickedMarker).removeClass("active");
                    $(".pac-container").remove();
                    _this.remove();
                });
            },
            error : function (e) {
                console.log(e);
            }
        });



        // let results = all_data[target];
        // // console.log(all_data);
        // // console.log(target);
        // // console.log(all_data[target]);
        // _this.append(modal_to_html(results));
        // $(".selectpicker").selectpicker();
        // _this.find(".gallery").addClass("owl-carousel");
        // ratingPassive(".modal");
        // var img = _this.find(".gallery img:first")[0];
        // if( img ){
        //     $(img).load(function() {
        //         timeOutActions(_this);
        //     });
        // }
        // else {
        //     timeOutActions(_this);
        // }
        // socialShare();
        // _this.on("hidden.bs.modal", function () {
        //     $(lastClickedMarker).removeClass("active");
        //     $(".pac-container").remove();
        //     _this.remove();
        // });

    });

    $("#" + target + ".modal").modal("show");

    function timeOutActions(_this){
        setTimeout(function(){
            if( _this.find(".map").length ){
                if( _this.find(".modal-dialog").attr("data-address") ){
                    simpleMap( 0, 0, "map-modal", _this.find(".modal-dialog").attr("data-marker-drag"), _this.find(".modal-dialog").attr("data-address") );
                }
                else {
                    simpleMap( _this.find(".modal-dialog").attr("data-latitude"), _this.find(".modal-dialog").attr("data-longitude"), "map-modal", _this.find(".modal-dialog").attr("data-marker-drag") );
                }
            }
            initializeOwl();
            initializeFitVids();
            _this.addClass("show");
        }, 200);

    }

}

//  Transfer "img" into CSS background-image

function bgTransfer(){
    $(".bg-transfer").each(function() {
        $(this).css("background-image", "url("+ $(this).find("img").attr("src") +")" );
    });
}

function ratingPassive(element){
    $(element).find(".rating-passive").each(function() {
        for( var i = 0; i <  5; i++ ){
            if( i < $(this).attr("data-rating") ){
                $(this).find(".stars").append("<figure class='active fa fa-star'></figure>")
            }
            else {
                $(this).find(".stars").append("<figure class='fa fa-star'></figure>")
            }
        }
    });
}

function socialShare(){
    var socialButtonsEnabled = 1;
    if ( socialButtonsEnabled == 1 ){
        $('head').append( $('<link rel="stylesheet" type="text/css">').attr('href', '/static/assets/css/jssocials.css') );
        $('head').append( $('<link rel="stylesheet" type="text/css">').attr('href', '/static/assets/css/jssocials-theme-minima.css') );
        $.getScript( "/static/assets/js/jssocials.min.js", function( data, textStatus, jqxhr ) {
            $(".social-share").jsSocials({
                shares: ["twitter", "facebook", "googleplus", "linkedin", "pinterest"]
            });
        });
    }
}

function initializeFitVids(){
    if ($(".video").length > 0) {
        $(".video").fitVids();
    }
}

function initializeOwl(){
    if( $(".owl-carousel").length ){
        $(".owl-carousel").each(function() {

            var items = parseInt( $(this).attr("data-owl-items"), 10);
            if( !items ) items = 1;

            var nav = parseInt( $(this).attr("data-owl-nav"), 2);
            if( !nav ) nav = 0;

            var dots = parseInt( $(this).attr("data-owl-dots"), 2);
            if( !dots ) dots = 0;

            var center = parseInt( $(this).attr("data-owl-center"), 2);
            if( !center ) center = 0;

            var loop = parseInt( $(this).attr("data-owl-loop"), 2);
            if( !loop ) loop = 0;

            var margin = parseInt( $(this).attr("data-owl-margin"), 2);
            if( !margin ) margin = 0;

            var autoWidth = parseInt( $(this).attr("data-owl-auto-width"), 2);
            if( !autoWidth ) autoWidth = 0;

            var navContainer = $(this).attr("data-owl-nav-container");
            if( !navContainer ) navContainer = 0;

            var autoplay = $(this).attr("data-owl-autoplay");
            if( !autoplay ) autoplay = 0;

            var fadeOut = $(this).attr("data-owl-fadeout");
            if( !fadeOut ) fadeOut = 0;
            else fadeOut = "fadeOut";

            $(this).owlCarousel({
                navContainer: navContainer,
                animateOut: fadeOut,
                autoplaySpeed: 2000,
                autoplay: autoplay,
                autoheight: 1,
                center: center,
                loop: loop,
                margin: margin,
                autoWidth: autoWidth,
                items: items,
                nav: nav,
                dots: dots,
                autoHeight: true,
                navText: []
            });
        });
    }
}

function trackpadScroll(method){
    if( method == "initialize" ){
        if( $(".results-wrapper").find("form").length ) {
            $(".results-wrapper .results").height( $(".results-wrapper").height() - $(".results-wrapper .form")[0].clientHeight );
        }
    }
    else if ( method == "recalculate" ){
        setTimeout(function(){
            if( $(".tse-scrollable").length ){
                $(".tse-scrollable").TrackpadScrollEmulator("recalculate");
            }
        }, 1000);
    }
}

// Do after resize

function doneResizing(){
    var $equalHeight = $('.container');
    for( var i=0; i<$equalHeight.length; i++ ){
        equalHeight( $equalHeight );
    }
    responsiveNavigation()
}

// Responsive Navigation

function responsiveNavigation(){
    if( viewport.is('xs') ){
        $("body").addClass("nav-btn-only");
    }
    if( $("body").hasClass("nav-btn-only") ){
        $(".has-child").children("a").attr("data-toggle", "collapse");
        $(".has-child").find(".nav-wrapper").addClass("collapse");
        $(".mega-menu .heading").each(function(e) {
            $(this).wrap("<a href='" + "#mega-menu-collapse-"+e + "'></a>");
            $(this).parent().attr("data-toggle", "collapse");
            $(this).parent().addClass("has-child");
            $(this).parent().attr("aria-controls", "mega-menu-collapse-"+e);
        });
        $(".mega-menu ul").each(function(e) {
            $(this).attr("id", "mega-menu-collapse-"+e);
            $(this).addClass("collapse");
        });
    }
}

function equalHeight(container){
    if( !viewport.is('xs') ){
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;

        $(container).find('.equal-height').each(function() {
            $el = $(this);
            //var marginBottom = $el.css("margin-bottom").replace("px", "");
            //console.log( $el.css("margin-bottom").replace("px", "") );
            $($el).height('auto');
            topPostion = $el.position().top;
            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }
}

var viewport = (function() {
    var viewPorts = ['xs', 'sm', 'md', 'lg'];

    var viewPortSize = function() {
        return window.getComputedStyle(document.body, ':before').content.replace(/"/g, '');
    };

    var is = function(size) {
        if ( viewPorts.indexOf(size) == -1 ) throw "no valid viewport name given";
        return viewPortSize() == size;
    };

    var isEqualOrGreaterThan = function(size) {
        if ( viewPorts.indexOf(size) == -1 ) throw "no valid viewport name given";
        return viewPorts.indexOf(viewPortSize()) >= viewPorts.indexOf(size);
    };

    // Public API
    return {
        is: is,
        isEqualOrGreaterThan: isEqualOrGreaterThan
    }

})();

// Rating --------------------------------------------------------------------------------------------------------------

function rating(element){
    var ratingElement =
            '<span class="stars">'+
                '<i class="fa fa-star s1" data-score="1"></i>'+
                '<i class="fa fa-star s2" data-score="2"></i>'+
                '<i class="fa fa-star s3" data-score="3"></i>'+
                '<i class="fa fa-star s4" data-score="4"></i>'+
                '<i class="fa fa-star s5" data-score="5"></i>'+
                '<i class="fa fa-star s6" data-score="6"></i>'+
                '<i class="fa fa-star s7" data-score="7"></i>'+
                '<i class="fa fa-star s8" data-score="8"></i>'+
                '<i class="fa fa-star s9" data-score="9"></i>'+
                '<i class="fa fa-star s10" data-score="10"></i>'+
                '</span>'
        ;
    if( !element ) { element = ''; }
    $.each( $(element + ' .star-rating'), function(i) {
        $(this).append(ratingElement);
        if( $(this).hasClass('active') ){
            $(this).append('<input readonly hidden="" name="score_' + $(this).attr('data-name') +'" id="score_' + $(this).attr('data-name') +'">');
        }
        // If rating exists
        var rating = $(this).attr('data-rating');
        for( var e = 0; e < rating; e++ ){
            var rate = e+1;
            console.log("a");
            $(this).children('.stars').children( '.s' + rate ).addClass('active');
        }
    });

    var ratingActive = $('.star-rating.active i');

    ratingActive.mouseenter(function() {
        for( var i=0; i<$(this).attr('data-score'); i++ ){
            var a = i+1;
            $(this).parent().children('.s'+a).addClass('hover');
        }
    })
    .mouseleave(function() {
        for( var i=0; i<$(this).attr('data-score'); i++ ){
            var a = i+1;
            $(this).parent().children('.s'+a).removeClass('hover');
        }
    });

    ratingActive.on('click', function(){
        $(this).parents(".star-rating").find("input").val( $(this).attr('data-score') );
        $(this).parent().children('.fa').removeClass('active');
        for( var i=0; i<$(this).attr('data-score'); i++ ){
            var a = i+1;
            $(this).parent().children('.s'+a).addClass('active');
        }
        return false;
    });
}
