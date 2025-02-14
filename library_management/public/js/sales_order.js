frappe.ui.form.on('Sales Order', {
    onload: function (frm) {
        frm.set_query('customer', function () {
            return {
                filters: {
                    custom_is_active: true
                }
            };
        });
    },
    refresh: function (frm) {
        // Intercept the "Delete" button click event in the child table
        frm.fields_dict['items'].grid.wrapper.find('.grid-remove-rows').on('click', function (event) {
            frappe.confirm(
                'Are you sure you want to delete the selected item(s)?',
                () => frm.fields_dict['items'].grid.remove_selected(), // Proceed with deletion
                () => frappe.msgprint('Deletion cancelled.') // Optional: Inform user if cancelled
            );
        });
    }
});