/*global QUnit*/

sap.ui.define([
	"barcode/controller/barcode.controller"
], function (Controller) {
	"use strict";

	QUnit.module("barcode Controller");

	QUnit.test("I should test the barcode controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
