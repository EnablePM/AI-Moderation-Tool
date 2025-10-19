import React from 'react';
import { useStackApp } from '@stackframe/react';

const TestStack = () => {
  const app = useStackApp();
  console.log('Stack app:', app);
  return <div>Testing Stack Context</div>;
};

export default TestStack;
