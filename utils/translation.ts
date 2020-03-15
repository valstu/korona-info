import Polyglot from 'node-polyglot';
import { useRouter } from 'next/router';

const phrases: { [key: string]: { [key: string]: string } } = {
  fi: {
    language: 'Suomi',
    'finland corona status': 'Suomen koronavirus-tartuntatilanne',
    cases: 'Tartunnat',
    'cases of the day': 'Päivän tartunnat',
    recovered: 'Parantuneet',
    deaths: 'Menehtyneet',
    'New cases today': 'Uudet tartunnat tänään',
    person: 'kpl',
    'no death': 'Ei menehtyneitä',
    'latest recovery': 'Viimeisin parantuminen',
    'latest case': 'Viimeisin tartunta',
    'last death': 'Viimeisin kuolema',
    'accumulated change': 'Kumulatiivinen kehitys (30 pv)',
    'cases recovered and death in past 30 days':
      'Tartuntojen, parantuneiden ja menehtyneiden kumulatiivinen kehitys viimeisen 30 päivän aikana',
    linear: 'Lineaarinen',
    logarithmic: 'Logaritminen',
    'total cases': 'Tartunnat yht.',
    'total recovered': 'Parantuneet yht.',
    'total deaths': 'Menehtyneet yht.',
    'Cases by district': 'Tartunnat sairaanhoitopiireittäin',
    'Helsinki metropolitan area is shown as HUS': "Helsingin ja Uudenmaan sairaanhoitopiiri on esitetty muodossa HUS",
      'Origin country of the cases': "Tartuntojen alkuperämaat",
      'note the testing strategy change': 'HUOM! Testaustavan muutos vaikeuttaa tilannekuvan saamista',
      'less people will be tested': 'Lukujen luotettavuuteen vaikuttaa mm. pääkaupunkiseudun sairaanhoitopiirin Husin päätös rajoittaa testaamista vain tiettyihin tärkeisiin avainryhmiin. Entistä pienempi osa Husin alueella sairastuneista varmistetaan laboratoriossa.',
      'read more': 'Lue lisää'
  },
  en: {
    language: 'English',
    'finland corona status': "Finland's corona virus status",
    cases: 'Cases',
    'cases of the day': 'Cases of the day',
    recovered: 'Recovered',
    deaths: 'Deaths',
    'New cases today': 'New cases today',
    person: '',
    'no death': 'No death',
    'latest recovery': 'Latest recovered case',
    'latest case': 'Latest case',
    'last death': 'Latest death',
    'accumulated change': 'Accumuluated change (30 days)',
    'cases recovered and death in past 30 days':
      'Cases, revovered cases and deths in the past 30 days',
    linear: 'Linear',
    logarithmic: 'Logarithmic',
    'total cases': 'Total cases',
    'total recovered': 'Total recovered',
    'total deaths': 'Total Deaths',
    'Cases by district': 'Cases by district',
    'Helsinki metropolitan area is shown as HUS': "Helsinki metropolitan area is shown as HUS",
    'Origin country of the cases': "Origin country of the cases",
    'note the testing strategy change': 'NOTE! the change in testing strategy might change stats',
    'less people will be tested': 'the stats reliability might change as in some distrcit for exmaple in Helsinki metropolian area it is decided that only special groups like health system workers etc. will be tested for COVID-19',
      'read more': 'Lue lisää'
  },
  fa: {
    language: 'فارسی',
    'finland corona status': 'وضعیت کرونای فنلاند',
    cases: 'موارد',
    recovered: 'بهبودیافتگان',
    'cases of the day': 'موارد این روز',
    deaths: 'درگذشتگان',
    'New cases today': 'بیماران جدید امروز',
    person: '',
    'no death': 'هیچکس نمرده',
    'latest recovery': 'آخرین بهبودیافته',
    'latest case': 'آخرین مورد کرونا',
    'last death': 'آخرین مرگ',
    'accumulated change': 'وضعیت در ۳۰ روز گذشته',
    'cases recovered and death in past 30 days':
      'وضعیت مبتلایان و بهبودیافتگان و درگذشتگان در سی روز گذشته',
    linear: 'خطی',
    logarithmic: 'لگاریتمی',
    'total cases': 'کل موارد',
    'total recovered': 'کل بهبودیافتگان',
    'total deaths': 'کل درگذشتگان',
    'Cases by district': 'موارد در هر استان',
    'Helsinki metropolitan area is shown as HUS': "یعنی هلسینکی و حومه «HUS»",
    'Origin country of the cases': "کشور مبدا بیماری"
  }
};

export const supportedLanguages = Object.keys(phrases).map((code: string) => {
  return { code: code, language: phrases[code]['language'] };
});

export const polyglot = new Polyglot({
  phrases
});
