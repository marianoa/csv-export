import React from 'react';
import { render } from 'react-dom';
// import { createClient } from 'contentful-management';

import {
  SidebarExtensionSDK,
  init,
  locations,
} from '@contentful/app-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import '@contentful/forma-36-tokens/dist/css/index.css';
import './index.css';

import Sidebar from './components/Sidebar';
import LocalhostWarning from './components/LocalhostWarning';
require('dotenv').config();

if (process.env.NODE_ENV === 'development' && window.self === window.top) {
  // You can remove this if block before deploying your app
  const root = document.getElementById('root');

  render(<LocalhostWarning />, root);
} else {
  init((sdk) => {
    const root = document.getElementById('root');

    // Creating a CMA client allows you to use the contentful-management library
    // within your app. See the contentful-management documentation at https://contentful.github.io/contentful-management.js/contentful-management/latest/
    // to learn what is possible.
    // const cma = createClient(
    //   { apiAdapter: sdk.cmaAdapter },
    //   {
    //     type: 'plain',
    //     defaults: {
    //       environmentId: sdk.ids.environment,
    //       spaceId: sdk.ids.space,
    //     },
    //   }
    // );
    // const cma = createClient({
    //   accessToken: ''
    // })

    // All possible locations for your app
    // Feel free to remove unused locations
    // Dont forget to delete the file too :)
    const ComponentLocationSettings = [
      {
        location: locations.LOCATION_ENTRY_SIDEBAR,
        component: <Sidebar sdk={sdk as SidebarExtensionSDK} />,
      },
    ];

    // Select a component depending on a location in which the app is rendered.
    ComponentLocationSettings.forEach((componentLocationSetting) => {
      if (sdk.location.is(componentLocationSetting.location)) {
        render(componentLocationSetting.component, root);
      }
    });
  });
}
