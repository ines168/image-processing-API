"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_session_1 = __importDefault(require("express-session"));
const images_1 = __importDefault(require("./routes/images"));
const app = (0, express_1.default)();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../images')));
const sessionConfig = {
    secret: 'xzy',
    resave: false,
    saveUninitialized: true,
};
app.use((0, express_session_1.default)(sessionConfig));
app.use((0, connect_flash_1.default)());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
app.use('/', images_1.default);
// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
    res.status(500).send('Something broke! Try again!');
};
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
exports.default = app;
