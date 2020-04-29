exports.cleanJobsData = (data) => {
    let sanitizedData = [];

    data.forEach((d) => {
        sanitizedData.push({
            id: d.jobId,
            title: d.title,
            startdate: this.formatDateString(d.startDate),
            enddate: this.formatDateString(d.endDate),
            status: d.isComplete ? "Complete" : "In Progress"
        });
    });

    return sanitizedData;
}

exports.cleanClientsData = (data) => {
    let sanitizedData = [];

    data.forEach((d) => {
        sanitizedData.push({
            id: d.clientId,
            name: d.clientName,
            email: d.clientEmail,
            phone: d.clientPhoneNumber,
            location: `${d.clientCity}, ${d.clientState}`
        });
    });

    return sanitizedData;
}

exports.cleanLabourersData = (data) => {
    let sanitizedData = [];

    data.forEach((d) => {
        sanitizedData.push({
            id: d.labourerId,
            name: `${d.labourerFirstName} ${d.labourerLastName}`,
            email: d.labourerEmail,
            availability: d.isAvailable ? "Yes" : "No"
        });
    });

    return sanitizedData;
}

exports.cleanIncidentsData = (data) => {
    let sanitizedData = [];

    data.forEach((d) => {
        sanitizedData.push({
            id: d.incidentReportId,
            job: d.job.title,
            date: this.formatDateString(d.incidentReportDate),
            type: d.incidentType.incidentTypeName,
            affected: `${d.labourerIncidentReport.length} labourer(s)`
        });
    });

    return sanitizedData;
}

exports.formatDateString = (date) => {
    let d = new Date(date);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}