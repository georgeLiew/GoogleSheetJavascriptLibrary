function CreateReceipt() {
  //拿选择那一行
  var activeSheet = SpreadsheetApp.getActiveSheet();
  var activeRow = activeSheet.getActiveCell().getRow();

  //把那一行的资料拿出来
  var name = activeSheet.getRange(activeRow,2).getValue();
  var payAmount = activeSheet.getRange(activeRow,3).getValue();
  var payBy = activeSheet.getRange(activeRow,4).getValue();

  //要找出Receipt的那一面
  var ReceiptSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Receipt');

  //要把之前拿出来的资料放进Receipt的sheet
  ReceiptSheet.getRange('C3').setValue(name);
  ReceiptSheet.getRange('C5').setValue(moneyToEng(payAmount));
  ReceiptSheet.getRange('C7').setValue(payBy);

  //打开Receipt的sheet
  ReceiptSheet.activate();
}

