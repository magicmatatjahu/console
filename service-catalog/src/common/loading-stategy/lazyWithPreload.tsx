import React from 'react';

export function lazyWithPreload(factory: any) {
  const Component = React.lazy(factory);
  (Component as any).preload = factory;
  return Component;
}
