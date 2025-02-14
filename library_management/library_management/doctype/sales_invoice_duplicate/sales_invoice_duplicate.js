// Copyright (c) 2024, Jay patel and contributors
// For license information, please see license.txt

frappe.ui.form.on("Sales Invoice Duplicate", {
	before_save: function (frm) {
        calculate_all_items(frm);
    },
    onload: function (frm) {
        frm.set_query('customer', function () {
            return {
                filters: {
                    custom_is_active: 1
                }
            };
        });
    }
});
frappe.ui.form.on('Custom Sales Invoice Items', {
    qty: function (frm, cdt, cdn) {
        calculate_item_amount(cdt, cdn);
    },
    rate: function (frm, cdt, cdn) {
        calculate_item_amount(cdt, cdn);
    }
});
function calculate_item_amount(cdt, cdn) {
    let row = frappe.get_doc(cdt, cdn);
    console.log(row);
    let qty = row.qty;
    let rate = row.rate || 0;
    let amount = qty * rate;
    frappe.model.set_value(cdt, cdn, 'amount', amount);
}
function calculate_all_items(frm) {
    (frm.doc.items || []).forEach(item => {
        item.amount = (item.qty) * (item.rate || 0);
    });
    frm.refresh_field('items');
}