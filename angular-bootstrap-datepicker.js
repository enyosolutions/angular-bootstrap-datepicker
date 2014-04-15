/**
 * A customizable date picker.
 * Based on bootstrap-datepicker
 * See available features http://bootstrap-datepicker.readthedocs.org/en/release/options.html
 *
 * Default options : fr, autoclose, french date format
 * Added feature :
 * - an 'ISOString' format
 *
 * Inputs:
 * @param {string} format (optional) datepicker output format (ex. 'yyyy-mm-dd') or 'ISOString'
 *                 see http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
 * @param {object} datepickerOptions (optional) datepicker options object as described in
 *                 http://bootstrap-datepicker.readthedocs.org/en/release/options.html
 *                 This object is merged with default options.
 *                 This object is watched and the datepicker is reseted on change.
 *
 */
angular
  .module('bootstrap-datepicker', [])
  .directive('bootstrapDatepicker', ['dateFilter', function (dateFilter) {

    var FORMAT_ISOSTRING = 'ISOString';
    var FORMAT_DEFAULT = 'dd/mm/yyyy';


    function computeDatepickerOptions(scope) {

      // default options
      var datepickerOptions = {
        language: 'fr',
        autoclose: true, // click on a day closes the datepicker
        format: FORMAT_DEFAULT
      };

      // custom options (optional)
      if(scope.datepickerOptions) {
        _.merge(datepickerOptions, scope.datepickerOptions);
      }

      // output format
      // set it only if it's a datepicker known format
      if( scope.dateFormat && scope.dateFormat !== FORMAT_ISOSTRING)
        datepickerOptions.format = scope.dateFormat;

      return datepickerOptions;
    }


    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        dateFormat: '@',
        datepickerOptions: '='
      },
      link: function (scope, element, attrs, ngModelCtrl) {

        scope.$watch('datepickerOptions', function(current, previous) {
          if(!current) return;
          // reset datepicker to apply the new options
          element.datepicker('remove'); // send 'remove' command to the existing datepicker
          initialize(element.val());
        }, true);

        // Initialize controller, creating the datepicker widget.
        // For current date to be correctly set in datepicker,
        // we must wait for the model to be ready.
        function initialize(datepickerValue) {
          // init datepicker current val by setting element value
          // which datepicker uses as its data store.
          element.val(datepickerValue);
          // We can now instantiate the datepicker
          element.datepicker( computeDatepickerOptions(scope) );
        }


        // format from model format to datepicker internal format
        function formatIn(modelValue) {
          if(! modelValue) return;

          // custom formats
          if(scope.dateFormat === FORMAT_ISOSTRING) {
            // Use angular formatter which understand ISO strings
            // and convert it to FORMAT_DEFAULT format.
            // Mind the angular MM which correspond to datepicker mm
            // http://devdocs.io/angular/ng.filter-date
            return dateFilter(modelValue, 'dd/MM/yyyy');
          }

          // standard formats
          return modelValue; // datepicker will take care
        }
        // angular input formatting pipeline
        ngModelCtrl.$formatters.unshift(function (modelValue) {
          var datepickerValue = formatIn(modelValue);

          return datepickerValue;
        });

        // format from datepicker internal format to model format
        function formatOut(datepickerValue) {

          // custom formats
          if(scope.dateFormat === FORMAT_ISOSTRING) {
            // we expect data in FORMAT_DEFAULT
            var day = datepickerValue.split('/')[0];
            var month = datepickerValue.split('/')[1]; // month in 1-12
            var year = datepickerValue.split('/')[2];
            var date = new Date(year, month - 1, day);

            return isNaN(date) ? null : date.toISOString();
          }

          // standard formats
          return datepickerValue;
        }
        // angular output formatting pipeline
        ngModelCtrl.$parsers.unshift(function () {
          return formatOut(element.val());
        });
      }
    };
  }]);