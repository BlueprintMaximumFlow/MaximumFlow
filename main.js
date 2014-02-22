Ext.onReady(function() {

    var cont = new Ext.Viewport({
        layout: {
            type: "hbox",
            align: "stretch"
        },
        items: [
            {
                flex: 1,
                items: {
                    xtype: "button",
                    text: "Add Tab",
                    handler: function(btn) {
                        btn.up("viewport").down("tabpanel").add({
                            xtype: "panel",
                            title: "New Tab",
                            html: "My new tab",
                            closable: true
                        })
                    }
                }
            },
            {
                xtype: "tabpanel",
                flex: 3
            }
        ]
    });
});