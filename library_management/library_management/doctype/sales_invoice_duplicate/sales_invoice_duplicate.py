# Copyright (c) 2024, Jay patel and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SalesInvoiceDuplicate(Document):
	def on_submit(self):
		self.create_original_sales_invoice()

	def create_original_sales_invoice(self):
		# Create a new Sales Invoice
		sales_invoice = frappe.new_doc("Sales Invoice")

		# Copy fields from the duplicate to the original
		fields_to_copy = [
			"customer", "posting_date", "due_date", "company",
			"currency", "taxes_and_charges", "total", "grand_total"
		]
		for field in fields_to_copy:
			sales_invoice.set(field, self.get(field))
		# sales_invoice.customer = self.customer,
		# sales_invoice.posting_date = self.posting_date,
		# sales_invoice.due_date = self.due_date,
		# sales_invoice.company = self.company,
		# sales_invoice.currency = self.currency,
		# sales_invoice.taxes_and_charges = self.taxes_and_charges,
		# sales_invoice.total = self.total,
		# sales_invoice.grand_total = self.grand_total
		
		# Copy child table data (items)
		for item in self.items:
			# si_items = frappe.new_doc("Sales Invoice Item")
			# si_items.item_code = item.item_code,
			# si_items.item_name = item.item_name,
			# si_items.qty = item.qty,
			# si_items.rate = item.rate,
			# si_items.amount = item.amount,
			# si_items.description = item.description,
			# si_items.income_account = item.income_account
			# sales_invoice.append("items",si_items)
			sales_invoice.append("items", {	
				"item_code": item.item_code,
				"item_name": item.item_name,
				"qty": item.qty,
				"rate": item.rate,
				"amount": item.amount,
				"description": item.description,
				"income_account": item.income_account
			})
		
		# Add other child tables if needed (e.g., taxes)
		for tax in self.taxes or []:
			# si_taxes = frappe.new_doc("Sales Taxes and Charges")
			# si_taxes.charge_type = tax.charge_type,
			# si_taxes.account_head = tax.account_head,
			# si_taxes.description = tax.description,
			# si_taxes.rate = tax.rate,
			# si_taxes.tax_amount = tax.tax_amount
			# sales_invoice.append("taxes",si_taxes)
			sales_invoice.append("taxes", {
				"charge_type": tax.charge_type,
				"account_head": tax.account_head,
				"description": tax.description,
				"rate": tax.rate,
				"tax_amount": tax.tax_amount
			})

		# Save and submit the Sales Invoice
		sales_invoice.insert()
		sales_invoice.submit()

		frappe.msgprint(f"Original Sales Invoice {sales_invoice.name} has been created.")
	
		
