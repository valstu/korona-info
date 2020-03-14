import Polyglot from 'node-polyglot';
import { useRouter } from 'next/router';

const phrases: { [key: string]: { [key: string]: string } } = {
  fi: {
    language: 'Suomi',
    'finland corona status': 'Suomen koronavirus-tartuntatilanne',
    cases: 'Tartunnat',
    recovered: 'Parantuneet',
    deaths: 'Menehtyneet',
    'New cases today': 'Uudet tartunnat tänään',
      'person': 'kpl',
      'no death': 'Ei menehtyneitä',
      'latest recovery': 'Viimeisin parantuminen',
      'latest case': 'Viimeisin tartunta',
  },
  en: {
    language: 'English',
    'finland corona status': "Finland's corona virus status",
    cases: 'Cases',
    recovered: 'Recovered',
    deaths: 'Deaths',
    'New cases today': 'New cases today',
    'person': ''
  },
  fa: {
    language: 'Farsi',
    'finland corona status': 'وضعیت کرونای فنلاند',
    cases: 'موارد',
    recovered: 'بهبودیافتگان',
    deaths: 'درگذشتگان',
    'New cases today': 'بیماران جدید امروز',
    'person': ''
  }
};

export const supportedLanguages = Object.keys(phrases).map((code: string) => {
  return { code: code, language: phrases[code]['language'] };
});

export const polyglot = new Polyglot({
  phrases
});
