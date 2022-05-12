var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();
const https = require('https');
const fs = require('fs');


var myLimit = typeof('100kb');
app.use(bodyParser.json({limit: myLimit}));

app.all('/CORS', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        //Preflight
        if(req.headers['access-control-request-headers'] === ('api-url,authorization,content-type,duffel-version') ||
           req.headers['access-control-request-headers'] === ('api-url,authorization,duffel-version'))
        {
            res.send();
        }
        else{
            res.status(500).send({error: 'Inavlid request headers'})
        }
    } else {
        var apiURL = req.header('Api-Url');
        if (!apiURL) {
            res.status(500).send({error: 'There is no Target-Endpoint header in the request' });
            return;
        }
        if (apiURL.trimStart().startsWith('https://api.duffel.com/air/')){
            if (Object.keys(req.body).length === 0){
                request({ url: apiURL, method: req.method, headers: {'Authorization': req.header('Authorization'),'Duffel-version': req.header('Duffel-version'),} },
                function (error, response, body) {
                    if (error) {
                        console.error('error: ' + response.statusCode)
                    }
                }).pipe(res);
            }
            else{
            request({ url: apiURL, method: req.method, json: req.body, headers: {'Authorization': req.header('Authorization'),'Duffel-version': req.header('Duffel-version'),} },
                function (error, response, body) {
                    if (error) {
                        console.error('error: ' + response.statusCode)
                    }
                }).pipe(res);
            }
        }
        else{
            res.status(500).send({error: 'Inavlid Target-Endpoint'})
        }
    }
});

const dirname = '/etc/letsencrypt/live/marco-projects.com'
const options = {
    key: fs.readFileSync(dirname + '/privkey.pem', 'utf8'),
   cert: fs.readFileSync(dirname + '/fullchain.pem', 'utf8')
 };

 var server = https.createServer(options, app);
 var port = 3000
 server.listen(port, function () {
});

