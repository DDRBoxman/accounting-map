(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports){
    module.exports = factory();
  } else {
    global.formatter = factory();
  }
})(this, function () {
  "use strict";

  var symbolMap = {
    "ALL": "L",
    "AFN": "؋",
    "ARS": "$",
    "AWG": "ƒ",
    "AUD": "$",
    "AZN": "₼",
    "BSD": "$",
    "BBD": "$",
    "BYR": "p.",
    "BZD": "BZ$",
    "BMD": "$",
    "BOB": "Bs.",
    "BAM": "KM",
    "BWP": "P",
    "BGN": "лв",
    "BRL": "R$",
    "BND": "$",
    "KHR": "៛",
    "CAD": "$",
    "KYD": "$",
    "CLP": "$",
    "CNY": "¥",
    "COP": "$",
    "CRC": "₡",
    "HRK": "kn",
    "CUP": "₱",
    "CZK": "Kč",
    "DKK": "kr",
    "DOP": "RD$",
    "XCD": "$",
    "EGP": "£",
    "SVC": "$",
    "EEK": "kr",
    "EUR": "€",
    "FKP": "£",
    "FJD": "$",
    "GHC": "¢",
    "GIP": "£",
    "GTQ": "Q",
    "GGP": "£",
    "GYD": "$",
    "HNL": "L",
    "HKD": "$",
    "HUF": "Ft",
    "ISK": "kr",
    "INR": "₹",
    "IDR": "Rp",
    "IRR": "﷼",
    "IMP": "£",
    "ILS": "₪",
    "JMD": "J$",
    "JPY": "¥",
    "JEP": "£",
    "KES": "KSh",
    "KZT": "лв",
    "KPW": "₩",
    "KRW": "₩",
    "KGS": "лв",
    "LAK": "₭",
    "LVL": "Ls",
    "LBP": "£",
    "LRD": "$",
    "LTL": "Lt",
    "MKD": "ден",
    "MYR": "RM",
    "MUR": "₨",
    "MXN": "$",
    "MNT": "₮",
    "MZN": "MT",
    "NAD": "$",
    "NPR": "₨",
    "ANG": "ƒ",
    "NZD": "$",
    "NIO": "C$",
    "NGN": "₦",
    "NOK": "kr",
    "OMR": "﷼",
    "PKR": "₨",
    "PAB": "B/.",
    "PYG": "Gs",
    "PEN": "S/.",
    "PHP": "₱",
    "PLN": "zł",
    "QAR": "﷼",
    "RON": "lei",
    "RUB": "₽",
    "SHP": "£",
    "SAR": "﷼",
    "RSD": "Дин.",
    "SCR": "₨",
    "SGD": "$",
    "SBD": "$",
    "SOS": "S",
    "ZAR": "R",
    "LKR": "₨",
    "SEK": "kr",
    "CHF": "CHF",
    "SRD": "$",
    "SYP": "£",
    "TZS": "TSh",
    "TWD": "NT$",
    "THB": "฿",
    "TTD": "TT$",
    "TRY": "",
    "TRL": "₤",
    "TVD": "$",
    "UGX": "USh",
    "UAH": "₴",
    "GBP": "£",
    "USD": "$",
    "UYU": "$U",
    "UZS": "лв",
    "VEF": "Bs",
    "VND": "₫",
    "YER": "﷼",
    "ZWD": "Z$"
  };

  var suffixMap = {
    "USD" : "dollars",
    "AUD" : "dollars",
    "CAD" : "dollars",
    "EUR" : "euros",
    "JPY" : "yen",
    "GBP" : "pounds",
    "RUB" : "rubles"
  };

  var settingsMap = {
    "USD" : {
      currency: {
        symbol : "$",
        format: "%s%v",
        decimal : ".",
        thousand: ",",
        precision : 2
      },
      number: {
        precision : 0,  // default precision on numbers is 0
        thousand: ",",
        decimal : "."
      }
    },
    "AUD" : {
      currency: {
        symbol : "$",
        format: "%s%v",
        decimal : ".",
        thousand: ",",
        precision : 2
      },
      number: {
        precision : 0,
        thousand: ",",
        decimal : "."
      }
    },
    "CAD" : {
      currency: {
        symbol : "$",
        format: "%s%v",
        decimal : ".",
        thousand: ",",
        precision : 2
      },
      number: {
        precision : 0,
        thousand: ",",
        decimal : "."
      }
    },
    "EUR" : {
      currency: {
        symbol : "€",
        format: "%s%v",
        decimal : ",",
        thousand: ".",
        precision : 2
      },
      number: {
        precision : 0,
        thousand: ",",
        decimal : "."
      }
    },
    "JPY" : {
      currency: {
        symbol : "¥",
        format: "%s%v",
        decimal : ".",
        thousand: ",",
        precision : 0
      },
      number: {
        precision : 0,
        thousand: ",",
        decimal : "."
      }
    },
    "GBP" : {
      currency: {
        symbol : "£",
        format: "%s%v",
        decimal : ".",
        thousand: ",",
        precision : 2
      },
      number: {
        precision : 0,
        thousand: ",",
        decimal : "."
      }
    },
    "RUB" : {
      currency: {
        symbol : "₽",
        format: "%v р.",
        decimal : " ",
        thousand: ",",
        precision : 2
      },
      number: {
        precision : 0,
        thousand: ",",
        decimal : "."
      }
    },
    "NOK" : {
      currency: {
        symbol: "kr.",
        format: "%s %v",
        decimal: ",",
        thousand: ".",
        precision: 2
      },
      number: {
        precision : 0,
        thousand: ",",
        decimal : "."
      }
    },
    "CZK" : {
      currency: {
        symbol: "Kč",
        format: "%v %s",
        decimal: ".",
        thousand: ",",
        precision: 0
      },
      number: {
        precision : 0,
        thousand: ",",
        decimal : "."
      }
    },
    "PLN" : {
      currency: {
        symbol: "zł",
        format: "%v %s",
        decimal: ",",
        thousand: " ",
        precision: 2
      },
      number: {
        precision : 0,
        thousand: ",",
        decimal : "."
      }
    }
  };

  var accountingMap = function() {};

  accountingMap.getAccountingSettings = function(currencyCode) {
    if (settingsMap.hasOwnProperty(currencyCode)) {
      return settingsMap[currencyCode];
    } else {
      return settingsMap.USD;
    }
  };

  accountingMap.getSymbol = function(currencyCode) {
    if (symbolMap.hasOwnProperty(currencyCode)) {
      return symbolMap[currencyCode];
    } else {
      return '?';
    }
  };

  accountingMap.getSuffix = function(currencyCode) {
    if (suffixMap.hasOwnProperty(currencyCode)) {
      return suffixMap[currencyCode];
    } else {
      return 'dollars';
    }
  };

  return accountingMap;
});

