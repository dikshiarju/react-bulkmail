const fileInput=document.getElementById("fileInput")

fileInput.addEventListener("change",function(event){
    const file=event.target.files[0]
  //  console.log(file)
  const reader=new FileReader()
  reader.onload= function(event){
   // console.log(event)
   const data=event.target.result
   const uint8Array = new Uint8Array(data);
    // console.log('Binary data:', uint8Array);
   const workbook=XLSX.read(data,{type:"array"})
  // console.log(workbook)

  const sheetName=workbook.SheetNames[0]
  const worksheet=workbook.Sheets[sheetName]
 // console.log(worksheet)

 const emailList=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
console.log(emailList)
  }
  reader.readAsArrayBuffer(file)
})