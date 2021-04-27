
var showIngSourceCode = false;
var isInEditMode = true;

function enableEditMode(){
    richTextField.document.designMode = 'on';
}
function execCmd (command){
   richTextField.document.execCommand(command, false, null)
}
function execCommandWithArg (command, arg){
    richTextField.document.execCommand(command, false, arg)
}   
function toggleSource() {
    if(showIngSourceCode){
        richTextField.document.getElementsByTagName('body')[0].innerHTML = richTextField.document.getElementsByTagName('body')[0].textContent;
        showIngSourceCode = false;
    } else {
        richTextField.document.getElementsByTagName('body')[0].textContent = richTextField.document.getElementsByTagName('body')[0].innerHTML;
        showIngSourceCode = true;
    }
}
function toggleEdit () {
    if(isInEditMode){
        richTextField.document.designMode = 'off';
        isInEditMode = false;
    } else {
        richTextField.document.designMode = 'on';
        isInEditMode = true;
    }
}