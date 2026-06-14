const defaultPaper = [{ title: "[Placeholder] Foundational Literature & Review on Metric Application", url: "#" }];

export const metricsData = [
  {
    id: "spike-train",
    title: "1. Spike Train",
    metrics: [
      {
        id: "st-behavioral",
        name: "Behavioral",
        description: "Relates spike train timings and firing characteristics to specific behavioral epochs or events.",
        mathematics: "R_{behavior}(t) = \\int \\lambda(t) b(t) dt",
        papers: [
          { 
            title: "Truccolo et al., 2005 - A point process framework for relating neural spiking activity to spikes, predecessors, and extrinsic covariates", 
            url: "https://doi.org/10.1152/jn.00697.2004" 
          }
        ]
      },
      {
        id: "st-isi",
        name: "Inter-Spike Interval (ISI)",
        description: "Measures the time elapsed between consecutive action potentials, providing insight into the temporal structure and regularity of firing.",
        mathematics: "ISI_i = t_{i} - t_{i-1}",
        papers: [
          { 
            title: "Softky & Koch, 1993 - The highly irregular firing of cortical cells is inconsistent with temporal integration", 
            url: "https://doi.org/10.1523/JNEUROSCI.13-01-00034.1993" 
          }
        ]
      },
      {
        id: "st-raster",
        name: "Raster Plot",
        description: "A standard temporal visualization of neural spiking activity where each action potential is aligned across time and trials.",
        mathematics: "n(t) = \\sum_{k=1}^K \\delta(t - t_k)",
        papers: [
          { 
            title: "Bair & Koch, 1996 - Temporal precision of cortical spike trains", 
            url: "https://doi.org/10.1523/JNEUROSCI.16-04-01268.1996" 
          }
        ]
      },
      {
        id: "st-ks-test",
        name: "KS Test (Kolmogorov-Smirnov)",
        description: "A nonparametric test applied to compare the empirical distribution of spike trains (e.g., ISI distributions) against theoretical or reference distributions.",
        mathematics: "D_n = \\sup_x |F_n(x) - F(x)|",
        papers: [
          { 
            title: "Brown et al., 2002 - The time-rescaling theorem and its application to neural spike train data analysis", 
            url: "https://doi.org/10.1162/08997660252741149" 
          }
        ]
      },
      {
        id: "st-van-rossum",
        name: "van Rossum Distance",
        description: "A metric space for spike trains calculated by filtering the spike train with an exponential kernel and computing the Euclidean distance between the resulting traces.",
        mathematics: "D^2(t_c) = \\frac{1}{\\tau_{c}} \\int [f(t) - g(t)]^2 dt",
        papers: [
          { 
            title: "van Rossum, 2001 - A novel spike train distance", 
            url: "https://doi.org/10.1162/089976601300014321" 
          }
        ]
      },
      {
        id: "st-schreiber",
        name: "Schreiber Similarity",
        description: "A correlation-based measure of reliability or similarity between two spike trains that have been convolved with a Gaussian filter.",
        mathematics: "R_{12} = \\frac{\\vec{v}_1 \\cdot \\vec{v}_2}{|\\vec{v}_1| |\\vec{v}_2|}",
        papers:[
          { 
            title: "Schreiber et al., 2003 - A new measure for spike train synchrony", 
            url: "https://doi.org/10.1016/S0896-6273(03)00032-X" 
          }
        ]
      },
      {
        id: "st-cross-correlation",
        name: "Cross-Correlation",
        description: "Measures the frequency at which one neuron fires relative to the firing time of a reference neuron, a hallmark of inferred functional connectivity.",
        mathematics: "C(\\tau) = \\int x(t) y(t+\\tau) dt",
        papers: [
          { 
            title: "Perkel, Gerstein, & Moore, 1967 - Neuronal spike trains and stochastic processes. II. Simultaneous spike trains", 
            url: "https://doi.org/10.1016/S0006-3495(67)86254-4" 
          }
        ]
      },
      {
        id: "st-multiscale-cross-correlation",
        name: "Multiscale Cross-Correlation",
        description: "Evaluates cross-correlation across different temporal scales and bin widths. This distinguishes precise synchronous spiking from slower rate covariations.",
        mathematics: "C_s(\\tau) = \\int (x(t) * h_s) \\cdot (y(t+\\tau) * h_s) dt",
        papers: [
          { 
            title: "Perkel, Gerstein, & Moore, 1967 - Neuronal spike trains and stochastic processes. II. Simultaneous spike trains", 
            url: "https://doi.org/10.1016/S0006-3495(67)86254-4" 
          }
        ]
      }
    ]
  },
  {
    id: "membrane-potential",
    title: "2. Membrane Potential",
    metrics: [
      {
        id: "mp-vm-mismatch",
        name: "Vm Mismatch",
        description: "Quantifies the discrepancy or error between a model's predicted membrane potential and empirically recorded biological Vm traces.",
        mathematics: "E = \\frac{1}{T} \\int (V_{model}(t) - V_{data}(t))^2 dt",
        papers: [
          { 
            title: "Jolivet et al., 2008 - Predicting spike timing of neocortical pyramidal neurons via quantitative models (Quantitative Single-Neuron Modeling Benchmark)", 
            url: "https://doi.org/10.1007/s00422-008-0261-x" 
          }
        ]
      },
      {
        id: "mp-vm-visualization",
        name: "Vm Visualization",
        description: "Tools and metrics for evaluating the subthreshold continuous voltage dynamics, capturing distinct hyperpolarizations and subthreshold oscillations.",
        mathematics: "V_{sub}(t) = V(t) \\text{ for } V(t) < V_{thresh}",
        papers: [
          { 
            title: "Yu & Ferster, 2010 - Membrane potential synchrony in primary visual cortex depends on spatial frequency of the visual stimulus", 
            url: "https://doi.org/10.1016/j.neuron.2010.11.027" 
          }
        ]
      },
      {
        id: "mp-psth",
        name: "PSTH (Peri-Stimulus Time Histogram)",
        description: "Derived to evaluate the trial-averaged membrane potential response directly phase-locked to a stimulus onset.",
        mathematics: "PSTH(t) = \\frac{1}{N \\Delta t} \\sum_{i=1}^N n_i(t, t+\\Delta t)",
        papers: [
          { 
            title: "Gerstner & Kistler, 2002 - Spiking Neuron Models: Single Neurons, Populations, Plasticity (Section 1.4: Population Activity and PSTH)", 
            url: "https://doi.org/10.1017/CBO9780511815706" 
          }
        ]
      },
      {
        id: "mp-psp-counts",
        name: "PSP Counts",
        description: "Detects and enumerates discrete Post-Synaptic Potentials (excitatory or inhibitory) driving the overarching Vm fluctuations.",
        mathematics: "N_{PSP} = \\sum_{k} \\mathbb{I}(V(t_k) > V_{baseline} + \\theta)",
        papers: [
          { 
            title: "Richardson & Gerstner, 2005 - Synaptic shot noise and membrane potential fluctuations for background synaptic input", 
            url: "https://doi.org/10.1152/jn.01065.2004" 
          }
        ]
      },
      {
        id: "mp-granger",
        name: "Granger Causality",
        description: "A statistical hypothesis test applied to subthreshold membrane potentials to determine directed functional connections between neurons.",
        mathematics: "F_{Y \\to X} = \\ln \\left( \\frac{\\Sigma_{X|X^-}}{\\Sigma_{X|X^-, Y^-}} \\right)",
        papers: [
          { 
            title: "Granger, 1969 - Investigating causal relations by econometric models and cross-spectral methods", 
            url: "https://doi.org/10.2307/1912791" 
          }
        ]
      }
    ]
  },
  {
    id: "information-theory",
    title: "3. Information Theory",
    metrics: [
      {
        id: "it-entropy",
        name: "Entropy",
        description: "Measures the uncertainty, or average information content, within a neural signal or response distribution.",
        mathematics: "H(X) = -\\sum p(x) \\log_2 p(x)",
        papers: [
          {
            title: "Schreiber, T. (2000) - Measuring information transfer.",
            url:"https://doi.org/10.1103/PHYSREVLETT.85.461"
          }
        ]
      },
      {
        id: "it-joint-entropy",
        name: "Joint Entropy",
        description: "Calculates the total uncertainty contained across multiple random variables, such as simultaneous multicellular recordings.",
        mathematics: "H(X,Y) = -\\sum_{x,y} p(x,y) \\log_2 p(x,y)",
        papers: [
          {
            title: "Schreiber, T. (2000) - Measuring information transfer.",
            url:"https://doi.org/10.1103/PHYSREVLETT.85.461"
          }
        ]
      },
      {
        id: "it-conditional-entropy",
        name: "Conditional Entropy",
        description: "Quantifies the amount of uncertainty remaining about one variable given that the outcome of another variable is known.",
        mathematics: "H(Y|X) = \\sum_{x} p(x) H(Y|X=x)",
        papers: [
          {
            title: "Schreiber, T. (2000) - Measuring information transfer.",
            url:"https://doi.org/10.1103/PHYSREVLETT.85.461"
          }
        ]
      },
      {
        id: "it-mutual-information",
        name: "Mutual Information",
        description: "Calculates how much information is shared between variables, typically measuring how much information a neural response conveys about a given stimulus.",
        mathematics: "I(X;Y) = \\sum_{x,y} p(x,y) \\log_2 \\frac{p(x,y)}{p(x)p(y)}",
        papers: [
          {
            title: "Schreiber, T. (2000) - Measuring information transfer.",
            url:"https://doi.org/10.1103/PHYSREVLETT.85.461"
          }
        ]
      },
      {
        id: "it-transfer-entropy",
        name: "Transfer Entropy",
        description: "A model-free, information-theoretic measure for detecting directed (time-asymmetric) transfer of information between time-series processes.",
        mathematics: "T_{X\\to Y} = \\sum p(y_{t}, y_{t-1}, x_{t-1}) \\log_2 \\frac{p(y_t | y_{t-1}, x_{t-1})}{p(y_t | y_{t-1})}",
        papers: [
          {title: "Vicente, R., Wibral, M., Lindner, M., & Pipa, G. (2011) - Transfer entropy--a model-free measure of effective connectivity for the neurosciences.", url: 
          "https://doi.org/10.1007/s10827-010-0262-3"}
        ]
      }
    ]
  },
  {
    id: "neural-manifolds",
    title: "4. Neural Manifolds",
    metrics: [
      {
        id: "dimensionality",
        name: "Participation Ratio (Dimensionality)",
        description: "An estimate of the effective dimensionality of the neural population activity. It measures how many dominant patterns of covariation exist across the recorded units.",
        mathematics: "PR = \\frac{(\\sum \\lambda_i)^2}{\\sum \\lambda_i^2}",
        papers: [
          {
            title: "Mazzucato et al., 2016 - The internal dynamics of somatosensory cortex during tactile discrimination",
            url: "https://doi.org/10.1016/j.neuron.2016.01.017"
          },
          {
            title: "Gao et al., 2017 - Theory and methods for characterization of high-dimensional neural population activity",
            url: "https://doi.org/10.1016/j.bpc.2017.05.009"
          }
        ]
      },
      {
        id: "procrustes-distance",
        name: "Procrustes Distance",
        description: "A measure used to compare two shapes or point clouds (e.g., neural population states across different conditions or times) by finding the optimal translation, rotation, and uniform scaling to align them.",
        mathematics: "d(X, Y) = \\inf_{R, s, t} || X - sYR - t ||_F",
        papers: []
      },
      {
        id: "subspace-angle",
        name: "Subspace Angle",
        description: "Measures the geometric similarity between two neural subspaces spanned by population activity, useful for determining if the same computation is occurring in different conditions.",
        mathematics: "\\cos(\\theta_k) = \\max_{u \\in U, v \\in V} u^T v",
        papers: []
      },
      {
        id: "tangling",
        name: "Tangling",
        description: "Quantifies how much a neural trajectory crosses itself or nearby trajectories, indicating the potential for robust motor or cognitive control (lower tangling implies more robust predictions).",
        mathematics: "Q(t) = \\max_{t'} \\frac{||\\dot{x}(t) - \\dot{x}(t')||^2}{||x(t) - x(t')||^2 + \\epsilon}",
        papers: []
      }
    ]
  },
  {
    id: "oscillation-based",
    title: "5. Oscillation Based",
    metrics: [
      {
        id: "phase-locking-value",
        name: "Phase-Locking Value (PLV)",
        description: "A statistic that investigates task-induced changes in long-range synchronization of neural activity. It measures the phase synchrony between two signals across trials.",
        mathematics: "PLV = \\frac{1}{N} \\left| \\sum_{n=1}^N e^{i(\\phi_1(t,n) - \\phi_2(t,n))} \\right|",
        papers: [
          {
            title: "Lachaux et al., 1999 - Measuring phase synchrony in brain signals",
            url: "https://doi.org/10.1002/(SICI)1097-0193(1999)8:4<194::AID-HBM4>3.0.CO;2-C"
          }
        ]
      },
      {
        id: "hilbert-spectrum",
        name: "Hilbert Spectrum",
        description: "Represents the amplitude and instantaneous frequency of a signal as functions of time, using the Hilbert-Huang Transform.",
        mathematics: "H(\\omega, t) = \\operatorname{Re} \\sum_{j=1}^n a_j(t) e^{i \\int \\omega_j(t) dt}",
        papers: []
      },
      {
        id: "isttc",
        name: "ISTTC",
        description: "Inter-Subject Trial-to-Trial Correlation (ISTTC). An analysis metric for identifying shared neural responses across multiple subjects performing the same task.",
        mathematics: "\\text{ISTTC} = \\frac{1}{N_{pairs}} \\sum_{i \\ne j} \\operatorname{corr}(X_i(t), X_j(t))",
        papers: []
      },
      {
        id: "itpc",
        name: "ITPC",
        description: "Inter-Trial Phase Clustering (ITPC). Measures the consistency of the oscillatory phase across multiple trials of an experiment at a specific time and frequency.",
        mathematics: "ITPC(t, f) = \\left| \\frac{1}{N} \\sum_{n=1}^N e^{i \\phi_n(t, f)} \\right|",
        papers: []
      },
      {
        id: "morlet-wavelet",
        name: "Morlet Wavelet",
        description: "A method for time-frequency analysis utilizing complex Morlet wavelets to extract power and phase information from non-stationary neural signals.",
        mathematics: "\\Psi(t) = \\frac{1}{\\sqrt{\\pi f_b}} e^{i 2 \\pi f_c t} e^{-t^2 / f_b}",
        papers: []
      },
      {
        id: "pac",
        name: "PAC",
        description: "Phase-Amplitude Coupling (PAC). Quantifies the coupling between the phase of a low-frequency oscillation and the amplitude of a high-frequency oscillation.",
        mathematics: "MI = \\frac{H_{max} - H(P)}{H_{max}}",
        papers: []
      },
      {
        id: "psd",
        name: "PSD",
        description: "Power Spectral Density (PSD). Describes how the power of a time-series signal or neural recording is distributed over frequency components.",
        mathematics: "S_{xx}(f) = \\lim_{T \\to \\infty} \\mathbf{E}\\left[ \\frac{1}{2T} \\left| \\int_{-T}^T x(t)e^{-i 2\\pi ft} dt \\right|^2 \\right]",
        papers: []
      }
    ]
  }
];

