jQuery(document).ready(function($) {
    'use strict';

    // Client Dashboard Table
    if ($("table.client-overview-table").length) {
        $(document).ready(function() {
            $('table.client-overview-table').DataTable({
                columnDefs: [ {
                    'targets': [0,1,2,3,4,5,6],
                    'orderable': false
                }],
                aaSorting: []
            });
        });
    }
});