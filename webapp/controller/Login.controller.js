sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ndc/BarcodeScanner",
], function (Controller, MessageBox, MessageToast, JSONModel, BarcodeScanner) {
    "use strict";

    return Controller.extend("barcode.controller.Login", {
        onInit() {
            this.Loginmdl();
        },

        Loginmdl: function () {
            var oLoginModel = new JSONModel({
                login: {
                    userName: "",
                    password: "",
                    CompanyDB: "",
                    userNameError: false,
                    userNameErrorText: "",
                    passwordError: false,
                    passwordErrorText: "",
                    companyDBError: false,
                    companyDBErrorText: ""
                }
            });
            this.getView().setModel(oLoginModel, "loginModel");
        },
           
      validationlogin:function () {
            var oLoginModel = this.getView().getModel("loginModel");
            var loginData = oLoginModel.getProperty("/login");
            var isValid = true;
            if (!loginData.userName) {
                oLoginModel.setProperty("/login/userNameError", true);
                oLoginModel.setProperty("/login/userNameErrorText", "Username is required");
                isValid = false;
            }
            else {
                oLoginModel.setProperty("/login/userNameError", false);
                oLoginModel.setProperty("/login/userNameErrorText", "");
            }
            if (!loginData.password) {
                oLoginModel.setProperty("/login/passwordError", true);
                oLoginModel.setProperty("/login/passwordErrorText", "Password is required");
                isValid = false;
            }
            else {
                oLoginModel.setProperty("/login/passwordError", false);
                oLoginModel.setProperty("/login/passwordErrorText", "");
            }
            if (!loginData.CompanyDB) {
                oLoginModel.setProperty("/login/companyDBError", true);
                oLoginModel.setProperty("/login/companyDBErrorText", "Company is required");
                isValid = false;
            }
            else {
                oLoginModel.setProperty("/login/companyDBError", false);
                oLoginModel.setProperty("/login/companyDBErrorText", "");
            }

            return isValid;
        },

        onLogin: async function () {
            var valloginmode = this.getView().getModel("loginModel").getProperty("/login");
            var isValid = this.validationlogin();
            if (!isValid) {
                return;
            }

            let response = await fetch("/b1s/v2/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "CompanyDB": valloginmode.CompanyDB,
                    "UserName": valloginmode.userName,
                    "Password": valloginmode.password
                })
            });
            if (response.ok) {
                MessageToast.show("Login successful!");
                this.getOwnerComponent().getRouter().navTo("Routebarcode");
            }
            else {
                MessageBox.error("Login failed. Please check your credentials.");
            }


        }
    });
});