"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var path_1 = __importDefault(require("path"));
exports.default = winston_1.default.createLogger({
    // format của log được kết hợp thông qua format.combine
    format: winston_1.default.format.combine(winston_1.default.format.splat(), 
    // Định dạng time cho log
    winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), 
    // thêm màu sắc
    winston_1.default.format.colorize(), 
    // thiết lập định dạng của log
    winston_1.default.format.printf(function (log) {
        // nếu log là error hiển thị stack trace còn không hiển thị message của log
        if (log.stack)
            return "[" + log.timestamp + "] [" + log.level + "] " + log.stack;
        return "[" + log.timestamp + "] [" + log.level + "] " + log.message;
    })),
    transports: [
        // hiển thị log thông qua console
        new winston_1.default.transports.Console(),
        // Thiết lập ghi các errors vào file
        new winston_1.default.transports.File({
            level: 'error',
            filename: path_1.default.join(__dirname, '/log/errors.log')
        })
    ]
});
