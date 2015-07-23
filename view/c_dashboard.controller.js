sap.ui.controller("ch.saphirnet.view.c_dashboard", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf ch.saphirnet.view.v_dashboard
*/
	onInit: function() {
        sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);
	},

    onRouteMatched : function(oEvent) {
        var oParameters = oEvent.getParameters();
        //var oView = this.getView();
        
        // when detail navigation occurs, update the binding context
		if (oParameters.name !== "temperature") { 
			return;
		}
		
	    var app = oEvent.getParameter( 'targetControl' );
		var viewId = oEvent.getParameter( 'view' ).getId();
		app.to( viewId );
		
	/*	var sDevicePath = "/" + oParameters.arguments.deviceID;
		this.bindView(sDevicePath);
		
		// Which tab?
		var sTabKey = oParameters.arguments.tab;
        this.getEventBus().publish("temperature", "TabChanged", { sTabKey : sTabKey });*/
    },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf ch.saphirnet.view.v_dashboard
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf ch.saphirnet.view.v_dashboard
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf ch.saphirnet.view.v_dashboard
*/
//	onExit: function() {
//
//	}

    onPress: function(oEvent) {
        sap.m.MessageToast.show("The generic tile is pressed." + oEvent );
       /*var bReplace = jQuery.device.is.phone ? false : true;
		sap.ui.core.UIComponent.getRouterFor(this).navTo("temperature", {
			from: "main",
			deviceID: "4",
			tab: "temperature"
		}, bReplace);*/
		var router = sap.ui.core.UIComponent.getRouterFor( this );
		router.navTo( 'temperature' );
		

    }

});