"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertWord = exports._insertWord = exports.db = void 0;
var Database = require("better-sqlite3");
var word_1 = require("../interfaces/word");
exports.db = new Database('db.db');
exports.db.prepare("\n    CREATE TABLE IF NOT EXISTS \"words\" (\n        heb_sort INTEGER NOT NULL,\n        grk_sort INTEGER  NOT NULL,\n        bsb_sort INTEGER NOT NULL UNIQUE,\n        language TEXT  NOT NULL,\n        verse_sort INTEGER  NOT NULL,\n        word TEXT  NOT NULL,\n        translit TEXT,\n        parsing TEXT,\n        parsing_full TEXT,\n        strongs TEXT  NOT NULL,\n        address TEXT  NOT NULL,\n        book TEXT  NOT NULL,\n        chapter INTEGER  NOT NULL,\n        verse INTEGER  NOT NULL,\n        heading TEXT,\n        cross_references TEXT,\n        bsb TEXT  NOT NULL,\n        footnotes TEXT,\n        definition TEXT\n    )\n").run();
function dbInsertString(table, obj) {
    return "INSERT INTO ".concat(table, " (").concat(Object.keys(obj), ") VALUES (").concat(Object.keys(obj).map(function (e) { return "@".concat(e); }), ")");
}
exports._insertWord = exports.db.prepare(dbInsertString('words', word_1.testWord));
function insertWord(word) {
    console.log(word);
    return exports._insertWord.run(word);
}
exports.insertWord = insertWord;
