frappe.ui.form.on("Project", {
	refresh: function (frm) {
        if (!frm.is_new()) {
        frm.add_custom_button(__('Add Task'), function(){
            let dialog = new frappe.ui.Dialog({
                title: 'Add Task',
                fields: [
                    {
                        label: 'Task Name',
                        fieldname: 'task_name',
                        fieldtype: 'Data',
                        reqd: 1
                    },
                    {
                        label: 'Deadline',
                        fieldname: 'deadline',
                        fieldtype: 'Date'
                    }
                ],
                primary_action_label: 'Submit',
                primary_action: function (data) {
                    let child = frm.add_child('custom_task', {
                        task_name: data.task_name,
                        deadline: data.deadline
                    });
                    frm.refresh_field('custom_task');
                    dialog.hide();
                }
            });
            dialog.show();
        })
    }
}
});