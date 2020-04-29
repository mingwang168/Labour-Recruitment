exports.JOBS_TABLE_COLUMNS = [
    {
        Header: 'Job Title',
        accessor: 'title',
    },
    {
        Header: 'Start Date',
        accessor: 'startdate',
    },
    {
        Header: 'End Date',
        accessor: 'enddate',
    },
    {
        Header: 'Completion Status',
        accessor: 'status',
    }
];

exports.CLIENTS_TABLE_COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Phone',
        accessor: 'phone',
    },
    {
        Header: 'Location',
        accessor: 'location',
    }
];

exports.LABOURERS_TABLE_COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Is Available',
        accessor: 'availability',
    }
];

exports.INCIDENTS_TABLE_COLUMNS = [
    {
        Header: 'Job',
        accessor: 'job',
    },
    {
        Header: 'Date',
        accessor: 'date',
    },
    {
        Header: 'Incident Type',
        accessor: 'type',
    },
    {
        Header: '# affected',
        accessor: 'affected',
    }
];

exports.PAYRATES_TABLE_COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Labourer Receives',
        accessor: 'labourerReceives',
    },
    {
        Header: 'Admin Receives (20% cut)',
        accessor: 'adminReceives',
    }
];