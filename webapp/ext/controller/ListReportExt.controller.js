sap.ui.define([
	"sap/ui/generic/app/ApplicationController",
		"sap/m/BusyDialog"

], function (ApplicationController, BusyDialog) {
	"use strict";

	return sap.ui.controller("cgdc.manage.contract.ext.controller.ListReportExt", {
		
		onInit: function () {
			let that = this;
		
				let oCreateButton =   
				 sap.ui.getCore().byId("cgdc.manage.contract::sap.suite.ui.generic.template.ListReport.view.ListReport::xCGDCxC_ContractManagement_HD--addEntry");
				 oCreateButton.setVisible(false);
				
		},

		onClickActionxCGDCxC_ContractManagement_HD1: function (oEvent) {
			if (!this.createContractDialog) {
				this.createContractDialog = sap.ui.xmlfragment("idFragContract",
					"cgdc.manage.contract.ext.fragment.CreateDialog",
					this);
				this.getView().addDependent(this.createContractDialog);
			}
			this.createContractDialog.open();

			var form = sap.ui.getCore().byId("idFragContract--idcreateContract");
			var oModel = this.getOwnerComponent().getModel();
			var oModelContext = oModel.createEntry("/xCGDCxC_ContractManagement_HD");
			form.setBindingContext(oModelContext);
		},
		oncrContractClose: function (oEvent) {
			this.createContractDialog.close();
			this.createContractDialog.destroy();
			this.createContractDialog = "";
			this.getOwnerComponent().getModel().resetChanges();
		},
       	showBusyIndicator: function () {
			if (!this._busyIndicator) {
				this._busyIndicator = new BusyDialog({
					showCancelButton: false
				});
				this._busyIndicator.open();
			}
		},
			hideBusyIndicator: function () {
			if (this._busyIndicator) {
				this._busyIndicator.close();
				this._busyIndicator = null;
			}
		},
		oncrContractButton: function (oEvent) {
			var that = this;
			var form = sap.ui.getCore().byId("idFragContract--idcreateContract");
			var oObject = form.getBindingContext().getObject();
			var sContractType = oObject.DocType;
			let oResourceBundle =  this.getView().getModel("i18n").getResourceBundle();
			// var salesOrg = oObject.Vkorg
			// var DisChannel = 
			// var Division = 
			// var salesgrp = 
			// var salesoffice = 
			var oModel = this.getOwnerComponent().getModel();
			if (sContractType &&  oObject.Vkorg && oObject.Vtweg && oObject.Spart ) {
				if (!this._oApplicationController) {
					this._oApplicationController = new ApplicationController(oModel, this.getView());
				}
				var oDefaultParams = {
					"DocType": sContractType,
					"Vkorg" : oObject.Vkorg,
					"Vtweg" : oObject.Vtweg,
					"Spart" : oObject.Spart,
					"Vkbur" : oObject.Vkbur,
					"Vkgrp"	: oObject.Vkgrp		
				};
				this.showBusyIndicator();
				this._oApplicationController.getTransactionController().getDraftController().createNewDraftEntity(
					"xCGDCxC_ContractManagement_HD", "/xCGDCxC_ContractManagement_HD" , oDefaultParams, true, {})
				.then(function (oResponse) {
					//sap.m.MessageToast.show(oResponse.data.DraftUUID);
					that.extensionAPI.getNavigationController().navigateInternal(oResponse.context);
					that.hideBusyIndicator();
				});
			}
			else {
				sap.m.MessageToast.show(oResourceBundle.getText("MissingField"));
			}
		}
	});
});