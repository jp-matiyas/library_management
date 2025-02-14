import frappe

def invoice_count(doc, method):
    if doc.customer:
        invoice_count = frappe.db.count(
            "Sales Invoice",
            filters={"customer": doc.customer}
        )
        frappe.msgprint(f"Customer '{doc.customer}' has {invoice_count} invoice(s) in the system.")