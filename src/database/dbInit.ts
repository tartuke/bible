import { insertWord } from "../database/betterSqlite";
import { getWords } from "../excel";



function insertAllWords() {
    const words = getWords()
    let result = words.next()
    while (!result.done) {
        if (result.value) {
            //console.log(result.value)
            insertWord(result.value)
        }
        result = words.next();
      }
}

insertAllWords()