export const mockExamplesList = [
  { 
    id: 'at-rest-0', 
    stateKey: 'atRest', 
    groupId: '1. At Rest', 
    title: 'Placeholder Example 1', 
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    
Here you can type as many paragraphs as you like using template literals.`,
    pipeline: null // Optional: provide a custom pipeline object here
  },
  { 
    id: 'in-domain-0', 
    stateKey: 'inDomain', 
    groupId: '2. In-Domain', 
    title: 'Placeholder Example 1', 
    body: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.`
  },
  { 
    id: 'in-domain-1', 
    stateKey: 'inDomain', 
    groupId: '2. In-Domain', 
    title: 'Placeholder Example 2', 
    body: `Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.` 
  },
  { 
    id: 'out-of-domain-0', 
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Placeholder Example 1', 
    body: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet.` 
  },
  { 
    id: 'out-of-domain-1', 
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Placeholder Example 2', 
    body: `Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper.` 
  },
  { 
    id: 'out-of-domain-2', 
    stateKey: 'outOfDomain', 
    groupId: '3. Out-of-Domain', 
    title: 'Placeholder Example 3', 
    body: `Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.` 
  },
  { 
    id: 'black-box-model-0', 
    stateKey: 'blackBoxModel', 
    groupId: '4. Black Box Model', 
    title: 'Placeholder Example 1', 
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    
Another multiline text field here.`,
    
    // Example of how to build the pipeline content for a specific example:
    /*
    pipeline: {
      columns: [
        {
          steps: [
            { observation: "Specific observation for Spike Train - Behavioural" },
            { observation: "Specific observation for Spike Train - ISI" },
            // ... continue for all steps in the column
          ],
          conclusion: "Specific Spike Train conclusion."
        },
        // ... continue for Membrane Potential, Information Theory, Manifold, Oscillation
      ],
      finalSynthesis: "Specific Final Unified Synthesis for this example."
    }
    */
  }
];
