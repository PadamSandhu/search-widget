import React from 'react';

export const TabContent = ({ children, hidden, ...other }) => {
  return !hidden ? (
    <div role="tabpanel" {...other}>
      {children}
    </div>
  ) : null;
};
