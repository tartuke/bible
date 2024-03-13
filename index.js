var XLSX = require("xlsx");
const fs = require('node:fs');
const { COL_NAMES } = require("./consts");

const BIBLES = 'bibles.xlsx'
const TRANSLATION_TABLE = 'bsb_tables.xlsx'

const SHEET_NAME = 'biblosinterlinear96'

const FILE_PATH = BIBLES

const COLS = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q' ].l
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

const mySheet = (col,row) => {
   return SHEET[`${col}${row}`]?.v
}

const getHeadings = COLS => {
    return COLS.map(x =>  SHEET[`${x}2`]?.v)
}

const getReferance = () => {
    const dic = new Object()
    for(i=0;i<COLS.length; i++) {
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
