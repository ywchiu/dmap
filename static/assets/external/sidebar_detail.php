<?php

$currentLocation = "";

// ---------------------------------------------------------------------------------------------------------------------
// Here comes your script for loading from the database.
// ---------------------------------------------------------------------------------------------------------------------

// Remove this example in your live site and replace it with a connection to database //////////////////////////////////

ob_start();
include 'data.php';
ob_end_clean();

for( $i=0; $i < count($data); $i++){
    if( $data[$i]['id'] == $_POST['id'] ){
        $currentLocation = $data[$i]; // Loaded data must be stored in the "$currentLocation" variable
    }
}

// End of example //////////////////////////////////////////////////////////////////////////////////////////////////////


// Basic Item Information ----------------------------------------------------------------------------------------------

echo
'<div class="sidebar-content" data-id="'. $currentLocation['id'] .'">
    <div class="back"></div>
    <!--end back-button-->

    <div class="controls-more">
        <ul>
            <li><a href="#">Add to favorites</a></li>
            <li><a href="#">Add to watchlist</a></li>
        </ul>
    </div>
    <!--end controls-more-->

    <div class="section-title">
        <a href="'. $currentLocation['url'] .'" class="btn btn-primary btn-framed btn-rounded btn-xs full-detail">Full Detail</a>';

        // Title -------------------------------------------------------------------------------------------------------

        if( !empty($currentLocation['title']) ){
            echo
                '<h2>'. $currentLocation['title'] .'</h2>';
        }

        // Location ----------------------------------------------------------------------------------------------------

        if( !empty($currentLocation['location']) ){
            echo
                '<h4>'. $currentLocation['location'] .'</h4>';
        }

        // Category ----------------------------------------------------------------------------------------------------

        if( !empty($currentLocation['category']) ){
            echo
                '<div class="label label-default">'. $currentLocation['category'] .'</div>';
        }

        // Ribbon ----------------------------------------------------------------------------------------------------------

        if( !empty($currentLocation['ribbon']) ){
            echo
                '<figure class="ribbon">'. $currentLocation['ribbon'] .'</figure>';
        }

        // Rating ----------------------------------------------------------------------------------------------------------

        if( !empty($currentLocation['rating']) ){
            echo
            '<div class="rating-passive" data-rating="'. $currentLocation['rating'] .'">
                <span class="stars"></span>
                <span class="reviews">'. $currentLocation['reviews_number'] .'</span>
            </div>';
        }
    echo
    '</div>
    <!--end section-title-->';

// Phone --------------------------------------------------------------------------------------------------------------

if( !empty($currentLocation['phone']) ){
    echo
    '<h5><i class="fa fa-phone"></i>'. $currentLocation['phone'] .'</h5>';
}

// Email --------------------------------------------------------------------------------------------------------------

if( !empty($currentLocation['email']) ){
    echo
        '<h5><i class="fa fa-envelope"></i>'. $currentLocation['email'] .'</h5>';
}

// Website -------------------------------------------------------------------------------------------------------------

if( !empty($currentLocation['website']) ){
    echo
        '<h5><a href="'. $currentLocation['website'] .'"><i class="fa fa-globe"></i>'. $currentLocation['website'] .'</a></h5>';
}

// Gallery -------------------------------------------------------------------------------------------------------------

if( !empty($currentLocation['gallery']) ){
    $gallery = "";
    for($i=0; $i < count($currentLocation['gallery']); $i++){
        $gallery .= '<img src="'. $currentLocation['gallery'][$i] .'" alt="">';
    }
    echo
    '<div class="gallery-wrapper">';

        // Price -------------------------------------------------------------------------------------------------------------

        if( !empty($currentLocation['price']) ){
            echo
                '<div class="price">'. $currentLocation['price'] .'</div>';
        }

        echo
        '<div class="gallery owl-carousel" data-owl-nav="0" data-owl-dots="1">'. $gallery .'</div>
    </div>
    <!--end gallery-->';
}
else {
    echo
    '<div class="image" style="background-image: url(assets/img/items/default.png); height: 290px;"></div>
    <!--end gallery-->';
}

// Description ---------------------------------------------------------------------------------------------------------

if( !empty($currentLocation['description']) ){
    echo
    '<section>
        <h3>About</h3>
        <p>'. $currentLocation['description'] .'</p>
    </section>
    <!--end about-->';
}

// Tags ----------------------------------------------------------------------------------------------------------------

if( !empty($currentLocation['tags']) ){
    $tags = "";
    for($i=0; $i < count($currentLocation['tags']); $i++){
        $tags .= '<li>'. $currentLocation['tags'][$i] .'</li>';
    }
    echo
    '<section>
        <h3>Features</h3>
        <ul class="tags">'.  $tags .'</ul>
    </section>
    <!--end tags-->';
}

