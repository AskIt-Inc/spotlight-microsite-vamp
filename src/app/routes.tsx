import { createHashRouter } from 'react-router';
import { SpotlightLayout } from './components/SpotlightLayout';
import { SpotlightPageCOH } from './pages/SpotlightPageCOH';

export const router = createHashRouter([
  {
    path: '/',
    Component: SpotlightLayout,
    children: [{ index: true, Component: SpotlightPageCOH }],
  },
]);
