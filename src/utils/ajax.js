import objectAssign from 'object-assign';

const CSRF_TOKEN_NAME = 'CSRF_TOKEN';

export default class Ajax {

    static encode(value, opts) {
        if (opts.encode) {
            return encodeURIComponent(value);
        }
        return value;
    }

    static stringify(obj, opts) {
        let defaults = {
            encode: true
        };

        opts = objectAssign(defaults, opts);

        return obj ? Object.keys(obj).sort().map(function (key) {
            let val = obj[key];

            if (val === undefined) {
                return '';
            }

            if (val === null) {
                return Ajax.encode(key, opts);
            }

            if (Array.isArray(val)) {
                let result = [];

                val.slice().forEach(function (val2) {
                    if (val2 === undefined) {
                        return;
                    }

                    if (val2 === null) {
                        result.push(Ajax.encode(key, opts));
                    } else {
                        result.push(Ajax.encode(key, opts) + '=' + Ajax.encode(val2, opts));
                    }
                });

                return result.join('&');
            }

            return Ajax.encode(key, opts) + '=' + Ajax.encode(val, opts);
        }).filter(function (x) {
            return x.length > 0;
        }).join('&') : '';
    }

  static get(url, data) {
      return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          xhr.onload = function () {
              const res = JSON.parse(xhr.responseText);
              resolve(res);
          };
          xhr.error = function (e) {
              reject(e);
          };
          xhr.abort = function (e) {
              reject(e);
          };
          let queryString = Ajax.stringify(data);
          url = queryString ? url + '?' + decodeURIComponent(queryString) : url;
          xhr.open('GET', url, true);
          xhr.setRequestHeader('Accept', 'application/json'); 

          //disable IE ajax request caching (only a GET problem, POST doesn't cache)
          xhr.setRequestHeader('If-Modified-Since', 'Mon, 26 Jul 1997 05:00:00 GMT');
          // extra
          xhr.setRequestHeader('Cache-Control', 'no-cache');
          xhr.setRequestHeader('Pragma', 'no-cache');

          xhr.send();
      });
  }

  /**
   * body post, this is good if you want to deserialize the entire object/body to a class
   * you can also do this with the newer FormData
   * var data = new FormData();
   * data.append('user', 'person');
   * data.append('pwd', 'password');
   * xhr.send(data);
   *
   * @param {string} url
   * @param {object} data
   */
  static post(url, data) {
      let xhr = new XMLHttpRequest();
      return new Promise((resolve, reject) => {
          xhr.onload = function () {
              resolve(JSON.parse(xhr.responseText));
          };
          xhr.error = function (e) {
              reject(e);
          };
          xhr.abort = function (e) {
              reject(e);
          };
          let queryString = Ajax.stringify(data);
          xhr.open('POST', url, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Accept', 'application/json'); 
          let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1");
          xhr.setRequestHeader('XSRF-TOKEN', cookieValue); 
          xhr.send(queryString);
      });
  }
    
  static postJson(url, data) {
      let xhr = new XMLHttpRequest();
      return new Promise((resolve, reject) => {
          xhr.onload = function () {
              resolve(JSON.parse(xhr.responseText));
          };
          xhr.error = function (e) {
              reject(e);
          };
          xhr.abort = function (e) {
              reject(e);
          };
          xhr.open('POST', url, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('Accept', 'application/json'); 
          let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1");
          xhr.setRequestHeader('XSRF-TOKEN', cookieValue); 
          xhr.send(JSON.stringify(data));
      });
  }

  /**
   */
  static put(url, id, data) {
      let xhr = new XMLHttpRequest();
      return new Promise((resolve, reject) => {
          xhr.onload = function () {
              resolve(JSON.parse(xhr.responseText));
          };
          xhr.error = function (e) {
              reject(e);
          };
          xhr.abort = function (e) {
              reject(e);
          };
          let queryString = Ajax.stringify(data);
          xhr.open('PUT', url + '/' + id, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('Accept', 'application/json'); 
          let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1");
          xhr.setRequestHeader('XSRF-TOKEN', cookieValue); 
          xhr.send(JSON.stringify(data.serialize()));
      });
  }

  /**
   */
  static delete(url, id, data) {
      let xhr = new XMLHttpRequest();
      return new Promise((resolve, reject) => {
          xhr.onload = function () {
              resolve(JSON.parse(xhr.responseText));
          };
          xhr.error = function (e) {
              reject(e);
          };
          xhr.abort = function (e) {
              reject(e);
          };
          let queryString = Ajax.stringify(data);
          xhr.open('DELETE', url + '/' + id, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('Accept', 'application/json'); 
          let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1");
          xhr.setRequestHeader('XSRF-TOKEN', cookieValue); 
          xhr.send(queryString);
      });
  }

  //multipart/form-data
  //static getBinary(url) {
      //let oReq = new XMLHttpRequest();

      //oReq.onload = function() {
            ////let arraybuffer = oReq.response; // not responseText
              //[> ... <]
      //};

      //oReq.addEventListener("progress", updateProgress);
      //oReq.addEventListener("load", transferComplete);
      //oReq.addEventListener("error", transferFailed);
      //oReq.addEventListener("abort", transferCanceled);

      //// ...
      ////
       //// progress on transfers from the server to the client (downloads)
      //function updateProgress (oEvent) {
          //if (oEvent.lengthComputable) {
              //var percentComplete = oEvent.loaded / oEvent.total;
              //// ...
          //} else {
              //// Unable to compute progress information since the total size is unknown
          //}
      //}

      //function transferComplete(evt) {
          //console.log("The transfer is complete.");
      //}

      //function transferFailed(evt) {
          //console.log("An error occurred while transferring the file.");
      //}

      //function transferCanceled(evt) {
          //console.log("The transfer has been canceled by the user.");
      //}
      


      ////data on the upload
      //oReq.upload.addEventListener("progress", updateProgress);
      //oReq.upload.addEventListener("load", transferComplete);
      //oReq.upload.addEventListener("error", transferFailed);
      //oReq.upload.addEventListener("abort", transferCanceled);


      //oReq.open("GET", url);
      //oReq.responseType = "arraybuffer";
      //oReq.send();
  //}

  //var AJAXSubmit = (function () {

      //function ajaxSuccess () {
          //[> console.log("AJAXSubmit - Success!"); <]
          //console.log(this.responseText);
          //[> you can get the serialized data through the "submittedData" custom property: <]
          //[> console.log(JSON.stringify(this.submittedData)); <]
      //}

      //function submitData (oData) {
          //[> the AJAX request... <]
          //var oAjaxReq = new XMLHttpRequest();
          //oAjaxReq.submittedData = oData;
          //oAjaxReq.onload = ajaxSuccess;
          //if (oData.technique === 0) {
              //[> method is GET <]
              //oAjaxReq.open("get", oData.receiver.replace(/(?:\?.*)?$/, oData.segments.length > 0 ? "?" + oData.segments.join("&") : ""), true);
              //oAjaxReq.send(null);
          //} else {
              //[> method is POST <]
              //oAjaxReq.open("post", oData.receiver, true);
              //if (oData.technique === 3) {
                  //[> enctype is multipart/form-data <]
                  //var sBoundary = "---------------------------" + Date.now().toString(16);
                  //oAjaxReq.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + sBoundary);
                  //oAjaxReq.sendAsBinary("--" + sBoundary + "\r\n" + oData.segments.join("--" + sBoundary + "\r\n") + "--" + sBoundary + "--\r\n");
              //} else {
                  //[> enctype is application/x-www-form-urlencoded or text/plain <]
                  //oAjaxReq.setRequestHeader("Content-Type", oData.contentType);
                  //oAjaxReq.send(oData.segments.join(oData.technique === 2 ? "\r\n" : "&"));
              //}
          //}
      //}

      //function processStatus (oData) {
          //if (oData.status > 0) { return; }
          //[> the form is now totally serialized! do something before sending it to the server... <]
          //[> doSomething(oData); <]
          //[> console.log("AJAXSubmit - The form is now serialized. Submitting..."); <]
          //submitData (oData);
      //}

      //function pushSegment (oFREvt) {
          //this.owner.segments[this.segmentIdx] += oFREvt.target.result + "\r\n";
          //this.owner.status--;
          //processStatus(this.owner);
      //}

      //function plainEscape (sText) {
          //[> how should I treat a text/plain form encoding? what characters are not allowed? this is what I suppose...: <]
          //[> "4\3\7 - Einstein said E=mc2" ----> "4\\3\\7\ -\ Einstein\ said\ E\=mc2" <]
          //return sText.replace(/[\s\=\\]/g, "\\$&");
      //}

      //function SubmitRequest (oTarget) {
          //var nFile, sFieldType, oField, oSegmReq, oFile, bIsPost = oTarget.method.toLowerCase() === "post";
          //[> console.log("AJAXSubmit - Serializing form..."); <]
          //this.contentType = bIsPost && oTarget.enctype ? oTarget.enctype : "application\/x-www-form-urlencoded";
          //this.technique = bIsPost ? this.contentType === "multipart\/form-data" ? 3 : this.contentType === "text\/plain" ? 2 : 1 : 0;
          //this.receiver = oTarget.action;
          //this.status = 0;
          //this.segments = [];
          //var fFilter = this.technique === 2 ? plainEscape : escape;
          //for (var nItem = 0; nItem < oTarget.elements.length; nItem++) {
              //oField = oTarget.elements[nItem];
              //if (!oField.hasAttribute("name")) { continue; }
              //sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
              //if (sFieldType === "FILE" && oField.files.length > 0) {
                  //if (this.technique === 3) {
                      //[> enctype is multipart/form-data <]
                      //for (nFile = 0; nFile < oField.files.length; nFile++) {
                          //oFile = oField.files[nFile];
                          //oSegmReq = new FileReader();
                          //[> (custom properties:) <]
                          //oSegmReq.segmentIdx = this.segments.length;
                          //oSegmReq.owner = this;
                          //[> (end of custom properties) <]
                          //oSegmReq.onload = pushSegment;
                          //this.segments.push("Content-Disposition: form-data; name=\"" + oField.name + "\"; filename=\""+ oFile.name + "\"\r\nContent-Type: " + oFile.type + "\r\n\r\n");
                          //this.status++;
                          //oSegmReq.readAsBinaryString(oFile);
                      //}
                  //} else {
                      //[> enctype is application/x-www-form-urlencoded or text/plain or method is GET: files will not be sent! <]
                      //for (nFile = 0; nFile < oField.files.length; this.segments.push(fFilter(oField.name) + "=" + fFilter(oField.files[nFile++].name)));
                  //}
              //} else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
                  //[> field type is not FILE or is FILE but is empty <]
                  //this.segments.push(
                      //this.technique === 3 ? [> enctype is multipart/form-data <]
                          //"Content-Disposition: form-data; name=\"" + oField.name + "\"\r\n\r\n" + oField.value + "\r\n"
                              //: [> enctype is application/x-www-form-urlencoded or text/plain or method is GET <]
                                  //fFilter(oField.name) + "=" + fFilter(oField.value)
                  //);
              //}
          //}
          //processStatus(this);
      //}

      //return function (oFormElement) {
          //if (!oFormElement.action) { return; }
          //new SubmitRequest(oFormElement);
      //};

  //})();

}

/**
 * FormData objects are not stringifiable objects. If you want to stringify a submitted data, use the previous pure-AJAX example. Note also that, although in this example there are some file <input> fields, when you submit a form through the FormData API you do not need to use the FileReader API also: files are automatically loaded and uploaded.
 */
//function AJAXSubmit (oFormElement) {
    //if (!oFormElement.action) { return; }
    //var oReq = new XMLHttpRequest();
    //oReq.onload = ajaxSuccess;
    //if (oFormElement.method.toLowerCase() === "post") {
        //oReq.open("post", oFormElement.action);
        //oReq.send(new FormData(oFormElement));
    //} else {
        //var oField, sFieldType, nFile, sSearch = "";
        //for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
            //oField = oFormElement.elements[nItem];
            //if (!oField.hasAttribute("name")) { continue; }
            //sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
            //if (sFieldType === "FILE") {
                //for (nFile = 0; nFile < oField.files.length; sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
            //} else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
                //sSearch += "&" + escape(oField.name) + "=" + escape(oField.value);
            //}
        //}
        //oReq.open("get", oFormElement.action.replace(/(?:\?.*)?$/, sSearch.replace(/^&/, "?")), true);
        //oReq.send(null);
    //}
//}






//function getHeaderTime () {
    //console.log(this.getResponseHeader("Last-Modified"));  [> A valid GMTString date or null <]
//}

//var oReq = new XMLHttpRequest();
//oReq.open("HEAD" [> use HEAD if you only need the headers! <], "yourpage.html");
//oReq.onload = getHeaderTime;
//oReq.send();o




//function getHeaderTime () {

    //var nLastVisit = parseFloat(window.localStorage.getItem('lm_' + this.filepath));
    //var nLastModif = Date.parse(this.getResponseHeader("Last-Modified"));

    //if (isNaN(nLastVisit) || nLastModif > nLastVisit) {
        //window.localStorage.setItem('lm_' + this.filepath, Date.now());
        //isFinite(nLastVisit) && this.callback(nLastModif, nLastVisit);
    //}

//}

//function ifHasChanged(sURL, fCallback) {
    //var oReq = new XMLHttpRequest();
    //oReq.open("HEAD" [> use HEAD - we only need the headers! <], sURL);
    //oReq.callback = fCallback;
    //oReq.filepath = sURL;
    //oReq.onload = getHeaderTime;
    //oReq.send();
//}


//ifHasChanged("yourpage.html", function (nModif, nVisit) {
    //console.log("The page '" + this.filepath + "' has been changed on " + (new Date(nModif)).toLocaleString() + "!");
//});





////cache busting, add time
//var oReq = new XMLHttpRequest();

//oReq.open("GET", url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime());
//oReq.send(null);
