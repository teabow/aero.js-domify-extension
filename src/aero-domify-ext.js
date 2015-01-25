(function () {

    window.aero = window.aero || {};

    window.aero._initDomify = function (view) {

        view.domify = function (name, field) {

            var data = this[name];

            if (_.isArray(data)) {
                var element = $('*[data-observable-array="' + name + '"]');
                var templateUrl = element.attr('data-observable-template');

                window.aero.templateManager.get(templateUrl, function (template) {
                    var tmp = '';
                    for (var i = 0; i < data.length; i++) {
                        tmp += _.template(template, data[i]);
                    }
                    element.html(tmp);
                });
            }

            else {
                if ($('*[data-observable-value="' + name + '.' + field + '"]').length) {
                    $('*[data-observable-value="' + name + '.' + field + '"]').html(data[field]);
                }
                else if ($('*[data-observable-input="' + name + '.' + field + '"]').length) {
                    $('*[data-observable-input="' + name + '.' + field + '"]').val(data[field]);
                }
            }

        };

        view.watch = function (name, cb) {

            var self = this;
            var element = $('*[data-observable-input="' + name + '"]');

            console.log('watch', element);

            element.off('keyup');
            element.on('keyup', function () {
                var dotIndex = name.indexOf('.');
                if (dotIndex > -1) {
                    self[name.substring(0, dotIndex)][name.substring(dotIndex + 1)] = element.val();
                }
                else {
                    self[name] = element.val();
                }
                cb(element.val());
            });

        };

    };


})();
