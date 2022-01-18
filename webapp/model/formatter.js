sap.ui.define([], function() {
	"use strict";
	return {
		iconSelection: function(abr) {
			let resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (abr) {
				case "WC":
					return resourceBundle.getText("webCamIcon");
				case "WM":
					return resourceBundle.getText("washingMachineIcon");
				case "C":
					return resourceBundle.getText("calculatorIcon");
				case "S":
					return resourceBundle.getText("speakerIcon");
				case "FD":
					return resourceBundle.getText("floppyDiskIcon");
				default:
					return abr;
			}
		}

	};
});