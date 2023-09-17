"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require('dotenv').config()
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
//router ne
const routesTest_1 = __importDefault(require("./routes/routesTest"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(express.urlencoded());
//allow public folder
app.use(express_1.default.static(path_1.default.resolve('./uploads')));
// routes =======================================================================
app.use('/', routesTest_1.default);
app.listen({ port: 4000 }, () => {
    axios_1.default.get('http://ip-api.com/json').then(res => {
        console.log('IP: ', res.data.query);
        console.log(`Server: http://${res.data.query}:${4000}`);
        var interfaces = os_1.default.networkInterfaces();
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
    });
    // console.log(`Server ready ${process.env.HOST}`)
});
//# sourceMappingURL=app.js.map