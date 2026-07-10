# The Metrics Archive

> A repository designed specifically for the Brain Emulation Challenge.

## Overview
The Metrics Archive indexes formal mathematical indices, statistical estimators, and empirical performance metrics utilized in computational neuroscience. 

The archive provides an interface to explore distinct experimental states and evaluate the fidelity of simulated neural models against biological ground truth.

---

## Core Features

* **Directory & Formulations:** A comprehensive static register of diagnostic formulas, information-theoretic limits, and multi-scale correlations.
* **Comparative Dashboard:** Practical, dynamic examples of metrics applied across distinct experimental states (e.g., *At Rest*, *In-Domain*, *Out-of-Domain*, *Black-Box*).
* **Diagnostic Pipeline:** A parallel flow evaluation system that visually maps out how a submitted model is evaluated against biological ground truth across five key metric categories, culminating in a final unified synthesis.
* **PDF Report Generation:** Quickly export full evaluation reports directly from the pipeline view.

---

## Metric Categories Evaluated

The archive structures its diagnostic evaluations across five core modalities of computational neuroscience:

### 1. Spike Train
Evaluates the timing, patterning, and relationships of discrete action potentials.
* **Metrics:** Behavioural, Inter-Spike Interval (ISI), Raster plots, Kolmogorov-Smirnov (KS) Test, van Rossum distance, Schreiber similarity, Cross-Correlation, and Multiscale Cross-Correlation.

### 2. Membrane Potential
Analyzes the continuous voltage dynamics of neural membranes.
* **Metrics:** VM Mismatch, Vm Visualization, Peri-Stimulus Time Histogram (PSTH), Post-Synaptic Potential (PSP) Counts, and Granger Causality.

### 3. Information Theory
Quantifies the storage, transmission, and communication of information within neural networks.
* **Metrics:** Entropy, Joint Entropy, Conditional Entropy, Mutual Information, and Transfer Entropy.

### 4. Manifold
Assesses the geometric and topological structures of neural population dynamics in high-dimensional state spaces.
* **Metrics:** Participation Ratio, Procrustes Distance, Subspace Angle, and Tangling.

### 5. Oscillation & Input-Output
Examines rhythmic activity, frequency domains, and the relationships between network inputs and outputs.
* **Metrics:** Phase Locking Value (PLV), Hilbert Spectrum, Inter-Site Time-Frequency Coherence (ISTTC), Inter-Trial Phase Clustering (ITPC), Morlet Wavelet transforms, Phase-Amplitude Coupling (PAC), and Power Spectral Density (PSD).

---

## Technical Architecture

* **Frontend:** Vite + React / Vanilla JS (ESModules)
* **Styling:** Tailwind CSS
* **Typography:** Academic typographic scale utilizing Cormorant, Lora, and Fira Code
* **Icons:** Lucide Icons
* **Deployment:** Configured for automated deployment via GitLab Pages (`.gitlab-ci.yml` included)

---

## Contact & Correspondence

For direct correspondence or inquiries regarding the metrics and methodologies, please reach out via the contact links established in the archive header *(Established 2026)*.