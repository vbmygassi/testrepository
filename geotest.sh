:<<"END"
curl -XPUT http://localhost:9200/us_large_cities -d '
{
    "mappings": {
        "city": {
            "properties": {
                "city": {"type": "string"},
                "state": {"type": "string"},
                "location": {"type": "geo_point"}
            }
        }
    }
}
END

:<<"END"
curl -XPOST http://localhost:9200/us_large_cities/city/ -d '{"city": "Anchorage", "state": "AK","location": {"lat": "61.2180556", "lon": "-149.9002778"}}'
curl -XPOST http://localhost:9200/us_large_cities/city/ -d '{"city": "Birmingham", "state": "AL","location": {"lat": "33.5206608", "lon": "-86.8024900"}}'
curl -XPOST http://localhost:9200/us_large_cities/city/ -d '{"city": "Huntsville", "state": "AL","location": {"lat": "34.7303688", "lon": "-86.5861037"}}'
curl -XPOST http://localhost:9200/us_large_cities/city/ -d '{"city": "Mobile", "state": "AL","location": {"lat": "30.6943566", "lon": "-88.0430541"}}'
END

curl -XGET 'http://localhost:9200/us_large_cities/city/_search?pretty=true' -d '
{
  "query": {
    "filtered" : {
        "query" : {
            "match_all" : {}
        },
        "filter" : {
            "geo_distance" : {
                "distance" : "20000",
                "location" : {
                    "lat" : 37.9174,
                    "lon" : -122.3050
                }
            }
        }
    }
  }
}'


