import frappe
from frappe.utils.nestedset import NestedSet
from erpnext.setup.doctype.employee.employee import Employee
from erpnext.setup.doctype.employee.employee import validate_employee_role
from erpnext.setup.doctype.employee.employee import remove_user_permission


class Customemployee(Employee):
    def validate(self):
        from erpnext.controllers.status_updater import validate_status

        validate_status(self.status, ["Active", "Inactive", "Suspended", "Left", "Not Joined"])

        self.employee = self.name
        self.set_employee_name()
        self.validate_date()
        self.validate_email()
        self.validate_status()
        self.validate_reports_to()
        self.validate_preferred_email()

        if self.user_id:
            self.validate_user_details()
        else:
            existing_user_id = frappe.db.get_value("Employee", self.name, "user_id")
            if existing_user_id:
                user = frappe.get_doc("User", existing_user_id)
                validate_employee_role(user, ignore_emp_check=True)
                user.save(ignore_permissions=True)
                remove_user_permission("Employee", self.name, existing_user_id)