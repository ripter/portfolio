/*
 * Old School, everything is loaded via script tags in index.html.
 * State of the Application
 */


// whenever the state changes, update the elements
document.addEventListener('stateChange', function(event) {
  const { environments, brandIDs, sdkHost, brandID, customURLOverrides } = event.detail;
  const elPickEnv = document.getElementById('pickEnv');
  const elPickBrandID = document.getElementById('pickBrandID');
  const elCustomBookmarklet = document.getElementById('jsonOverrideBookmarklet');
  const elJsonOverrideEditor = document.getElementById('jsonOverrideEditor');
  const elLinks = document.querySelectorAll('link-sdk');

  // Update all of the elements that use state
  elPickEnv.selected = sdkHost;
  elPickEnv.list = environments.map((item) => {
    return {title: item.title, value: item.sdkHost};
  });

  elPickBrandID.selected = brandID;
  elPickBrandID.list = brandIDs.map((item) => {
    return {title: item, value: item};
  });

  console.log('customURLOverrides', customURLOverrides);
  elCustomBookmarklet.json = customURLOverrides;
  elJsonOverrideEditor.json = customURLOverrides;

  elLinks.forEach((elm) => {
    elm.sdkHost = sdkHost;
    elm.brandID = brandID;
  });
});


//
// Change Events
// AKA Actions
//

/**
 * Update the environment in the state.
 */
document.addEventListener('updateEnv', function(event) {
  const { selectedValue } = event.detail;
  window.gastly.sdkHost = selectedValue;
});

/**
 * Update the brandID in the state.
 */
document.addEventListener('updateBrandID', function(event) {
  const { selectedValue } = event.detail;
  window.gastly.brandID = selectedValue;
});

document.addEventListener('syncOverrideBookmarklet', function(event) {
  const { json } = event.detail;
  console.log('syncOverrideBookmarklet', json);
  window.gastly.customURLOverrides = json;
});





//
// Start the Application
//
// update the xip.io env's sdkHost
findIP.then(function(ip) {
  const port = location.port;

  // use the IP to add an XIP.IO environment
  window.ENVS.push({
    title: 'xip.io',
    sdkHost: `${ip}.xip.io:${port}`,
    brandIDs: ['af660e', '111111'],
  });

  // Create the application and start it.
  window.gastly = new window.Store(window.ENVS);
}).catch(function(err) {
  console.error('Could not get IP address', err);
  // Create the application and start it.
  window.gastly = new window.Store(window.ENVS);
});
