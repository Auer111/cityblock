
export class Utils{
  constructor(){
    this.createExtensions();
    window.UTILS = this;
  }
  
  loadCss = function(pathname){
    var cssFile = pathname.replace("js", "css");
    var cssId = cssFile.hashCode();
    if (!document.getElementById(cssId))
    {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = cssFile;
        link.media = 'all';
        head.appendChild(link);
    }
  }

  loadHtml (file, onLoad) 
  {
    fetch(file)
    .then(function (response) { return response.text(); })
    .then(function (html) { onLoad(html); })
    .catch(function (err) { console.warn('Something went wrong.', err); });
  }

  getJson (file, onLoad) 
  {
    fetch(file)
    .then(function (response) { return response.text(); })
    .then(function (json) { onLoad(JSON.parse(json)); })
    .catch(function (err) { console.warn('Something went wrong.', err); });
  }  

  createExtensions(){
    String.prototype.hashCode = function() {
      var hash = 0,
        i, chr;
      if (this.length === 0) return hash;
      for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }
  }
}

export default Utils;
