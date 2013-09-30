function ResourceInfo(resource) {
  this.connectStart = resource.connectStart;
  this.connectEnd = resource.connectEnd;
  this.domainLookupStart = resource.domainLookupStart;
  this.domainLookupEnd = resource.domainLookupEnd;
  this.duration = resource.duration;
  this.entryType = resource.entryType;
  this.fetchStart = resource.fetchStart;
  this.initiatorType = resource.initiatorType;
  this.name = resource.name;
  this.redirectStart = resource.redirectStart;
  this.redirectEnd = resource.redirectEnd;
  this.requestStart = resource.requestStart;
  this.responseStart = resource.responseStart;
  this.responseEnd = resource.responseEnd;  
  this.secureConnectionStart = resource.secureConnectionStart;
  this.startTime = resource.startTime;
	
  this.summary = function() {
    ret = 'name : ' + this.name + ', duration : ' + this.duration;
	return ret;
  }
}

function PageInfo(page) {
  this.navigationStart = page.navigationStart;
  this.connectStart = page.connectStart;
  this.connectEnd = page.connectEnd;
  this.domainLookupStart = page.domainLookupStart;
  this.domainLookupEnd = page.domainLookupEnd;
  this.fetchStart = page.fetchStart;
  this.redirectStart = page.redirectStart;
  this.redirectEnd = page.redirectEnd;
  this.requestStart = page.requestStart;
  this.responseStart = page.responseStart;
  this.responseEnd = page.responseEnd;
  this.secureConnectionStart = page.secureConnectionStart;
  this.unloadEventStart = page.unloadEventStart;
  this.unloadEventEnd = page.unloadEventEnd;
  this.domLoading = page.domLoading;
  this.domInteractive = page.domInteractive;
  this.domContentLoadedEventStart = page.domContentLoadedEventStart;
  this.domContentLoadedEventEnd = page.domContentLoadedEventEnd;
  this.domComplete = page.domComplete;
  this.loadEventStart = page.loadEventStart;
  this.loadEventEnd = page.loadEventEnd;
    	
  this.summary = function() {
    ret = 'domainLookupStart : ' + this.domainLookupStart + ', domainLookupEnd : ' + this.domainLookupEnd;
	return ret;
  }
}

function loaded() {
  /* 
  headline = document.getElementById("mainbody")
  headline.innerHTML  = "<h3>Resources loaded.</h3>"
  
  body = document.getElementById("mainbody")
  image = document.getElementById("image")
  body.removeChild(image)
  */

  document.write('<h3>Resource loaded.</h3>');  
  
  pageInfo = new PageInfo(window.performance.timing);
  document.write('<h3>Page loading summary</h3>');
  document.write(pageInfo.summary());
  
  items = window.performance.getEntriesByType('resource');
  for (i = 0; i < items.length; i++) {
    resourceInfo = new ResourceInfo(items[i]);
	document.write('<h3>Resource loading summary</h3>');
	document.write(resourceInfo.summary());
  }
}