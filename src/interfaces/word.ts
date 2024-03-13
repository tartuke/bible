import { NeboaDocument } from 'neboa';
import test from 'node:test';

export interface Word {
    heb_sort: number;
    grk_sort: number;
    bsb_sort: number;
    language: string;
    verse_sort: number;
    word: string;
    translit: string |  undefined;
    parsing: string | undefined;
    parsing_full: string | undefined;
    strongs: string;
    address: string;
    book: string;
    chapter: string;
    verse: string;
    heading: string | undefined;
    cross_references: string | undefined;
    bsb: string;
    footnotes: string | undefined;
    definition: string | undefined;
}

export const testWord: Word = {
    heb_sort: 1,
    grk_sort: 0,
    bsb_sort: 1,
    language: 'Hebrew',
    verse_sort: 1,
    word: 'בְּרֵאשִׁ֖ית',
    translit: 'bə·rê·šîṯ',
    parsing: 'Prep-b | N-fs',
    parsing_full: 'Preposition-b | Noun - feminine singular',
    strongs: 'H7225',
    address: 'Genesis 1:1',
    book: 'Genesis',
    chapter: '1',
    verse: '1',
    heading: 'The Creation',
    cross_references: '(John 1:1–5; Hebrews 11:1–3)',
    bsb: ' In the beginning ',
    footnotes: 'undefined',
    definition: '1) first, beginning, best, chief <BR> 1a) beginning <BR> 1b) first <BR> 1c) chief <BR> 1d) choice part',
  }

export type UserDocument = NeboaDocument<Word>;