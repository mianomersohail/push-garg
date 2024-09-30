import React, { useEffect, useState } from 'react';
import useHttp from '../FetchHook/FetchPost';  // Adjust the path to where you stored your useHttp file
import Navbar from '../Nav/NavList'
const MyComponent = () => {

  return (
    <div>
      
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <Navbar onClick={'handleMainNav'} errormessage={'fetchError'} linkone={'/documentation'} navlinameone={'Documentation'} navlinametwo={'Login'} name={'Mian Omer'} />
    </div>
  );
};

export default MyComponent;

