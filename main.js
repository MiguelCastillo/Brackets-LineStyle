/**
 * Line Style Copyright (c) 2014 Miguel Castillo.
 *
 * Licensed under MIT
 */

define(function(require /*, exports, module*/) {
  "use strict";

  var EditorManager      = brackets.getModule("editor/EditorManager");
  var PreferencesManager = brackets.getModule("preferences/PreferencesManager");
  var prefs              = PreferencesManager.getExtensionPrefs("brackets-line-style");
  var mainTmpl           = require("text!main.tmpl");
  var $style             = $("<style id='line-style'>").appendTo("head");


  prefs.definePreference("height", "string", "").on("change", function() {
    var lineHeight = prefs.get("height");

    if (lineHeight) {
      $style.text(Mustache.render(mainTmpl, { height: lineHeight }));
    }
    else  {
      $style.text("");
    }

    refreshEditor();
  });


  function refreshEditor() {
    var editor = EditorManager.getActiveEditor();

    if (editor) {
      setTimeout(function() {
        editor.refresh();
      });
    }
  }
});
