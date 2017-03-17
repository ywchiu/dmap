function DateString(d){
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear();
}

var MyDateField = function(config) {
    jsGrid.Field.call(this, config);
};

MyDateField.prototype = new jsGrid.Field({

    css: "date-field",            // redefine general property 'css'
    align: "center",              // redefine general property 'align'

    // myCustomProperty: "foo",      // custom property

    sorter: function(date1, date2) {
        return new Date(date1) - new Date(date2);
    },

    itemTemplate: function(value) {
        return DateString(new Date(value));
    },

    insertTemplate: function(value) {
        return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
    },

    editTemplate: function(value) {
        return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
    },

    insertValue: function() {
        let d = this._insertPicker.datepicker("getDate");
        if( d ){
            return d;
        }else{
            return new Date();
        }
    },

    editValue: function() {
        return DateString(this._editPicker.datepicker("getDate"));
    }
});

jsGrid.fields.date = MyDateField;

// var disease_option = [
//     { Name: "", Id: 0 },
//     { Name: "United States", Id: 1 },
//     { Name: "Canada", Id: 2 },
//     { Name: "United Kingdom", Id: 3 }
// ];

function init_editable_table(){
    var disease_option = [];
    // category_list.forEach( x => disease_option.push( { Name:x, Id:category_list.indexOf(x) } ) );
    category_list.forEach( x => disease_option.push( { Name:x } ) );


    function update_all_data(){
        // { "Disease": "流感", "Date":new Date('2016/5/24'),"Address":"台北市玉門街1號", "Latitude":25.0703276,"Longitude":121.52175390000002 }

        // // 'id': p.id,
        // 'url': null,
        // 'category': Disease
        // 'title': p.title,
        // 'content': description,
        // 'description': description
        // 'date': str(dt.fromtimestamp( int(p.tm) )),
        // 'date_int': p.tm,
        // 'tm': p.tm,
        // 'ip': nul,
        // 'location': Address,

        // delete user upload data
        all_data.splice(all_data_length, all_data.length);

        //add user upload data
        let idx = all_data_length;
        // console.log( all_data );
        // console.log( user_upload_data );

        function digit(d){
            d = '0' + d
            return d.substr(d.length-2,d.length);
        }

        for( d of user_upload_data ){
            // console.log(d);
            if( data_option.category.indexOf( d.Disease )!=-1 ){
                let date = new Date(d.Date);
                let year = date.getFullYear();
                let month = digit(date.getMonth() + 1);
                let day = digit(date.getDate());
                let hour = digit(date.getHours());
                let min = digit(date.getMinutes());
                let sec = digit(date.getSeconds());
                let datestr = year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;

                let title = d.Title;
                if( title === undefined ){
                    title = d.Disease;
                }
                let description = d.Description;
                if( description === undefined ){
                    description = 'User upload data.';
                }

                all_data.push({
                    'id': idx++,
                    'url': null,
                    'category': d.Disease,
                    'title': title,
                    'content': description,
                    'description': description,
                    'date': datestr,
                    'date_int': date.getTime()/1000,
                    'tm': date.getTime()/1000,
                    'ip': null,
                    'location': d.Address,
                    'latitude': d.Latitude,
                    'longitude': d.Longitude,
                })
            }
        }

        // refresh_all();
        // console.log( all_data );
    }
    update_all_data();

    function handle_item(args){
        // if(args.item.Address === "aaa") {
        //     args.cancel = true;
        //     // console.log( "'"+args.item.Time+"'" );
        //     // console.log( args.item.Time.length );
        //     // alert("Specify the name of the item!");
        //     return;
        // }
        // console.log( user_upload_data );



        // var address = document.getElementById("address").value;
        geocoder.geocode( { 'address': args.item.Address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                // console.log( results );

                let lat = results[0].geometry.location.lat();
                let lng = results[0].geometry.location.lng();
                args.item.Latitude = lat;
                args.item.Longitude = lng;
                $("#jsGrid").jsGrid("refresh");

                // console.log( lat );
                // console.log( lng );
                update_all_data();
                refresh_all();
            } else {
                args.cancel = true;
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });


    }

    $("#jsGrid").jsGrid({
        width: "100%",
        // width: 'inherit',
        height: "400px",

        inserting: true,
        editing: true,
        sorting: true,
        paging: true,

        data: user_upload_data,

        fields: [
            // { name: "Disease", type: "select",items: disease_option, valueField: "Id", textField: "Name", validate: "required" },
            { name: "Disease", type: "select",items: disease_option, valueField: "Name", textField: "Name", validate: "required" },
            { name: "Date", type:"date", validate: "required" },
            { name: "Address", type: "text", width: 140, validate: "required" },
            { name: "Title", type: "text", width: 80 },
            { name: "Description", type: "text", width: 100 },
            { name: "Latitude", type: "number", width: 130 },
            { name: "Longitude", type: "number", width: 140 },

            // { name: "Address", type: "text", validate: "required" },
            // { name: "Title", type: "text",  },
            // { name: "Description", type: "text",  },
            // { name: "Latitude", type: "number",  },
            // { name: "Longitude", type: "number",  },

            { type: "control" }
        ],
        // onItemInserting: function(args){ handle_item(args); },
        // onItemUpdating: function(args){ handle_item(args); },
        onItemInserting: handle_item,
        onItemUpdating: handle_item,
        onItemDeleted: function(args){
            update_all_data();
            refresh_all();
        }
    });
    $('.datepicker').datepicker();
    // $("#jsGrid").jsGrid("refresh");
    // console.log( $("#jsGrid").jsGrid("loadData") );
}
