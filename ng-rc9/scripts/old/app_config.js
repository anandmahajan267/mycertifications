var api_base_url = 'http://stageau.rc9.co/api/v1'; // Dev
//var api_base_url = 'http://stageau.rc9.co/api/v1'; // Live

var app_base_url = 'http://localhost/ng-rc9'; // Dev
//var app_base_url = 'http://localhost/ng-rc9'; // Live

var appConfig = {
    api_base_url: api_base_url,
    app_base_url: app_base_url,
    location_flag_url: "https://s3-ap-southeast-2.amazonaws.com/rc9-flags",
    language: "en",
    currency: "SGD",
    fbid: "194395527610845",
};


var app_rates = [
    {"code": "AUD", "name": "Australian Dollars"},
    {"code": "CNY", "name": "China Yuan Renminbi"},
    {"code": "EUR", "name": "Euro"},
    {"code": "GBP", "name": "GBP Pound"},
    {"code": "USD", "name": "US Dollar"},
    {"code": "HKD", "name": "Hong Kong Dollars"},
    {"code": "IDR", "name": "Indonesia Rupiahs"},
    {"code": "INR", "name": "India Rupees"},
    {"code": "JPY", "name": "Japan Yen"},
    {"code": "MYR", "name": "Malaysia Ringgits"},
    {"code": "NZD", "name": "New Zealand Dollars"},
    {"code": "PHP", "name": "Philippines Pesos"},
    {"code": "SGD", "name": "Singapore Dollars"},
    {"code": "THB", "name": "Thailand Baht"},
    {"code": "TWD", "name": "Taiwan New Dollars"},
    {"code": "VND", "name": "Vietnam Dong"},
];

var app_time_intervals = [];
for (var h = 0; h < 24; h++) {
    var k = 0;
    for (var l = 0; l < 2; l++) {
        k = parseInt(k);
        if (l == 1) {
            k = k + 30
        }
        if (k < 10) {
            k = "0" + k;
        }
        if (h < 10) {
            h = "0" + h;
        }
        var m = h + ":" + k
        app_time_intervals.push({id: m, name: m});
        h = parseInt(h);
    }
}


