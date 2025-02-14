import frappe

def validate_total_amount(doc, method):
    total_item_amount = sum(item.amount for item in doc.items)
    if total_item_amount == doc.total:
        frappe.msgprint(f"The sum of item amounts ({total_item_amount}) matches the total amount ({doc.total})")
    else:
        frappe.throw(f"The sum of item amounts ({total_item_amount}) do not match the total amount ({doc.total})")