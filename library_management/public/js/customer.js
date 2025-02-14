frappe.ui.form.on("Customer", {
    validate: function (frm) {
        const email = frm.doc.custom_email_id;
        if (email && !validate_email_custom(email)) {
            frappe.msgprint({
                title: __('Invalid Email'),
                message: __('Please enter a valid email address'),
                indicator: 'red'
            });
            frappe.validated = false; 
        }
    }
});
function validate_email_custom(email) {
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
    return (
        atIndex > 0 &&                   
        dotIndex > atIndex + 1 &&        
        dotIndex < email.length - 1      
    );
}