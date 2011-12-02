// Taken from https://github.com/hackasaurus/webxray/blob/master/static-files/uproot-dialog.html

function DeferredTimeout(ms) {
  var deferred = jQuery.Deferred();
  
  setTimeout(function() { deferred.resolve(); }, ms);
  return deferred;
}

function DeferredPublish(html, originalURL, hackpubURL) {
  var method = 'POST';
  var url = hackpubURL + "publish";
  var data = {
    'html': html,
    'original-url': originalURL
  };
  
  // If we're on MSIE, use their funky way of doing things.
  if (typeof(XDomainRequest) == "function") {
    var deferred = new jQuery.Deferred();
    var req = new XDomainRequest();
    req.open(method.toLowerCase(), url);
    req.onerror = function() {
      deferred.reject();
    };
    req.onload = function() {
      deferred.resolve([JSON.parse(req.responseText)]);
    };
    req.send(jQuery.param(data));
    return deferred;
  }

  return jQuery.ajax({
    type: method,
    url: url,
    data: data,
    crossDomain: true,
    dataType: 'json'
  });
}
