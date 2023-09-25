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
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const resizeImg_1 = __importDefault(require("../utils/resizeImg"));
const router = express_1.default.Router();
router.get('/api', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield fs_1.promises.readdir('images/full');
        res.render('index', { images });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/api/images', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const {filename, w, h}: {filename:string, w:number, h:number} = req.query; destructuring doesnt work
        const filename = req.query.filename;
        const w = req.query.w;
        const h = req.query.h;
        if (!filename || !w || !h) {
            req.flash('error', 'You must provide filename, width and height!');
            return res.redirect('/api');
        }
        const newFile = yield (0, resizeImg_1.default)(filename, w, h);
        res.sendFile(newFile, { root: __dirname + '/../../' });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
