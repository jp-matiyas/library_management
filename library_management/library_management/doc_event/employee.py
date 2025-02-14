import frappe

# def validate_department(doc):
#     if doc.department:
#         employees = frappe.db.get_list(
#             "Employee",
#             filters={"department": doc.department},
#             fields=["employee_name"]
#         )
#         if employees:
#             frappe.msgprint(f"Employees in department {doc.department}: {', '.join(emp['employee_name'] for emp in employees)}")
#         else:
#             frappe.msgprint(f"No employees found in department {doc.department}.")
        
       