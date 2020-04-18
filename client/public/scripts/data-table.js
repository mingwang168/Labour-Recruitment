jQuery(document).ready(function($) {
    'use strict';

    if ($("table.client-overview-table").length) {
        $(document).ready(function() {
            $('table.client-overview-table').DataTable({
                columnDefs: [ {
                    'targets': [0, 1,2,3,4,5,6], /* column index */
                    'orderable': false, /* true or false */
                }],
                aaSorting: []
            });
        });
    }

    // if ($("table.second").length) {
    //     $(document).ready(function() {
    //         $('table.second').DataTable();
    //     });
    // }
});