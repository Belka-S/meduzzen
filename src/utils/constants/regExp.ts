export type TRegExp = {
  name: string;
  msg: string;
  pattern: RegExp;
};

const NAME: TRegExp = {
  name: 'NAME',
  msg: 'letters, numbers, underscores, dashes, spases',
  pattern: /^[a-zA-Zа-яА-Я0-9]+(([_. -]|[a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я0-9]*)*$/,
};

const EMAIL: TRegExp = {
  name: 'EMAIL',
  msg: 'test@test.com, test@test.ua',
  pattern: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
};

const PHONE: TRegExp = {
  name: 'PHONE',
  msg: 'digits, spaces, dashes, parentheses, can start with +',
  pattern: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
};

const TELEGRAM: TRegExp = {
  name: 'TELEGRAM',
  msg: 'letters and numbers, more than five, start with @',
  pattern: /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$/,
};

const TELEGRAM_PHONE: TRegExp = {
  name: 'TELEGRAM_PHONE',
  msg: 'letters, digits, spaces, dashes, parentheses, can start with +, @',
  pattern:
    /(.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$)|(^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$)/,
};

const HTTP: TRegExp = {
  name: 'HTTP',
  msg: 'http(s)://(www.).../...',
  pattern:
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
};

const LINKEDIN: TRegExp = {
  name: 'LINKEDIN',
  msg: 'http(s)://linkedin.com/...',
  pattern:
    /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)+\/(([_-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я0-9]*)*$/,
};

const GITHUB: TRegExp = {
  name: 'GITHUB',
  msg: 'http(s)://www.github.com/...',
  pattern:
    /^(http(s?):\/\/)?(www\.)?github\.com+\/(([_-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я0-9]*)*$/,
};

const DATE: TRegExp = {
  name: 'DATE',
  msg: 'dd.mm.yyyy',
  pattern:
    /^([0-2^([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)((19|20)\d{2}$)/,
};

const ADDRESS: TRegExp = {
  name: 'ADDRESS',
  msg: 'letters, numbers, commas, dashes, spases',
  pattern:
    /^[a-zA-Zа-яА-Я0-9]+(([ -]|(, )[a-zA-Zа-яА-Я0-9])?[a-zA-Zа-яА-Я0-9]*)*$/,
};

export {
  ADDRESS,
  DATE,
  EMAIL,
  GITHUB,
  HTTP,
  LINKEDIN,
  NAME,
  PHONE,
  TELEGRAM,
  TELEGRAM_PHONE,
};
