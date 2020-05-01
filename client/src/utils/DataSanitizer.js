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

exports.cleanPayratesData = (data) => {
    let sanitizedData = [];

    data.forEach((d) => {
        let rate = (Math.floor(Math.random() * 10) + 20).toFixed(2);
        let adminRate = (rate * 1.2).toFixed(2); 
        sanitizedData.push({
            id: d.skillId,
            name: d.skillName,
            labourerReceives: `$${rate}/hr`,
            adminReceives: `$${adminRate}/hr`
        });
    });

    return sanitizedData;
}

exports.cleanAttendanceDatesData = (data) => {
    let sanitizedData = [];

    data.forEach((d) => {
        sanitizedData.push({
            id: this.formatDateParams(d),
            date: this.formatDateString(d)
        })
    });

    return sanitizedData;
}

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

const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

exports.formatDateString = (date) => {
    // Check if date is in YYYY-MM-DD format
    if(date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        let d = new Date(date);
        return `${months[d.getMonth()]} ${d.getDate() + 1}, ${d.getFullYear()} (${weekdays[d.getDay()]})`;
    }

    let d = new Date(date);
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

exports.formatDateParams = (date) => {
    let d = new Date(date);
    const addZero = (n) => {return n<10? '0'+n:''+n;}
    return `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())}`;
}