// require('dotenv').config()
import express from 'express'
import axios from 'axios';
import path from 'path'
import os from "os";


//router ne
import routesTest from './routes/routesTest'
const app = express()


app.use(express.json());
// app.use(express.urlencoded());
//allow public folder
app.use(express.static(path.resolve('./uploads')));

// routes =======================================================================
app.use('/', routesTest);

app.listen({ port: 4000 }, () => {
    axios.get('http://ip-api.com/json').then(res => {
        console.log('IP: ', res.data.query);
        console.log(`Server: http://${res.data.query}:${4000}`);
        var interfaces = os.networkInterfaces();
        var addresses = [];
        for (var k in interfaces) {
            for (var k2 in interfaces[k]) {
                var address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }
        console.log(addresses);
    })
    // console.log(`Server ready ${process.env.HOST}`)
})