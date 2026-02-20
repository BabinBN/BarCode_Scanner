/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["barcode/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
