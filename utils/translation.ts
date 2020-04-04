import Polyglot from 'node-polyglot';
import { useRouter } from 'next/router';

const phrases: { [key: string]: { [key: string]: string } } = {
  fi: {
    language: 'Suomi',
    'finland corona status': 'Suomen koronavirus-tartuntatilanne',
    cases: 'Varmennetut tapaukset',
    'cases of the day': 'Päivän varmennetut tapaukset',
    recovered: 'Vahvistetut parantuneet',
    deaths: 'Menehtyneet',
    'New cases today': 'Uudet varmennetut tapaukset tänään',
    person: 'kpl',
    'no death': 'Ei menehtyneitä',
    'latest recovery': 'Viimeisin parantuminen',
    'latest case': 'Viimeisin varmennettu tapaus',
    'last death': 'Viimeisin kuolema',
    'accumulated change': 'Kumulatiivinen kehitys (30 pv)',
    'accumulation by healthcare district':
      'Sairaanhoitopiirikohtainen kehitys  (30 pv)',
    'healthcare district': 'Sairaanhoitopiiri',
    'All healthcare districts': 'Kaikki sairaanhoitopiirit',
    'cases recovered and death in past 30 days':
      'Varmennettujen tapausten, parantuneiden ja menehtyneiden kumulatiivinen kehitys viimeisen 30 päivän aikana',
    linear: 'Lineaarinen',
    logarithmic: 'Logaritminen',
    cumulative: 'Kumulatiivinen',
    daily: 'Päivittäinen',
    'total cases': 'Varmennetut tapaukset yht.',
    'total recovered': 'Parantuneet yht.',
    'recoveredNotice': 'Sisältää vain tapaukset joista HS on saanut tiedon, määrä on todellisuudessa suurempi',
    'total deaths': 'Menehtyneet yht.',
    'Cases by district': 'Varmennetut tapaukset sairaanhoitopiireittäin',
    'Helsinki metropolitan area is shown as HUS':
      'Helsingin ja Uudenmaan sairaanhoitopiiri on esitetty muodossa HUS',
    'Origin country of the cases': 'Varmennettujen tapausten alkuperämaat',
    'note the testing strategy change':
      'HUOM! Testaustavan muutos vaikeuttaa tilannekuvan saamista',
    'less people will be tested':
      'Lukujen luotettavuuteen vaikuttaa 14. maaliskuuta tehty valtakunnallinen testausstrategian muutos. Testausta rajoitettiin vain tiettyihin avainryhmiin. Entistä pienempi osa sairastuneista varmistetaan laboratoriossa mikä näkyy vähentyneenä tartuntojen lukumääränä. Myös tiedottamiskäytännöissä on tapahtunut muutoksia minkä johdosta alueellisissa tiedoissa saattaa ilmetä puutteita tai eroja.',
    'read more': 'Lue lisää',
    'The data is based on':
      'Sivun tiedot pohjautuvat Helsingin Sanomien julkaisemaan ',
    'open data': 'avoimeen dataan',
    'HS has gathered these data from':
      'Suomen koronavirus-tartunnoista. HS on kerännyt aineiston julkisista lähteistä: tiedotustilaisuuksista, mediasta ja haastatteluista. Dataa päivitetään aina kun uusia tietoja tulee. Voit lukea lisätietoja koronaviruksesta alla olevista linkeistä:',
    'What is corona virus': 'Mikä on koronavirus',
    'Corona virus prevention tips':
      'Toimintaohjeet koronaviruksen tartunnan ehkäisyyn',
    infectionsPerDisrictAndSize:
      'Varmennetut tapaukset sairaanhoitopiireittäin / sairaanhoitopiirin koko',
    originCountryFooter:
      'Suomen varmennettujan tapausten lukumäärät alkuperämaittain',
    log: 'Tartuntaloki',
    logFooter:
      'Kaikki Suomen varmennetut tapaukset listana, uusimmat ensin. Jokin id saattaa puuttua välistä',
    infectionNetwork: 'Tartuntaverkosto',
    infectionNetworkFooter:
      'Kuvio esittää varmennetut tapaukset verkostona. Numero on tartunnan järjestysnumero. Mikäli suoraa tartuttajaa ei tiedetä linkitetään tartunta alkuperämaahan. Kuvasta on jätetty pois tartunnat joiden suoraa aiheuttajaa tai alkuperämaata ei ole tiedossa. Suomeen merkatut tartunnat liittyvät suurella todennäköisyydellä muihin tartuntaverkostoihin. Solun väri kertoo maan jossa tartunta on todennäköisesti tapahtunut.',
    unknown: 'tuntematon',
    total: 'Yht.',
    hospitalizedData: 'Sairaalahoidossa olevat'
  },
  en: {
    language: 'English',
    'finland corona status': "Finland's corona virus status",
    cases: 'Cases',
    'cases of the day': 'Cases of the day',
    recovered: 'Recovered (confirmed)',
    deaths: 'Deaths',
    'New cases today': 'New cases today',
    person: '',
    'no death': 'No death',
    'latest recovery': 'Latest recovered case',
    'latest case': 'Latest case',
    'last death': 'Latest death',
    'accumulated change': 'Accumuluated change (30 days)',
    'accumulation by healthcare district':
      'Accumuluated change by healthcare district (30 days)',
    'healthcare district': 'Healthcare district',
    'All healthcare districts': 'All healthcare districts',
    'cases recovered and death in past 30 days':
      'Cases, recovered cases, and deaths in the past 30 days',
    linear: 'Linear',
    logarithmic: 'Logarithmic',
    cumulative: 'Cumulative',
    daily: 'Daily',
    'total cases': 'Total cases',
    'total recovered': 'Total recovered',
    'recoveredNotice': 'Includes only recovered cases that HS has infomation about, true amount is higher.',
    'total deaths': 'Total Deaths',
    'Cases by district': 'Cases by district',
    'Helsinki metropolitan area is shown as HUS':
      'Helsinki metropolitan area is shown as HUS',
    'Origin country of the cases': 'Origin country of the cases',
    'note the testing strategy change':
      'NOTE! The change in testing strategy might change stats',
    'less people will be tested':
      'The stats reliability might change as in some districts, for example the Helsinki metropolian area, have decided that only special groups like health system workers etc. will be tested for COVID-19',
    'read more': 'Read more',
    'The data is based on':
      'Information on this page is based on open data provided by ',
    'open data': 'Helsingin Sanomat.',
    'HS has gathered these data from':
      'Helsingin Sanomat has gathered the information from multiple public sources: press conferences, other media and interviews. Data is updated whenever new information about the cases appear. More information below:',
    'What is corona virus': 'What is corona virus (in finnish)',
    'Corona virus prevention tips': 'Corona virus prevention tips (in finnish)',
    infectionsPerDisrictAndSize:
      'Infections in healthcare district / healthcare district size',
    originCountryFooter: 'Origin countries of the cases in Finland',
    log: 'Infection Log',
    logFooter:
      'All cases in Finland as a list, latest first. Id is not a running number.',
    infectionNetwork: 'Infection network graph',
    infectionNetworkFooter:
      'Number is the id of the case. Cases withouth origin are left out.',
    unknown: 'unknown',
    total: 'All',
    hospitalizedData: 'Number of people in hospital care'
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
    'healthcare district': 'Healthcare district',
    'All healthcare districts': 'All healthcare districts',
    'recoveredNotice': 'Includes only recovered cases that HS has infomation about, true amount is higher.',
    'total deaths': 'کل درگذشتگان',
    'Cases by district': 'موارد در هر استان',
    'Helsinki metropolitan area is shown as HUS': 'یعنی هلسینکی و حومه «HUS»',
    'Origin country of the cases': 'کشور مبدا بیماری',
    'note the testing strategy change':
      'توجه! برنامه آزمایش مشکوکان به کرونا در فنلاند تغییر کرده',
    'less people will be tested':
      'به دلیل این که در برخی استانهای فنلاند از جمله هلسینکی و حومه تصمیم بر آن شده که دیگر فقط از گروههای خاصی مثل کارکنان نظام سلامت  آزمایش کرونا بگیرند آماری که در این صفحه میبینید ممکن است با اقعیت متفاوت باشد',
    'read more': 'بیشتر بخوانید',
    'The data is based on': 'اطلاعات این صفحه بر اساس',
    'open data': 'داده‌ باز',
    'HS has gathered these data from':
      'کرونا در فنلاند است. هلسینکی سانومات این اطلاعات را از منابع مختلف از جمله مصاحبه‌ها با مقامات رسمی و غیره جمع آوری کرده.',
    'What is corona virus': 'ویروس کرونا چیست',
    'Corona virus prevention tips': 'راههای پیشگیری از کرونا',
    infectionsPerDisrictAndSize:
      'Infections in healthcare district / healthcare district size',
    originCountryFooter: 'Origin countries of the cases in Finland',
    log: 'Infection Log',
    logFooter:
      'All cases in Finland as a list, latest first. Id is not a running number.',
    infectionNetwork: 'Infection network graph',
    infectionNetworkFooter:
      'Number is the id of the case. Cases withouth origin are left out.',
    unknown: 'ناشناخته',
    total: 'همه'
  }
};

export const supportedLanguages = Object.keys(phrases).map((code: string) => {
  return { code: code, language: phrases[code]['language'] };
});

export const polyglot = new Polyglot({
  phrases
});
