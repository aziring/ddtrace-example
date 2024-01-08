To actually have a successful database call, do the following:
1. Run a local instance of mongo
2. Create a db call local
3. Add a collection call metadata
4. Add the following document to the collection:
```
{
    "id" : NumberInt(1),
    "title" : "title1"
}
```

To write to the console each span's trace id and parent, modify node_modules/dd-trace/packages/src/span_processor.js

After the consts declarations, add the line:
```
    console.log(`${spanContext._name}: traceId = ${spanContext._traceId} parentId = ${spanContext._parentId} integrationName = ${span._integrationName}`);
```
