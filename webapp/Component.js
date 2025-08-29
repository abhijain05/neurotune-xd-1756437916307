sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device"
], function (UIComponent, Device) {
  "use strict";

  /**
   * @class Component
   * @extends sap.ui.core.UIComponent
   */
  return UIComponent.extend("converted.customerregistrationview.Component", {
    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app.
     * @public
     * @override
     */
    init: function () {
      // Call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // Enable routing
      this.getRouter().initialize();

      // Set the device model
      this.setModel(new sap.ui.model.json.JSONModel(Device), "device");
    }
  });
});
