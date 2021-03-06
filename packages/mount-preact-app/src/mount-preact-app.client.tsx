import {hydrate, h} from 'preact';
import Router from 'preact-router';
import ServerDataContext from '@stencil/server-data-context';
import ClientDataContext from '@stencil/client-data-context';
/** @jsx h */

// const mockData = {
//   headers: {
//     'ver-name': '',
//     Authorization:
//       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTE3NTgyNDAsImlhdCI6MTU5MTY3MTg0MCwic3ViIjoiKzkxOTY4NjY2Mzk3NSIsInVzZXJuYW1lIjoiNTM1MjA4Y2QtYTJhNi00N2M0LWJmYWYtNWVmMGJjMGIwY2RhIn0.0KIJQ1ogUn5uTAZkMUB8ENg00xmZL0ubPUXkzvdXy64',
//     lat: '12.910586639924507',
//     lon: '77.55538417633642',
//     ver: 1045,
//     pt: '9cf23ec2-d83c-4778-aca5-d7fb64ae1b2d',
//   },
// };

// Currently adding Header directly instead of detecting based on route match and showHeader flag, because not able to
// find any match route util from preact-router exposed
const App = ({routes, initialState, headers}) => {
  return (
    <ServerDataContext.Provider value={initialState}>
      <ClientDataContext.Provider value={headers}>
        <Router>
          {/* regex match and then store if header */}
          {routes.map(route => {
            const {path, component: Comp, showHeader} = route;
            return <Comp path={path} />;
          })}
        </Router>
      </ClientDataContext.Provider>
    </ServerDataContext.Provider>
  );
};

export default function mountReactApp({
  routes,
  initialState = window.__initial_state__,
  headers = {},
}) {
  hydrate(
    <App routes={routes} initialState={initialState} headers={headers} />,
    document.getElementById('root'),
  );
}
