import { createContext } from 'react';

export const reactNavigationStackState = {
  stackNavigationIsDisplay: false, // use to hide header from UI
}

const reactNavigationContext = createContext(reactNavigationStackState);

export default reactNavigationContext;
