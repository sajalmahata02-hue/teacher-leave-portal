document.getElementById('leaveForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Gather values from the form
    const teacherName = document.getElementById('teacherName').value;
    const empId = document.getElementById('empId').value;
    const schoolName = document.getElementById('schoolName').value;
    const leaveType = document.getElementById('leaveType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const reason = document.getElementById('reason').value;

    // Calculate total days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // 2. Populate the hidden PDF template
    document.getElementById('lblCurrentDate').innerText = new Date().toLocaleDateString();
    document.getElementById('lblTeacherName').innerText = teacherName;
    document.getElementById('lblEmpId').innerText = empId;
    document.getElementById('lblSchoolName').innerText = schoolName;
    document.getElementById('lblLeaveType').innerText = leaveType;
    document.getElementById('lblStartDate').innerText = startDate;
    document.getElementById('lblEndDate').innerText = endDate;
    document.getElementById('lblTotalDays').innerText = isNaN(diffDays) ? 1 : diffDays;
    document.getElementById('lblReason').innerText = reason;

    // 3. Style and trigger PDF download using html2pdf library
    const element = document.getElementById('pdfTemplate');
    element.style.display = 'block'; // Temporarily show for capture
    element.style.padding = '20px';
    element.style.background = '#ffffff';
    element.style.color = '#000000';
    element.style.fontFamily = 'Arial, sans-serif';

    const opt = {
        margin:       10,
        filename:     `Leave_Application_${empId}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().then(() => {
        // Hide template again after PDF downloads
        element.style.display = 'none';
        alert('Leave application submitted and PDF downloaded successfully!');
        document.getElementById('leaveForm').reset();
    });
});