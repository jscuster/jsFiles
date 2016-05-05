//check compatibility
if (window.File && window.FileReader && window.FileList && window.Blob) {
$(function() {
"use strict";
var jsFiles = [],
jsRoot = "",
index = 0,

addCount = (function() {
var ct = -1;
return function(x) {
var working = x ? "in progress." : "all files added.";
working = " total files, " + working;
ct++;
$("#count").val(ct + working);
}; //inner func
})(), //outer count func

editName = function() {
$("#editName").val(jsFiles[index][0]);
}, //editName

nameChange = function() {
index = this.value * 1;
editName();
}, //nameChange

update = function() {
var s = "<select id=\"selectName\">";
for (var i = 0; i < jsFiles.length; i++) {
s=s+"<option value=\"" + i + "\">" + jsFiles[i][0] + "</option>";
} //i
$("#names").html(s + "</select>");
$("#selectName").val(index);
$("#selectName").change(nameChange); //selectNames.change
editName();
}, //update

encode = function() {
//create [jsRoot].jsFiles if needed
var s = jsRoot + "=" + jsRoot + "||{};\n";
s = s + jsRoot + ".jsFiles=" + jsRoot + ".jsFiles || {};\n";
//add the new files.
for (var i = 0; i < jsFiles.length; i++) {
s = s + jsRoot + ".jsFiles[\"" + jsFiles[i][0] + "\"]=\"" + jsFiles[i][1] + "\";\n";
} //i
s = 'data:text/javascript,' + encodeURIComponent(s);
return s;
}; //encode

$("#addFile").change(function (e) {
var files = e.target.files, //get the files.
ct = 0,

loadFile = function(f) {
var reader = new FileReader();
reader.onload = function (e) {
ct--;
addCount(ct === 0);
jsFiles[jsFiles.length] = [f.name, e.target.result];
update();
}; //onload

reader.onerror = function(e) {
ct--;
var r = "";
switch(e.target.error.code) {
case e.target.error.NOT_FOUND_ERR:
r = 'File not found!';
break;
case e.target.error.NOT_READABLE_ERR:
r = 'File not readable!';
break;
case e.target.error.ABORT_ERR:
r = 'Read operation was aborted!';
break; 
case e.target.error.SECURITY_ERR:
r = 'File is in a locked state!';
break;
case e.target.error.ENCODING_ERR:
r = 'The file is too long to encode in a "data://" URL.';
break;
default:
r = 'Read error.';
    }       //switch
alert("The file " + f.name + " was not successfully loaded.\n" + r);
}; //reader.onerror

reader.readAsDataURL(f);
}; //loadFile

for (var i = 0; i < files.length; i++) {
loadFile(files[i]);
} //i
$("#fileForm")[0].reset();
}); //addFile change

$("#save").click(function() {
$("#codeOptions").show();
$("#codeLink").prop("href", encode());
}); //save_click

$("#update").click(function() {
jsFiles[index][0] = $("#editName").val();
update();
}); //update.click

$("#baseObj").change((function() {
var bobj = $("#baseObj");
return function() {
jsRoot = bobj.val();
alert(jsRoot);
}; //inner func
})()); //baseObj.change

$("#codeOptions").hide();
addCount();
}); //ready function
} else {
alert("This browser does not support the functionallity needed for this web page to work properly.");
}//if compatible
