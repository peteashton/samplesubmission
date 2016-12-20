function resetSampleTable(numberField) {
    num_samples = parseInt(numberField.value);
    if (isNaN(num_samples) || num_samples <= 0) {
        alert("Number of samples must be > 0");
        return false;
    }
    table_body = $("#sampletable");

/* Store away the data from the text input fields in the sample table part of the form */

    sample_data = {}
    $("#sampletable tr td input").each(function(index) {
        sample_data[this.id] = this.value;
    });

    newHTML = "";
    for (i=0; i < num_samples; i++) {
        newHTML = newHTML + getNewRow(i+1);
    }
    table_body.html(newHTML);

/* Now, if there was data in the old fields, [put it back into the new fields */

    for (field_name in sample_data) {
        new_field = $("#" + field_name);
        new_field.val(sample_data[field_name]);
    }
    return true;
}

function getNewRow(rowNum) {
    newRow = "<tr><td class='centered'>" + rowNum + "</td>" + 
                "<td><input id='sampletype" + rowNum + 
                "' name='sampletype" + rowNum + "' /></td>" + 
                "<td><input id='sampleid" + rowNum + 
                "' name='sampleid" + rowNum + "' /></td>" + 
                "<td><input id='sampleconc" + rowNum + 
                "' name='sampleconc" + rowNum + "' /></td>" + 
                "<td><input id='sampleA260280" + rowNum + 
                "' name='sampleA260280" + rowNum + "' /></td>" + 
                "<td><input id='sampleA260230" + rowNum + 
                "' name='sampleA260230" + rowNum + "' /></td>" + 
                "</tr>";
    return newRow;
}

function pasteSampleData(e) {

/* Get the data from the clipboard before it is pasted into the text area */

    var text = e.originalEvent.clipboardData.getData('text');
    var lines = text.split(/[\r\n]/);

/* Make sure there is enough space in the table to hold all the data */

    num_samples_field = $("#samplenumber")[0];
    if (num_samples_field.value != "") {
        num_rows = parseInt(num_samples_field.value);
    } else {
        num_rows = 0;
    }
    if (lines.length > num_rows) {
        num_samples_field.value = lines.length.toString();
        resetSampleTable(num_samples_field);
    }

/* Stop the default action for the paste event */

    e.originalEvent.stopPropagation();
    e.originalEvent.preventDefault();

/* For each line, split it into fields and put them into a row of the sample table */

    var field_labels = ['sampletype', 'sampleid', 'sampleconc', 
                        'sampleA260280', 'sampleA260230'];

    for (var i=0; i<lines.length; i++) {
        var line_num = i + 1
        var fields = lines[i].split("\t");
        if (fields.length != field_labels.length) {
            alert("Pasted input looks strange.  You should be trying to paste in data from excel with 5 columns corresponding to the column labels in the table below");
            break;
        }
        for (var j=0; j < fields.length; j++) {
            var fieldid = "#" + field_labels[j] + line_num.toString();
            $(fieldid).val(fields[j]);
        }
    }
}

function preparePasteField(text_field) {
    text_field.textContent = "";
}

function resetPasteField(text_field) {
    text_field.textContent = "Paste data from Excel here";
}

function changeExperimentType(select_control) {
    if (select_control.value == "other") {
        $("#otherexpttype").prop('disabled', false);
        $("#otherexpttype").focus();
    } else {
        $("#otherexpttype").prop('disabled', true);
    }
}

function selectOtherAnalysis(radio_button) {
    if (radio_button.checked) {
        $("#analysisdetails").prop('disabled', false);
        $("#analysisdetails").focus();
    } else {
        $("#analysisdetails").prop('disabled', true);
    }
}

function selectMainAnalysis(radio_button) {
    if (radio_button.checked) {
        $("#analysisdetails").prop('disabled', true);
    }
}

function checkAndSubmit(button) {
    form = button.form;
    name_field = $("#username")[0];
    email_field = $("#emailaddress")[0];
    if (name_field.value == "" || email_field.value == "") {
        alert("Both name and e-mail must be entered for the form to be submitted.");
    } else {
        form.submit();
    }
}
