(function () {
    'use strict';

    window.app = window.app || {};
    window.app.views = window.app.views || {};

    window.app.views.main = window.aero.view.extend ({

        template: 'templates/main.html',

        container: '#content',

        init: function (data) {

            this.addEvent('click button.btnHi', this.btnHiHandler);
            this.addEvent('click button.btnSecondPage', this.btnSecondPageHandler);
            window.aero.controller.showView('mainSub');

            this.user = {name: 'everyone', firstname: 'mmmm'};
            this.others = [
                {
                    name: 'Lebron'
                },
                {
                    name: 'Kobe'
                }
            ];
            this.domify('others');

            this.watch('user.firstname', function (value) {
                console.log(value);
            });

        },

        btnHiHandler: function () {

            window.alert('Hi ' + this.user.firstname);

            this.others.push({name: 'Michael'});
            this.domify('others');

            this.user.name = 'Teabs';
            this.domify('user', 'name');
        },

        btnSecondPageHandler: function () {
            window.aero.controller.showView('second');
        }

    });

})();
