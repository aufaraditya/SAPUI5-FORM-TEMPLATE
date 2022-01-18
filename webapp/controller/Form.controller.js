sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"AAUFARZFORM_TRAINING_AUFAR/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Fragment, formatter, Filter, FilterOperator ) {
	"use strict";
	return Controller.extend("AAUFARZFORM_TRAINING_AUFAR.controller.Form", {
		formatter: formatter,
		onAfterRendering: function() {
			let datePicker = this.getView().byId("datePicker");
			let numberofDays = 10;
			let minDate = new Date(Date.now() - numberofDays * 24 * 60 * 60 * 1000);
			datePicker.setMinDate(minDate);
			datePicker.setDateValue(new Date());
			datePicker.setMaxDate(new Date());

			let oDelegate = {
				onAfterRendering: function() {
					// Act when the afterRendering event is fired on the element
					datePicker.$().find('INPUT').attr('disabled', true).css('color', '#ccc');
				}
			};

			datePicker.addEventDelegate(oDelegate);

		},

		onSubmit: function() {
			let datePicker = this.getView().byId("datePicker");
			let a = datePicker.getDateValue(); //Obtain in Date Data Type
			let b = datePicker.getValue(); //Obtain in dd/mm/yy
			let textAreaValue = this.getView().byId("textArea").getValue();
			let comboBoxKeyValue = this.getView().byId("comboBox").getSelectedKey();
			let switchState = this.getView().byId("Switch").getState();
			let selectedRadio = this.getView().byId("radioButtonGroup").getSelectedButton().getText();
		},

		onLiveChangeTextArea: function() {
			let textObject = this.getView().byId("textArea");
			let textValue = textObject.getValue();
			let textLength = textValue.length;
			if ((textLength >= 90) && (textLength <= 99)) {
				textObject.setValueState("Warning");
			}
			if (textLength > 99) {
				textObject.setValueState("Error");
			}
		},

		onSelectionFinish: function(param) {
			let selectionItems = param.getParameter("selectedItems");
			let texts = selectionItems.map(selectionItem=>selectionItem.getText()); //Must add ES6 Validator to true for this version
			
			// The alternative version of mapping above without the ES6 version ----------------------------------------
			//
			// let texts = [];
			// selectionItems.forEach(myFunction);
			// function myFunction(item, index) {
			// 	texts.push(item.getText());
			// }
			//
			//----------------------------------------------------------------------------------------------------

		},
		
		// onSearchHelp: function () {
		// 	var oView = this.getView();

		// 	if (!this._pValueHelpDialog) {
		// 		this._pValueHelpDialog = Fragment.load({
		// 			id: oView.getId(),
		// 			name: "AAUFARZFORM_TRAINING_AUFAR.fragment.additional",
		// 			controller: this
		// 		}).then(function (oValueHelpDialog){
		// 			oView.addDependent(oValueHelpDialog);
		// 			return oValueHelpDialog;
		// 		});
		// 	}
		// 	this._pValueHelpDialog.then(function(oValueHelpDialog){
		// 		this._configValueHelpDialog();
		// 		oValueHelpDialog.open();
		// 	}.bind(this));
		// },
		
		onSearchHelp: function() {
			let dialogSearchHelp = this._getDialogSearchHelp();
			dialogSearchHelp._getCancelButton().setType("Reject");
			dialogSearchHelp.open();
		},
		
		_getDialogSearchHelp: function () {
			if(this.dialogSearchHelp){
				return this.dialogSearchHelp;
			}else{
			this.dialogSearchHelp = sap.ui.xmlfragment("AAUFARZFORM_TRAINING_AUFAR.fragment.additional", this);
			this.getView().addDependent(this.dialogSearchHelp);
			
			return this.dialogSearchHelp;
			}
		},
		
		onClickConfirmSH: function(param){
			let selectionItem = param.getParameter("selectedItem");
			this.getView().byId("searchHelp").setValue(selectionItem.getTitle());
		},
		
		onSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("ProductName", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getParameter("itemsBinding");
			oBinding.filter([oFilter]);
			
			
		}

	});
});