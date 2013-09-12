:<<"END"
curl -X PUT localhost:9200/hotels -d '
{
  "mappings": {
    "hotel" : {
      "properties" : {
        "name" : { "type" : "string" },
        "city" : { "type" : "string" },
        "name_suggest" : {
          "type" :     "completion"
        }
      }
    }
  }
}'
END




:<<"END"
curl -X PUT localhost:9200/hotels/hotel/1 -d '
{
  "name" :         "Mercure Hotel Munich",
  "city" :         "Munich",
  "name_suggest" : "Mercure Hotel Munich"
}'

curl -X PUT localhost:9200/hotels/hotel/2 -d '
{
  "name" :         "Hotel Monaco",
  "city" :         "Munich",
  "name_suggest" : "Hotel Monaco"
}'

curl -X PUT localhost:9200/hotels/hotel/3 -d '
{
  "name" :         "Courtyard by Marriot Munich City",
  "city" :         "Munich",
  "name_suggest" : "Courtyard by Marriot Munich City"
}'
END




curl -X POST localhost:9200/hotels/_suggest?pretty=true -d '
{
  "hotels" : {
    "text" : "c",
    "completion" : {
      "field" : "name_suggest"
    }
  }
}'


curl -X POST 127.0.0.1:9200/hotels/_search?pretty=true -d ' {"query":{"bool":{"must":[{"query_string":{"default_field":"_all","query":"*a*"}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}} '
curl -X POST 127.0.0.1:9200/search/_search?pretty=true -d ' {"query":{"bool":{"must":[{"query_string":{"default_field":"_all","query":"*117217*"}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}} '
curl -X POST 127.0.0.1:9200/nix/_search?pretty=true -d ' {"query":{"bool":{"must":[{"range":{"filzerbamsler.lat":{"from":"1","to":"10"}}},{"range":{"filzerbamsler.lon":{"from":"2","to":"4"}}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}} '




