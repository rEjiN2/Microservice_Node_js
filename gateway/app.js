const express = require('express');
const expressProxy = require('express-http-proxy');

const app = express();


// Proxying API requests to the user service
// const userProxy = expressProxy('http://localhost:3001', {
//   proxyReqPathResolver: req => {
//     return `/${req.originalUrl}`;
//   },
// });

app.use('/user',expressProxy('http://localhost:3001'))



app.listen(3000, () => {
    console.log('Gateway server is running on port 3000...');
});