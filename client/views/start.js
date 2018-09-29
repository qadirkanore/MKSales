import { JetView } from "webix-jet";
var moment = require('moment');

export default class StartView extends JetView {
	config() {
		var ui = {
			rows: [{ cells: [gridSales, gridExpense] }]
		};
		return ui;
	}
	init(view) {
	}
}

var countries =
	[
		{ "id": "1", "value": "Abaya" },
		{ "id": "2", "value": "Shela" },
		{ "id": "3", "value": "Malfa" }
	];

var gridSales = {
	view: "datatable", id: "tblSales",
	columns: [
		{ id: "index", header: "#", css: "rank", width: 50 },
		{ id: "itemName", editor: "text", header: "Item Name", fillspace: true },
		{ id: "itemType", editor: "combo", options: countries, header: "Type", width: 80 },
		{
			id: "sellingPrice", editor: "text", header: "Selling Price", width: 100,
			format: webix.Number.numToStr({
				decimalDelimiter: ".",
				decimalSize: 3
			})
		}
	],
	select: "row", editable: true, editaction: "dblclick",
	url: "/api/sales/1001/" + moment().format('DD-MM-YYYY'),
	on: {
		onAfterEditStop: function(values, editor) {
			var item = this.getItem(editor.row);
			if (item.itemName && item.itemType && item.sellingPrice) {
				webix.message(item.itemName);
				item.modification_date = new Date();
				webix.ajax().post('/api/sales', item).then(function(result) {
					var res = result.json();
					console.log(res);
					if (res.isDeleted === false) {
						webix.message('Record Added');
						if (item.isDeleted === true) {
							$$("tblSales").remove(item.id);
						}
						$$("tblSales").load($$("tblSales").config.url);
					}
				}).fail(function(xhr) {
					var response = JSON.parse(xhr.response);
					webix.message({ type: 'error', text: response.error.message });
					$$("tblSales").load($$("tblSales").config.url);
				});
			}
		},
		"data->onStoreUpdated": function() {
			this.data.each(function(obj, i) {
				obj.index = i + 1;
			});
		},
		onItemClick: function() {
			$$("btnDelete").enable();
		}
	}
};

var gridExpense = {
	view: "datatable", id: "tblExpense",
	columns: [
		{ id: "index", header: "#", css: "rank", width: 50 },
		{ id: "description", editor: "text", header: "Description", fillspace: true },
		{
			id: "amount", editor: "text", header: "Amount", width: 100,
			format: webix.Number.numToStr({
				decimalDelimiter: ".",
				decimalSize: 3
			})
		}
	],
	select: "row", editable: true, editaction: "dblclick",
	url: "/api/expenses/1001",
	on: {
		onAfterEditStop: function(values, editor) {
			var item = this.getItem(editor.row);
			if (item.itemName && item.itemType && item.sellingPrice) {
				webix.message(item.itemName);
				webix.ajax().post('/api/expenses', item).then(function(result) {
					var res = result.json();
					console.log(res);
					if (res.isDeleted === false) {
						webix.message('Record Added');
						if (item.isDeleted === true) {
							$$("tblExpense").remove(item.id);
						}
						$$("tblSales").load($$("tblSales").config.url);
					}
				}).fail(function(xhr) {
					var response = JSON.parse(xhr.response);
					webix.message({ type: 'error', text: response.error.message });
					$$("tblSales").load($$("tblSales").config.url);
				});
			}
		},
		"data->onStoreUpdated": function() {
			this.data.each(function(obj, i) {
				obj.index = i + 1;
			});
		},
		onItemClick: function() {
			$$("btnDelete").enable();
		}
	}
};

function cancel() {
	$$("win").destructor();
	$$("modify_btn").disable();
	$$("delete_btn").disable();
	$$("table").unselectAll();
}