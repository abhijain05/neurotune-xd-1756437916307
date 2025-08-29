sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/core/MessageType"
], function (Controller, JSONModel, MessageToast, MessageBox, MessageType) {
  "use strict";

  /**
   * @class CustomerRegistrationView controller
   * @extends sap.ui.core.mvc.Controller
   */
  return Controller.extend("converted.customerregistrationview.controller.CustomerRegistrationView", {

    /**
     * Called when the view is initialized.
     * @public
     */
    onInit: function () {
      // Load customer data from mock data
      var oCustomerModel = new JSONModel();
      oCustomerModel.loadData("model/mockData/customers.json");
      this.getView().setModel(oCustomerModel, "customers");

      // Load product data from mock data
      var oProductModel = new JSONModel();
      oProductModel.loadData("model/mockData/products.json");
      this.getView().setModel(oProductModel, "products");

      // Load order data from mock data
      var oOrderModel = new JSONModel();
      oOrderModel.loadData("model/mockData/orders.json");
      this.getView().setModel(oOrderModel, "orders");

      // Initialize message model
      var oMessageModel = new JSONModel({
        messages: []
      });
      this.getView().setModel(oMessageModel, "messages");
      
      // Set initial data for the form
      var oFormData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        jobTitle: "",
        address: "",
        termsAndConditions: false
      };
      var oFormModel = new JSONModel(oFormData);
      this.getView().setModel(oFormModel, "formData");
    },

    /**
     * Handles the form submission.
     * @public
     */
    onSubmit: function () {
      var oFormData = this.getView().getModel("formData").getData();
      var oMessageManager = sap.ui.getCore().getMessageManager();
      oMessageManager.removeAllMessages();

      // Validate email
      if (!oFormData.email || !oFormData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        oMessageManager.addMessages(
          new sap.ui.core.message.Message({
            message: "Invalid Email Address",
            type: MessageType.Error,
            processor: this.getView().getModel("formData")
          })
        );
      }

      // Validate terms and conditions
      if (!oFormData.termsAndConditions) {
        oMessageManager.addMessages(
          new sap.ui.core.message.Message({
            message: "Please accept Terms and Conditions",
            type: MessageType.Error,
            processor: this.getView().getModel("formData")
          })
        );
      }

      if (oMessageManager.getMessageModel().getData().length > 0) {
        //MessageBox.error("Please correct the errors in the form.");
        return; // Stop submission if there are errors
      }

      // If validation passes, simulate successful submission
      MessageBox.success("Customer registered successfully!", {
        onClose: function() {
          // Reset form after successful submission
          oFormData.firstName = "";
          oFormData.lastName = "";
          oFormData.email = "";
          oFormData.phone = "";
          oFormData.companyName = "";
          oFormData.jobTitle = "";
          oFormData.address = "";
          oFormData.termsAndConditions = false;
          this.getView().getModel("formData").setData(oFormData);
        }.bind(this)
      });
    },

    /**
     * Handles message popover press
     * @param {sap.ui.base.Event} oEvent The event object
     */
    handleMessagePopoverPress: function (oEvent) {
      var oButton = oEvent.getSource();

      if (!this._oMessagePopover) {
        this._oMessagePopover = new sap.m.MessagePopover({
          items: {
            path: 'messages>/',
            template: new sap.m.MessageItem({
              type: '{messages>type}',
              title: '{messages>message}',
              description: '{messages>description}',
            })
          }
        });
        oButton.addDependent(this._oMessagePopover);
      }

      this._oMessagePopover.toggle(oButton);
    }
  });
});
