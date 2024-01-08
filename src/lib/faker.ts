import { faker } from "@faker-js/faker";

type MockDataType = {
  name: string;
  option: any;
  type: string;
};

const generate = (key: string, option: any) => {
  switch (key) {
    case "airline/aircrafttype":
      return faker.airline.aircraftType();
    case "airline/airline":
      return faker.airline.airline();
    case "airline/airplane":
      return faker.airline.airplane();
    case "airline/airport":
      return faker.airline.airport();
    case "airline/flightnumber":
      if (option) return faker.airline.flightNumber(option);
      return faker.airline.flightNumber();
    case "airline/recordlocator":
      if (option) return faker.airline.recordLocator(option);
      return faker.airline.recordLocator();
    case "airline/seat":
      if (option) return faker.airline.seat(option);
      return faker.airline.seat();
    case "animal/bear":
      return faker.animal.bear();
    case "animal/bird":
      return faker.animal.bird();
    case "animal/cat":
      return faker.animal.cat();
    case "animal/cetacean":
      return faker.animal.cetacean();
    case "animal/cow":
      return faker.animal.cow();
    case "animal/crocodilia":
      return faker.animal.crocodilia();
    case "animal/dog":
      return faker.animal.dog();
    case "animal/fish":
      return faker.animal.fish();
    case "animal/horse":
      return faker.animal.horse();
    case "animal/insect":
      return faker.animal.insect();
    case "animal/lion":
      return faker.animal.lion();
    case "animal/rabbit":
      return faker.animal.rabbit();
    case "animal/rodent":
      return faker.animal.rodent();
    case "animal/snake":
      return faker.animal.snake();
    case "animal/type":
      return faker.animal.type();
    case "color/cmyk":
      if (option) return faker.color.cmyk(option);
      return faker.color.cmyk();
    case "color/colorbycsscolorspace":
      if (option) return faker.color.colorByCSSColorSpace(option);
      return faker.color.colorByCSSColorSpace();
    case "color/csssupportedfunction":
      return faker.color.cssSupportedFunction();
    case "color/csssupportedspace":
      return faker.color.cssSupportedSpace();
    case "color/hsl":
      if (option) return faker.color.hsl(option);
      return faker.color.hsl();
    case "color/human":
      return faker.color.human();
    case "color/hwb":
      if (option) return faker.color.hwb(option);
      return faker.color.hwb();
    case "color/lab":
      if (option) return faker.color.lab(option);
      return faker.color.lab();
    case "color/lch":
      if (option) return faker.color.lch(option);
      return faker.color.lch();
    case "color/rgb":
      if (option) return faker.color.rgb(option);
      return faker.color.rgb();
    case "color/space":
      return faker.color.space();
    case "commerce/department":
      return faker.commerce.department();
    case "commerce/isbn":
      if (option) return faker.commerce.isbn(option);
      return faker.commerce.isbn();
    case "commerce/price":
      if (option) return faker.commerce.price(option);
      return faker.commerce.price();
    case "commerce/product":
      return faker.commerce.product();
    case "commerce/productadjective":
      return faker.commerce.productAdjective();
    case "commerce/productdescription":
      return faker.commerce.productDescription();
    case "commerce/productmaterial":
      return faker.commerce.productMaterial();
    case "commerce/productname":
      return faker.commerce.productName();
    case "company/buzzadjective":
      return faker.company.buzzAdjective();
    case "company/buzznoun":
      return faker.company.buzzNoun();
    case "company/buzzphrase":
      return faker.company.buzzPhrase();
    case "company/buzzverb":
      return faker.company.buzzVerb();
    case "company/catchphrase":
      return faker.company.catchPhrase();
    case "company/catchphraseadjective":
      return faker.company.catchPhraseAdjective();
    case "company/catchphrasedescriptor":
      return faker.company.catchPhraseDescriptor();
    case "company/catchphrasenoun":
      return faker.company.catchPhraseNoun();
    case "company/name":
      return faker.company.name();
    case "database/collation":
      return faker.database.collation();
    case "database/column":
      return faker.database.column();
    case "database/engine":
      return faker.database.engine();
    case "database/mongodbobjectid":
      return faker.database.mongodbObjectId();
    case "database/type":
      return faker.database.type();
    case "datatype/boolean":
      if (option) return faker.datatype.boolean(option);
      return faker.datatype.boolean();
    case "date/anytime":
      if (option) return faker.date.anytime(option);
      return faker.date.anytime();
    case "date/birthdate":
      if (option) return faker.date.birthdate(option);
      return faker.date.birthdate();
    case "date/future":
      if (option) return faker.date.future(option);
      return faker.date.future();
    case "date/month":
      if (option) return faker.date.month(option);
      return faker.date.month();
    case "date/past":
      if (option) return faker.date.past(option);
      return faker.date.past();
    case "date/recent":
      if (option) return faker.date.recent(option);
      return faker.date.recent();
    case "date/soon":
      if (option) return faker.date.soon(option);
      return faker.date.soon();
    case "date/weekday":
      if (option) return faker.date.weekday(option);
      return faker.date.weekday();
    case "finance/accountname":
      return faker.finance.accountName();
    case "finance/accountnumber":
      if (option) return faker.finance.accountNumber(option);
      return faker.finance.accountNumber();
    case "finance/amount":
      if (option) return faker.finance.amount(option);
      return faker.finance.amount();
    case "finance/bic":
      if (option) return faker.finance.bic(option);
      return faker.finance.bic();
    case "finance/bitcoinaddress":
      return faker.finance.bitcoinAddress();
    case "finance/creditcardcvv":
      return faker.finance.creditCardCVV();
    case "finance/creditcardissuer":
      return faker.finance.creditCardIssuer();
    case "finance/creditcardnumber":
      if (option) return faker.finance.creditCardNumber(option);
      return faker.finance.creditCardNumber();
    case "finance/currency":
      return faker.finance.currency();
    case "finance/currencycode":
      return faker.finance.currencyCode();
    case "finance/currencyname":
      return faker.finance.currencyName();
    case "finance/currencysymbol":
      return faker.finance.currencySymbol();
    case "finance/ethereumaddress":
      return faker.finance.ethereumAddress();
    case "finance/iban":
      if (option) return faker.finance.iban(option);
      return faker.finance.iban();
    case "finance/litecoinaddress":
      return faker.finance.litecoinAddress();
    case "finance/maskednumber":
      if (option) return faker.finance.maskedNumber(option);
      return faker.finance.maskedNumber();
    case "finance/pin":
      if (option) return faker.finance.pin(option);
      return faker.finance.pin();
    case "finance/routingnumber":
      return faker.finance.routingNumber();
    case "finance/transactiondescription":
      return faker.finance.transactionDescription();
    case "finance/transactiontype":
      return faker.finance.transactionType();
    case "git/branch":
      return faker.git.branch();
    case "git/commitdate":
      if (option) return faker.git.commitDate(option);
      return faker.git.commitDate();
    case "git/commitentry":
      if (option) return faker.git.commitEntry(option);
      return faker.git.commitEntry();
    case "git/commitmessage":
      return faker.git.commitMessage();
    case "git/commitsha":
      if (option) return faker.git.commitSha(option);
      return faker.git.commitSha();
    case "hacker/abbreviation":
      return faker.hacker.abbreviation();
    case "hacker/adjective":
      return faker.hacker.adjective();
    case "hacker/ingverb":
      return faker.hacker.ingverb();
    case "hacker/noun":
      return faker.hacker.noun();
    case "hacker/phrase":
      return faker.hacker.phrase();
    case "hacker/verb":
      return faker.hacker.verb();
    case "image/avatar":
      return faker.image.avatar();
    case "image/avatargithub":
      return faker.image.avatarGitHub();
    case "image/avatarlegacy":
      return faker.image.avatarLegacy();
    case "image/datauri":
      if (option) return faker.image.dataUri(option);
      return faker.image.dataUri();
    case "image/url":
      if (option) return faker.image.url(option);
      return faker.image.url();
    case "image/urlloremflickr":
      if (option) return faker.image.urlLoremFlickr(option);
      return faker.image.urlLoremFlickr();
    case "image/urlpicsumphotos":
      if (option) return faker.image.urlPicsumPhotos(option);
      return faker.image.urlPicsumPhotos();
    case "image/urlplaceholder":
      if (option) return faker.image.urlPlaceholder(option);
      return faker.image.urlPlaceholder();
    case "internet/avatar":
      return faker.internet.avatar();
    case "internet/color":
      if (option) return faker.internet.color(option);
      return faker.internet.color();
    case "internet/displayname":
      if (option) return faker.internet.displayName(option);
      return faker.internet.displayName();
    case "internet/domainname":
      return faker.internet.domainName();
    case "internet/domainsuffix":
      return faker.internet.domainSuffix();
    case "internet/domainword":
      return faker.internet.domainWord();
    case "internet/email":
      if (option) return faker.internet.email(option);
      return faker.internet.email();
    case "internet/emoji":
      if (option) return faker.internet.emoji(option);
      return faker.internet.emoji();
    case "internet/exampleemail":
      if (option) return faker.internet.exampleEmail(option);
      return faker.internet.exampleEmail();
    case "internet/httpmethod":
      return faker.internet.httpMethod();
    case "internet/httpstatuscode":
      if (option) return faker.internet.httpStatusCode(option);
      return faker.internet.httpStatusCode();
    case "internet/ip":
      return faker.internet.ip();
    case "internet/ipv4":
      return faker.internet.ipv4();
    case "internet/ipv6":
      return faker.internet.ipv6();
    case "internet/mac":
      if (option) return faker.internet.mac(option);
      return faker.internet.mac();
    case "internet/password":
      if (option) return faker.internet.password(option);
      return faker.internet.password();
    case "internet/port":
      return faker.internet.port();
    case "internet/protocol":
      return faker.internet.protocol();
    case "internet/url":
      if (option) return faker.internet.url(option);
      return faker.internet.url();
    case "internet/useragent":
      return faker.internet.userAgent();
    case "internet/username":
      if (option) return faker.internet.userName(option);
      return faker.internet.userName();
    case "location/buildingnumber":
      return faker.location.buildingNumber();
    case "location/cardinaldirection":
      if (option) return faker.location.cardinalDirection(option);
      return faker.location.cardinalDirection();
    case "location/city":
      return faker.location.city();
    case "location/country":
      return faker.location.country();
    case "location/countrycode":
      if (option) return faker.location.countryCode(option);
      return faker.location.countryCode();
    case "location/county":
      return faker.location.county();
    case "location/direction":
      if (option) return faker.location.direction(option);
      return faker.location.direction();
    case "location/latitude":
      if (option) return faker.location.latitude(option);
      return faker.location.latitude();
    case "location/longitude":
      if (option) return faker.location.longitude(option);
      return faker.location.longitude();
    case "location/nearbygpscoordinate":
      if (option) return faker.location.nearbyGPSCoordinate(option);
      return faker.location.nearbyGPSCoordinate();
    case "location/ordinaldirection":
      if (option) return faker.location.ordinalDirection(option);
      return faker.location.ordinalDirection();
    case "location/secondaryaddress":
      return faker.location.secondaryAddress();
    case "location/state":
      if (option) return faker.location.state(option);
      return faker.location.state();
    case "location/street":
      return faker.location.street();
    case "location/streetaddress":
      if (option) return faker.location.streetAddress(option);
      return faker.location.streetAddress();
    case "location/timezone":
      return faker.location.timeZone();
    case "location/zipcode":
      if (option) return faker.location.zipCode(option);
      return faker.location.zipCode();
    case "lorem/lines":
      if (option) return faker.lorem.lines(option);
      return faker.lorem.lines();
    case "lorem/paragraph":
      if (option) return faker.lorem.paragraph(option);
      return faker.lorem.paragraph();
    case "lorem/paragraphs":
      if (option) return faker.lorem.paragraphs(option);
      return faker.lorem.paragraphs();
    case "lorem/sentence":
      if (option) return faker.lorem.sentence(option);
      return faker.lorem.sentence();
    case "lorem/sentences":
      if (option) return faker.lorem.sentences(option);
      return faker.lorem.sentences();
    case "lorem/slug":
      if (option) return faker.lorem.slug(option);
      return faker.lorem.slug();
    case "lorem/text":
      return faker.lorem.text();
    case "lorem/word":
      if (option) return faker.lorem.word(option);
      return faker.lorem.word();
    case "lorem/words":
      if (option) return faker.lorem.words(option);
      return faker.lorem.words();
    case "music/genre":
      return faker.music.genre();
    case "music/songname":
      return faker.music.songName();
    case "number/bigint":
      if (option) return faker.number.bigInt(option);
      return faker.number.bigInt();
    case "number/binary":
      if (option) return faker.number.binary(option);
      return faker.number.binary();
    case "number/float":
      if (option) return faker.number.float(option);
      return faker.number.float();
    case "number/hex":
      if (option) return faker.number.hex(option);
      return faker.number.hex();
    case "number/int":
      if (option) return faker.number.int(option);
      return faker.number.int();
    case "number/octal":
      if (option) return faker.number.octal(option);
      return faker.number.octal();
    case "person/bio":
      return faker.person.bio();
    case "person/firstname":
      if (option) return faker.person.firstName(option);
      return faker.person.firstName();
    case "person/fullname":
      if (option) return faker.person.fullName(option);
      return faker.person.fullName();
    case "person/gender":
      return faker.person.gender();
    case "person/jobarea":
      return faker.person.jobArea();
    case "person/jobdescriptor":
      return faker.person.jobDescriptor();
    case "person/jobtitle":
      return faker.person.jobTitle();
    case "person/jobtype":
      return faker.person.jobType();
    case "person/lastname":
      if (option) return faker.person.lastName(option);
      return faker.person.lastName();
    case "person/middlename":
      if (option) return faker.person.middleName(option);
      return faker.person.middleName();
    case "person/prefix":
      if (option) return faker.person.prefix(option);
      return faker.person.prefix();
    case "person/sex":
      return faker.person.sex();
    case "person/sextype":
      return faker.person.sexType();
    case "person/suffix":
      return faker.person.suffix();
    case "person/zodiacsign":
      return faker.person.zodiacSign();
    case "phone/imei":
      return faker.phone.imei();
    case "phone/number":
      if (option) return faker.phone.number(option);
      return faker.phone.number();
    case "science/chemicalelement":
      return faker.science.chemicalElement();
    case "science/unit":
      return faker.science.unit();
    case "string/alpha":
      if (option) return faker.string.alpha(option);
      return faker.string.alpha();
    case "string/alphanumeric":
      if (option) return faker.string.alphanumeric(option);
      return faker.string.alphanumeric();
    case "string/binary":
      if (option) return faker.string.binary(option);
      return faker.string.binary();
    case "string/hexadecimal":
      if (option) return faker.string.hexadecimal(option);
      return faker.string.hexadecimal();
    case "string/nanoid":
      if (option) return faker.string.nanoid(option);
      return faker.string.nanoid();
    case "string/numeric":
      if (option) return faker.string.numeric(option);
      return faker.string.numeric();
    case "string/octal":
      if (option) return faker.string.octal(option);
      return faker.string.octal();
    case "string/sample":
      if (option) return faker.string.sample(option);
      return faker.string.sample();
    case "string/symbol":
      if (option) return faker.string.symbol(option);
      return faker.string.symbol();
    case "string/uuid":
      return faker.string.uuid();
    case "system/commonfileext":
      return faker.system.commonFileExt();
    case "system/commonfilename":
      if (option) return faker.system.commonFileName(option);
      return faker.system.commonFileName();
    case "system/commonfiletype":
      return faker.system.commonFileType();
    case "system/cron":
      if (option) return faker.system.cron(option);
      return faker.system.cron();
    case "system/directorypath":
      return faker.system.directoryPath();
    case "system/fileext":
      if (option) return faker.system.fileExt(option);
      return faker.system.fileExt();
    case "system/filename":
      if (option) return faker.system.fileName(option);
      return faker.system.fileName();
    case "system/filepath":
      return faker.system.filePath();
    case "system/filetype":
      return faker.system.fileType();
    case "system/mimetype":
      return faker.system.mimeType();
    case "system/networkinterface":
      if (option) return faker.system.networkInterface(option);
      return faker.system.networkInterface();
    case "system/semver":
      return faker.system.semver();
    case "vehicle/bicycle":
      return faker.vehicle.bicycle();
    case "vehicle/color":
      return faker.vehicle.color();
    case "vehicle/fuel":
      return faker.vehicle.fuel();
    case "vehicle/manufacturer":
      return faker.vehicle.manufacturer();
    case "vehicle/model":
      return faker.vehicle.model();
    case "vehicle/type":
      return faker.vehicle.type();
    case "vehicle/vehicle":
      return faker.vehicle.vehicle();
    case "vehicle/vin":
      return faker.vehicle.vin();
    case "vehicle/vrm":
      return faker.vehicle.vrm();
    case "word/adjective":
      if (option) return faker.word.adjective(option);
      return faker.word.adjective();
    case "word/adverb":
      if (option) return faker.word.adverb(option);
      return faker.word.adverb();
    case "word/conjunction":
      if (option) return faker.word.conjunction(option);
      return faker.word.conjunction();
    case "word/interjection":
      if (option) return faker.word.interjection(option);
      return faker.word.interjection();
    case "word/noun":
      if (option) return faker.word.noun(option);
      return faker.word.noun();
    case "word/preposition":
      if (option) return faker.word.preposition(option);
      return faker.word.preposition();
    case "word/sample":
      if (option) return faker.word.sample(option);
      return faker.word.sample();
    case "word/verb":
      if (option) return faker.word.verb(option);
      return faker.word.verb();
    case "word/words":
      if (option) return faker.word.words(option);
      return faker.word.words();
    default:
      return faker.lorem.text();
  }
};

const generateMockLine = (mock: MockDataType[]) => {
  let mockObj = {} as { [key: string]: any };
  mock.forEach((item) => {
    if (item.name === undefined || item.name === "") {
      return;
    }
    let option = {};
    if (item.option !== "") {
      try {
        option = JSON.parse(item.option);
      } catch (ex) {
        console.error("unable to parse option");
      }
    }
    mockObj[item.name] = generate(item.type, option);
  });
  return mockObj;
};
const generateMockData = (mock: MockDataType[], lines: number) => {
  console.log("generating mock data");
  let mockData = [];
  for (let i = 0; i < lines; i++) {
    mockData.push(generateMockLine(mock));
  }
  console.log(mockData);
  return mockData;
};

export default generateMockData;
