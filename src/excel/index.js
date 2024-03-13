"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWords = exports.getWordFromRow = exports.mySheet = void 0;
var XLSX = require("xlsx");
var fs = require("fs");
var consts_1 = require("../../consts");
var BIBLES = 'bibles.xlsx';
var TRANSLATION_TABLE = 'bsb_tables.xlsx';
var SHEET_NAME = 'biblosinterlinear96';
var FILE_PATH = BIBLES;
var COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];
var HEADINGS = [
    'Heb Sort',
    'Grk Sort',
    'BSB Sort',
    'Language',
    'Vs',
    'WLC / Nestle Base {TR} ⧼RP⧽ (WH) 〈NE〉 [NA] ‹SBL› [[ECM]]',
    ' ⇔ ',
    'Translit',
    'Parsing',
    undefined,
    'Strongs',
    'Verse',
    'Heading',
    'Cross References',
    'BSB Version',
    'Footnotes',
    'BDB / Thayers'
];
var REFERENCE = {
    A: 'Heb Sort', // Hebrew Sort
    B: 'Grk Sort', // Greek Sort
    C: 'BSB Sort', // BSB Sort
    D: 'Language', // Original Language
    E: 'Vs', // Verse Number
    F: 'WLC / Nestle Base {TR} ⧼RP⧽ (WH) 〈NE〉 [NA] ‹SBL› [[ECM]]', // Word
    G: ' ⇔ ',
    H: 'Translit', // Transliteration
    I: 'Parsing', // Parsing - Abreviation
    J: undefined, // Parsing - Full
    K: 'Strongs', // Strongs Number
    L: 'Verse', // Verse Reference
    M: 'Heading', // Heading
    N: 'Cross References', // Cross References
    O: 'BSB Version', // Translation - BSB
    P: 'Footnotes', // Footnotes
    Q: 'BDB / Thayers' // Meaning
};
var workbook = XLSX.readFile(TRANSLATION_TABLE);
var SHEET = workbook.Sheets[SHEET_NAME];
function mySheet(col, row) {
    var _a;
    return (_a = SHEET["".concat(col).concat(row)]) === null || _a === void 0 ? void 0 : _a.v;
}
exports.mySheet = mySheet;
function getHeadings(COLS) {
    return COLS.map(function (x) { var _a; return (_a = SHEET["".concat(x, "2")]) === null || _a === void 0 ? void 0 : _a.v; });
}
function getReferance() {
    var dic = new Object();
    for (var i = 0; i < COLS.length; i++) {
        var col = COLS[i];
        dic[consts_1.COL_NAMES[i]] = { 'heading': mySheet(col, 2), col: col };
        console.log(dic);
    }
    return dic;
}
// templetWord(SHEET[`F${row}`].v,SHEET[`H${row}`].v,SHEET[`J${row}`].v,SHEET[`Q${row}`].v)
var templetWord = function (row) {
    var originalWord = mySheet('F', row);
    var translit = mySheet('H', row);
    var parsing = mySheet('J', row);
    var meaning = mySheet('Q', row);
    return "## ".concat(originalWord, "\n\n**Transliteration:** ").concat(translit, "\n**Part of Speech:** ").concat(parsing, "\n**Outline of biblical Usage:**\n").concat(meaning);
};
function writeMardownFile(filename, content) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fs.writeFile("".concat(filename, ".md"), content, { flag: 'a' }, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            return [2 /*return*/];
        });
    });
}
function getWordFromRow(row, _address) {
    var _a;
    var address = mySheet('L', row) || (_address ? _address : '');
    var language = mySheet('D', row);
    var strongs = "".concat(language[0]).concat(mySheet('K', row));
    var book, chapter, verse, cv, n;
    if (address) {
        n = address.lastIndexOf(' ');
        book = address.slice(0, n);
        cv = address.slice(n + 1);
        if (cv)
            _a = cv.split(':'), chapter = _a[0], verse = _a[1];
    }
    var word = {
        heb_sort: mySheet('A', row),
        grk_sort: mySheet('B', row),
        bsb_sort: mySheet('C', row),
        language: mySheet('D', row),
        verse_sort: mySheet('E', row),
        word: mySheet('F', row),
        translit: mySheet('H', row),
        parsing: mySheet('I', row),
        parsing_full: mySheet('J', row),
        strongs: strongs,
        address: address,
        book: book,
        chapter: chapter,
        verse: verse,
        heading: mySheet('M', row),
        cross_references: mySheet('N', row),
        bsb: mySheet('O', row),
        footnotes: mySheet('P', row),
        definition: mySheet('Q', row),
    };
    return { word: word, address: address };
}
exports.getWordFromRow = getWordFromRow;
function getWords(limit, start) {
    if (start === void 0) { start = 3; }
    start = (start < 3) ? 3 : start;
    var _a = getNextWord(start), nextWord = _a.word, nextAddress = _a.address;
    var nextIndex = start + 1;
    var total = 0;
    var wordIterator = {
        next: function () {
            total++;
            var done = isFinished(nextIndex);
            var result = { value: nextWord, done: done };
            if (!done) {
                var _a = getNextWord(nextIndex, nextAddress), word = _a.word, address = _a.address, index = _a.index;
                nextAddress = address;
                nextWord = word;
                nextIndex = index + 1;
            }
            return result;
        },
    };
    function isFinished(nextIndex) {
        // if no more words or reached the end
        return (limit && total > limit) || !mySheet('E', nextIndex);
    }
    function hasWord(row) {
        return !!mySheet('K', row);
    }
    function getIndex(row) {
        var cur = row;
        while (!isFinished(cur) && !hasWord(cur))
            cur++;
        return { index: cur, success: hasWord(cur) };
    }
    function getNextWord(start, _address) {
        var _a = getIndex(start), index = _a.index, success = _a.success;
        if (success) {
            return __assign(__assign({}, getWordFromRow(index, _address)), { index: index });
        }
        return { word: undefined, address: undefined, index: index };
    }
    return wordIterator;
}
exports.getWords = getWords;
