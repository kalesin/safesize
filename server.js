const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use('/', express.static('./dist'))
const routes = ['/', '/home', '/product/:id']
app.get(routes, (req, res) => {
    res.sendFile('./dist/index.html', { root: __dirname });
});

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

app.listen(port, () => console.log(`Listening on port ${port}`))
