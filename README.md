# html-form-generator
NodeJS package that returns html forms parts from formatted objects.
Inspired from Drupal's [form API](https://api.drupal.org/api/drupal/developer%21topics%21forms_api_reference.html/7.x).

## How-to

`npm install html-form-generator`
* For now there is only one method : `generate`.
* It takes as arguments **an array of spec-formatted objects** and a **separator** (as a string).
* It returns an **html string of all inputs, separated by the separator**.

## Example

```javascript
var formG = require('html-form-generator');
formG.generate([
    {
        type: "text",
        name: "textField",
        attributes: {
            placeholder: "Hello world",
            size: "60",
            style: "background: red;"
        },
        classes: ["foo", "bar"],
        disabled: true
    },
    {
        type: "select",
        name: "selectField",
        attributes: {
            multiple: true
        },
        options: {
            a: "First option",
            b: "Second option",
            c: "Third option"
        },
        defaultValue: ["b", "c"]
    }
], '<br/>'
).then(function(str) {
    // Do what you need with the string
}).catch(function(err) {
    // Raise error err
});
```


## Object specification

* **type**: type of attribute. _The only one required_. All [W3C html input types](https://www.w3schools.com/html/html_form_input_types.asp) are covered. [If not, contact me](https://github.com/GregKapustin). Be careful and use the right term as follows :
  * text
  * textarea
  * select
  * radios
  * checkboxes
  * password
  * number
  * date
  * datetime-local
  * colorpicker
  * button
  * reset
  * submit
* **name**: the name to be given to the input, mandatory for your form
* **label**: a label that will be placed before the `input` tag
* **options**: only useful with _select_, _checkboxes_, and _radios_ type : a key-value object used to define options. See example.
* **attributes**: a key-value object where all properties will be added in the html tag as `key="value"`. You may use it to fill the _placeholder_, _size_, _style_, _onclick_, or any other html attribute (even the name or the classes).
* **classes**: an array of classes that will be added to the tag.
* **prefix**: an html string that will be placed before the `<label>`tag.
* **suffix**: an html string that will be placed after the `</label>`tag.
* **disabled**: a boolean disabling the input if true

## Roadmap

* Add an html form that help generate the array of objects, to be used in a backoffice for example (_as inspired from [Drupal Webform module](https://www.drupal.org/project/webform)_)
* Generate a whole form from object
* Handle fieldsets
* Add validators
* Add interactive inputs like :
  * Google Address input field
  * jQuery Auto-complete fields
  * Drag-and-drop fields
