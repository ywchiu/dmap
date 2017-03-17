<?php

// ---------------------------------------------------------------------------------------------------------------------
// Here comes your script for loading from the database.
// ---------------------------------------------------------------------------------------------------------------------

// Remove this example in your live site -------------------------------------------------------------------------------

ob_start();
include 'data.php';
ob_end_clean();

// End of example ------------------------------------------------------------------------------------------------------

if( !empty($_POST['markers']) ){

    for( $i=0; $i < count($data); $i++){
        for( $e=0; $e < count($_POST['markers']); $e++){
            if( $data[$i]['id'] == $_POST['markers'][$e] ){
                echo
                '<div class="result-item" data-id="'. $data[$i]['id'] .'">';

                    // Ribbon ------------------------------------------------------------------------------------------

                    if( !empty($data[$i]['ribbon']) ){
                        echo
                            '<figure class="ribbon">'. $data[$i]['ribbon'] .'</figure>';
                    }

                    echo
                    '<a href="'. $data[$i]['url'] .'">';

                    // Title -------------------------------------------------------------------------------------------

                    if( !empty($data[$i]['title']) ){
                        echo
                            '<h3>'. $data[$i]['title'] .'</h3>';
                    }

                    echo
                        '<div class="result-item-detail">';

                            // Image thumbnail -------------------------------------------------------------------------

                            if( !empty($data[$i]['gallery'][0]) ){
                                echo
                                '<div class="image" style="background-image: url('. $data[$i]['gallery'][0] .')">';
                                    if( !empty($data[$i]['additional_info']) ){
                                        echo
                                        '<figure>'. $data[$i]['additional_info'] .'</figure>';
                                    }

                                    // Price ---------------------------------------------------------------------------

                                    if( !empty($data[$i]['price']) ){
                                        echo
                                            '<div class="price">'. $data[$i]['price'] .'</div>';
                                    }
                                echo
                                '</div>';
                            }
                            else {
                                echo
                                '<div class="image" style="background-image: url(assets/img/items/default.png)">';
                                    if( !empty($data[$i]['additional_info']) ){
                                        echo
                                        '<figure>'. $data[$i]['additional_info'] .'</figure>';
                                    }

                                    // Price ---------------------------------------------------------------------------

                                    if( !empty($data[$i]['price']) ){
                                        echo
                                            '<figure class="price">'. $data[$i]['price'] .'</figure>';
                                    }
                                echo
                                '</div>';
                            }

                            echo
                            '<div class="description">';
                                if( !empty($data[$i]['location']) ){
                                    echo
                                        '<h5><i class="fa fa-map-marker"></i>'. $data[$i]['location'] .'</h5>';
                                }

                                // Rating ------------------------------------------------------------------------------

                                if( !empty($data[$i]['rating']) ){
                                    echo
                                        '<div class="rating-passive"data-rating="'. $data[$i]['rating'] .'">
                                            <span class="stars"></span>
                                            <span class="reviews">'. $data[$i]['reviews_number'] .'</span>
                                        </div>';
                                }

                                // Category ----------------------------------------------------------------------------

                                if( !empty($data[$i]['category']) ){
                                    echo
                                        '<div class="label label-default">'. $data[$i]['category'] .'</div>';
                                }

                                // Description -------------------------------------------------------------------------

                                if( !empty($data[$i]['description']) ){
                                    echo
                                        '<p>'. $data[$i]['description'] .'</p>';
                                }
                            echo
                            '</div>
                        </div>
                    </a>
                    <div class="controls-more">
                        <ul>
                            <li><a href="#" class="add-to-favorites">Add to favorites</a></li>
                            <li><a href="#" class="add-to-watchlist">Add to watchlist</a></li>
                        </ul>
                    </div>
                </div>';

            }
        }
    }

}