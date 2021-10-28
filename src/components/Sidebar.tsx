import React, { useState, useEffect } from 'react';
// import { PlainClientAPI } from 'contentful-management';
import { SidebarExtensionSDK } from '@contentful/app-sdk';
import { Button } from '@contentful/forma-36-react-components';
import { fieldsParser } from 'contentful-parsers';
import { createClient } from 'contentful';
import { CSVLink } from 'react-csv';
const jsonexport = require('jsonexport/dist');

interface SidebarProps {
  sdk: SidebarExtensionSDK;
  // cma: PlainClientAPI;
}

const Sidebar = (props: SidebarProps) => {
  useEffect(() => {
    props.sdk.window.startAutoResizer();
  });

  const [ csvData, setCsvData ] = useState<string>('')
  const [fileName, setFileName] = useState<string>('')

  const client = createClient({
    space: props.sdk.ids.space,
    accessToken: `${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
  });

  (async () => {
    const res = await client.getEntries({
      content_type: props.sdk.ids.contentType,
      'sys.id': props.sdk.ids.entry,
      include: 10,
      limit: 1
    })

    const data = fieldsParser(res.items[0])
    setFileName(`${data.__typename} - ${data.id}`)

    const options = {
      verticalOutput: true,
      headerPathString: '.',
      forceTextDelimiter: false,
    }

    jsonexport(data, options, function(err:object, csv:string){
      if (err) return console.error(err);
      setCsvData(csv)
    })
  })();

  return (
    <Button buttonType="muted">
      <CSVLink filename={`${fileName}.csv`} data={csvData} style={{textDecoration: 'none', color: 'inherit'}}>Export entry</CSVLink>
    </Button>
  );
};

export default Sidebar;
