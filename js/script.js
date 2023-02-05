function validate() {
    console.log("submitting")
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let dob = document.getElementById("dateofbirth").value;
    let file = document.getElementById("myfile").files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = e => {
            let contents = processExcel(e.target.result)
            console.log(contents)
        }
        reader.readAsBinaryString(file)
    } else {

        //FIXME : handle error when no file has been selected

    } 
}

function createElementWithContent(type, content) {                                                      
    const el = document.createElement(type);
    el.innerHTML = content;
    return el;
}

function processExcel(data) {
  var workbook = XLSX.read(data, {
    type: 'binary'
  });
  var data = to_json(workbook);
  return data
};

function to_json(workbook) {
  var result = {};
  workbook.SheetNames.forEach(function(sheetName) {
    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1
    });
    if (roa.length) result[sheetName] = roa;
  });
  return JSON.stringify(result, 2, 2);
};