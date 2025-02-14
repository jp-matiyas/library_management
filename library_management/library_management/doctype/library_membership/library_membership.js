// Copyright (c) 2024, Jay patel and contributors
// For license information, please see license.txt

frappe.ui.form.on("Library Membership", {
	from_date(frm) {
        if (frm.doc.from_date && frm.doc.from_date < frappe.datetime.get_today()) {
            frm.set_value('from_date', frappe.datetime.get_today());
        }
    },
});
