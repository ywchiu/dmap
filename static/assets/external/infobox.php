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

// Infobox HTML code

echo
'<div class="item infobox" data-id="'. $currentLocation['id'] .'">
    <a href="'. $currentLocation['url'] .'">
        <div class="description">';

            // Category ------------------------------------------------------------------------------------------------

            if( !empty($currentLocation['category']) ){
                echo
                    '<div class="label label-default">'. $currentLocation['category'] .'</div>';
            }

            // Title ---------------------------------------------------------------------------------------------------

            if( !empty($currentLocation['title']) ){
                echo
                    '<h3>'. $currentLocation['title'] .'</h3>';
            }

            // Location ------------------------------------------------------------------------------------------------

            if( !empty($currentLocation['location']) ){
                echo
                    '<h4>'. $currentLocation['location'] .'</h4>';
            }
            echo

        '</div>
        <!--end description-->';

        // Image thumbnail -------------------------------------------------------------------------

        if( !empty($currentLocation['gallery'][0]) ){
            echo
            '<div class="image" style="background-image: url('. $currentLocation['gallery'][0] .')"></div>';
        }
        else {
            echo
            '<div class="image" style="background-image: url(assets/img/items/default.png)"></div>';
        }

        echo
        '<!--end image-->
    </a>';
if( !empty( $currentLocation['rating'] ) ){
    echo
    '<div class="rating-passive">';
        for($i=0; $i < 5; $i++){
            if( $i < $currentLocation['rating'] ){
                echo '<span class="stars"><figure class="active fa fa-star"></figure></span>';
            }
            else {
                echo '<span class="stars"><figure class="fa fa-star"></figure></span>';
            }
        }
        echo
        '<span class="reviews">'. $currentLocation['reviews_number'] .'</span>
    </div>';
}
echo
    '<div class="controls-more">
        <ul>
            <li><a href="#">Add to favorites</a></li>
            <li><a href="#">Add to watchlist</a></li>
        </ul>
    </div>
    <!--end controls-more-->

</div>
<!--end item-->';
