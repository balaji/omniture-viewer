function refresh_auto() {
  make_report();
  setTimeout("refresh_auto()", 5000);
}
function make_report() {
  var request_list = new Array; 

  for (var window_member in content.wrappedJSObject) {
    if (window_member.substring(0, 4) == 's_i_' && content.wrappedJSObject[window_member].src) {
      var img_src = content.wrappedJSObject[window_member].src;
      if (img_src.indexOf('/b/ss/') >= 0) {
        var request = new Object;
        request.method = 'Image';
        request.url = img_src;
        request_list[request_list.length] = request;
      }
    }
  }
  clearDiv();
  if(request_list.length > 0) {
    for(var req in request_list) {
      document.getElementById("omn_content")
        .appendChild(createNode(request_list[req].url, (req % 2 == 0 ? "#FFFFFF" : "#EFEFEF")));
    }
  } else {
    var elem = document.createElementNS("http://www.w3.org/1999/xhtml", "html:span");
    elem.setAttribute("style", "font:bold 11px arial,sans-serif;color: red;");
    elem.appendChild(document.createTextNode("No Requests Found."));
    document.getElementById("omn_content").appendChild(elem);
  }
}
function clearDiv() {
  var div = document.getElementById("omn_content");
  if(div.childNodes.length > 0) while(div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
}
function createNode(content, color) {
  var pelem = document.createElementNS("http://www.w3.org/1999/xhtml", "html:pre");
  pelem.setAttribute("style", "margin: 0px;background-color: " + color + ";");
  pelem.appendChild(document.createTextNode(s_rep(content)));
  var elem = document.createElementNS("http://www.w3.org/1999/xhtml", "html:span");
  elem.setAttribute("style", "font:11px arial,sans-serif;color:#000000;");
  elem.appendChild(pelem); 
  return elem;
}
function s_rep(s) {
  var ret = "\n", arr;
  var propRege = new RegExp("^c+[0-9]");
  var varRege = new RegExp("^v+[0-9]");
  var s_array = s.split('&');
  for (var index in s_array) {
    if(document.getElementById("switch_format").checked) {
      ret += s_array[index] + "\n";
    } else {
      arr = s_array[index].split("=");
      if (arr[0] == "pageName") {
        ret += "Page Name \t= " + arr[1] + "\n";
      } else if (arr[0] == "ch") {
        ret +="Channel \t= " + arr[1] + "\n";
      } else if (arr[0] == "events") {
        ret +="Event \t\t= " + arr[1] + "\n";
      } else if (propRege.test(arr[0])) {
        ret +=arr[0].replace("c", "prop") + "\t\t= " + arr[1] + "\n";
      } else if (varRege.test(arr[0])) {
        ret +=arr[0].replace("v", "eVar") + "\t\t= " + arr[1] + "\n";
      } else if (arr[0].indexOf("pev2") == 0) {
        ret +="Link Desc." + "\t= " + arr[1] + "\n";
      } else if (arr[0] == "products") {
        ret +="Products \t= " + arr[1] + "\n";
      } else if (arr[0] == "state") {
        ret +="State \t\t= " + arr[1] + "\n";
      } else if (arr[0] == "zip") {
        ret +="Zip \t\t= " + arr[1] + "\n";
      } else if (arr[0].indexOf("pev1") == 0) {
        ret +="External Link" + "\t= " + arr[1] + "\n";
      }
    }
  }
  return unescape(ret);
}