sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  /**
   * @class App controller
   * @extends sap.ui.core.mvc.Controller
   */
  return Controller.extend("converted.customerregistrationview.controller.App", {
    /**
     * Called when the app controller is initialized.
     * @public
     */
    onInit: function () {
      // You can add any app-level initialization logic here
      console.log("App.controller.js initialized");
    }
  });
});
