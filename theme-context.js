import React from 'react';

export const ThemeContext = React.createContext({
    t: 'light',
    set: (enabled) => { },
});