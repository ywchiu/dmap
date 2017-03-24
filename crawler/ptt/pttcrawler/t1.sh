curl -XPOST 'localhost:9200/my_index_name/my_type_name/_search' -d '
{ 
    "query":{ 
        "text":{ "_all":"test"}
    }
}
'
