"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var betterSqlite_1 = require("./database/betterSqlite");
var excel_1 = require("./excel");
function insertAllWords() {
    var words = (0, excel_1.getWords)();
    var result = words.next();
    while (!result.done) {
        if (result.value) {
            //console.log(result.value)
            (0, betterSqlite_1.insertWord)(result.value);
        }
        result = words.next();
    }
}
insertAllWords();
