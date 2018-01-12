# html-form-generator
NodeJS package that returns html forms parts from formatted objects.
Inspired from Drupal's [form API](https://api.drupal.org/api/drupal/developer%21topics%21forms_api_reference.html/7.x).

## How-to

`npm install html-form-generator`
* For now there is only one method : `generate`.
* It generates a form and takes as arguments 
  * **an array of spec-formatted objects**
  * a **separator** (as a string)
  * a **method** (as a string : 'GET', 'POST', etc)
  * an **action** (as a string : an URL or javascript code)
  * an **id** (as a string)
  * **values** (as an object {_name_: _value_})
* It returns an **html string of the form with all inputs, separated by the separator**.

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
],
 '<br/>',
 'POST',
 '/myURL',
 'myForm',
 {
   "textfield": "Hello World"
 }
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
* **required**: a boolean setting the input to required if true

## Form generator form

This module includes a **form maker** provided by the **formGeneratorFormGet** method, a form to build either the object as specified by the module, or the html itself. It's inspired from [Drupal Webform module](https://www.drupal.org/project/webform).
You have to call it (as a promise) with two arguments : the relative URL where the POST will be made, and true or false if you want the final html form or false if you want just the object.

### Example

This example presumes that the form will be posted on `/formGeneratorFormPost` and wants the final HTML.

```javascript
var formG = require('html-form-generator');
formG.formGeneratorFormGet("/formGeneratorFormPost", true).then(function(str) {
    // str is the html string of the form, place it where you need it or plug it in a view
}).catch(function(err) {
    // Raise error err
});
```

Of course, you will have to create a route on `/formGeneratorFormPost` to retrieve the final data and another method is provided : **formGeneratorFormPost**.

```javascript
'POST /formGeneratorFormPost' : function(req, res) {
    var formG = require('html-form-generator');
    return formG.formGeneratorFormPost(req.body).then(function(str) {
        // Do what you want with the html form generated by the module
    }).catch(function(err) {
        return res.serverError(err);
    });
}
```

## Roadmap

* ~~Add an html form that help generate the array of objects, to be used in a backoffice for example (_as inspired from [Drupal Webform module](https://www.drupal.org/project/webform)_)~~
* ~~Generate a whole form from object~~
* Handle fieldsets
* Add validators
* Add interactive inputs like :
  * Google Address input field
  * jQuery Auto-complete fields
  * Drag-and-drop fields
