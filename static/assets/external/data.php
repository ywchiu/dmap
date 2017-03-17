<?php

echo json_encode(
    $data = array(

        [
            'id' => 1,
            'latitude' => 40.72807182,
            'longitude' => -73.85735035,
            'title' => "Marky's Restaurant",
            'category' => "Restaurant",
            'rating' => "4",
            'reviews_number' => "6",
            'tags' => array(
                "Wi-Fi",
                "Parking",
                "TV",
                "Vegetarian"
            ),
            'additional_info' => "Average price $30",
            'url' => "detail.html",
            'description' => "Praesent cursus nulla non arcu tempor, ut egestas elit tempus. In ac ex ferme tum",
        ],

        [
            'id' => 2,
            'latitude' => 40.73925841,
            'longitude' => -73.85348797,

            'title' => "Ironapple",


            'category' => "Bar & Grill",
            'rating' => "3",
            'reviews_number' => "12",

            'additional_info' => "",
            'url' => "detail.html",
            'description' => "Aliquam vel turpis sagittis, semper tellus eget, aliquam turpis. Cras aliquam, arcu",

        ],
/*
        [
            'id' => 3,


            'title' => "Food Festival",


            'category' => "Event",
            'rating' => "5",
            'reviews_number' => "15",

            'tags' => array(
                "Wi-Fi",
                "Parking",
                "TV",
                "Vegetarian"
            ),

            'additional_info' => "Starts at 19:00",
            'url' => "detail.html",
            'description' => "Sed ac dolor auctor, elementum lacus vitae, efficitur magna. Quisque sed semper tellus",

        ],
*/

    )
);

