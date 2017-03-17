class handle_data{
    constructor(base_url='http://54.201.237.10/'){
        this.base_url = base_url;
    }

    get_all_data( next_job, args=null ){
        this.get_data( 'get_all_data/', null, next_job, args );
    }

    get_data( api_domain, data, next_job=null, args=null ){
        $.ajax({
            url: this.base_url+api_domain,
            dataType: 'html',
            data: data,
            type:'GET',
            error: function(xhr) {
                console.log('Ajax request ERROR:',xhr);
            },
            success: function(response) {
                // console.log(response);
                let parsed_data = JSON.parse(response);
                if(next_job!=null){
                    if( args!=null ){
                        next_job( parsed_data, args );
                    }else{
                        next_job( parsed_data );
                    }
                }
                else{
                    // console.log(parsed_data);
                    return parsed_data;
                }

            }
        });
    }

    transform_to_geo( data, start_time, end_time ){
        let tmp = [];
        data.forEach(function(d){
            if( d.ip != null ){
            // if( d.ip != null && d.category != '其他' ){
                // let tmp_dic = this._get_geo_dic( d.lng, d.lat, d.date_int, d );
                // {
                //     "type": "Feature",
                //     "geometry": {
                //         "type": "MultiPoint",
                //         "coordinates": [[d.lng,d.lat],[d.lng,d.lat]]
                //     },
                //     "properties": {
                //         "time" : [d.date_int*1000,(d.date_int+1)*1000],
                //     },
                //     "data":d,
                // };
                tmp.push( geo_dic( d.lng, d.lat, d.date_int, d ) );
            }
        });

        tmp.splice(0, 0, geo_dic( '23.973875', '120.982024', start_time, null ));
        tmp.push(geo_dic( '23.973875', '120.982024', end_time, null ));
        return tmp;
    }

    get_category(data){
        let tmp = {};
        data.forEach( function(x){
            if( x.category in tmp ){
                tmp[x.category] += 1;
            }
            else{
                tmp[x.category] = 1;
            }
        });
        let categories = Object.keys(tmp);
        categories.sort(function(a,b){
            if(tmp[a] > tmp[b])
                return -1;
            return 1;
        })
        // console.log(tmp);
        // console.log(categories);
        return categories;
    }

}

function geo_dic( lng, lat, time, d ){
    return {
                "type": "Feature",
                "geometry": {
                    "type": "MultiPoint",
                    "coordinates": [[lng,lat],[lng,lat]]
                },
                "properties": {
                    "time" : [time*1000,(time+1)*1000],
                },
                "data":d,
            };
}
