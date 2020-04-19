$(document).ready(function($) {
     'use strict';

    // Job Detail: Daily Quality Rating Table
    if ($("table.job-dqr-table").length) {
        $(document).ready(function() {
            $('table.job-dqr-table').DataTable({
                lengthMenu: [ 5, 10, 25 ],
                columnDefs: [ {
                    'targets': [0,1,2],
                    'orderable': false
                }],
                aaSorting: []
            });
        });
    }

    // Job Detail: Safety Meetings Table
    if ($("table.job-safetymeetings-table").length) {
        $(document).ready(function() {
            $('table.job-safetymeetings-table').DataTable({
                lengthMenu: [ 5, 10, 25 ],
                columnDefs: [ {
                    'targets': [0,1,2],
                    'orderable': false
                }],
                aaSorting: []
            });
        });
    }

    // Job Detail: Safety Ratings Table
    if ($("table.job-safetyratings-table").length) {
        $(document).ready(function() {
            $('table.job-safetyratings-table').DataTable({
                lengthMenu: [ 10, 15, 25 ],
                columnDefs: [ {
                    'targets': [0,1,2],
                    'orderable': false
                }],
                aaSorting: []
            });
        });
    }
});