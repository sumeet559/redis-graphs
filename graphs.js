/*
* Storing unwieghted digraphs in Redis.
*
* Sumeet Tiwari<sumeet.tiwari@tlkn.com>
*/
var Redis=require("ioredis");

exports.store = function (options,array,vertexNames,graphName) {
  var redis = new Redis(options);
  var pipeline=redis.pipeline();
  if(vertexNames.length == array.length){
    for(var i=0;i<array.length;i++){
      for(var j=0;j<array.length;j++){
        pipeline.hset(`${graphName}:${vertexNames[i]}:row`,vertexNames[j],array[i][j]);
        pipeline.hset(`${graphName}:${vertexNames[j]}:column`,vertexNames[i],array[i][j]);
      }
    }
    pipeline.exec(function(err,result){
      if(err) {
        throw err;
      }
      else{
        console.log("graph stored");
      }
    })
  }else{
    console.log("error in data entry");
  }
}

exports.getGraph = function (options,vertexNames,graphName) {
  var redis = new Redis(options);
  var pipeline=redis.pipeline();
  if(vertexNames.length){
    for(var k=0;k<vertexNames.length;k++){
      pipeline.hgetall(`${graphName}:${vertexNames[k]}:row`);
    }
    return pipeline.exec();
  }else{
    console.log("error in data entry");
  }
}
