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
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const resizeImg = (name, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const img = `images/full/${name}.jpg`;
    const newFile = `images/thumb/${name}_${width}x${height}.jpg`;
    try {
        // check if image already exists in the output folder
        const files = yield fs_1.promises.readdir('images/thumb');
        const fileName = path_1.default.basename(newFile);
        if (!files.includes(fileName)) {
            yield (0, sharp_1.default)(img).resize(Number(width), Number(height)).toFile(newFile);
        }
    }
    catch (e) {
        console.log('Something went wrong!');
    }
    return newFile;
});
exports.default = resizeImg;
