var pdf2table = require('pdf2table');
var fs = require('fs');
var excel = require('excel4node');

var workbook = new excel.Workbook();

var worksheet = workbook.addWorksheet('Sheet 1');

var headerStyle = workbook.createStyle({
    font: {
        color: 'black',
        size: 14,
        weight: 700
    },
});

var dataStyle = workbook.createStyle({
    font: {
        color: 'black',
        size: 12
    },
});

worksheet.cell(1, 1).string("Contractor Head").style(headerStyle);
worksheet.cell(1, 2).string("Contractor Name").style(headerStyle);
worksheet.cell(1, 3).string('Currency').style(headerStyle);
worksheet.cell(1, 4).string('Final cost').style(headerStyle);

worksheet.column(1).setWidth(26)
worksheet.column(2).setWidth(25)
worksheet.column(3).setWidth(10)
worksheet.column(4).setWidth(15)

fs.readFile('./Final_Cost_Study.pdf', function (err, buffer) {
    if (err) return console.log(err);

    let row = 2;

    let jsonData = []

    pdf2table.parse(buffer, function (err, rows, rowsdebug) {
        if (err) return console.log(err);

        for (let i = 1; rows.length > i; i++) {
            let column = 1

            if (rows[i].length == 4) {
                if (rows[i][0].trim().length > 1) {

                    let jsonObject = {
                        contractorHead: rows[i][0].trim(),
                        contractorName: rows[i][1].trim(),
                        currency: rows[i][2].trim(),
                        cost: rows[i][3].trim(),
                    }
                    jsonData.push(jsonObject)
                }
                for (let j = 0; rows[i].length > j; j++) {
                    worksheet.cell(row, column).string(rows[i][j]).style(dataStyle);
                    column++
                }
            } else if (rows[i].length == 3) {
                if (rows[i][0].trim().length > 1) {
                    let jsonObject = {
                        contractorHead: rows[i][0].trim(),
                        contractorName: "",
                        currency: rows[i][1].trim(),
                        cost: rows[i][2].trim(),
                    }
                    jsonData.push(jsonObject)
                }
                for (let j = 0; rows[i].length > j; j++) {
                    if (column == 2) {
                        worksheet.cell(row, column).string(" ").style(dataStyle);
                        column++
                        worksheet.cell(row, column).string(rows[i][j]).style(dataStyle);

                    } else {
                        worksheet.cell(row, column).string(rows[i][j]).style(dataStyle);
                    }
                    column++
                }
            }
            row++

        }

        console.log("jsonData::: ", jsonData)
        workbook.write('Final cost study.xlsx');

    });
});

