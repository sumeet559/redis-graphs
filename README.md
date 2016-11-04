# redis-graphs
Graph/2D Arrays implementation in redis

Redis don't support graphs and 2D arrays.The package is an efficient implementation of storing,retrieving and querying 2D arrays in Redis.
Graphs can be represented using their corresponding adjacency matrices and stored in Redis.

![Alt text](http://g.gravizo.com/g?
  digraph G {
    B -> A;
    C -> B;
    D -> C;
    A -> D;
  }
)

the correspoding adjscency matrix is [[0,0,0,1],[1,0,0,0],[0,1,0,0],[0,0,1,0]];
# Code Snippet for the above graph 
```js
var koa=require("koa");
var app=koa();
const fs =require ('fs');
var Redis=require("redis-2d-arrays");
app.use(function *(){
  var vertexNames=['a','b','c','d']; 
  var array=[[0,0,0,1],[1,0,0,0],[0,1,0,0],[0,0,1,0]];
  var graphName='graph1';
  Redis.store({
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: 'auth',
    db: 0
  },array,vertexNames,graphName);
})
app.listen(8080);
```
```js
// This returns a promise.
var adjMatrix= Redis.getGraph({
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        password: 'auth',
        db: 0
      },vertexNames,graphName);
```
