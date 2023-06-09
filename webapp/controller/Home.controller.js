sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, UIComponent) {
    "use strict";


    return Controller.extend("fac.factory.controller.Home", {
      onInit: function () {
        this.getRouter()
          .getRoute("RouteHome")
          .attachPatternMatched(this._onRouteMatched, this);
        this.getView().setModel(
          new JSONModel({
            item: [],
          }),
          "oModel"
        );
      },

      _onRouteMatched: function () {
        this.getView()
          .getModel("odata")
          .read("/Suppliers", {
            success: (res) => {
              this.getView()
                .getModel("oModel")
                .setProperty("/items", res.results);
            },
            error: function (err) {
              debugger;
            },
          });
      },
      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },

      suppListFactory: function (sId, oContext) {
        
        return new sap.m.ColumnListItem({
          type:"Navigation",
          press: this.navigateOnPress.bind(this),
          cells: [
            new sap.m.Text({
              text: "{oModel>SupplierID}",
            }),
            new sap.m.Text({
              text: "{oModel>CompanyName}",
            }),
            new sap.m.Text({
              text: "{oModel>ContactName}",
            }),
            new sap.m.Text({
              text: "{oModel>ContactTitle}",
            }),
            new sap.m.Input({
              value: "{oModel>Address}",
              editable: false,
            }),
            new sap.m.Input({
              value: "{oModel>City}",
              editable: false,
            }),
            new sap.m.Input({
              value: "{oModel>PostalCode}",
            }),
            new sap.m.Input({
              value: "{oModel>Region}",
            }),
            new sap.m.Input({
              value: "{oModel>Country}",
            }),
            new sap.m.Input({
              value: "{oModel>Phone}",
            }),
            new sap.m.Text({
              text: "{oModel>Fax}",
            }),
          ],
        });
      },
      navigateOnPress: function(evt){
        const oSource = evt.getSource();
        const oContext = oSource.getBindingContext("oModel");
        console.log(oContext);

        const supplierId = oContext.getProperty("SupplierID");
        const region = oContext.getProperty("Region");
        const country = oContext.getProperty("Country");

        this.getRouter().navTo("SecondPage",{id: supplierId, region: region, country: country});
      }
    });
  }
);

// FACTORY DI MATTIA
// let oItems = null;
//         const sPath = oContext.getPath();

//         switch (sPath) {
//           case "/items/0":
//             oItems = new sap.m.ColumnListItem({
//               vAlign: "Middle",
//               cells: [
//                 new sap.m.Text({
//                   text: "{oModel>SupplierID}",
//                 }),
//                 new sap.m.Text({
//                   text: "{oModel>CompanyName}",
//                 }),
//                 new sap.m.Text({
//                   text: "{oModel>ContactName}",
//                 }),
//                 new sap.m.Text({
//                   text: "{oModel>ContactTitle}",
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>Address}",
//                   editable: false,
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>City}",
//                   editable: false,
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>PostalCode}",
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>Region}",
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>Country}",
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>Phone}",
//                 }),
//                 new sap.m.Text({
//                   text: "{oModel>Fax}",
//                 }),
//               ],
//             });
//             break;      
//          case "/items/1":
//             oItems = new sap.m.ColumnListItem({
//               vAlign: "Middle",
//               cells: [
//                 new sap.m.Text({
//                   text: "{oModel>SupplierID}",
//                 }),
//                 new sap.m.Text({
//                   text: "{oModel>CompanyName}",
//                 }),
//                 new sap.m.Text({
//                   text: "{oModel>ContactName}",
//                 }),
//                 new sap.m.Text({
//                   text: "{oModel>ContactTitle}",
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>Address}",
//                   editable: false,
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>City}",
//                   editable: false,
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>PostalCode}",
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>Region}",
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>Country}",
//                 }),
//                 new sap.m.Input({
//                   value: "{oModel>Phone}",
//                 }),
//                 new sap.m.Text({
//                   text: "{oModel>Fax}",
//                 }),
//               ],
//             });
//             break;            
//         }
//         return oItems;