import React, { useEffect } from 'react';
import { PlainClientAPI } from 'contentful-management';
import { SidebarExtensionSDK } from '@contentful/app-sdk';
import { Button } from '@contentful/forma-36-react-components';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
  cma: PlainClientAPI;
}

const Sidebar = (props: SidebarProps) => {
    useEffect(() => {
      props.sdk.window.startAutoResizer();
  });
  
  function exportEntry() {
    console.log('CVS Export button clicked!');
    console.log(props.sdk.parameters.instance)
    
    var fileName;
    
    switch(props.sdk.parameters.instance) {
      case 'entryTitleCsv': 
        fileName = props.sdk.entry.getSys().type;
        break;
      case 'entryIdCsv': 
        fileName = props.sdk.entry.getSys().id;
        break;
      default: fileName = "Bad Filename";
    };

    console.log(fileName);
 }
  
  return <Button buttonType="muted" onClick={() => exportEntry()}>Export entry</Button>
};

export default Sidebar;
