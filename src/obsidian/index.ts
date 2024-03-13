import { getWords } from "../database/betterSqlite";
import { Word } from "../interfaces/word";
const fs = require('node:fs');


function getVerse(address: string) {
  return getWords({address})
}

const templetWordDefinition = (word: Word) =>  {

return `## ${word.word}

**Transliteration:** ${word.translit}
**Part of Speech:** ${word.parsing}
**Outline of biblical Usage:**
${word.definition}`
}

function templetBSBTranslation(word: Word) {
  return `[[${word.strongs}|${word.bsb.trim()}]]`
}

function templetBSBVerse(verse: [Word]) {
  return `${verse.map(w => `${templetBSBTranslation(w)} `).join('')}`
}

async function writeMardownFile(filename,content) {
    fs.writeFile(`markdown/${filename}.md`, content,{ flag: 'a' }, err => {
        if (err) {
          console.error(err);
        }
      });
}

async function writeWordDefinition(word: Word) {
  await writeMardownFile(`words/${word.strongs}`,templetWordDefinition(word))
}

function writeVerse(address) {
  const verse = getVerse(address)
  console.log(verse)
  verse.forEach(w => {
    writeWordDefinition(w)
  })
  writeMardownFile(address,templetBSBVerse(verse))
}

writeVerse('Genesis 1:1')