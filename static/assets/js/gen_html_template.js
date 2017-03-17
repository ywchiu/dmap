function modal_to_html(currentLocation){
    // console.log(currentLocation);
    let latitude = "";
    let longitude = "";
    let address = "";

    if( currentLocation['latitude'] != undefined ){
        latitude = currentLocation['latitude'];
    }

    if( currentLocation['longitude'] != undefined ){
        longitude = currentLocation['longitude'];
    }

    if( currentLocation['address'] != undefined ){
        address = currentLocation['address'];
    }

    let return_content = `
    <div class="modal-item-detail modal-dialog" role="document" data-latitude="${latitude}" data-longitude="${longitude}" data-address="${address}">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="section-title">
                    <h2>${currentLocation['title']}</h2>
                    <div class="label label-default">${currentLocation['category']}</div>
                    `

                    // Ribbon ------------------------------------------------------------------------------------------>

                    if( currentLocation['ribbon'] != undefined ){
                        return_content += `
                        <figure class="ribbon">${currentLocation['ribbon']}</figure>`;
                    }

                    // Rating ------------------------------------------------------------------------------------------>

                    if( currentLocation['rating'] != undefined ){
                        return_content += `
                        <div class="rating-passive" data-rating="${currentLocation['rating']}">
                            <span class="stars"></span>
                            <span class="reviews">${currentLocation['reviews_number']}</span>
                        </div>`;
                    }

                    return_content += `
                    <!--end controls-more-->
                </div>
                <!--end section-title-->
            </div>
            <!--end modal-header-->
            <div class="modal-body">
                <div class="left">

                </div>
                <!--end left -->
                <div class="right">

                </div>
                <p>${ currentLocation['date'] }</p>
                <p>${ currentLocation['description'] }</p>
                <!--end right-->
            </div>
            <!--end modal-body-->
        </div>
        <!--end modal-content-->
    </div>
    <!--end modal-dialog-->
    `;
    return return_content;
}




function sidebar_results_to_html(markers,visibleMarkersId){
    let data = markers;
    let return_content = '';
    if( visibleMarkersId.length > 0 ){

        for( let i=0; i < data.length; i++){
            for( let e=0; e < visibleMarkersId.length; e++){
                if( data[i]['id'] == visibleMarkersId[e] ){
                // if( i == visibleMarkersId[e] ){
                    return_content += `
                    <div class="result-item" data-id="${data[i]['id']}">
                        <a href="${data[i]['url']}">`;

                        // Title -------------------------------------------------------------------------------------------

                        if( data[i]['title'] != undefined ){
                            return_content += `
                            <h3>${data[i]['title']}</h3>`;
                        }

                        return_content += ``
                            //<div class="result-item-detail">`
                                return_content += `
                                <div class="description">`;
                                    // Category ----------------------------------------------------------------------------

                                    if( data[i]['category'] != undefined ){
                                        return_content += `
                                        <div class="label label-default">${data[i]['category']}</div>`;
                                    }

                                    // Description -------------------------------------------------------------------------

                                    if( data[i]['description'] != undefined ){
                                        let des = data[i]['description'].substr(0,100);
                                        if( data[i]['description'].length >= 20 ){
                                            des += ' ...';
                                        }
                                        return_content += `
                                        <p>${ des }</p>`;
                                    }
                                return_content += `
                                </div>`
                            //</div>
                        return_content += `
                        </a>
                    </div>`;

                }
            }
        }

    }
    return return_content;

}
