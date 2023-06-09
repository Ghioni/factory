sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, UIComponent,History) {
    "use strict";


    return Controller.extend("fac.factory.controller.SecondView", {
      onInit: function () {
        this.getRouter()
            .getRoute("SecondPage")
            .attachPatternMatched(this.onRouteMatched, this);
            this.getView().setModel(new JSONModel({
              supplier: {}
            }),"newModel");
            
      },
      onRouteMatched: function (e) {
        const id = e.getParameters().arguments.id;
        const region = e.getParameters().arguments.region;
        const country = e.getParameters().arguments.country;

        this.getView().getModel("odata").read(`/Suppliers(${id})`,{
          success: (res)=>{
            this.getView().getModel("newModel").setProperty("/fornitori", res)
          },
          error: function(err){
            debugger
            console.log(err)
          }
        })
      },
      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },
      onPressNavigateBack: function(evt){
        this.getRouter().navTo("RouteHome")
      }
      
    });
  }
);
