sap.ui.define([
	"sap/ui/generic/app/ApplicationController",

], function (ApplicationController) {
	"use strict";

	return sap.ui.controller("cgdc.manage.contract.ext.controller.ListReportExt", {

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

		oncrContractButton: function (oEvent) {
			var that = this;
			var form = sap.ui.getCore().byId("idFragContract--idcreateContract");
			var oObject = form.getBindingContext().getObject();
			var sContractType = oObject.DocType;
			var oModel = this.getOwnerComponent().getModel();
			if (sContractType) {
				if (!this._oApplicationController) {
					this._oApplicationController = new ApplicationController(oModel, this.getView());
				}
				var oDefaultParams = {
					"DocType": sContractType
				}
				this._oApplicationController.getTransactionController().getDraftController().createNewDraftEntity(
					"xCGDCxC_ContractManagement_HD", "/xCGDCxC_ContractManagement_HD" , oDefaultParams, true, {})
				.then(function (oResponse) {
					//sap.m.MessageToast.show(oResponse.data.DraftUUID);
					that.extensionAPI.getNavigationController().navigateInternal(oResponse.context);
				});
			}
		}
	});
});