var ejs = require('ejs');
var _ = require('lodash');
var Promise = require('bluebird');

module.exports = {
    generate: function(objs, separator, method, action, id) {
        if(!Array.isArray(objs)) {
            objs = [objs];
        }
        var promises = [];
        _.forEach(objs, function(obj) {
            obj._ = _;
            if(obj.hasOwnProperty("defaultValue") && !Array.isArray(obj.defaultValue)) {
                obj.defaultValue = [obj.defaultValue];
            } else if(!obj.hasOwnProperty("defaultValue")) {
                obj.defaultValue = [];
            }
            var template = ["checkboxes", "radios", "select", "text", "textarea"].indexOf(obj.type) >= 0 ? 
                __dirname + '/views/inputs/' + obj.type + '.ejs' :
                    ["button", "submit"].indexOf(obj.type) >= 0 ? 
                        __dirname + '/views/inputs/button.ejs' :
                            __dirname + '/views/inputs/simple.ejs';
            promises.push(new Promise(function(resolve, reject) {
                ejs.renderFile(template, obj, {}, function(err, str){
                    if(err)
                        reject(err);
                    else
                        resolve(str);
                });
            }));
        });
        return Promise.all(promises).then(function(strs) {
            var fields = strs.join(separator ? separator : '');
            if(method && action) {
                var idString = id ? ' id="' + id + '"' : '';
                var form = '<form method="' + method.toUpperCase() + '" action="' + action +'"' + idString + '>'
                    + fields
                    + '</form>';
                return form;
            } else {
                return fields;
            }
        });
    },
    formGeneratorFormGet: function(formGeneratorFormPost, wantString) {
        return new Promise(function(resolve, reject) {
            ejs.renderFile(__dirname + '/views/formGeneratorForm/form.ejs', {
                action: formGeneratorFormPost,
                wantString: wantString
            }, {}, function(err, str) {
                if(err)
                    reject(err);
                else
                    resolve(str);
            });
        });
    },
    formGeneratorFormPost: function(postData) {
        var that = this;
        var formGeneratorFormPostPost = require(__dirname + '/lib/formGeneratorFormPost.js');
        var objs = formGeneratorFormPostPost.post(postData);
        if(postData.wantString == 'true') {
            return that.generate(objs, postData.formGeneratorSeparator).then(function(str) {
                return str;
            }).catch(function(err) {
                throw err;
            });
        } else {
            return new Promise(function(resolve, reject) {
                resolve(objs);
            });
        }
    }
};