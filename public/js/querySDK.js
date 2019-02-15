/**
 * Turns QueryString sdkHost, brandID into a TOUT SDK embed script
 */

// Get the query strings as an object.
function getQueryParams() {
  var match;
  var result = {};
  var reg = /[&?]([^=]+)=([^&]+)/g;
  // Match each reg in the queryString (aka search) and add it to the result object.
  while (match = reg.exec(location.search)) { result[match[1]] = match[2]; }
  return result;
}
const query = getQueryParams();

// Validate for known settings
if (!query.sdkHost) {
  throw new Error('Unknown sdkHost "'+ query.sdkHost +'"')
}
if (!query.brandID) {
  throw new Error('Unknown brandID "'+ query.brandID +'"');
}


//
// Embed Code
// Set brandUid
window.TOUT ={
  sdkHost: query.sdkHost,
  brandUid: query.brandID,
};
// Load the JS-SDK
const sdkScript = document.createElement('script');
sdkScript.src = '//' + query.sdkHost + '/sdk/v2/loader.js';
sdkScript.async = true;
document.head.appendChild(sdkScript);
