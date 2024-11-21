sap.ui.define([
	"sap/ui/core/mvc/ControllerExtension",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/ListItem",
	"sap/ui/model/Sorter",
	"sap/m/BusyDialog",
	"sap/suite/ui/commons/library",
	'sap/m/MessageToast',
	"sap/m/Dialog",
	"sap/ui/generic/app/ApplicationController",

], function (ControllerExtension, JSONModel, Fragment, ODataModel, Filter, FilterOperator, ListItem, Sorter, BusyDialog, SuiteLibrary,
	MessageToast, Dialog, ApplicationController) {
	"use strict";

	return sap.ui.controller("cgdc.manage.contract.ext.controller.ObjectPageExt", {

		onInit: function () {
			this.initializeJSONModel();
			let that = this;
			let oConditionTable = this.getView().byId(
				"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--Condition::responsiveTable"
			);
			let clauesButton1 = sap.ui.getCore().byId(
				"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--HeaderClauses::addEntry"
			);
			if (clauesButton1) {
				clauesButton1.setVisible(false);
			}
			let clauesButtonItem1 = sap.ui.getCore().byId(
				"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--ItemClauses::addEntry"
			);
			if (clauesButtonItem1) {
				clauesButtonItem1.setVisible(false);
			}
			
			this.extensionAPI.attachPageDataLoaded(function (oEvent) {
				{
					// var oButton = that.getView().byId("cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--edit");
					// if (oButton && !oButton.getVisible()) {
					// 	that.getView().getContent()[0].setShowHeaderContent(true);
					// 

					let contracttype = that.getView().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--Sales::DocType::Field"
					);

					let salesOrg = that.getView().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--Sales::Vkorg::Field"
					);
					let DistributionChannel = that.getView().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--Sales::Vtweg::Field"
					);
					let division = that.getView().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--Sales::Spart::Field"
					);
					if (DistributionChannel != undefined) {
						DistributionChannel.setEnabled(false);
					}
					if (salesOrg != undefined) {
						salesOrg.setEnabled(false);
					}
					if (division != undefined) {
						division.setEnabled(false);
					}
					if (contracttype != undefined) {
						contracttype.setEnabled(false);
					}
					let clauesButton = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--HeaderClauses::addEntry"
					);
					if (clauesButton) {
						clauesButton.setVisible(false);
					}
					let clauesButtonItem = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--ItemClauses::addEntry"
					);
					if (clauesButtonItem) {
						clauesButtonItem.setVisible(false);
					}

					// let moditrack = sap.ui.getCore().byId(
					// 	"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--action::cds_xcgdcxui_contract_mngmnt.cds_xcgdcxui_contract_mngmnt_Entities::Modification"
					// );
					let edit = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--edit");
					edit.attachPress(that.setVisiblityClause, that);

					if (edit.getVisible()) {

						if (sap.ui.getCore().byId(
								"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--ActionxCGDCxC_ContractManagement_HDSections1button"
							)) {
							sap.ui.getCore().byId(
								"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--ActionxCGDCxC_ContractManagement_HDSections1button"
							).setVisible(false);
						}
						if (sap.ui.getCore().byId(
								"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--ItemClausesAdd"
							)) {
							sap.ui.getCore().byId(
								"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--ItemClausesAdd"
							).setVisible(false);
						}
					}

					let oDisplayText = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_CONTRACT_TEXT--General::updateTxt1::Field"
					);
					let oDisplayEmptyText = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_CONTRACT_TEXT--General::updateTxt::Field"
					);
					let oDisplayTextItem = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_CONTRACTITM_TXT--General::updateTxt1::Field"
					);
					let oDisplayEmptyTextItem = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_CONTRACTITM_TXT--General::updateTxt::Field"
					);
					if (oDisplayText) {
						let textValue = oDisplayText.getValue();
						if (!oDisplayEmptyText.getValue()) {
							oDisplayEmptyText.setValue(textValue);
						}
						oDisplayText.setVisible(false);
					}
					if (oDisplayTextItem) {
						let textValue = oDisplayTextItem.getValue();
						if (!oDisplayEmptyTextItem.getValue()) {
							oDisplayEmptyTextItem.setValue(textValue);
						}
						oDisplayTextItem.setVisible(false);
					}
					let oItemApplyButton = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--footerObjectPageBackTo"
					);
					if (oItemApplyButton) {
						oItemApplyButton.attachPress(that.refreshPage, that);
					}
					let spath = oEvent.context.getPath();
					let Vbeln = oEvent.context.getModel().getData(spath).Vbeln;
					that.Objnr = oEvent.context.getModel().getData(spath).Objnr;
					if (oEvent.context.getModel().getData(spath).Posnr) {
						that.Posnr = oEvent.context.getModel().getData(spath).Posnr;
					} else {
						that.Posnr = '00000';
					}
					that.CreatedBy = oEvent.context.getModel().getData(spath).CreatedBy;
					that.SoldToParty = oEvent.context.getModel().getData(spath).SoldToParty
					that.statusProfile = oEvent.context.getModel().getData(spath).Stsma;
					that.Auart = oEvent.context.getModel().getData(spath).Auart;
					that.modtrackenable = oEvent.context.getModel().getData(spath).modtrackenable;
					that.Vbeln = Vbeln;
				   	let moditrackButton = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--action::ModificationTracking"
					);
					moditrackButton.setType("Emphasized");
					moditrackButton.setVisible(false);
					if (that.modtrackenable == 'X') {
						moditrackButton.setVisible(true);
						edit.setVisible(false);
					}
					if (that.Vbeln == '') {
						that.getView().byId(
							"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--Condition::Section"
						).setVisible(false);
						that.getView().byId(
							"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--BeforeFacet::xCGDCxC_ContractManagement_HD::Status::Section"
						).setVisible(false);
						that.getView().byId(
							"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--BeforeFacet::xCGDCxC_ContractManagement_HD::VochureNum::Section"
						).setVisible(false);
						that.getView().byId(
							"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--BeforeFacet::xCGDCxC_ContractManagement_HD::VochureNum::Section"
						).setVisible(false);
						that.getView().byId(
							"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--action::NavtoClinAcrn"
						).setVisible(false);
						that.setVisiblityClause();
						let clauesButton = sap.ui.getCore().byId(
							"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--HeaderClauses::addEntry"
						);
						if (clauesButton) {
							clauesButton.setVisible(false);
						}
						let clauesButtonItem = sap.ui.getCore().byId(
							"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--ItemClauses::addEntry"
						);
						if (clauesButtonItem) {
							clauesButtonItem.setVisible(false);
						}
					}
					if (that.Posnr == '00000') {
						if (that.getView().byId(
								"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--BeforeFacet::xCGDCxC_ContractManagement_Itm::Text::Section"
							)) {
							that.getView().byId(
								"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--BeforeFacet::xCGDCxC_ContractManagement_Itm::Text::Section"
							).setVisible(false);
							that.getView().byId(
								"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--Condition::Section"
							).setVisible(false);
						}
						that.getCustomerImageData(that.SoldToParty);
					}
					that.onDocumentflowProcess(Vbeln);

					that.getStatusData(that.Objnr, that.Auart, that.statusProfile);
					that.onloadstatusProcess(that.statusProfile);
					var oModel = that.getOwnerComponent().getModel();
					that._oApplicationController = new ApplicationController(oModel, that.getView());
					that.oContext = that.oView.getBindingContext();
					var oDraftcontroller = that._oApplicationController.getTransactionController().getDraftController();
					that.hasDraft = oDraftcontroller.hasActiveEntity(that.oContext);
					if (that.hasDraft) {
					 	that.setVisiblityClause();
					}
				
				}
			});
		},
		initializeJSONModel: async function () {
			var json = new JSONModel();
			this.getView().setModel(this.getOwnerComponent().getModel());
			this.getView().setModel(json, "HeaderData");
			this.getView().getModel("HeaderData").setSizeLimit(1000);
			this.getView().getModel("HeaderData").setData([]);
		},
		refreshPage: function () {
			this.getView().getModel().refresh(true);
		},

		setVisiblityClause: function () {
		
			let Modification = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--action::ModificationTracking");
			Modification.setVisible(false);	 
			let clauesButton = sap.ui.getCore().byId(
				"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--HeaderClauses::addEntry"
			);
			if (clauesButton) {
				clauesButton.setVisible(false);
			}
			let clauesButtonItem = sap.ui.getCore().byId(
				"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--ItemClauses::addEntry"
			);
			if (clauesButtonItem) {
				clauesButtonItem.setVisible(false);
			}
			if (sap.ui.getCore().byId(
					"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--ActionxCGDCxC_ContractManagement_HDSections1button"
				)) {
				sap.ui.getCore().byId(
					"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--ActionxCGDCxC_ContractManagement_HDSections1button"
				).setVisible(true);
			}
			if (sap.ui.getCore().byId(
					"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--ItemClausesAdd"
				)) {
				sap.ui.getCore().byId(
					"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_Itm--ItemClausesAdd"
				).setVisible(true);
			}
		},

		getCustomerImageData: function (SoldToParty) {
			//var imageData = {};
			var that = this;
			var customernumber = SoldToParty;
			var oCIDataModel = this.getOwnerComponent().getModel("customerImages");
			oCIDataModel.callFunction("/GetAllOriginals", {
				method: "GET",
				urlParameters: {
					"ObjectKey": customernumber.toString(), //"1",
					"ObjectType": "BUS1006",
					"SemanticObjectType": "",
					"IsDraft": true,
					"AttachmentFramework": ""
				},
				success: function (oData, response) {
					var objImgData = {
						results: oData.results[0]
					};
					that.getOwnerComponent().getModel("customerImageModel").setData(objImgData);
				},
				error: function (oError) {}
			});
		},
		getStatusData: function (Objnr, Auart, statusProfile) {
			let that = this;
			var oModel = this.getOwnerComponent().getModel();
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter("objnr", sap.ui.model.FilterOperator.EQ, Objnr);
			filters.push(oFilter);
			var ostatusFilter = new sap.ui.model.Filter("Auart", sap.ui.model.FilterOperator.EQ, Auart);
			filters.push(ostatusFilter);
			var ostatusProFilter = new sap.ui.model.Filter("Stsma", sap.ui.model.FilterOperator.EQ, statusProfile);
			filters.push(ostatusProFilter);
			var oPath = '/xCGDCxI_ContractStatus';
			oModel.read(oPath, {
				filters: filters,
				success: function (oData) {
					if (oData) {
						that.statusData = oData.results;
					}

				},
				error: function (oError) {
					//	Util.manageErrors(oError);
				}
			});
		},
		onloadstatusProcess: function (statusProfile) {
			let that = this;
			var oModel = this.getOwnerComponent().getModel();
			this.getView().getModel("HeaderData").setProperty("/lanes", []);
			this.getView().getModel("HeaderData").setProperty("/PNodes", []);
			var oPath = '/xCGDCxC_TJ30';
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter("Stsma", sap.ui.model.FilterOperator.EQ, statusProfile);
			filters.push(oFilter);
			oModel.read(oPath, {
				filters: filters,
				success: function (oData) {
					if (oData) {
						var data = oData.results;
						that.setStatusData(data);
					}
				},
				error: function (oError) {
					//	Util.manageErrors(oError);
				}
			});
		},

		setStatusData: function (data) {
			var statusData = this.statusData;
			this.oProcessFlow = this.getView().byId("ProcessFlow");
			var lanes = [];
			var PNodes = [];
			var aStatus = [];
			for (let i = 0; i < data.length; i++) {
				aStatus.push({
					...data[i],
					...(statusData.find((itmInner) => itmInner.estat === data[i].Estat))
				});
			}
			var text;
			var index = 0;
			var state = SuiteLibrary.ProcessFlowNodeState.Neutral;
			for (var i = 0; i < aStatus.length; i++) {
				if (aStatus[i].utime) {
					this.atexts = [];
					this.alastChanged = [];
					this.alastChanged[0] = "Changed At:";
					this.atexts[0] = "Changed By:";
					let seconds = aStatus[i].utime.ms / 1000;
					var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
					seconds = seconds % 3600; // seconds remaining after extracting hours
					// 3- Extract minutes:
					var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
					// 4- Keep only seconds not extracted to minutes:
					seconds = seconds % 60;
					let otime = hours + ":" + minutes + ":" + seconds;
					var oDate = sap.ui.core.format.DateFormat.getInstance({
						style: "medium",
						calendarType: sap.ui.core.CalendarType.Gregorian
					});
					this.alastChanged[1] = otime + " " + oDate.format(aStatus[i].udate);
				}
				if (aStatus[i].usnam) {
					this.atexts[1] = aStatus[i].usnam;
					text = aStatus[i].Txt30;
					if (aStatus[i].Inact == 'X') {
						state = SuiteLibrary.ProcessFlowNodeState.Neutral;
					} else {
						if (aStatus[i].Inact == "")
							state = SuiteLibrary.ProcessFlowNodeState.Positive;
					}

					PNodes.push({
						"atexts": this.atexts,
						"id": index,
						"text": text,
						"state": state,
						"laneId": i,
						"alastChanged": this.alastChanged
					});
					index = index + 1;
				} else {
					text = aStatus[i].Txt30;
					state = state;

				}
				lanes.push({
					"id": i,
					"text": aStatus[i].Txt30,
					"position": i,
				});
			}
			if (index == 0) {
				state = SuiteLibrary.ProcessFlowNodeState.Positive;
				this.atexts = [];
				this.alastChanged = [];
				this.alastChanged[0] = "Changed At:";
				this.atexts[0] = "Changed By:";
				if (this.CreatedBy) {
					this.atexts[1] = this.CreatedBy;
				}
				PNodes.push({
					"id": index,
					"atexts": this.atexts,
					"text": text,
					"state": state,
					"laneId": index,
					"alastChanged": this.alastChanged
				});
			}
			for (var j = 0; j < PNodes.length; j++) {
				if (PNodes.length - 1 !== j) {
					PNodes[j].children = [j + 1];
				} else { // the last record's children empty
					PNodes[j].children = [];
				}
			}
			this.getView().getModel("HeaderData").setProperty("/lanes", lanes);
			this.getView().getModel("HeaderData").setProperty("/PNodes", PNodes);

		},

		urlCreation: function (s) {
			return encodeURIComponent(s).replace(/\'/g, "%27");
		},
		onDocumentflowProcess: function (header) {
			var that = this;
			var oModel = this.getOwnerComponent().getModel();
			this.getView().getModel("HeaderData").setProperty("/lines", []);
			this.getView().getModel("HeaderData").setProperty("/nodes", []);
			var posnr = that.Posnr;
			var oPath = "/xCGDCxC_CONTRACTDOCUMENTFLOW(p_vbeln=" + this.urlCreation("'" + header + "'") + ",p_posnr=" + this.urlCreation("'" +
				posnr + "'") + ")/Set";
			var urlParameters = {}
			oModel.read(oPath, {
				urlParameters,
				success: function (oData) {
					if (oData) {
						var data = oData.results;
						data.forEach(function (item, i) {
							item.id = i;
						});
						that.buildNodes(data);
						that.buildLines(data);
					}
				},
				error: function (oError) {
					Util.manageErrors(oError);
				}
			});
		},
		buildLines: function (data) {
			var lines = [];
			for (var i = 0; i < data.length; i++) {
				for (var j = 0; j < data.length; j++) {
					if (data[i].Docnum === data[j].Docnuv) {
						lines.push({
							"from": data[i].id,
							"to": data[j].id
						})
					}
				}
			}
			this.getView().getModel("HeaderData").setProperty("/lines", lines);
		},
		buildNodes: function (data) {
			var nodes = [];
			var treeNode = [];
			var children = [];
			//	var lines=[];
			var state = "Neutral";
			var sicon = "";
			for (var i = 0; i < data.length; i++) {
				children = [];
				if (data[i].Hlevel === 0) {
					if (data[i].Status === "Completed") {
						state = "Information";
					} else if (data[i].Status === "Cleared") {
						state = "Success";
					} else if (data[i].Status === "In Process" || data[i].Status === "Not Cleared" || data[i].Status === "Open") {
						state = "Warning";
					} else {
						state = "None";
					}
					treeNode[0] = {
						"Description": data[i].Description,
						"Docnum": data[i].Docnum,
						"Vbtyp": data[i].Vbtyp,
						"Itemnum": data[i].Itemnum,
						"Rfwrt": data[i].Rfwrt,
						"Waers": data[i].Waers,
						"Rfmng": data[i].Rfmng,
						"Vrkme": data[i].Vrkme,
						"Bukrs": data[i].Bukrs,
						"Gjahr": data[i].Gjahr,
						"state": state,
						"stateText": data[i].Status,
						"children": []
					};
				}
				for (var j = 0; j < data.length; j++) {
					if (data[i].Docnum === data[j].Docnuv && data[j].VbtypN === data[j].VbtypV && data[i].VbtypN === data[j].VbtypV) {
						if (i !== j) {
							children.push(parseInt(j));
						}
						if (data[j].Status === "Completed") {
							state = "Information";
						} else if (data[j].Status === "Cleared") {
							state = "Success";
						} else if (data[j].Status === "In Process" || data[j].Status === "Not Cleared" || data[j].Status === "Open") {
							state = "Warning";
						} else {
							state = "None";
						}
						if (data[i].Hlevel === 0) {
							treeNode[0].children.push({
								"Description": data[j].Description,
								"Docnum": data[j].Docnum,
								"Vbtyp": data[j].Vbtyp,
								"Itemnum": data[j].Itemnum,
								"Rfwrt": data[j].Rfwrt,
								"Waers": data[j].Waers,
								"Rfmng": data[j].Rfmng,
								"Vrkme": data[j].Vrkme,
								"Bukrs": data[j].Bukrs,
								"Gjahr": data[j].Gjahr,
								"stateText": data[j].Status,
								"state": state,
								"children": []
							});

						} else if (data[i].Hlevel === 1) {
							for (var h = 0; h < treeNode[0].children.length; h++) {
								if (treeNode[0].children[h].Docnum === data[j].Docnuv) {
									treeNode[0].children[h].children.push({
										"Description": data[j].Description,
										"Docnum": data[j].Docnum,
										"Vbtyp": data[j].Vbtyp,
										"Itemnum": data[j].Itemnum,
										"Rfwrt": data[j].Rfwrt,
										"Waers": data[j].Waers,
										"Rfmng": data[j].Rfmng,
										"Vrkme": data[j].Vrkme,
										"Bukrs": data[j].Bukrs,
										"Gjahr": data[j].Gjahr,
										"stateText": data[j].Status,
										"state": state,
										"children": []
									});
								}
							}
						} else if (data[i].Hlevel === 2) {
							for (var h = 0; h < treeNode[0].children.length; h++) {
								for (var k = 0; k < treeNode[0].children[h].children.length; k++) {
									if (treeNode[0].children[h].children[k].Docnum === data[j].Docnuv) {
										treeNode[0].children[h].children[k].children.push({
											"Description": data[j].Description,
											"Docnum": data[j].Docnum,
											"Vbtyp": data[j].Vbtyp,
											"Itemnum": data[j].Itemnum,
											"Rfwrt": data[j].Rfwrt,
											"Waers": data[j].Waers,
											"Rfmng": data[j].Rfmng,
											"Vrkme": data[j].Vrkme,
											"Bukrs": data[j].Bukrs,
											"Gjahr": data[j].Gjahr,
											"stateText": data[j].Status,
											"state": state,
											"children": []
										});
									}
								}
							}
						}

					}

				}
				if (data[i].Status === "Completed" || data[i].Status === "Cleared") {
					state = "Success";
					sicon = "sap-icon://message-success";
				} else if (data[i].Status === "In Process" || data[i].Status === "Not Cleared" || data[i].Status === "Open") {
					state = "Warning";
					sicon = "sap-icon://alert";
				} else if (data[i].Status === "Canceled") {
					state = "Error";
					sicon = "sap-icon://error";
				} else {
					state = "None";
					sicon = "sap-icon://process";
				}
				var doc = data[i].Docnum;
				//	var amount = data[i].Rfwrt + " " + data[i].Waers;
				nodes.push({
					"id": i,
					"icon": sicon,
					"lane": data[i].Vbtyp,
					"title": data[i].Description,
					"titleAbbreviation": data[i].Description,
					"children": children,
					"state": state,
					"stateText": data[i].Status,
					"focused": true,
					"highlighted": true,
					"texts": doc,
					"Bukrs": data[i].Bukrs,
					"Gjahr": data[i].Gjahr
				});
			}
			this.getView().getModel("HeaderData").setProperty("/nodes", nodes);
			var nodeModels = new sap.ui.model.json.JSONModel();
			nodeModels.setData({
				nodeRoot: {
					children: treeNode
				}
			});
			this.getView().setModel(nodeModels, "DocumentFlowModel");
			this.getView().getModel("DocumentFlowModel").setSizeLimit(1000);

		},
		onNavProcessFlow: function (oEvent) {
			var oPath = oEvent.getSource().getBindingContext("DocumentFlowModel").getPath();
			var oDocFlowData = this.getView().getModel("DocumentFlowModel").getProperty(oPath);
			var oDocNum = oDocFlowData.Docnum;
			var oItem = oDocFlowData.Itemnum;
			var oDocType = oDocFlowData.Vbtyp;
			var oBukrs = oDocFlowData.Bukrs;
			var oGjahr = oDocFlowData.Gjahr;

			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			if (oDocType === "L") {
				oCrossAppNavigator.toExternal({
					target: {
						semanticObject: "ZVA03",
						action: "display"
					},
					params: {
						"DocNum": oDocNum
					}
				});
			} else if (oDocType === "P" || oDocType === "N" || oDocType === "U") {
				oCrossAppNavigator.toExternal({
					target: {
						semanticObject: "ZVF03",
						action: "display"
					},
					params: {
						"DocNum": oDocNum
					}
				});
			} else if (oDocType === "+") {
				oCrossAppNavigator.toExternal({
					target: {
						semanticObject: "ZFB03",
						action: "display"
					},
					params: {
						"DocNum": oDocNum,
						"CompanyCode": oBukrs,
						"FiscalYear": oGjahr
					}
				});
			}
		},
		onNodePress: function (oEvent) {
			var oPath = oEvent.getSource().getBindingContext("HeaderData").getPath();
			var oProcFlowData = this.getView().getModel("HeaderData").getProperty(oPath);
			var oDocNum = oProcFlowData.texts;
			var oDocType = oProcFlowData.lane;
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			if (oDocType === "L" || oDocType === "C") {
				oCrossAppNavigator.toExternal({
					target: {
						semanticObject: "ZVA03",
						action: "display"
					},
					params: {
						"DocNum": oDocNum
					}
				});
			} else if (oDocType === "P" || oDocType === "N" || oDocType === "U") {
				oCrossAppNavigator.toExternal({
					target: {
						semanticObject: "ZVF03",
						action: "display"
					},
					params: {
						"DocNum": oDocNum
					}
				});
			} else if (oDocType === "+") {
				var oBukrs = oProcFlowData.Bukrs;
				var oGjahr = oProcFlowData.Gjahr;
				oCrossAppNavigator.toExternal({
					target: {
						semanticObject: "ZFB03",
						action: "display"
					},
					params: {
						"DocNum": oDocNum,
						"CompanyCode": oBukrs,
						"FiscalYear": oGjahr
					}
				});
			}

		},
		onClickActionxCGDCxC_ContractManagement_HDSections1: function (oEvent) {
			// if (!this._CreatHeaderClause) {
			// 	this._CreatHeaderClause = sap.ui.xmlfragment("cgdc.manage.contract.ext.fragment.AddHeaderClauses", this);
			// 	this.getView().addDependent(this._CreatHeaderClause);
			// }
			// this._CreatHeaderClause.open();
			if (!this._CreatHeaderClause) {
				Fragment.load({
						name: "cgdc.manage.contract.ext.fragment.AddHeaderClauses",
						controller: this
					})
					.then(function (dialog) {
						this._CreatHeaderClause = dialog;
						this.getView().addDependent(dialog);
						dialog.open();
					}.bind(this));
			} else {
				this._CreatHeaderClause.open();
			}
			//	sap.ui.getCore().byId("idClausesAddButton").setEnabled(false);
			//var table = sap.ui.getCore().byId("idAddClauses");
			// var oModelContext = this.getOwnerComponent().getModel().createEntry("/xCGDCxC_Contract_HDClauses", {
			// 	properties: {
			// 		"Vbeln": this.Vbeln
			// 	}
			// });
			//	table.setBindingContext(oModelContext);

		},
		getSelectedRowData: function (oEvent) {
			let oSmartTable = sap.ui.getCore().byId("LineItemsSmartTable");
			let oSelectedClauses = [];
			let oSelectedClausesIndex = oSmartTable.getTable().getSelectedIndices();
			for (var i = 0; i < oSelectedClausesIndex.length; i++) {
				var j = oSelectedClausesIndex[i];
				const oselectedData = {
					"Clnam": oSmartTable.getTable().getContextByIndex(j)
						.getProperty("Clnam"),
					"Descr": oSmartTable.getTable().getContextByIndex(j).getProperty("descr"),
					"Clnum": oSmartTable.getTable().getContextByIndex(j)
						.getProperty("Clnum"),
					"Cltyp": oSmartTable.getTable().getContextByIndex(j)
						.getProperty("Cltyp"),
					"PresAt": oSmartTable.getTable().getContextByIndex(j)
						.getProperty("PresAt"),
					"Valdfr": oSmartTable.getTable().getContextByIndex(j)
						.getProperty("Vldfr")
				};
				oSelectedClauses.push(oselectedData);
				// and fetch rest of fields in similar pattern

			}
			return oSelectedClauses;
		},

		onSelect: function (oEvent) {
			var oChecked = oEvent.getParameter('selected')
				// if (oChecked === true) {
				// 	sap.ui.getCore().byId("idClausesAddButton").setEnabled(true);
				// } else if (oChecked === false) {
				// 	sap.ui.getCore().byId("idClausesAddButton").setEnabled(false);
				// }
			var oTreeTable = sap.ui.getCore().byId("treeTable");
			var path = oEvent.getSource().getParent().getBindingContext().getPath();
			var obj = oTreeTable.getModel().getProperty(path);
			this.setChildState(obj);
		},
		setChildState: function (obj) {
			var state = obj.checked;
			//	for (var children in obj){ 
			for (var i = 0; i < obj.children.length; i++) {
				var c = obj.children[i];
				c.checked = state;
				if (c.children.length > 0) {
					this.setChildState(c);
				}
			}
		},
		onCatalogSelect: function (oEvent) {
			var Catlogtype = oEvent.getSource().getSelectedKey();
			var Cltyp = Catlogtype;
			var that = this;
			var oModel = this.getView().getModel();
			var oPath = '/xCGDCxI_Clasues';
			var filters = new Array();
			var oFilter = new sap.ui.model.Filter("Cltyp", sap.ui.model.FilterOperator.EQ, Cltyp);
			filters.push(oFilter);
			this.showBusyIndicator();
			oModel.read(oPath, {
				filters: filters,
				success: function (oData) {
					var arrHeader = oData.results;
					that.handleHeaderClauseBinding(arrHeader);
					that.hideBusyIndicator();
				},
				error: function (oError) {
					that.hideBusyIndicator();
				}
			});
		},
		handleHeaderClauseBinding: function (arrHeader) {
			var oJSModel1 = new sap.ui.model.json.JSONModel();
			var oTreeTable = sap.ui.getCore().byId("treeTable");
			oTreeTable.setModel(oJSModel1);
			var data = arrHeader;
			var root = this.transformTreeData(data);
			var data = {
				root: root
			};
			oJSModel1.setData(data);
			oTreeTable.bindRows({
				path: "/root",
				parameters: {
					arrayNames: ['children']
				}
			});
		},

		transformTreeData: function (nodesIn) {
			var nodes = [], //'deep' object structure
				nodeMap = {}, //'map', each node is an attribute
				nodeOut, parentId, nodeIn, parent;
			if (nodesIn) {
				for (var i = 0; i < nodesIn.length; i++) {
					nodeIn = nodesIn[i];
					nodeOut = {
						ctdsc: nodeIn.ctdsc,
						clnum: nodeIn.Clnum,
						clnam: nodeIn.Clnam,
						Prncl: nodeIn.Prncl,
						descr: nodeIn.descr,
						Vldfr: nodeIn.Vldfr,
						Cltyp: nodeIn.Cltyp,
						checked: false,
						pres_at: nodeIn.PresAt,
						children: []
					};
					parentId = nodeIn.Prncl;
					if (parentId) {
						parent = nodeMap[nodeIn.Prncl];
						if (parent) {
							parent.children.push(nodeOut);
						}
					} else {
						//there is no parent, must be top level
						nodes.push(nodeOut);
					}
					//add the node to the node map, which is a simple 1-level list of all nodes
					nodeMap[nodeOut.clnum] = nodeOut;
				}
			}
			return nodes;
		},

		onCreateClausecloseDialog: function () {
			sap.ui.getCore().byId("treeTable").setModel(new sap.ui.model.json.JSONModel({
				data: []
			}));
			sap.ui.getCore().byId("idComboBox").setSelectedKey("");
			//sap.ui.getCore().byId("idClauseCatalog").setEnabled(true);
			//	sap.ui.getCore().byId("idClausesAddButton").setEnabled(false);
			this._CreatHeaderClause.close();
			this._CreatHeaderClause.destroy();
			this._CreatHeaderClause = null;
		},
		getSelectedData: function (allClauses) {
			for (var x in allClauses) {
				var oClauses = allClauses[x];
				if (oClauses.checked === true) {
					var oModelContext = this.getOwnerComponent().getModel().createEntry("/xCGDCxC_Contract_HDClauses", {
						properties: {
							"Docno2": this.Vbeln,
							"Clnum": oClauses.clnum,
							"Descr": oClauses.descr,
							"Vbeln": this.Vbeln,
							"Clnam": oClauses.clnam,
							"Cltyp": oClauses.Cltyp,
							"Valdfr": oClauses.Valdfr,
							"PresAt": oClauses.pres_at,
						}
					});
				}
			}
		},

		showBusyIndicator: function () {
			if (!this._busyIndicator) {
				this._busyIndicator = new BusyDialog({
					showCancelButton: false
				});
				this._busyIndicator.open();
			}
		},
		findCheckedNodes: function (nodes) {
			var that = this;
			return nodes.reduce((acc, node) => {
				if (node.checked) {
					const filteredNode = {
						"Clnam": node.clnam,
						"Clnum": node.clnum,
						"Cltyp": node.Cltyp,
						"PresAt": node.pres_at,
						"Valdfr": node.Vldfr,
						"Descr": node.descr
					};
					acc.push(filteredNode);
				}

				if (node.children && node.children.length > 0) {
					acc = acc.concat(that.findCheckedNodes(node.children));
				}

				return acc;
			}, []);
		},

		onCreateClauseSaveDialog: function (oEvent) {
			var that = this;
			var checkedNodes = [];
			sap.ui.getCore().byId("Message").setVisible(false);

			var oModel = this.getOwnerComponent().getModel();
			var selectedButton = sap.ui.getCore().byId("idClauseName").getParent().getSelectedKey();
			if (selectedButton == "ClasuesName") {
				checkedNodes = this.getSelectedRowData();
			}
			if (selectedButton == "ClasuesCatalog") {
				var allClauses = sap.ui.getCore().byId("treeTable").getModel().getProperty("/root");
				if (allClauses) {
					checkedNodes = this.findCheckedNodes(allClauses);
				}
			}
			if (checkedNodes.length == 0) {
				sap.ui.getCore().byId("Message").setVisible(true);

			} else {
				this.showBusyIndicator();
				// let oDefaultParams =  [ {
				// 		"Cltyp": "ABE" }, {
				// 		"Cltyp":   "AFFARS" } ];
				this._oApplicationController = new ApplicationController(oModel, this.getView());
				this.oContext = this.oView.getBindingContext();
				let sdeepath = this.oContext.getDeepPath();
				let spath = this.oContext.getDeepPath() + "/to_Contract_HDClauses";
				if (sdeepath.includes("to_CONTRACTITM")) {
					spath = this.oContext.getDeepPath() + "/to_ContractItm_Clauses";
				}

				for (let i = 0; i < checkedNodes.length; i++) {
					this._oApplicationController.getTransactionController().getDraftController().createNewDraftEntity(
							"xCGDCxC_ContractManagement_HD", spath, checkedNodes[i], true)
						.then(function (oResponse) {
							let data = oResponse;
							let oResourceBundle =  that.getView().getModel("i18n").getResourceBundle();
							if (i == checkedNodes.length - 1) {
								that.hideBusyIndicator();
								that.onCreateClausecloseDialog();
								sap.m.MessageToast.show(oResourceBundle.getText("ClasueAdded"));
							
								that.getView().getModel().refresh(true);
								that.getView().byId("AddHeaderClause").setVisible(false);
								that.getView().byId("AddItemClause").setVisible(false);
								that.getView().byId("DeleteHeaderClause").setVisible(false);
								that.getView().byId("DeleteItemClause").setVisible(false);
							}

						});

				}
			}
		},

		showBusyIndicator: function () {
			if (!this._busyIndicator) {
				this._busyIndicator = new sap.m.BusyDialog({
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
		onNavigateToPricingApp: function (oEvent) {
			var oSelectedItem = oEvent.getSource().getParent().getParent().getSelectedItems();
			var oConditionTable = oSelectedItem[0].getBindingContext().getObject("ConditionTable");
			var oSubCat = oSelectedItem[0].getBindingContext().getObject("SubCategory");
			var ConditionType = oSelectedItem[0].getBindingContext().getObject("ConditionType");
			var pricingProf = oSelectedItem[0].getBindingContext().getObject("PriceMaintProfile");
			if (!pricingProf) {
				pricingProf = oSelectedItem[0].getBindingContext().getObject("Pmprf");
			}
			var Vbeln = this.Vbeln;
			var fixedURL = "#pricingmaintenance-manage&/xCGDCxI_PRICING_MAIN(Pmprf='" + pricingProf + "',Subct='" + oSubCat + "',Counter=" +
				0 + ")/toCondCat(Pmprf='" + pricingProf + "',Kschl='" +
				ConditionType + "',Kotab='" + oConditionTable + "',Subct='" + oSubCat + "',Counter=" +
				0 + ",Vbeln='" + Vbeln + "',mganr='')";
			window.location.href = window.location.href.split('#')[0] + fixedURL;

			// oCrossAppNavigator.toExternal({
			// 	target: {
			// 		semanticObject: "pricingmaintenance",
			// 		action: "manage"
			// 	},
			// 	params: {
			// 		"Pmprf": this.Auart,
			// 		"Vbeln": this.Vbeln,
			// 		"Kschl": ConditionType,
			// 		"Kotab": oConditionTable

			// 	}
			// });

		},

		onNavToClinAcrn: function (oEvent) {
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			var sSemanticObject = "cisadclinacrn";
			var sAction = "manage";
			var sHash = "'#cisadclinacrn-manage?Vbeln=" + this.Vbeln + '&';
			var fixedURL = "/xCGDCxC_GeneralSetup(Vbeln='" + this.Vbeln + "',DraftUUID=guid" + "'00000000-0000-0000-0000-000000000000'" +
				",IsActiveEntity=true)";
			window.location.href = window.location.href.split('#')[0] + sHash + fixedURL;

		},
		onselectionChange: function (oEvent) {
			var selectedKey = oEvent.getSource().getSelectedKey();
			if (selectedKey === "ClasuesName") {
				sap.ui.getCore().byId("CN").setVisible(true);
				sap.ui.getCore().byId("CC").setVisible(false);
			} else {
				sap.ui.getCore().byId("CN").setVisible(false);
				sap.ui.getCore().byId("CC").setVisible(true);
			}
		},
		onClickModificationTracking: function (oEvent) {
			if (!this.ModificationDialog) {
				this.ModificationDialog = sap.ui.xmlfragment("idModification",
					"cgdc.manage.contract.ext.fragment.ModificationTrackingDialog",
					this);
				this.getView().addDependent(this.ModificationDialog);
			}
			this.ModificationDialog.open();

			var form = sap.ui.getCore().byId("idModification--idModification");
			var oModel = this.getOwnerComponent().getModel();
			var oModelContext = oModel.createEntry("/xCGDCxC_ContractManagement_HD");
			form.setBindingContext(oModelContext);
		},
		onModClose: function (oEvent) {
			this.getOwnerComponent().getModel().resetChanges();
			let edit = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--edit");
			edit.setVisible(false);
			this.ModificationDialog.close();
			this.ModificationDialog.destroy();
			this.ModificationDialog = "";
		
		},
		onModificationEditButton: function (oEvent) {
			let that = this;
			let oResourceBundle =  this.getView().getModel("i18n").getResourceBundle();
			var form = sap.ui.getCore().byId("idModification--idModification");
			var mParameters = {
				"Vbeln": this.Vbeln,
				"DraftUUID": '00000000-0000-0000-0000-000000000000',
				"IsActiveEntity": true,
				"Prefix": form.getSmartFields()[0].getValue(),
				"ModiN": form.getSmartFields()[1].getValue(),
				"ModiT": form.getSmartFields()[2].getValue(),
				"ModiD": form.getSmartFields()[3].getValue(),
				"Moditext": form.getSmartFields()[4].getValue()
			};
            if( mParameters.Prefix == "" || mParameters.ModiN == "" || mParameters.ModiT == "" || mParameters.ModiD == "" || mParameters.ModiD == "" ) {
                  	sap.m.MessageToast.show(oResourceBundle.getText("MissingField") );
            }
            that.getOwnerComponent().getModel().resetChanges();
			this.extensionAPI.invokeActions(
					"/Modification", [], mParameters)
				.then(function (oData, Resp) {
					let edit = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--edit");
					that.ModificationDialog.close();
					that.ModificationDialog.destroy();
					that.ModificationDialog = "";
					that.getOwnerComponent().getModel().resetChanges();
					edit.setVisible(true);
					edit.firePress();
					let moditrackButton = sap.ui.getCore().byId(
						"cgdc.manage.contract::sap.suite.ui.generic.template.ObjectPage.view.Details::xCGDCxC_ContractManagement_HD--action::ModificationTracking"
					);
				//	moditrackButton.setType("Emphasized");
					moditrackButton.setVisible(false);
				
				});
		}
	});
});