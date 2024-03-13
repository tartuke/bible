import * as Database from 'better-sqlite3';
import { Word, testWord } from '../interfaces/word';

export const db = new Database('db.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS "words" (
        heb_sort INTEGER NOT NULL,
        grk_sort INTEGER  NOT NULL,
        bsb_sort INTEGER NOT NULL UNIQUE,
        language TEXT  NOT NULL,
        verse_sort INTEGER  NOT NULL,
        word TEXT  NOT NULL,
        translit TEXT,
        parsing TEXT,
        parsing_full TEXT,
        strongs TEXT  NOT NULL,
        address TEXT  NOT NULL,
        book TEXT  NOT NULL,
        chapter INTEGER  NOT NULL,
        verse INTEGER  NOT NULL,
        heading TEXT,
        cross_references TEXT,
        bsb TEXT  NOT NULL,
        footnotes TEXT,
        definition TEXT
    )
`).run()




function dbInsertString(table: string, obj: object) {
    return `INSERT INTO ${table} (${Object.keys(obj)}) VALUES (${Object.keys(obj).map(e => `@${e}`)})`
}
export const _insertWord = db.prepare(dbInsertString('words',testWord));

export function insertWord(word: Word) {
    console.log(word)
    return _insertWord.run(word)
}

