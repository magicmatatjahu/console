import React from 'react';

export function preload(promise: any) {
    return React.lazy(() => promise);
}
