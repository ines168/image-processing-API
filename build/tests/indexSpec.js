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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("../index"));
const resizeImg_1 = __importDefault(require("../utils/resizeImg"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint response', () => {
    it('expects successful response from the /api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
    }));
    it('expects successful response from the /api/images?query endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&w=200&h=100');
        expect(response.status).toBe(200);
    }));
});
describe('Test image transform', () => {
    it('creates a file with resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        const newFile = path_1.default.resolve('images/thumb', `fjord_200x200.jpg`);
        if (fs_1.default.existsSync(newFile)) {
            fs_1.default.unlinkSync(newFile);
        }
        yield (0, resizeImg_1.default)('fjord', 200, 200);
        expect(fs_1.default.existsSync(newFile)).toBeTruthy();
    }));
});
