sap.ui.controller("ch.saphirnet.view.c_TemperatureGraph", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf ch.saphirnet.view.view.v_TemperatureGraph
*/
	onInit: function() {
        var oView = this.getView();

		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
			// when detail navigation occurs, update the binding context
			if (oEvent.getParameter("name") === "product") {

				var sProductPath = "/" + oEvent.getParameter("arguments").product;

				oView.bindElement(sProductPath);

				// Check that the product specified actually was found
				oView.getElementBinding().attachEventOnce("dataReceived", jQuery.proxy(function() {
					var oData = oView.getModel().getData(sProductPath);
					if (!oData) {
						sap.ui.core.UIComponent.getRouterFor(this).myNavToWithoutHash({
							currentView : oView,
							targetViewName : "sap.ui.demo.tdg.view.NotFound",
							targetViewType : "XML"
						});
					}
				}, this));


				// Make sure the master is here
				var oIconTabBar = oView.byId("idIconTabBar");
				oIconTabBar.getItems().forEach(function(oItem) {
					oItem.bindElement(sap.ui.demo.tdg.util.Formatter.uppercaseFirstChar(oItem.getKey()));
				});

				// Which tab?
				var sTabKey = oEvent.getParameter("arguments").tab || "supplier";
				if (oIconTabBar.getSelectedKey() !== sTabKey) {
					oIconTabBar.setSelectedKey(sTabKey);
				}
			}
		}, this);

	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf ch.saphirnet.view.view.v_TemperatureGraph
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf ch.saphirnet.view.view.v_TemperatureGraph
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf ch.saphirnet.view.view.v_TemperatureGraph
*/
//	onExit: function() {
//
//	}

});