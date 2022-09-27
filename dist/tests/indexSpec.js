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
var ImageProcess_1 = __importDefault(require("../utilities/ImageProcess"));
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', function () {
    it('Process Image exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/image/process/fjord.jpg/200')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    expect(response.text).toBe('<img src="http://localhost:3000/public/fjord_200.jpg" />');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Image Process', function () {
    describe('add image', function () {
        it('Image exist in my public folder', function () { return __awaiter(void 0, void 0, void 0, function () {
            var imageProcess, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        imageProcess = new ImageProcess_1.default('palmtunnel.jpg', 400);
                        _a = expect;
                        return [4 /*yield*/, imageProcess.checkPhotoExistInPublicFolder()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Image Not exist in my public folder', function () { return __awaiter(void 0, void 0, void 0, function () {
            var imageProcess, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        imageProcess = new ImageProcess_1.default('~!@$%&*()(*&^%$).jpg', 400);
                        _a = expect;
                        return [4 /*yield*/, imageProcess.checkPhotoExistInPublicFolder()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Make file name', function () {
            var imageProcess = new ImageProcess_1.default('Andrew.jpg', 200);
            expect(imageProcess.getImageName()).toBe('Andrew_200.jpg');
        });
        it('Process Image exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var imageProcess, _a, state, text;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        imageProcess = new ImageProcess_1.default('fjord.jpg', 200);
                        return [4 /*yield*/, imageProcess.processeImage()];
                    case 1:
                        _a = _b.sent(), state = _a.state, text = _a.text;
                        expect(text).toBe('<img src="http://localhost:3000/public/fjord_200.jpg" />');
                        expect(state).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Process Image Not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var imageProcess, _a, state, text;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        imageProcess = new ImageProcess_1.default('~!@$%&*()(*&^%$).jpg', 200);
                        return [4 /*yield*/, imageProcess.processeImage()];
                    case 1:
                        _a = _b.sent(), state = _a.state, text = _a.text;
                        expect(text).toBe('Not found');
                        expect(state).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
