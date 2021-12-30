const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

//client
app.use('/', express.static('../dist'))
const routes = ['/', '/home']
app.get(routes, (req, res) => {
    res.sendFile('/dist/index.html', { root: __dirname });
});

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

app.use((req, res, next) => {
    res = res.header("Access-Control-Allow-Origin", "*")
    res = res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept, Authorization, Access-Control-Allow-Origin"
    )
    if (req.method === "OPTIONS") {
        res = res.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
    }
    next()
})

//use specific port
app.listen(port, () => console.log(`Listening on port ${port}`))