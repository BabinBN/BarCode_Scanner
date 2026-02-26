sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ndc/BarcodeScanner",
], function (Controller, MessageBox, MessageToast, JSONModel, BarcodeScanner) {
    "use strict";

    return Controller.extend("barcode.controller.barcode", {
        onInit() {
        },
        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("RouteLogin");
        },
        onScanDelivery: function (oEvent) {
            var that = this;
            BarcodeScanner.scan(
                function (mResult) {
                    if (!mResult.cancelled) {
                        that.getView().byId("deliveryNoteInput").setValue(mResult.text);
                        MessageBox.show("We got a bar code\n" +
                            "Result: " + mResult.text + "\n" +
                            "Format: " + mResult.format + "\n");
                    }
                },
                function (Error) {
                    alert("Scanning failed: " + Error);
                },
                {
                    preferFrontCamera: false,
                    showFlipCameraButton: true,
                    showTorchButton: true,
                    torchOn: false,
                    zoom: 1,
                    keepCameraScan: false
                }
            );
        },
        getPurchaseOrders: async function () {
            const response = await fetch("/b1s/v2/PurchaseOrders", {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                },
            });

            const data = await response.json();
            console.log(data);
        },
        onAttachSignedDN: async function (oEvent) {
            try {
                const oFileUploader = this.byId("signedFileUploader");
                const file = oFileUploader.getFocusDomRef().files[0];

                const formData = new FormData();
                formData.append("files", file);

                const response = await fetch("/b1s/v2/Attachments2", {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                });

                const attachData = await response.json();
                const attachmentId = attachData.AbsoluteEntry;

                await fetch("/b1s/v2/DeliveryNotes(1548)", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        AttachmentEntry: attachmentId
                    })
                });

                sap.m.MessageToast.show("Attachment Added Successfully");

            } catch (error) {
                console.error(error);
                sap.m.MessageToast.show("Upload Failed");
            }
        }

    });
});