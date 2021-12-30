const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use('/', express.static(path.join(__dirname, '../dist')))
const routes = ['/', '/home']
app.get(routes, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'), { root: __dirname });
});

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

app.listen(port, () => console.log(`Listening on port ${port}`))
