Ext.onReady(function() {

	var cont = new Ext.Viewport(		{
			layout: "column",
			renderTo: Ext.getBody(),
			items: [
				{
					xtype: "component",
					renderTo: Ext.getBody(),
					html: "Hello",
					style: "border: 1px solid black",
					columnWidth: 0.75
				}, 
				{
					xtype: "component",
					renderTo: Ext.getBody(),
					html: "World",
					style: "border: 1px solid black",
					columnWidth: 0.25
				}]
	});
});