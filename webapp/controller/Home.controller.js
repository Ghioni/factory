sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
	"sap/m/GenericTileScope",
	"sap/m/ColumnListItem"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	JSONModel,
	UIComponent,
	GenericTileScope,
	ColumnListItem) {
        "use strict";

        // get router bla bla non fa altro che dire all'applicazione che ogni volta che viene aperta la view sotto la Route
        // RouteHome deve andare a eseguire la funzione _onRouteMatched che non è altro che l'ennesimo modo per prendersi
        // il dannato modello dal manifest se ha successo gli dice pure di andarsi a pigliare il modello che ci creiamo e di sbatterci 
        // dentro sto dannato /items 

        return Controller.extend("fac.factory.controller.Home", {
            onInit: function () {
                this.getRouter().getRoute("RouteHome").attachPatternMatched(this._onRouteMatched, this);
                this.getView().setModel(new JSONModel({ 
                    item: []
                }),"oModel");
            },

            _onRouteMatched: function() {
                this.getView().getModel("odata").read("/Suppliers", {
                    success: (res) => {
                        this.getView().getModel("oModel").setProperty("/items", res.results)
                    },
                    error: function(err) {
                        debugger
                    }
                })
            },

            //funzioni brutte e dove trovarle, scorciatoglia per non stare a scrivere il getOwnerComponents per andarsi a recuperare 
            // dal component il richiamo del Router 
            getRouter: function(){
                return UIComponent.getRouterFor(this);
            },


            // Funzione del Factory. A contrario della spatacchiata di Mattia a casa mia si impara dagli indiani. 
            // Niente Switch niente case niente break, un return che mi fa a creare un solo componente ColumnListItem e ci sbatte
            // dentro i miei text input con il loro bel path. 
            
            suppListFactory: function(sId,oContext){

                return new sap.m.ColumnListItem({
                    cells:[ new sap.m.Text({
                                 text: "{oModel>SupplierID}"
                            }),
                            new sap.m.Text({
                                text: "{oModel>CompanyName}"
                            }),
                            new sap.m.Text({
                                text: "{oModel>ContactName}"
                            }),
                            new sap.m.Text({
                                text: "{oModel>ContactTitle}"
                            }),
                            new sap.m.Input({
                                value: "{oModel>Address}",
                                editable: false
                            }),
                            new sap.m.Input({
                                value: "{oModel>City}",
                                editable: false
                            }),
                            new sap.m.Input({
                                value: "{oModel>PostalCode}"
                            }),
                            new sap.m.Input({
                                value: "{oModel>Region}"
                            }),
                            new sap.m.Input({
                                value: "{oModel>Country}"
                            }),
                            new sap.m.Input({
                                value: "{oModel>Phone}"
                            }),
                            new sap.m.Text({
                                text: "{oModel>Fax}"
                            })
                    ]
                });
              

            }
        });
    });


    // FACTORY DI MATTIA 
    // let oColumnListItem = null;
                // const sPath = oContext.getPath();

                // switch (sPath) {
                //     case "/items/0":
                //         oColumnListItem = new sap.m.ColumnListItem({
                //             vAlign: "Middle",
                //             cells: [
                //                 new sap.m.Text({
                //                     text: "{oModel>SupplierID}"
                //                 })
                //             ]
                //         })
                //         break;
                //         case "/items/1":
                //         oColumnListItem = new sap.m.ColumnListItem({
                //             vAlign: "Middle",
                //             cells: [
                //                 new sap.m.Text({
                //                     text: "{oModel>CompanyName}"
                //                 })
                //             ]
                //         })
                //         break;
                //         case "/items/2":
                //         oColumnListItem = new sap.m.ColumnListItem({
                //             vAlign: "Middle",
                //             cells: [
                //                 new sap.m.Input({
                //                     value: "{oModel>ContactName}",
                //                     editable: false
                //                 })
                //             ]
                //         })
                //         break;
                //         case "/items/3":
                //         oColumnListItem = new sap.m.ColumnListItem({
                //             vAlign: "Middle",
                //             cells: [
                //                 new sap.m.Input({
                //                     value: "{oModel>ContactTitle}",
                //                     editable: false
                //                 })
                //             ]
                //         })
                //         break;
                //         case "/items/4":
                //         oColumnListItem = new sap.m.ColumnListItem({
                //             vAlign: "Middle",
                //             cells: [
                //                 new sap.m.Input({
                //                     value: "{oModel>Address}",
                //                     editable: false
                //                 })
                //             ]
                //         })
                //         break;
                //         case "/items/5":
                //         oColumnListItem = new sap.m.ColumnListItem({
                //             vAlign: "Middle",
                //             cells: [
                //                 new sap.m.Input({
                //                     value: "{oModel>City}",
                //                     editable: false
                //                 })
                //             ]
                //         })
                //         break;
                //         case "/items/6":
                //         oColumnListItem = new sap.m.ColumnListItem({
                //             vAlign: "Middle",
                //             cells: [
                //                 new sap.m.Text({
                //                     text: "{oModel>PostalCode}"
                //                 })
                //             ]
                //         })
                //         break;
                //         case "/items/7":
                //         oColumnListItem = new sap.m.ColumnListItem({
                //             vAlign: "Middle",
                //             cells: [
                //                 new sap.m.Text({
                //                     text: "{oModel>Region}"
                //                 })
                //             ]
                //         })
                //         break;
                //         case "/items/8":
                //         oColumnListItem = new sap.m.ColumnListItem({
                //             vAlign: "Middle",
                //             cells: [
                //                 new sap.m.Text({
                //                     text: "{oModel>Country}"
                //                 })
                //             ]
                //         })
                //         break;
                //         case "/items/9":
                //         oColumnListItem = new sap.m.ColumnListItem({
                //             vAlign: "Middle",
                //             cells: [
                //                 new sap.m.Text({
                //                     text: "{oModel>Phone}"
                //                 })
                //             ]
                //         })
                //         break;
                //         case "/items/10":
                //         oColumnListItem = new sap.m.ColumnListItem({
                //             vAlign: "Middle",
                //             cells: [
                //                 new sap.m.Text({
                //                     text: "{oModel>Fax}"
                //                 })
                //             ]
                //         })
                //         break;

                // }