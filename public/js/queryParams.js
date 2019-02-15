// Get the query strings as an object.
function getQueryParams() {
  let match, result = {}, reg = /[&?]([^=]+)=([^&]+)/g;
  // Match each reg in the queryString (aka search) and add it to the result object.
  while (match = reg.exec(location.search)) { result[match[1]] = match[2]; }
  return result;
}
window.queryObj = getQueryParams();
