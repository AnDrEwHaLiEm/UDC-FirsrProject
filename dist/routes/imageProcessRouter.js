"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ImageProcess_1 = __importDefault(require("../utilities/ImageProcess"));
var imageRouter = express_1.default.Router();
imageRouter.get('/process/:image/:size', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var image, size, imageProcess, returnResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                image = req.params.image;
                size = parseInt(req.params.size);
                imageProcess = new ImageProcess_1.default(image, size);
                return [4 /*yield*/, imageProcess.checkPhotoExistInPublicFolder()];
            case 1:
                if (!((_a.sent()) === true)) return [3 /*break*/, 2];
                res.send("<img src=\"http://localhost:3000/public/".concat(imageProcess.getImageName(), "\" />"));
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, imageProcess.processeImage()];
            case 3:
                returnResponse = _a.sent();
                res.status(returnResponse.state).send(returnResponse.text);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
imageRouter.get('/ShowAll', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageProcess, returnResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imageProcess = new ImageProcess_1.default('imageName', 200);
                return [4 /*yield*/, imageProcess.showAllImage()];
            case 1:
                returnResponse = _a.sent();
                res.status(returnResponse.state).send(returnResponse.text);
                return [2 /*return*/];
        }
    });
}); });
exports.default = imageRouter;
