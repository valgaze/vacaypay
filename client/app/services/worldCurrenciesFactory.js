(function() {
  'use strict';

  angular.module('app')
  .factory('worldCurrencies', [function () {
    

    var services = {
      retrieveCurrencies: retrieveCurrencies
    };

    return services;

    function retrieveCurrencies () {
      return [
        {
          "id": 1,
          "code": "AED",
          "label": "United Arab Emirates Dirham",
          "symbol": ""
        },
        {
          "id": 2,
          "code": "AFN",
          "label": "Afghanistan Afghani",
          "symbol": "؋"
        },
        {
          "id": 3,
          "code": "ALL",
          "label": "Albania Lek",
          "symbol": "Lek"
        },
        {
          "id": 4,
          "code": "AMD",
          "label": "Armenia Dram",
          "symbol": ""
        },
        {
          "id": 5,
          "code": "ANG",
          "label": "Netherlands Antilles Guilder",
          "symbol": "ƒ"
        },
        {
          "id": 6,
          "code": "AOA",
          "label": "Angola Kwanza",
          "symbol": "Kz"
        },
        {
          "id": 7,
          "code": "ARS",
          "label": "Argentina Peso",
          "symbol": "$"
        },
        {
          "id": 8,
          "code": "AUD",
          "label": "Australia Dollar",
          "symbol": "$"
        },
        {
          "id": 9,
          "code": "AWG",
          "label": "Aruba Guilder",
          "symbol": "ƒ"
        },
        {
          "id": 10,
          "code": "AZN",
          "label": "Azerbaijan New Manat",
          "symbol": "ман"
        },
        {
          "id": 11,
          "code": "BAM",
          "label": "Bosnia and Herzegovina Convertible Marka",
          "symbol": "KM"
        },
        {
          "id": 12,
          "code": "BBD",
          "label": "Barbados Dollar",
          "symbol": "$"
        },
        {
          "id": 13,
          "code": "BDT",
          "label": "Bangladesh Taka",
          "symbol": "৳"
        },
        {
          "id": 14,
          "code": "BGN",
          "label": "Bulgaria Lev",
          "symbol": "лв"
        },
        {
          "id": 15,
          "code": "BHD",
          "label": "Bahrain Dinar",
          "symbol": "BD"
        },
        {
          "id": 16,
          "code": "BIF",
          "label": "Burundi Franc",
          "symbol": "BIF"
        },
        {
          "id": 17,
          "code": "BMD",
          "label": "Bermuda Dollar",
          "symbol": "$"
        },
        {
          "id": 18,
          "code": "BND",
          "label": "Brunei Darussalam Dollar",
          "symbol": "$"
        },
        {
          "id": 19,
          "code": "BOB",
          "label": "Bolivia Boliviano",
          "symbol": "$b"
        },
        {
          "id": 20,
          "code": "BRL",
          "label": "Brazil Real",
          "symbol": "R$"
        },
        {
          "id": 21,
          "code": "BSD",
          "label": "Bahamas Dollar",
          "symbol": "$"
        },
        {
          "id": 22,
          "code": "BTN",
          "label": "Bhutan Ngultrum",
          "symbol": "Nu"
        },
        {
          "id": 23,
          "code": "BWP",
          "label": "Botswana Pula",
          "symbol": "P"
        },
        {
          "id": 24,
          "code": "BYR",
          "label": "Belarus Ruble",
          "symbol": "p."
        },
        {
          "id": 25,
          "code": "BZD",
          "label": "Belize Dollar",
          "symbol": "BZ$"
        },
        {
          "id": 26,
          "code": "CAD",
          "label": "Canada Dollar",
          "symbol": "$"
        },
        {
          "id": 27,
          "code": "CDF",
          "label": "Congo/Kinshasa Franc",
          "symbol": ""
        },
        {
          "id": 28,
          "code": "CHF",
          "label": "Switzerland Franc",
          "symbol": "CHF"
        },
        {
          "id": 29,
          "code": "CLP",
          "label": "Chile Peso",
          "symbol": "$"
        },
        {
          "id": 30,
          "code": "CNY",
          "label": "China Yuan Renminbi",
          "symbol": "¥"
        },
        {
          "id": 31,
          "code": "COP",
          "label": "Colombia Peso",
          "symbol": "$"
        },
        {
          "id": 32,
          "code": "CRC",
          "label": "Costa Rica Colon",
          "symbol": "₡"
        },
        {
          "id": 33,
          "code": "CUC",
          "label": "Cuba Convertible Peso",
          "symbol": ""
        },
        {
          "id": 34,
          "code": "CUP",
          "label": "Cuba Peso",
          "symbol": "₱"
        },
        {
          "id": 35,
          "code": "CVE",
          "label": "Cape Verde Escudo",
          "symbol": "$"
        },
        {
          "id": 36,
          "code": "CZK",
          "label": "Czech Republic Koruna",
          "symbol": "Kč"
        },
        {
          "id": 37,
          "code": "DJF",
          "label": "Djibouti Franc",
          "symbol": ""
        },
        {
          "id": 38,
          "code": "DKK",
          "label": "Denmark Krone",
          "symbol": "kr"
        },
        {
          "id": 39,
          "code": "DOP",
          "label": "Dominican Republic Peso",
          "symbol": "RD$"
        },
        {
          "id": 40,
          "code": "DZD",
          "label": "Algeria Dinar",
          "symbol": "د.ج"
        },
        {
          "id": 41,
          "code": "EGP",
          "label": "Egypt Pound",
          "symbol": "£"
        },
        {
          "id": 42,
          "code": "ERN",
          "label": "Eritrea Nakfa",
          "symbol": ""
        },
        {
          "id": 43,
          "code": "ETB",
          "label": "Ethiopia Birr",
          "symbol": ""
        },
        {
          "id": 44,
          "code": "EUR",
          "label": "Euro",
          "symbol": "€"
        },
        {
          "id": 45,
          "code": "FJD",
          "label": "Fiji Dollar",
          "symbol": "$"
        },
        {
          "id": 46,
          "code": "FKP",
          "label": "Falkland Islands (Malvinas) Pound",
          "symbol": "£"
        },
        {
          "id": 47,
          "code": "GBP",
          "label": "United Kingdom Pound",
          "symbol": "£"
        },
        {
          "id": 48,
          "code": "GEL",
          "label": "Georgia Lari",
          "symbol": ""
        },
        {
          "id": 49,
          "code": "GGP",
          "label": "Guernsey Pound",
          "symbol": ""
        },
        {
          "id": 50,
          "code": "GHS",
          "label": "Ghana Cedi",
          "symbol": ""
        },
        {
          "id": 51,
          "code": "GIP",
          "label": "Gibraltar Pound",
          "symbol": "£"
        },
        {
          "id": 52,
          "code": "GMD",
          "label": "Gambia Dalasi",
          "symbol": ""
        },
        {
          "id": 53,
          "code": "GNF",
          "label": "Guinea Franc",
          "symbol": ""
        },
        {
          "id": 54,
          "code": "GTQ",
          "label": "Guatemala Quetzal",
          "symbol": "Q"
        },
        {
          "id": 55,
          "code": "GYD",
          "label": "Guyana Dollar",
          "symbol": "$"
        },
        {
          "id": 56,
          "code": "HKD",
          "label": "Hong Kong Dollar",
          "symbol": "$"
        },
        {
          "id": 57,
          "code": "HNL",
          "label": "Honduras Lempira",
          "symbol": "L"
        },
        {
          "id": 58,
          "code": "HRK",
          "label": "Croatia Kuna",
          "symbol": "kn"
        },
        {
          "id": 59,
          "code": "HTG",
          "label": "Haiti Gourde",
          "symbol": ""
        },
        {
          "id": 60,
          "code": "HUF",
          "label": "Hungary Forint",
          "symbol": "Ft"
        },
        {
          "id": 61,
          "code": "IDR",
          "label": "Indonesia Rupiah",
          "symbol": "Rp"
        },
        {
          "id": 62,
          "code": "ILS",
          "label": "Israel Shekel",
          "symbol": "₪"
        },
        {
          "id": 63,
          "code": "IMP",
          "label": "Isle of Man Pound",
          "symbol": ""
        },
        {
          "id": 64,
          "code": "INR",
          "label": "India Rupee",
          "symbol": "₹"
        },
        {
          "id": 65,
          "code": "IQD",
          "label": "Iraq Dinar",
          "symbol": ""
        },
        {
          "id": 66,
          "code": "IRR",
          "label": "Iran Rial",
          "symbol": "﷼"
        },
        {
          "id": 67,
          "code": "ISK",
          "label": "Iceland Krona",
          "symbol": "kr"
        },
        {
          "id": 68,
          "code": "JEP",
          "label": "Jersey Pound",
          "symbol": ""
        },
        {
          "id": 69,
          "code": "JMD",
          "label": "Jamaica Dollar",
          "symbol": "J$"
        },
        {
          "id": 70,
          "code": "JOD",
          "label": "Jordan Dinar",
          "symbol": ""
        },
        {
          "id": 71,
          "code": "JPY",
          "label": "Japan Yen",
          "symbol": "¥"
        },
        {
          "id": 72,
          "code": "KES",
          "label": "Kenya Shilling",
          "symbol": ""
        },
        {
          "id": 73,
          "code": "KGS",
          "label": "Kyrgyzstan Som",
          "symbol": "лв"
        },
        {
          "id": 74,
          "code": "KHR",
          "label": "Cambodia Riel",
          "symbol": "៛"
        },
        {
          "id": 75,
          "code": "KMF",
          "label": "Comoros Franc",
          "symbol": ""
        },
        {
          "id": 76,
          "code": "KPW",
          "label": "Korea (North) Won",
          "symbol": "₩"
        },
        {
          "id": 77,
          "code": "KRW",
          "label": "Korea (South) Won",
          "symbol": "₩"
        },
        {
          "id": 78,
          "code": "KWD",
          "label": "Kuwait Dinar",
          "symbol": ""
        },
        {
          "id": 79,
          "code": "KYD",
          "label": "Cayman Islands Dollar",
          "symbol": "$"
        },
        {
          "id": 80,
          "code": "KZT",
          "label": "Kazakhstan Tenge",
          "symbol": "лв"
        },
        {
          "id": 81,
          "code": "LAK",
          "label": "Laos Kip",
          "symbol": "₭"
        },
        {
          "id": 82,
          "code": "LBP",
          "label": "Lebanon Pound",
          "symbol": "£"
        },
        {
          "id": 83,
          "code": "LKR",
          "label": "Sri Lanka Rupee",
          "symbol": "₨"
        },
        {
          "id": 84,
          "code": "LRD",
          "label": "Liberia Dollar",
          "symbol": "$"
        },
        {
          "id": 85,
          "code": "LSL",
          "label": "Lesotho Loti",
          "symbol": ""
        },
        {
          "id": 86,
          "code": "LYD",
          "label": "Libya Dinar",
          "symbol": ""
        },
        {
          "id": 87,
          "code": "MAD",
          "label": "Morocco Dirham",
          "symbol": ""
        },
        {
          "id": 88,
          "code": "MDL",
          "label": "Moldova Leu",
          "symbol": ""
        },
        {
          "id": 89,
          "code": "MGA",
          "label": "Madagascar Ariary",
          "symbol": ""
        },
        {
          "id": 90,
          "code": "MKD",
          "label": "Macedonia Denar",
          "symbol": "ден"
        },
        {
          "id": 91,
          "code": "MMK",
          "label": "Myanmar (Burma) Kyat",
          "symbol": ""
        },
        {
          "id": 92,
          "code": "MNT",
          "label": "Mongolia Tughrik",
          "symbol": "₮"
        },
        {
          "id": 93,
          "code": "MOP",
          "label": "Macau Pataca",
          "symbol": ""
        },
        {
          "id": 94,
          "code": "MRO",
          "label": "Mauritania Ouguiya",
          "symbol": ""
        },
        {
          "id": 95,
          "code": "MUR",
          "label": "Mauritius Rupee",
          "symbol": "₨"
        },
        {
          "id": 96,
          "code": "MVR",
          "label": "Maldives (Maldive Islands) Rufiyaa",
          "symbol": ""
        },
        {
          "id": 97,
          "code": "MWK",
          "label": "Malawi Kwacha",
          "symbol": ""
        },
        {
          "id": 98,
          "code": "MXN",
          "label": "Mexico Peso",
          "symbol": "$"
        },
        {
          "id": 99,
          "code": "MYR",
          "label": "Malaysia Ringgit",
          "symbol": "RM"
        },
        {
          "id": 100,
          "code": "MZN",
          "label": "Mozambique Metical",
          "symbol": "MT"
        },
        {
          "id": 101,
          "code": "NAD",
          "label": "Namibia Dollar",
          "symbol": "$"
        },
        {
          "id": 102,
          "code": "NGN",
          "label": "Nigeria Naira",
          "symbol": "₦"
        },
        {
          "id": 103,
          "code": "NIO",
          "label": "Nicaragua Cordoba",
          "symbol": "C$"
        },
        {
          "id": 104,
          "code": "NOK",
          "label": "Norway Krone",
          "symbol": "kr"
        },
        {
          "id": 105,
          "code": "NPR",
          "label": "Nepal Rupee",
          "symbol": "₨"
        },
        {
          "id": 106,
          "code": "NZD",
          "label": "New Zealand Dollar",
          "symbol": "$"
        },
        {
          "id": 107,
          "code": "OMR",
          "label": "Oman Rial",
          "symbol": "﷼"
        },
        {
          "id": 108,
          "code": "PAB",
          "label": "Panama Balboa",
          "symbol": "B/."
        },
        {
          "id": 109,
          "code": "PEN",
          "label": "Peru Nuevo Sol",
          "symbol": "S/."
        },
        {
          "id": 110,
          "code": "PGK",
          "label": "Papua New Guinea Kina",
          "symbol": "K"
        },
        {
          "id": 111,
          "code": "PHP",
          "label": "Philippines Peso",
          "symbol": "₱"
        },
        {
          "id": 112,
          "code": "PKR",
          "label": "Pakistan Rupee",
          "symbol": "₨"
        },
        {
          "id": 113,
          "code": "PLN",
          "label": "Poland Zloty",
          "symbol": "zł"
        },
        {
          "id": 114,
          "code": "PYG",
          "label": "Paraguay Guarani",
          "symbol": "Gs"
        },
        {
          "id": 115,
          "code": "QAR",
          "label": "Qatar Riyal",
          "symbol": "﷼"
        },
        {
          "id": 116,
          "code": "RON",
          "label": "Romania New Leu",
          "symbol": "lei"
        },
        {
          "id": 117,
          "code": "RSD",
          "label": "Serbia Dinar",
          "symbol": "Дин."
        },
        {
          "id": 118,
          "code": "RUB",
          "label": "Russia Ruble",
          "symbol": "руб"
        },
        {
          "id": 119,
          "code": "RWF",
          "label": "Rwanda Franc",
          "symbol": "R₣"
        },
        {
          "id": 120,
          "code": "SAR",
          "label": "Saudi Arabia Riyal",
          "symbol": "﷼"
        },
        {
          "id": 121,
          "code": "SBD",
          "label": "Solomon Islands Dollar",
          "symbol": "$"
        },
        {
          "id": 122,
          "code": "SCR",
          "label": "Seychelles Rupee",
          "symbol": "₨"
        },
        {
          "id": 123,
          "code": "SDG",
          "label": "Sudan Pound",
          "symbol": ""
        },
        {
          "id": 124,
          "code": "SEK",
          "label": "Sweden Krona",
          "symbol": "kr"
        },
        {
          "id": 125,
          "code": "SGD",
          "label": "Singapore Dollar",
          "symbol": "$"
        },
        {
          "id": 126,
          "code": "SHP",
          "label": "Saint Helena Pound",
          "symbol": "£"
        },
        {
          "id": 127,
          "code": "SLL",
          "label": "Sierra Leone Leone",
          "symbol": "Le"
        },
        {
          "id": 128,
          "code": "SOS",
          "label": "Somalia Shilling",
          "symbol": "S"
        },
        {
          "id": 129,
          "code": "SPL",
          "label": "  Seborga Luigino",
          "symbol": ""
        },
        {
          "id": 130,
          "code": "SRD",
          "label": "Suriname Dollar",
          "symbol": "$"
        },
        {
          "id": 131,
          "code": "STD",
          "label": "São Tomé and Príncipe Dobra",
          "symbol": ""
        },
        {
          "id": 132,
          "code": "SVC",
          "label": "El Salvador Colon",
          "symbol": "$"
        },
        {
          "id": 133,
          "code": "SYP",
          "label": "Syria Pound",
          "symbol": "£"
        },
        {
          "id": 134,
          "code": "SZL",
          "label": "Swaziland Lilangeni",
          "symbol": ""
        },
        {
          "id": 135,
          "code": "THB",
          "label": "Thailand Baht",
          "symbol": "฿"
        },
        {
          "id": 136,
          "code": "TJS",
          "label": "Tajikistan Somoni",
          "symbol": ""
        },
        {
          "id": 137,
          "code": "TMT",
          "label": "Turkmenistan Manat",
          "symbol": ""
        },
        {
          "id": 138,
          "code": "TND",
          "label": "Tunisia Dinar",
          "symbol": ""
        },
        {
          "id": 139,
          "code": "TOP",
          "label": "Tonga Paanga",
          "symbol": ""
        },
        {
          "id": 140,
          "code": "TRY",
          "label": "Turkey Lira",
          "symbol": "₺"
        },
        {
          "id": 141,
          "code": "TTD",
          "label": "Trinidad and Tobago Dollar",
          "symbol": "TT$"
        },
        {
          "id": 142,
          "code": "TVD",
          "label": "Tuvalu Dollar",
          "symbol": ""
        },
        {
          "id": 143,
          "code": "TWD",
          "label": "Taiwan New Dollar",
          "symbol": "NT$"
        },
        {
          "id": 144,
          "code": "TZS",
          "label": "Tanzania Shilling",
          "symbol": ""
        },
        {
          "id": 145,
          "code": "UAH",
          "label": "Ukraine Hryvnia",
          "symbol": "₴"
        },
        {
          "id": 146,
          "code": "UGX",
          "label": "Uganda Shilling",
          "symbol": ""
        },
        {
          "id": 147,
          "code": "USD",
          "label": "United States Dollar",
          "symbol": "$"
        },
        {
          "id": 148,
          "code": "UYU",
          "label": "Uruguay Peso",
          "symbol": "$U"
        },
        {
          "id": 149,
          "code": "UZS",
          "label": "Uzbekistan Som",
          "symbol": "лв"
        },
        {
          "id": 150,
          "code": "VEF",
          "label": "Venezuela Bolivar",
          "symbol": "Bs"
        },
        {
          "id": 151,
          "code": "VND",
          "label": "Viet Nam Dong",
          "symbol": "₫"
        },
        {
          "id": 152,
          "code": "VUV",
          "label": "Vanuatu Vatu",
          "symbol": ""
        },
        {
          "id": 153,
          "code": "WST",
          "label": "Samoa Tala",
          "symbol": "$"
        },
        {
          "id": 154,
          "code": "XAF",
          "label": "Communauté Financière Africaine (BEAC) CFA Franc BEAC",
          "symbol": ""
        },
        {
          "id": 155,
          "code": "XCD",
          "label": "East Caribbean Dollar",
          "symbol": "$"
        },
        {
          "id": 156,
          "code": "XDR",
          "label": "International Monetary Fund (IMF) Special Drawing Rights",
          "symbol": ""
        },
        {
          "id": 157,
          "code": "XOF",
          "label": "Communauté Financière Africaine (BCEAO) Franc",
          "symbol": "CFA"
        },
        {
          "id": 158,
          "code": "XPF",
          "label": "Comptoirs Français du Pacifique (CFP) Franc",
          "symbol": ""
        },
        {
          "id": 159,
          "code": "YER",
          "label": "Yemen Rial",
          "symbol": "﷼"
        },
        {
          "id": 160,
          "code": "ZAR",
          "label": "South Africa Rand",
          "symbol": "R"
        },
        {
          "id": 161,
          "code": "ZMW",
          "label": "Zambia Kwacha",
          "symbol": ""
        },
        {
          "id": 162,
          "code": "ZWD",
          "label": "Zimbabwe Dollar",
          "symbol": ""
        }
      ];
    }

  }]);

})();