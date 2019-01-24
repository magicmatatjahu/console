import React from 'react';
import { 
    ActionBar,
    ActionBarBack,
    ActionBarHeader,
    ActionBarActions,
} from './styled'

export default ({ goBack, title, description, children }) => (
    <ActionBar>
      {typeof goBack === "function" && <ActionBarBack onClick={goBack}/>}
      <ActionBarHeader title={title} description={description} />
      <ActionBarActions>
        {children}
      </ActionBarActions>
    </ActionBar>
);
