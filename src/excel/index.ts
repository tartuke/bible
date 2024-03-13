import { Word } from "../interfaces/word";

import * as XLSX from "xlsx";
import * as fs from 'fs';
import { COL_NAMES } from "../../consts";

const BIBLES = 'bibles.xlsx'
const TRANSLATION_TABLE = 'bsb_tables.xlsx'

const SHEET_NAME = 'biblosinterlinear96'

const FILE_PATH = BIBLES

const COLS = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q' ]
const HEADINGS = [
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
  ]

const REFERENCE = {
    A: 'Heb Sort',                                                  // Hebrew Sort
    B: 'Grk Sort',                                                  // Greek Sort
    C: 'BSB Sort',                                                  // BSB Sort
    D: 'Language',                                                  // Original Language
    E: 'Vs',                                                        // Verse Number
    F: 'WLC / Nestle Base {TR} ⧼RP⧽ (WH) 〈NE〉 [NA] ‹SBL› [[ECM]]', // Word
    G: ' ⇔ ',                                                       
    H: 'Translit',                                                  // Transliteration
    I: 'Parsing',                                                   // Parsing - Abreviation
    J: undefined,                                                   // Parsing - Full
    K: 'Strongs',                                                   // Strongs Number
    L: 'Verse',                                                     // Verse Reference
    M: 'Heading',                                                   // Heading
    N: 'Cross References',                                          // Cross References
    O: 'BSB Version',                                               // Translation - BSB
    P: 'Footnotes',                                                 // Footnotes
    Q: 'BDB / Thayers'                                              // Meaning
}

var workbook = XLSX.readFile(TRANSLATION_TABLE)

const SHEET = workbook.Sheets[SHEET_NAME]

export function mySheet(col: string,row: number) {
   return SHEET[`${col}${row}`]?.v as string
}

function getHeadings(COLS) {
    return COLS.map(x =>  SHEET[`${x}2`]?.v)
}

function getReferance() {
    const dic = new Object()
    for(let i=0;i<COLS.length; i++) {
        let col = COLS[i]
        dic[COL_NAMES[i]] = {'heading': mySheet(col,2), col}
        console.log(dic)
    }
    return dic
}

// templetWord(SHEET[`F${row}`].v,SHEET[`H${row}`].v,SHEET[`J${row}`].v,SHEET[`Q${row}`].v)
const templetWord = (row) =>  {
    const originalWord = mySheet('F',row)
    const translit = mySheet('H',row)
    const parsing = mySheet('J',row)
    const meaning = mySheet('Q',row)

return `## ${originalWord}

**Transliteration:** ${translit}
**Part of Speech:** ${parsing}
**Outline of biblical Usage:**
${meaning}`
}

async function writeMardownFile(filename,content) {
    fs.writeFile(`${filename}.md`, content,{ flag: 'a' }, err => {
        if (err) {
          console.error(err);
        }
      });
}

export function getWordFromRow(row: number, _address?: string) {
    const address =  mySheet('L',row) || (_address ? _address:'')
    const language = mySheet('D',row)
    const strongs = `${language[0]}${mySheet('K',row)}`
    var book,chapter,verse, cv, n
    if (address) {
        n =  address.lastIndexOf(' ')
        book = address.slice(0,n)
        cv = address.slice(n+1)
        if(cv)
            [chapter,verse] = cv.split(':')
    }
    const word: Word = {
        heb_sort: mySheet('A', row) as unknown as number,
        grk_sort: mySheet('B',row) as unknown as number,
        bsb_sort: mySheet('C',row) as unknown as number,
        language: mySheet('D',row),
        verse_sort: mySheet('E',row) as unknown as number,
        word: mySheet('F',row),
        translit: mySheet('H',row),
        parsing: mySheet('I',row),
        parsing_full: mySheet('J',row),
        strongs: strongs,
        address: address,
        book: book,
        chapter: chapter,
        verse: verse,
        heading: mySheet('M',row),
        cross_references: mySheet('N',row),
        bsb: mySheet('O',row),
        footnotes: mySheet('P',row),
        definition: mySheet('Q',row),
    }
    return {word,address}
}

export function getWords(limit?: number, start: number = 3) {
    start = (start < 3)? 3 : start
    let { word: nextWord, address: nextAddress} = getNextWord(start)
    let nextIndex = start + 1
    let total = 0
 
    const wordIterator = {
        next() {
            total++;
            let done = isFinished(nextIndex)
            let result = { value: nextWord, done}
            if (!done) {
                let { word, address, index} = getNextWord(nextIndex, nextAddress)
                nextAddress = address
                nextWord = word
                nextIndex = index + 1
            }
            return result
        },
    };


    function isFinished(nextIndex: number) {
        // if no more words or reached the end
        return (limit && total > limit) || !mySheet('E',nextIndex)
    }

    function hasWord(row: number) {
        return !!mySheet('K',row)
    }

    function getIndex(row: number) {
        let cur = row
        while (!isFinished(cur) && !hasWord(cur)) cur++;
        return {index: cur, success: hasWord(cur)}
    }

    function getNextWord(start: number, _address?: string) {
        let {index, success } = getIndex(start)
        if (success) {
            return {...getWordFromRow(index, _address), index}
        }
        return {word: undefined, address: undefined, index}
    }

    return wordIterator;
}