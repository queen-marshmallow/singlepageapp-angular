requirejs.config({
    paths: {
        'jquery': '/lib/jquery/dist/jquery',
        'angular': '/lib/angular/angular',
        'angular-route': '/lib/angular-route/angular-route',
        'angular-resource': '/lib/angular-resource/angular-resource'
    },
    shim: {
        'angular-route': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'app/module': {
            deps: ['angular']
        },
        'angular': {
            exports: 'angular'
        }
    }
});