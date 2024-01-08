'use strict';

const tracer = require('dd-trace').init();
const { connectToMongo } = require('./db_connect');
const express = require('express'); 

function countValues(n, parent) {
	const span = tracer.startSpan("countValues", {childOf: parent});
	const result = n+3
	span.finish()
    return result;
}

const app = express(); 
const PORT = 3000; 
  
app.get('/', (req, res)=>{ 
    // this adds the manually created span as a child to the auto-instrumented span
    let parentScope = tracer.scope().active();
    const span = tracer.startSpan('message', {childOf: parentScope});
    connectToMongo();
    // custom span for translation
    const values = countValues(2, span);
    
    span.finish();
    res.status(200); 
    res.send(`Hello World! ${values}`); 
}); 
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running"); 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 
