exports.cleanClientJobs = (data) => {
    let sanitizedData = [];

    data.forEach((d) => {
        let sanitizedJob = {};

        // Get job id
        sanitizedJob = {...sanitizedJob, jobId: d.jobId};

        // Get job title
        if(d.hasOwnProperty("title")) {
            sanitizedJob = {...sanitizedJob, title: d.title};
        }

        // Get start date
        if(d.hasOwnProperty("startDate")) {
            sanitizedJob = {...sanitizedJob, startDate: this.formatDateString(d.startDate)};
        }

        // Get end date
        if(d.hasOwnProperty("endDate")){
            sanitizedJob = {...sanitizedJob, endDate: this.formatDateString(d.endDate)};
        }

        // Get status
        if(d.hasOwnProperty("isComplete")) {
            let status = d.isComplete ? "Complete" : "In Progress";
            sanitizedJob = {...sanitizedJob, status: status};
        }

        // Add to data array
        sanitizedData.push(sanitizedJob);
    });

    return sanitizedData;
}

exports.cleanAdminJobs = (data) => {
    let sanitizedData = [];

    data.forEach((d) => {
        let sanitizedJob = {};

        // Get job id
        sanitizedJob = {...sanitizedJob, jobId: d.jobId};

        // Get job title
        if(d.hasOwnProperty("title")) {
            sanitizedJob = {...sanitizedJob, title: d.title};
        }

        // Get start date
        if(d.hasOwnProperty("startDate")) {
            sanitizedJob = {...sanitizedJob, startDate: this.formatDateString(d.startDate)};
        }

        // Get end date
        if(d.hasOwnProperty("endDate")){
            sanitizedJob = {...sanitizedJob, endDate: this.formatDateString(d.endDate)};
        }

        // Get status
        if(d.hasOwnProperty("isComplete")) {
            let status = d.isComplete ? "Complete" : "In Progress";
            sanitizedJob = {...sanitizedJob, status: status};
        }

        // Add to data array
        sanitizedData.push(sanitizedJob);
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