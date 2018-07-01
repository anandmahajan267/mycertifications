'use strict';
/** * # api's */

angular.module('sbAdminApp').factory('apis', function ($resource) {
    return {
        search_cars: $resource(appConfig.api_base_url + '/veh/search', {}, {
            'get': {
                method: 'GET',
                isArray: false
            }
        }),
        routes: $resource(appConfig.api_base_url + '/searchkeyword', {}, {
            'get': {
                method: 'POST',
                isArray: false
            }
        }),
        routesV2: $resource(appConfig.api_base_url + '/searchkeyword2', {}, {
            'get': {
                method: 'POST',
                isArray: false
            }
        }),
        vehExtra: $resource(appConfig.api_base_url + '/veh/vehExtra', {}, {
            'get': {
                method: 'GET',
                isArray: false
            }
        }),
        carQuote: $resource(appConfig.api_base_url + '/emailquote', {}, {
            'send': {
                method: 'POST',
                isArray: false
            }
        }),
        transaction: $resource(appConfig.api_base_url + '/payment/transaction', {}, {
            'create': {
                method: 'POST',
                isArray: false
            }
        }),
        login: $resource(appConfig.api_base_url + '/auth/login', {}, {
            'check': {
                method: 'POST',
                isArray: false
            }
        }),
        fbLogin: $resource(appConfig.api_base_url + '/auth/social/facebook', {}, {
            'check': {
                method: 'POST',
                isArray: false
            }
        }),
        signup: $resource(appConfig.api_base_url + '/auth/register', {}, {
            'create': {
                method: 'POST',
                isArray: false
            }
        }),
        userMe: $resource(appConfig.api_base_url + '/users/profile', {}, {
            'get': {
                method: 'GET',
                isArray: false
            }
        }),
        contactus: $resource(appConfig.api_base_url + '/contactus', {}, {
            'send': {
                method: 'POST',
                isArray: false
            }
        }),
        driverlicence: $resource(appConfig.api_base_url + '/driverlicence', {}, {
            'send': {
                method: 'POST',
                isArray: false
            }
        }),
        downloaddriverlicence: $resource(appConfig.api_base_url + '/downloaddriverlicence', {}, {
            'get': {
                method: 'GET',
                isArray: false
            }
        }),
        emaildriverlicence: $resource(appConfig.api_base_url + '/emaildriverlicence', {}, {
            'send': {
                method: 'POST',
                isArray: false
            }
        }),
        reservation: $resource(appConfig.api_base_url + '/users/orders', {}, {
            'send': {
                method: 'POST',
                isArray: false
            }
        }),
        alipaypurchase: $resource(appConfig.api_base_url + '/payment/alipaypurchase?rmb_fee=:rmb_fee&subject=:subject', {rmb_fee: '@rmb_fee', subject: '@subject'}, {
            'get': {
                method: 'GET',
                isArray: false
            }
        }),
        alipaycompletepurchase: $resource(appConfig.api_base_url + '/payment/alipaycompletepurchase', {}, {
            'create': {
                method: 'GET',
                isArray: false
            }
        }),
    };
});