export const examplesData = [
  {
    id: "at-rest",
    title: "1. At Rest",
    description: "Analysis of the metrics when the neural population is at rest",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  },
  {
    id: "in-domain",
    title: "2. In-Domain",
    description: "Metric evaluations when the network is engaged in its trained or stereotyped domain task.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  },
  {
    id: "out-of-domain",
    title: "3. Out-of-Domain",
    description: "Observations of metric breakdowns when the system encounters novel, unpredicted stimuli.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  },
  {
    id: "black-box-model",
    title: "4. Black Box Model",
    description: "Observations of the metrics when a completely different network is compared against the groundtruth network.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  }
];

const defaultStateDiff = {
  atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  blackBoxModel: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
};

export const metricStateDifferences = {
  "st-behavioral": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "st-isi": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "st-raster": defaultStateDiff,
  "st-ks-test": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "st-van-rossum": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "st-schreiber": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "st-cross-correlation": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "st-multiscale-cross-correlation": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "mp-vm-mismatch": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "mp-vm-visualization": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "mp-psth": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "mp-psp-counts": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "mp-granger": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "it-entropy": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "it-joint-entropy": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "it-conditional-entropy": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "it-mutual-information": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "it-transfer-entropy": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "dimensionality": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  "phase-locking-value": {
    atRest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    inDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outOfDomain: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
};
