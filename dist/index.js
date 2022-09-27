"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageProcessRouter_1 = __importDefault(require("./routes/imageProcessRouter"));
var app = (0, express_1.default)();
var port = 3000;
app.use('/public', express_1.default.static('public'));
app.use('/image', imageProcessRouter_1.default);
app.listen(port, function () {
    console.log("server run at http://localhost:".concat(port));
});
exports.default = app;
