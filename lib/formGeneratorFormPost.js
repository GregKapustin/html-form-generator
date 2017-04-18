var _ = require('lodash');

module.exports = {
    post: function(postData) {
        var fieldsQty = _.max(_.map(_.keys(postData), function(name) {
            return name.split('_')[1];
        }));
        var fields = [];
        for(i = 1; i <= fieldsQty; i++) {
            fields.push(_.pickBy(postData, function(value, key) {
                return key.split('_')[1] == i;
            }));
        }
        var formGenerator = [];
        var i = 0;
        _.forEach(fields, function(values, name) {
            i++;
            if(values["name_" + i]) {
                var field = {
                    type: values["type_" + i],
                    name: values["name_" + i],
                    label: values["label_" + i],
                    disabled: values.hasOwnProperty("disabled_" + i) && values["disabled_" + i] == "on",
                    required: values.hasOwnProperty("required_" + i) && values["required_" + i] == "on"
                };
                if(/*type*/["select", "checkboxes", "radios"].indexOf(values["type_" + i]) >= 0) {
                    var options = {};
                    var defaultValue = [];
                    var j = 1;
                    while(values.hasOwnProperty("option_" + i + "_Value" + j)) {
                        if(values["option_" + i + "_Value" + j]) {
                            options[values["option_" + i + "_Value" + j]] = values["option_" + i + "_Text" + j];
                            if(values.hasOwnProperty("option_" + i + "_Selected" + j) && values["option_" + i + "_Selected" + j]) {
                                defaultValue.push(values["option_" + i + "_Value" + j]);
                            }
                        }
                        j++;
                    }
                    field.options = options;
                    field.defaultValue = defaultValue;
                }
                formGenerator.push(field);
            }
        });
        return formGenerator;
    }
};