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
        header('Content-Type: application/json');
        echo json_encode($currentLocation);
    }
}


/*
for( $i=0; $i < count($data); $i++){
    if( $data[$i]['id'] == $_POST['id'] ){
        $currentLocation = $data[$i]; // Loaded data must be stored in the "$currentLocation" variable
    }
}

// End of example //////////////////////////////////////////////////////////////////////////////////////////////////////

// Modal HTML code

$latitude = "";
$longitude = "";
$address = "";

if( !empty($currentLocation['latitude']) ){
    $latitude = $currentLocation['latitude'];
}

if( !empty($currentLocation['longitude']) ){
    $longitude = $currentLocation['longitude'];
}

if( !empty($currentLocation['address']) ){
    $address = $currentLocation['address'];
}

echo

'<div class="modal-item-detail modal-dialog" role="document" data-latitude="'. $latitude .'" data-longitude="'. $longitude .'" data-address="'. $address .'">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <div class="section-title">
                <h2>'. $currentLocation['title'] .'</h2>
                <div class="label label-default">'. $currentLocation['category'] .'</div>';

                // Ribbon ------------------------------------------------------------------------------------------

                if( !empty($currentLocation['ribbon']) ){
                    echo
                        '<figure class="ribbon">'. $currentLocation['ribbon'] .'</figure>';
                }

                // Rating ------------------------------------------------------------------------------------------

                if( !empty($currentLocation['rating']) ){
                    echo
                    '<div class="rating-passive" data-rating="'. $currentLocation['rating'] .'">
                        <span class="stars"></span>
                        <span class="reviews">'. $currentLocation['reviews_number'] .'</span>
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
            <!--end section-title-->
        </div>
        <!--end modal-header-->
        <div class="modal-body">
            <div class="left">';

                // Gallery -----------------------------------------------------------------------------------------

                if( !empty($currentLocation['gallery']) ){
                    $gallery = "";
                    for($i=0; $i < count($currentLocation['gallery']); $i++){
                        $gallery .= '<img src="'. $currentLocation['gallery'][$i] .'" alt="">';
                    }
                    echo
                    '<div class="gallery owl-carousel" data-owl-nav="1" data-owl-dots="0">'. $gallery .'</div>
                    <!--end gallery-->';
                }

                echo
                '<div class="map" id="map-modal"></div>
                <!--end map-->

                <section>
                <h3>Contact</h3>';
                // Contact -----------------------------------------------------------------------------------------

                if( !empty($currentLocation['location']) ){
                    echo
                        '<h5><i class="fa fa-map-marker"></i>'. $currentLocation['location'] .'</h5>';
                }

                // Phone -------------------------------------------------------------------------------------------

                if( !empty($currentLocation['phone']) ){
                    echo
                        '<h5><i class="fa fa-phone"></i>'. $currentLocation['phone'] .'</h5>';
                }

                // Email -------------------------------------------------------------------------------------------

                if( !empty($currentLocation['email']) ){
                    echo
                        '<h5><i class="fa fa-envelope"></i>'. $currentLocation['email'] .'</h5>';
                }

                echo
                '</section>
                <section>
                    <h3>Social Share</h3>
                    <div class="social-share"></div>
                </section>
            </div>
            <!--end left -->
            <div class="right">
                <section>
                    <h3>About</h3>
                    <p>'. $currentLocation['description'] .'</p>
                    <a href="#" class="btn btn-primary btn-framed btn-light-frame btn-rounded btn-xs">Show More</a>
                </section>
                <!--end about-->';

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

                // Today Menu --------------------------------------------------------------------------------------

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

                // Schedule ----------------------------------------------------------------------------------------

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

                // Video -------------------------------------------------------------------------------------------

                if( !empty($currentLocation['video']) ){
                    echo
                    '<section>
                        <h3>Video presentation</h3>
                        <div class="video">'. $currentLocation['video'] .'</div>
                    </section>
                    <!--end video-->';
                }

                // Description list --------------------------------------------------------------------------------

                if( !empty($currentLocation['description_list']) ){
                    echo
                    '<section>
                        <h3>Listing Details</h3>';
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

                // Reviews -----------------------------------------------------------------------------------------

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
            '</div>
            <!--end right-->
        </div>
        <!--end modal-body-->
    </div>
    <!--end modal-content-->
</div>
<!--end modal-dialog-->
';
*/
