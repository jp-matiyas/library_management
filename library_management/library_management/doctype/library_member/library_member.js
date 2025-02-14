// Copyright (c) 2024, Jay patel and contributors
// For license information, please see license.txt

frappe.ui.form.on('Library Member', {
    refresh: function(frm) {
        frm.add_custom_button(__('Create Membership'), function() {
            frappe.call({
                method: "frappe.client.insert",
                args: {
                    doc: {
                        doctype: "Library Membership",
                        library_member: frm.doc.name,
                    }
                },
                callback: function(response) {
                    if (!response.exc) {
                        frappe.call({
                            method: "frappe.client.submit",
                            args: {
                                doc: response.message
                            },
                            callback: function(submitResponse) {
                                if (!submitResponse.exc) {
                                    frappe.msgprint(__('Library Membership created'));
                                }
                            }
                        });
                    }
                }
            });
        }, __("Create"));

        frm.add_custom_button(__('Create Transaction'), function() {
            frappe.call({
                method: "frappe.client.insert",
                args: {
                    doc: {
                        doctype: "Library Transactions",
                        library_member: frm.doc.name,
                    }
                },
                callback: function(response) {
                    if (!response.exc) {
                        frappe.call({
                            method: "frappe.client.submit",
                            args: {
                                doc: response.message
                            },
                            callback: function(submitResponse) {
                                if (!submitResponse.exc) {
                                    frappe.msgprint(__('Library Transaction created'));
                                }
                            }
                        });
                    }
                }
            });
        }, __("Create"));
    },
    validate: function(frm) {
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (frm.doc.email_address && !email_pattern.test(frm.doc.email_address)) {
            frappe.throw('Please enter a valid email address.');
        }
        // Combine first_name, middle_name, and last_name into full_name
        frm.set_value('full_name', 
            `${frm.doc.first_name || ''} ${frm.doc.middle_name || ''} ${frm.doc.last_name || ''}`.trim()
        );
    }
});