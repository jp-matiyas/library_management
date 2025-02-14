frappe.ui.form.on("Sales Invoice", {
    refresh : function(frm){
        frm.set_query('customer', function () {
            return {
                filters: {
                    custom_is_active : 1
                }
            };
        });
    }
})