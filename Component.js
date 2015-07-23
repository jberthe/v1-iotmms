jQuery.sap.declare("ch.saphirnet.Component");
jQuery.sap.require("ch.saphirnet.MyRouter");

sap.ui.core.UIComponent.extend("ch.saphirnet.Component", {
    metadata : {
        name : "Domorcier Cockpit",
        version : "1.0",
        includes : [],
        dependencies : {
            libs : ["sap.m", "sap.ui.layout"],
            components : []
        },
        rootView : "ch.saphirnet.view.v_main",
     
        config : {
                    resourceBundle : "i18n/messageBundle.properties",
                    serviceConfig : {
                        name : "IoTHana",
                        serviceUrl : "https://s7hanaxs.hanatrial.ondemand.com/p175998trial/jbetrialhana/iot/dbaccess/iotservice.xsodata/"
                        
                    }
                },
            
        routing: {
            config : {
				routerClass : ch.saphirnet.MyRouter,
				viewType : "XML",
				viewPath : "ch.saphirnet.view",
				targetControl: "idAppControl",
				targetAggregation : "pages",
				clearTarget : false
			},
			routes : [
				{
					pattern : "",
					name : "main",
					view : "v_dashboard",
					targetControl : "idAppControl"/*,
					subroutes : [
					    {
					        pattern : "{deviceID}/:tab:",
					        name : "temperature",
					        view : "v_TemperatureGraph"
					    }
					]*/
				},
				{
				    pattern : "temp",
					name : "temperature",
					//viewPath: "ch.saphirnet.view",
					view : "v_TemperatureGraph",
					targetControl: "idAppControl"
				}
			]
        }
    },
        
    init : function() {

        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

        var mConfig = this.getMetadata().getConfig();

        // always use absolute paths relative to our own component
        // (relative paths will fail if running in the Fiori Launchpad)
        var rootPath = jQuery.sap.getModulePath("ch.saphirnet");

        // set i18n model
        var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl : [rootPath, mConfig.resourceBundle].join("/")
        });
        this.setModel(i18nModel, "i18n");
        
        // Create and set domain model to the component
        var sServiceUrl = mConfig.serviceConfig.serviceUrl;
        var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
        this.setModel(oModel);

        // set device model
        var deviceModel = new sap.ui.model.json.JSONModel({
            isTouch : sap.ui.Device.support.touch,
            isNoTouch : !sap.ui.Device.support.touch,
            isPhone : sap.ui.Device.system.phone,
            isNoPhone : !sap.ui.Device.system.phone,
            listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
            listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
        });
        deviceModel.setDefaultBindingMode("OneWay");
        this.setModel(deviceModel, "device");
        
        this.getRouter().initialize();

            
    }
});