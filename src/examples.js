export const mockExamplesList = [
  // System Alpha
  { 
    id: 'alpha-at-rest-1', 
    system: 'System Alpha',
    stateKey: 'atRest', 
    groupId: '1. At Rest', 
    title: 'Alpha At Rest Case 1', 
    body: `System Alpha at rest demonstrates a highly stable baseline with minimal noise. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    pipeline: null 
  },
  { 
    id: 'alpha-in-domain-1', 
    system: 'System Alpha',
    stateKey: 'inDomain', 
    groupId: '2. In-Domain', 
    title: 'Alpha In-Domain Case 1', 
    body: `During in-domain operations, Alpha maintains robust predictive capacity. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
  },
  { 
    id: 'alpha-in-domain-2', 
    system: 'System Alpha',
    stateKey: 'inDomain', 
    groupId: '2. In-Domain', 
    title: 'Alpha In-Domain Case 2', 
    body: `Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.` 
  },
  { 
    id: 'alpha-out-of-domain-1', 
    system: 'System Alpha',
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Alpha Out-of-Domain Case 1', 
    body: `When exposed to out-of-domain stimuli, Alpha exhibits graceful degradation. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.` 
  },
  { 
    id: 'alpha-out-of-domain-2', 
    system: 'System Alpha',
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Alpha Out-of-Domain Case 2', 
    body: `Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.` 
  },
  { 
    id: 'alpha-out-of-domain-3', 
    system: 'System Alpha',
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Alpha Out-of-Domain Case 3', 
    body: `Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.` 
  },
  { 
    id: 'alpha-black-box-1', 
    system: 'System Alpha',
    stateKey: 'blackBoxModel', 
    groupId: '4. Black Box Model', 
    title: 'Alpha Black-Box Case', 
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`
  },

  // System Beta
  { 
    id: 'beta-at-rest-1', 
    system: 'System Beta',
    stateKey: 'atRest', 
    groupId: '1. At Rest', 
    title: 'Beta At-Rest Case 1', 
    body: `System Beta shows a different resting profile characterized by low-frequency oscillations. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci.` 
  },
  { 
    id: 'beta-in-domain-1', 
    system: 'System Beta',
    stateKey: 'inDomain', 
    groupId: '2. In-Domain', 
    title: 'Beta In-Domain Case 1', 
    body: `Under normal conditions, Beta processes inputs with higher latency but greater precision. Donec eu libero sit amet quam egestas semper.` 
  },
  { 
    id: 'beta-in-domain-2', 
    system: 'System Beta',
    stateKey: 'inDomain', 
    groupId: '2. In-Domain', 
    title: 'Beta In-Domain Case 2', 
    body: `Beta is highly effective within its trained distribution. Curabitur pretium tincidunt lacus.` 
  },
  { 
    id: 'beta-out-of-domain-1', 
    system: 'System Beta',
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Beta Out-of-Domain Case 1', 
    body: `Beta is more susceptible to failure when operating outside its trained domain. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet.` 
  },
  { 
    id: 'beta-out-of-domain-2', 
    system: 'System Beta',
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Beta Out-of-Domain Case 2',
    body: `Out-of-domain inputs cause Beta to exhibit unpredictable oscillations. Pellentesque habitant morbi tristique senectus.` 
  },
  { 
    id: 'beta-out-of-domain-3', 
    system: 'System Beta',
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Beta Out-of-Domain Case 3', 
    body: `Beta experiences severe degradation in the presence of adversarial perturbations.` 
  },
  { 
    id: 'beta-black-box-1', 
    system: 'System Beta',
    stateKey: 'blackBoxModel', 
    groupId: '4. Black Box Model', 
    title: 'Beta Black-Box Case', 
    body: `Analysis of Beta's internal states during black-box evaluation.`
  },

  // System Gamma
  { 
    id: 'gamma-at-rest-1', 
    system: 'System Gamma',
    stateKey: 'atRest', 
    groupId: '1. At Rest', 
    title: 'Gamma At-Rest Case 1', 
    body: `System Gamma exhibits high-frequency low-amplitude noise at rest.` 
  },
  { 
    id: 'gamma-in-domain-1', 
    system: 'System Gamma',
    stateKey: 'inDomain', 
    groupId: '2. In-Domain', 
    title: 'Gamma In-Domain Case 1', 
    body: `System Gamma is highly experimental. In-domain responses are highly non-linear. Duis aute irure dolor in reprehenderit in voluptate velit esse.` 
  },
  { 
    id: 'gamma-in-domain-2', 
    system: 'System Gamma',
    stateKey: 'inDomain', 
    groupId: '2. In-Domain', 
    title: 'Gamma In-Domain Case 2', 
    body: `Gamma processes sequences with remarkable non-linear dynamics.` 
  },
  { 
    id: 'gamma-out-of-domain-1', 
    system: 'System Gamma',
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Gamma Out-of-Domain Case 1', 
    body: `Gamma behaves unpredictably when faced with novel inputs.` 
  },
  { 
    id: 'gamma-out-of-domain-2', 
    system: 'System Gamma',
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Gamma Out-of-Domain Case 2', 
    body: `Significant perturbations lead to Gamma subsystem desynchronization.` 
  },
  { 
    id: 'gamma-out-of-domain-3', 
    system: 'System Gamma',
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Gamma Out-of-Domain Case 3', 
    body: `Extreme outlier events can cause complete state collapse in Gamma.` 
  },
  { 
    id: 'gamma-black-box-1', 
    system: 'System Gamma',
    stateKey: 'blackBoxModel', 
    groupId: '4. Black Box Model', 
    title: 'Gamma Black-Box Case', 
    body: `Opaque analysis of System Gamma reveals unexpected internal manifold structures.` 
  }
];

