# angular-bootstrap-datepicker

[![Build Status](https://travis-ci.org/lemonde/angular-bootstrap-datepicker.svg?branch=master)](https://travis-ci.org/lemonde/angular-bootstrap-datepicker)
[![Dependency Status](https://david-dm.org/lemonde/angular-bootstrap-datepicker.svg?theme=shields.io)](https://david-dm.org/lemonde/angular-bootstrap-datepicker)
[![devDependency Status](https://david-dm.org/lemonde/angular-bootstrap-datepicker/dev-status.svg?theme=shields.io)](https://david-dm.org/lemonde/angular-bootstrap-datepicker#info=devDependencies)

Bootstrap datepicker directive for Angular.

## Install

### Using bower

```sh
bower install https://github.com/lemonde/angular-bootstrap-datepicker.git
```

## Usage

### Resources setup

 1. Integrate the CSS stylesheet `components/bootstrap-datepicker/css/datepicker3.css`
 1. Integrate the datepicker js code `components/bootstrap-datepicker/js/bootstrap-datepicker.js`
 1. (optional) integrate desired datepicker translations `components/bootstrap-datepicker/js/locales/bootstrap-datepicker.fr.js`

### Directive instanciation

In controller :

``` javascript
angular
.module('xyz', [
  ...
  'bootstrap-datepicker',
```

In view :

```html
<input bootstrap-datepicker required type="text" class="form-control"
placeholder="JJ/MM/AAAA"
ng-model="editionDate"
format-io="YY-MM-DD"
datepicker-options="datepickerOptions"
ng-disabled="defaultMetadata" />
```

Options :

The datepicker is configured with default options : fr, autoclose, french date format

* `@param {string} date-io (optional)` datepicker input / output format (ex. 'yyyy-mm-dd'). By default YYYY-MM-DD.
* `@param {object} datepicker-options (optional)` datepicker options object
as described in http://bootstrap-datepicker.readthedocs.org/en/release/options.html
This object is merged with default options.
This object is watched and the datepicker is reseted on change.

## License

MIT