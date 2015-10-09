(function() {
  'use strict';

  angular.module('app')
  .controller('CreateExpenseController', ['$scope', '$rootScope', '$window', '$modalInstance', '$state', '$cacheFactory', '$http', 'Expenses', 'Auth', 'Currency',
  function ($scope, $rootScope, $window, $modalInstance, $state, $cacheFactory, $http, Expenses, Auth, Currency) {
    var cache = $cacheFactory.get('tripData');
    $scope.expense = {};
    var participants = cache.get('participants');
    var creatorId = $window.localStorage.getItem('userId');
    var creatorUsername = $window.localStorage.getItem('username');

    // Participants is mapped to format it in a way that the dropdown menu can understand.
    $scope.participants = participants.map(function(participant) {
      return { id: participant.id, label: participant.username };
    });
    // $scope.stakeholders is the model that the dropdown menu creates.
    $scope.stakeholders = [{id: creatorId, label: creatorUsername}];
    $scope.currencyModel = {id: 147};

    // Configures the dropdown menu
    // http://dotansimha.github.io/angularjs-dropdown-multiselect/#/
    $scope.dropdownSettings = {
      smartButtonMaxItems: 5,
      scrollableHeight: '200px',
      scrollable: true,
      externalIdProp: '',
    };

    $scope.buttonText = {
      buttonDefaultText: 'Select Contributors'
    };

    $scope.addExpense = function () {
      // If the stakeholders model is empty add the creator to the model
      var onSuccess = function (exchangeRateobj){
        console.log("Exchange rate", exchangeRateobj.rate);
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.expense.location)
          .then(function(result){

            if (!result.data.results[0]){
              //#TODO: Improve this error handling
              alert('Invalid location');
              return;              
            }
            $scope.expense.location = result.data.results[0].geometry.location;

            if(!$scope.stakeholders.length) {
              $scope.stakeholders = [{id: creatorId, label: creatorUsername}];
            }
            // Return the data back to the server in the correct format
            $scope.stakeholders = $scope.stakeholders.map(function(stakeholder) {
              return { id: stakeholder.id, username: stakeholder.label };
            });
            
            $scope.expense.amount = $scope.expense.amount*exchangeRateobj.rate;

            Expenses.addExpense($scope.expense, $scope.stakeholders, function (tripData) {
              console.log('expense added');
              $modalInstance.close(tripData.expenses);
            });
            
          });
      };

      var onError = function(err){
        //#TODO: Improve this error handling
        alert('There was a catastrophic error:' + err);
        return;  
      };

      var fromCurrency = $scope.currencyData[$scope.currencyModel.id - 1].code || 'usd';
      Currency.getRate(fromCurrency, onSuccess, onError);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.expense.date = new Date();

    /** Currnency Convert Helper **/

    // $scope.currencyData = [{id: 1, symbol:"EUR", label: 'Euro'}, {id: 2, symbol: "JPY", label: 'Japanese Yen'}, {id: 3, symbol:"CAD", label: 'Canadan Syrup'}];

    $scope.currDropdownSettings = {
      showCheckAll: false,
      showUncheckAll: false,
      selectionLimit: 1,
      closeOnSelect: true,
      smartButtonMaxItems: 1,
      enableSearch: true
    };


    $scope.currencyData = [
      {
        "id": 1,
        "code": "AED",
        "label": "United Arab Emirates Dirham"
      },
      {
        "id": 2,
        "code": "AFN",
        "label": "Afghanistan Afghani"
      },
      {
        "id": 3,
        "code": "ALL",
        "label": "Albania Lek"
      },
      {
        "id": 4,
        "code": "AMD",
        "label": "Armenia Dram"
      },
      {
        "id": 5,
        "code": "ANG",
        "label": "Netherlands Antilles Guilder"
      },
      {
        "id": 6,
        "code": "AOA",
        "label": "Angola Kwanza"
      },
      {
        "id": 7,
        "code": "ARS",
        "label": "Argentina Peso"
      },
      {
        "id": 8,
        "code": "AUD",
        "label": "Australia Dollar"
      },
      {
        "id": 9,
        "code": "AWG",
        "label": "Aruba Guilder"
      },
      {
        "id": 10,
        "code": "AZN",
        "label": "Azerbaijan New Manat"
      },
      {
        "id": 11,
        "code": "BAM",
        "label": "Bosnia and Herzegovina Convertible Marka"
      },
      {
        "id": 12,
        "code": "BBD",
        "label": "Barbados Dollar"
      },
      {
        "id": 13,
        "code": "BDT",
        "label": "Bangladesh Taka"
      },
      {
        "id": 14,
        "code": "BGN",
        "label": "Bulgaria Lev"
      },
      {
        "id": 15,
        "code": "BHD",
        "label": "Bahrain Dinar"
      },
      {
        "id": 16,
        "code": "BIF",
        "label": "Burundi Franc"
      },
      {
        "id": 17,
        "code": "BMD",
        "label": "Bermuda Dollar"
      },
      {
        "id": 18,
        "code": "BND",
        "label": "Brunei Darussalam Dollar"
      },
      {
        "id": 19,
        "code": "BOB",
        "label": "Bolivia Boliviano"
      },
      {
        "id": 20,
        "code": "BRL",
        "label": "Brazil Real"
      },
      {
        "id": 21,
        "code": "BSD",
        "label": "Bahamas Dollar"
      },
      {
        "id": 22,
        "code": "BTN",
        "label": "Bhutan Ngultrum"
      },
      {
        "id": 23,
        "code": "BWP",
        "label": "Botswana Pula"
      },
      {
        "id": 24,
        "code": "BYR",
        "label": "Belarus Ruble"
      },
      {
        "id": 25,
        "code": "BZD",
        "label": "Belize Dollar"
      },
      {
        "id": 26,
        "code": "CAD",
        "label": "Canada Dollar"
      },
      {
        "id": 27,
        "code": "CDF",
        "label": "Congo/Kinshasa Franc"
      },
      {
        "id": 28,
        "code": "CHF",
        "label": "Switzerland Franc"
      },
      {
        "id": 29,
        "code": "CLP",
        "label": "Chile Peso"
      },
      {
        "id": 30,
        "code": "CNY",
        "label": "China Yuan Renminbi"
      },
      {
        "id": 31,
        "code": "COP",
        "label": "Colombia Peso"
      },
      {
        "id": 32,
        "code": "CRC",
        "label": "Costa Rica Colon"
      },
      {
        "id": 33,
        "code": "CUC",
        "label": "Cuba Convertible Peso"
      },
      {
        "id": 34,
        "code": "CUP",
        "label": "Cuba Peso"
      },
      {
        "id": 35,
        "code": "CVE",
        "label": "Cape Verde Escudo"
      },
      {
        "id": 36,
        "code": "CZK",
        "label": "Czech Republic Koruna"
      },
      {
        "id": 37,
        "code": "DJF",
        "label": "Djibouti Franc"
      },
      {
        "id": 38,
        "code": "DKK",
        "label": "Denmark Krone"
      },
      {
        "id": 39,
        "code": "DOP",
        "label": "Dominican Republic Peso"
      },
      {
        "id": 40,
        "code": "DZD",
        "label": "Algeria Dinar"
      },
      {
        "id": 41,
        "code": "EGP",
        "label": "Egypt Pound"
      },
      {
        "id": 42,
        "code": "ERN",
        "label": "Eritrea Nakfa"
      },
      {
        "id": 43,
        "code": "ETB",
        "label": "Ethiopia Birr"
      },
      {
        "id": 44,
        "code": "EUR",
        "label": "Euro Member Countries"
      },
      {
        "id": 45,
        "code": "FJD",
        "label": "Fiji Dollar"
      },
      {
        "id": 46,
        "code": "FKP",
        "label": "Falkland Islands (Malvinas) Pound"
      },
      {
        "id": 47,
        "code": "GBP",
        "label": "United Kingdom Pound"
      },
      {
        "id": 48,
        "code": "GEL",
        "label": "Georgia Lari"
      },
      {
        "id": 49,
        "code": "GGP",
        "label": "Guernsey Pound"
      },
      {
        "id": 50,
        "code": "GHS",
        "label": "Ghana Cedi"
      },
      {
        "id": 51,
        "code": "GIP",
        "label": "Gibraltar Pound"
      },
      {
        "id": 52,
        "code": "GMD",
        "label": "Gambia Dalasi"
      },
      {
        "id": 53,
        "code": "GNF",
        "label": "Guinea Franc"
      },
      {
        "id": 54,
        "code": "GTQ",
        "label": "Guatemala Quetzal"
      },
      {
        "id": 55,
        "code": "GYD",
        "label": "Guyana Dollar"
      },
      {
        "id": 56,
        "code": "HKD",
        "label": "Hong Kong Dollar"
      },
      {
        "id": 57,
        "code": "HNL",
        "label": "Honduras Lempira"
      },
      {
        "id": 58,
        "code": "HRK",
        "label": "Croatia Kuna"
      },
      {
        "id": 59,
        "code": "HTG",
        "label": "Haiti Gourde"
      },
      {
        "id": 60,
        "code": "HUF",
        "label": "Hungary Forint"
      },
      {
        "id": 61,
        "code": "IDR",
        "label": "Indonesia Rupiah"
      },
      {
        "id": 62,
        "code": "ILS",
        "label": "Israel Shekel"
      },
      {
        "id": 63,
        "code": "IMP",
        "label": "Isle of Man Pound"
      },
      {
        "id": 64,
        "code": "INR",
        "label": "India Rupee"
      },
      {
        "id": 65,
        "code": "IQD",
        "label": "Iraq Dinar"
      },
      {
        "id": 66,
        "code": "IRR",
        "label": "Iran Rial"
      },
      {
        "id": 67,
        "code": "ISK",
        "label": "Iceland Krona"
      },
      {
        "id": 68,
        "code": "JEP",
        "label": "Jersey Pound"
      },
      {
        "id": 69,
        "code": "JMD",
        "label": "Jamaica Dollar"
      },
      {
        "id": 70,
        "code": "JOD",
        "label": "Jordan Dinar"
      },
      {
        "id": 71,
        "code": "JPY",
        "label": "Japan Yen"
      },
      {
        "id": 72,
        "code": "KES",
        "label": "Kenya Shilling"
      },
      {
        "id": 73,
        "code": "KGS",
        "label": "Kyrgyzstan Som"
      },
      {
        "id": 74,
        "code": "KHR",
        "label": "Cambodia Riel"
      },
      {
        "id": 75,
        "code": "KMF",
        "label": "Comoros Franc"
      },
      {
        "id": 76,
        "code": "KPW",
        "label": "Korea (North) Won"
      },
      {
        "id": 77,
        "code": "KRW",
        "label": "Korea (South) Won"
      },
      {
        "id": 78,
        "code": "KWD",
        "label": "Kuwait Dinar"
      },
      {
        "id": 79,
        "code": "KYD",
        "label": "Cayman Islands Dollar"
      },
      {
        "id": 80,
        "code": "KZT",
        "label": "Kazakhstan Tenge"
      },
      {
        "id": 81,
        "code": "LAK",
        "label": "Laos Kip"
      },
      {
        "id": 82,
        "code": "LBP",
        "label": "Lebanon Pound"
      },
      {
        "id": 83,
        "code": "LKR",
        "label": "Sri Lanka Rupee"
      },
      {
        "id": 84,
        "code": "LRD",
        "label": "Liberia Dollar"
      },
      {
        "id": 85,
        "code": "LSL",
        "label": "Lesotho Loti"
      },
      {
        "id": 86,
        "code": "LYD",
        "label": "Libya Dinar"
      },
      {
        "id": 87,
        "code": "MAD",
        "label": "Morocco Dirham"
      },
      {
        "id": 88,
        "code": "MDL",
        "label": "Moldova Leu"
      },
      {
        "id": 89,
        "code": "MGA",
        "label": "Madagascar Ariary"
      },
      {
        "id": 90,
        "code": "MKD",
        "label": "Macedonia Denar"
      },
      {
        "id": 91,
        "code": "MMK",
        "label": "Myanmar (Burma) Kyat"
      },
      {
        "id": 92,
        "code": "MNT",
        "label": "Mongolia Tughrik"
      },
      {
        "id": 93,
        "code": "MOP",
        "label": "Macau Pataca"
      },
      {
        "id": 94,
        "code": "MRO",
        "label": "Mauritania Ouguiya"
      },
      {
        "id": 95,
        "code": "MUR",
        "label": "Mauritius Rupee"
      },
      {
        "id": 96,
        "code": "MVR",
        "label": "Maldives (Maldive Islands) Rufiyaa"
      },
      {
        "id": 97,
        "code": "MWK",
        "label": "Malawi Kwacha"
      },
      {
        "id": 98,
        "code": "MXN",
        "label": "Mexico Peso"
      },
      {
        "id": 99,
        "code": "MYR",
        "label": "Malaysia Ringgit"
      },
      {
        "id": 100,
        "code": "MZN",
        "label": "Mozambique Metical"
      },
      {
        "id": 101,
        "code": "NAD",
        "label": "Namibia Dollar"
      },
      {
        "id": 102,
        "code": "NGN",
        "label": "Nigeria Naira"
      },
      {
        "id": 103,
        "code": "NIO",
        "label": "Nicaragua Cordoba"
      },
      {
        "id": 104,
        "code": "NOK",
        "label": "Norway Krone"
      },
      {
        "id": 105,
        "code": "NPR",
        "label": "Nepal Rupee"
      },
      {
        "id": 106,
        "code": "NZD",
        "label": "New Zealand Dollar"
      },
      {
        "id": 107,
        "code": "OMR",
        "label": "Oman Rial"
      },
      {
        "id": 108,
        "code": "PAB",
        "label": "Panama Balboa"
      },
      {
        "id": 109,
        "code": "PEN",
        "label": "Peru Nuevo Sol"
      },
      {
        "id": 110,
        "code": "PGK",
        "label": "Papua New Guinea Kina"
      },
      {
        "id": 111,
        "code": "PHP",
        "label": "Philippines Peso"
      },
      {
        "id": 112,
        "code": "PKR",
        "label": "Pakistan Rupee"
      },
      {
        "id": 113,
        "code": "PLN",
        "label": "Poland Zloty"
      },
      {
        "id": 114,
        "code": "PYG",
        "label": "Paraguay Guarani"
      },
      {
        "id": 115,
        "code": "QAR",
        "label": "Qatar Riyal"
      },
      {
        "id": 116,
        "code": "RON",
        "label": "Romania New Leu"
      },
      {
        "id": 117,
        "code": "RSD",
        "label": "Serbia Dinar"
      },
      {
        "id": 118,
        "code": "RUB",
        "label": "Russia Ruble"
      },
      {
        "id": 119,
        "code": "RWF",
        "label": "Rwanda Franc"
      },
      {
        "id": 120,
        "code": "SAR",
        "label": "Saudi Arabia Riyal"
      },
      {
        "id": 121,
        "code": "SBD",
        "label": "Solomon Islands Dollar"
      },
      {
        "id": 122,
        "code": "SCR",
        "label": "Seychelles Rupee"
      },
      {
        "id": 123,
        "code": "SDG",
        "label": "Sudan Pound"
      },
      {
        "id": 124,
        "code": "SEK",
        "label": "Sweden Krona"
      },
      {
        "id": 125,
        "code": "SGD",
        "label": "Singapore Dollar"
      },
      {
        "id": 126,
        "code": "SHP",
        "label": "Saint Helena Pound"
      },
      {
        "id": 127,
        "code": "SLL",
        "label": "Sierra Leone Leone"
      },
      {
        "id": 128,
        "code": "SOS",
        "label": "Somalia Shilling"
      },
      {
        "id": 129,
        "code": "SPL",
        "label": "  Seborga Luigino"
      },
      {
        "id": 130,
        "code": "SRD",
        "label": "Suriname Dollar"
      },
      {
        "id": 131,
        "code": "STD",
        "label": "São Tomé and Príncipe Dobra"
      },
      {
        "id": 132,
        "code": "SVC",
        "label": "El Salvador Colon"
      },
      {
        "id": 133,
        "code": "SYP",
        "label": "Syria Pound"
      },
      {
        "id": 134,
        "code": "SZL",
        "label": "Swaziland Lilangeni"
      },
      {
        "id": 135,
        "code": "THB",
        "label": "Thailand Baht"
      },
      {
        "id": 136,
        "code": "TJS",
        "label": "Tajikistan Somoni"
      },
      {
        "id": 137,
        "code": "TMT",
        "label": "Turkmenistan Manat"
      },
      {
        "id": 138,
        "code": "TND",
        "label": "Tunisia Dinar"
      },
      {
        "id": 139,
        "code": "TOP",
        "label": "Tonga Paanga"
      },
      {
        "id": 140,
        "code": "TRY",
        "label": "Turkey Lira"
      },
      {
        "id": 141,
        "code": "TTD",
        "label": "Trinidad and Tobago Dollar"
      },
      {
        "id": 142,
        "code": "TVD",
        "label": "Tuvalu Dollar"
      },
      {
        "id": 143,
        "code": "TWD",
        "label": "Taiwan New Dollar"
      },
      {
        "id": 144,
        "code": "TZS",
        "label": "Tanzania Shilling"
      },
      {
        "id": 145,
        "code": "UAH",
        "label": "Ukraine Hryvnia"
      },
      {
        "id": 146,
        "code": "UGX",
        "label": "Uganda Shilling"
      },
      {
        "id": 147,
        "code": "USD",
        "label": "United States Dollar"
      },
      {
        "id": 148,
        "code": "UYU",
        "label": "Uruguay Peso"
      },
      {
        "id": 149,
        "code": "UZS",
        "label": "Uzbekistan Som"
      },
      {
        "id": 150,
        "code": "VEF",
        "label": "Venezuela Bolivar"
      },
      {
        "id": 151,
        "code": "VND",
        "label": "Viet Nam Dong"
      },
      {
        "id": 152,
        "code": "VUV",
        "label": "Vanuatu Vatu"
      },
      {
        "id": 153,
        "code": "WST",
        "label": "Samoa Tala"
      },
      {
        "id": 154,
        "code": "XAF",
        "label": "Communauté Financière Africaine (BEAC) CFA Franc BEAC"
      },
      {
        "id": 155,
        "code": "XCD",
        "label": "East Caribbean Dollar"
      },
      {
        "id": 156,
        "code": "XDR",
        "label": "International Monetary Fund (IMF) Special Drawing Rights"
      },
      {
        "id": 157,
        "code": "XOF",
        "label": "Communauté Financière Africaine (BCEAO) Franc"
      },
      {
        "id": 158,
        "code": "XPF",
        "label": "Comptoirs Français du Pacifique (CFP) Franc"
      },
      {
        "id": 159,
        "code": "YER",
        "label": "Yemen Rial"
      },
      {
        "id": 160,
        "code": "ZAR",
        "label": "South Africa Rand"
      },
      {
        "id": 161,
        "code": "ZMW",
        "label": "Zambia Kwacha"
      },
      {
        "id": 162,
        "code": "ZWD",
        "label": "Zimbabwe Dollar"
      }
    ];

  }]);
})();