import React from 'react';
import { render } from '@testing-library/react';

import CodeTab from './../CodeTab';

describe('Lambda Code Tab', () => {
  it('Render with minimal props', () => {
    const { getByText } = render(
      <CodeTab
        lambda={{
          serviceBindingUsages: [],
          env: [],
        }}
        refetchLambda={() => void 0}
        codeEditorComponent={<p>Code</p>}
        dependenciesComponent={<p>Dependencies</p>}
      />,
    );
    expect(getByText('Code')).toBeInTheDocument();
  });
});
