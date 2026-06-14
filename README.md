# The Metrics Archive

The Metrics Archive is an interactive, web-based repository cataloging computational and mathematical metrics used in neuroscience and connectomics. 

This platform serves as an educational reference, breaking down complex analytical tools used to quantify neural activity and network dynamics.

## Contents

The archive explores five core categories of neural metrics:
1. **Spike Trains**: Methods for analyzing action potential timing, regularity, and synchrony (e.g., ISI, KS Test, van Rossum Distance).
2. **Membrane Potential**: Metrics evaluating subthreshold continuous voltage dynamics and discrepancies in computational models.
3. **Information Theory**: Approaches to quantifying uncertainty and information transfer within neural signals (e.g., Entropy, Mutual Information, Transfer Entropy).
4. **Neural Manifolds**: Dimensionality reduction and geometric analysis of neural population activity.
5. **Oscillation Based**: Time-frequency analyses of synchronous activity (e.g., Phase-Locking Value, Power Spectral Density).

Additionally, the archive provides **Empirical Examples**, demonstrating how these metrics perform across distinct physiological states such as *At Rest*, *In-Domain* processing, *Out-of-Domain*, and *Black Box* encounters.

## Technical Stack

This application is built as a Single Page Application (SPA) using:
- Vanilla JavaScript
- Vite
- Tailwind CSS
- KaTeX (Mathematical formatting)
- Three.js (Interactive visualization)

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
