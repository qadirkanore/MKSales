import { JetView } from "webix-jet";

export default class TopView extends JetView {
	config() {

		var buttons = {
			view: "toolbar", elements: [
				{
					view: "button", id: "btnAdd", value: "Add Row", width: 100, click: function() {
						addRow();
					}
				},
				{
					view: "button", id: "btnDelete", value: "Delete Row", width: 100, disabled: true, click: function() {
						doDelete();
					}
				},
				{},
				{
					view: "segmented", id: "segmented", multiview: true, options: [
						{ id: "tblSales", value: "Sales" },
						{ id: "tblExpense", value: "Expense" }
					]
				},
				{},
				{ view: "button", width: 100, label: "Logout", click: () => this.show("/logout") }
			]
		};

		var ui = {
			rows: [buttons, { $subview: true }]
		};

		return ui;
	}
	init() {

	}
};

function addRow() {
	const grid = $$("segmented").getValue();
	//webix.message(grid);
	var item = {};
	if (grid === 'tblSales') {
		item = {
			itemName: "",
			itemType: 1,
			sellingPrice: 0.000,
			isDeleted: true,
			location: 1001
		}
	}
	else {
		item = {
			description: "",
			amount: 0.000,
			isDeleted: true,
			location: 1001
		}
	}
	$$(grid).editStop();
	var id = $$(grid).add(item);
	//console.log("id:" + id);
	//var id = $$('table').add(data,0);
	$$(grid).editRow(id)
}

function doDelete() {
	const grid = $$("segmented").getValue();
	var sel = $$(grid).getSelectedId();
	if (!sel) {
		webix.message({ text: "Please select row" });
		return;
	}
	var item = $$(grid).getItem(sel);
	webix.confirm({
		ok: "Yes",
		cancel: "No",
		text: "Are you sure to delete?",
		callback: function(result) {
			if (result) {
				webix.ajax().del("/api/sales/" + item.id, null,
					function(res) {
						$$(grid).remove(sel);
						$$("btnDelete").disable();
						webix.message({ text: "Item deleted." });
					}
				);
			}
		}
	});
}