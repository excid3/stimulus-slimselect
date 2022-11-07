[![npm](https://img.shields.io/npm/v/stimulus-slimselect.svg)](https://www.npmjs.com/package/stimulus-slimselect)

# Stimulus SlimSelect

This is a Stimulus wrapper around the [SlimSelect](https://slimselectjs.com/) library.

## Install

This assumes that [StimulusJS](https://stimulusjs.org) is already installed.

```
yarn add @hotwired/stimulus
```

**Optional**: Add the SlimSelect module if it is not already installed:

```bash
$ yarn add slim-select
# OR
$ npm install slim-select
```

Add the `stimulus-slimselect` module:

```bash
$ yarn add stimulus-slimselect
OR
$ npm install stimulus-slimselect
```

## Basic Usage

First, you'll want to initialize StimulusJS and then you can import the Stimulus component.

```javascript
// Start StimulusJS
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start();
const context = require.context("controllers", true, /.js$/);
application.load(definitionsFromContext(context));

// Import and register the component
import StimulusSlimSelect from "stimulus-slimselect"
application.register('slimselect', StimulusSlimSelect)
```

This will start StimulusJS and load any controllers that you have
locally and then register the Stimulus SlimSelect controller.

## Values
- Options: `Object`

You can add any options from [slim-select](https://github.com/brianvoe/slim-select/blob/master/src/docs/pages/options.vue)
into the component, simply do

```html
<select
    data-controller="slimselect"
    data-slimselect-options-value="{slim-select options}">

</select>
```

## Extending Components

You can use inheritance to extend the functionality of any Stimulus components.

```js
import StimulusSlimSelect from "stimulus-slimselect"

export default class MySelect extends StimulusSlimSelect{
  connect() {
    super.connect();
    console.log("hello world")
  }
}
```

These controllers will automatically have access to `targets` defined in the parent class.

If you override the `connect`, `disconnect` or any other methods from the parent, you'll want to call `super.method()` to make sure the parent functionality is executed.

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/excid3/stimulus-slimselect>.  This project is intended to be a safe, welcoming space for  collaboration, and contributors are expected to adhere to the  Contributor Covenant code of conduct.

## License

This package is available as open source under the terms of the MIT License.
