sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("barcode.controller.barcode", {
        onInit() {
        }
        , onScanSuccessOne(oEvent) {
            const sResult = oEvent.getParameter("value");
            this.getView().byId("sampleBarcodeScannerResultOne").setValue(sResult);
        },

        getdata: async function () {
            try {
                const response = await fetch(
                    "https://htpc19835d03.cloudiax.com:50000/b1s/v2/PurchaseOrders",
                    {
                        method: "GET",
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("HTTP error! Status: " + response.status);
                }

                const data = await response.json();
                console.log("GET Response:", data);
                return data;

            } catch (error) {
                console.error("Error in GET request:", error);
                return null;
            }
        },
        //     loginrequest: async function (URL,reqtoken) {
        //         try {
        //             var URL = "https://htpc19835d03.cloudiax.com:50000/b1s/v2/PurchaseOrders";
        //         var reqtoken=null

        //             const response = await fetch(URL, {
        //                 method: 'POST',
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     "Accept": "application/json"
        //                                     },
        //                 body: JSON.stringify({
        //                     "CompanyDB": "INFLEXION_P01",
        //                     "UserName": "USR004",
        //                     "Password": "Babin@2003"
        //                 })
        //             });
        //             const data = await response.json();
        //             return data.SessionId;
        //             console.log("Login Response:", data);
        //         } catch (err) {
        //             console.error("Error in login:", err);
        //             return null;
        //         }
        //     },

        //     postrequest: async function (URL, req) {
        //         try {
        //             var URL = "https://htpc19835d03.cloudiax.com:50000/b1s/v2/PurchaseOrders";
        //             const sessionId = await this.loginrequest(AppConstant.URL.LoginRequest,reqtoken);
        //             if (!sessionId) {
        //                 console.error("Login failed. Cannot proceed with POST request.");
        //                 return null;
        //             }

        //             const response = await fetch(URL, {
        //                 method: 'GET',
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     "Accept": "application/json",
        //                     "Cookie": `B1SESSION=${sessionId}`
        //                 },
        //                 body: JSON.stringify(req)
        //             });

        //             const data = await response.json();
        //             return data;

        //         } catch (error) {
        //             console.error(error);
        //             return null;
        //         }
        //     }
    });
});