// Today Menu ----------------------------------------------------------------------------------------------------------

if( !empty($currentLocation['today_menu']) ){
    echo
    '<section>
        <h3>Today menu</h3>';
    for($i=0; $i < count($currentLocation['today_menu']); $i++){
        echo
            '<ul class="list-unstyled list-descriptive icon">
                <li>
                    <i class="fa fa-cutlery"></i>
                    <div class="description">
                        <strong>'. $currentLocation['today_menu'][$i]['meal_type'] .'</strong>
                        <p>'. $currentLocation['today_menu'][$i]['meal'] .'</p>
                    </div>
                </li>
            </ul>
            <!--end list-descriptive-->';
    }
    echo
    '</section>
    <!--end today-menu-->';
}

// Schedule ------------------------------------------------------------------------------------------------------------

if( !empty($currentLocation['schedule']) ){
    echo
    '<section>
        <h3>Schedule</h3>';
    for($i=0; $i < count($currentLocation['schedule']); $i++){
        echo
            '<ul class="list-unstyled list-schedule">
                <li>
                    <div class="left">
                        <strong class="promoted">'. $currentLocation['schedule'][$i]['date'] .'</strong>
                        <figure>'. $currentLocation['schedule'][$i]['time'] .'</figure>
                    </div>
                    <div class="right">
                        <strong>'. $currentLocation['schedule'][$i]['location_title'] .'</strong>
                        <figure>'. $currentLocation['schedule'][$i]['location_address'] .'</figure>
                    </div>
                </li>
            </ul>
            <!--end list-schedule-->';
    }
    echo
    '</section>
    <!--end schedule-->';
}

// Video ---------------------------------------------------------------------------------------------------------------

if( !empty($currentLocation['video']) ){
    echo
    '<section>
        <h3>Video presentation</h3>
        <div class="video">'. $currentLocation['video'] .'</div>
    </section>
    <!--end video-->';
}

// Description list ----------------------------------------------------------------------------------------------------

if( !empty($currentLocation['description_list']) ){
    echo
    '<section>
        <h3>Property Details</h3>';
    for($i=0; $i < count($currentLocation['description_list']); $i++){
        echo
            '<dl>
                <dt>'. $currentLocation['description_list'][$i]['title'] .'</dt>
                <dd>'. $currentLocation['description_list'][$i]['value'] .'</dd>
            </dl>
            <!--end property-details-->';
    }
    echo
    '</section>
    <!--end description-list-->';
}

// Opening Hours -------------------------------------------------------------------------------------------------------

if( !empty($currentLocation['opening_hours']) ){
    echo
    '<section>
        <h3>Opening Hours</h3>
        <dl>
            <dt>Monday</dt>
            <dd>'. $currentLocation['opening_hours'][0] .'</dd>
            <dt>Tuesday</dt>
            <dd>'. $currentLocation['opening_hours'][1] .'</dd>
            <dt>Wednesday</dt>
            <dd>'. $currentLocation['opening_hours'][2] .'</dd>
            <dt>Thursday</dt>
            <dd>'. $currentLocation['opening_hours'][3] .'</dd>
            <dt>Friday</dt>
            <dd>'. $currentLocation['opening_hours'][4] .'</dd>
            <dt>Saturday</dt>
            <dd>'. $currentLocation['opening_hours'][5] .'</dd>
            <dt>Sunday</dt>
            <dd>'. $currentLocation['opening_hours'][6] .'</dd>
        </dl>
    </section>
    <!--end opening-hours-->';
}

// Reviews -------------------------------------------------------------------------------------------------------------

if( !empty($currentLocation['reviews']) ){
    echo
    '<section>
        <h3>Latest reviews</h3>';
    for($i=0; $i < 2; $i++){
        echo
            '<div class="review">
                <div class="image">
                    <div class="bg-transfer" style="background-image: url('. $currentLocation['reviews'][$i]['author_image'] .')"></div>
                </div>
                <div class="description">
                    <figure>
                        <div class="rating-passive" data-rating="'. $currentLocation['reviews'][$i]['rating'] .'">
                            <span class="stars"></span>
                        </div>
                        <span class="date">'. $currentLocation['reviews'][$i]['date'] .'</span>
                    </figure>
                    <p>'. $currentLocation['reviews'][$i]['review_text'] .'</p>
                </div>
            </div>
            <!--end review-->';
    }
    echo
    '</section>
    <!--end reviews-->';
}

    echo
    '<section>
        <h3>Share This Listing</h3>
        <div class="social-share"></div>
    </section>';

echo
'</div>';