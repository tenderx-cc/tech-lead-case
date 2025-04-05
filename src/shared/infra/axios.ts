import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { interactionsDB } from './interactionsDB';
import { tendersDB } from './tendersDB';

const magellanClient = axios.create();

// We use a mock in the below code to simulate the API calls
// and avoid hitting the real API during development or testing.
const mock = new AxiosMockAdapter(magellanClient, { delayResponse: 1000 });

mock.onGet('/users/me').reply(200, {
  user: {
    id: 1,
    email: 'jean.dupont@test.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    avatarColor: '#FF5733',
    disabledAt: null,
  },
  ignoreInReporting: true,
});

mock.onPost('/tenders/search').reply(config => {
  const { skip, take } = JSON.parse(config.data);

  const filteredTenders = tendersDB
    .filter(t => !interactionsDB.map(i => i.tenderId).includes(t.id))
    .slice(skip, skip + take);
  return [200, { pagination: { skip, take }, results: filteredTenders }];
});

mock.onPost(/tenders\/\d+\/interactions\/decisionStatus/).reply(config => {
  const tenderId = config.url?.split('/')[1];
  interactionsDB.push({
    tenderId: Number(tenderId),
    decisionStatus: JSON.parse(config.data).decisionStatus,
  });

  console.log(`Response. Code ${200}`, tendersDB, tenderId);
  return [200, {}];
});

export { magellanClient };
