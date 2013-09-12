import urllib2
import json

url = "http://127.0.0.1:9200/nix/_search?pretty=true"
data = ' {"query":{"bool":{"must":[{"range":{"filzerbamsler.lat":{"from":"1","to":"10"}}},{"range":{"filzerbamsler.lon":{"from":"2","to":"4"}}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}} '

data = json.dumps(data);

req = urllib2.Request(url, data);
out = urllib2.urlopen(req);

print out.read();


