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
      }
    ]
  }
];

export const examplesData = [
  {
    id: "at-rest",
    title: "1. At Rest",
    description: "Analysis of the metrics when the neural population is at rest (spontaneous activity without explicit external task demands).",
    content: "During periods of rest, we typically observe irregular spiking. The subthreshold membrane potential variance is dominated by balanced excitatory and inhibitory synaptic background noise. The effective dimensionality of the neural manifold is often higher during rest compared to stereotyped task execution, reflecting unconstrained exploration of the state space."
  },
  {
    id: "in-domain",
    title: "2. In-Domain",
    description: "Metric evaluations when the network is engaged in its trained or stereotyped domain task.",
    content: "When engaged in an in-domain task, the mutual information between the stimulus and the population response peaks. The neural manifold collapses into a lower-dimensional subspace required for the specific task dynamics. Phase-locking values increase between relevant specialized areas, orchestrating reliable and swift reaction times."
  },
  {
    id: "out-of-domain",
    title: "3. Out-of-Domain",
    description: "Observations of metric breakdowns when the system encounters novel, unpredicted stimuli.",
    content: "In out-of-domain scenarios, we observe high ISI C_V as the network searches for appropriate responses. Mutual information regarding the unpredicted features remains low. The neural dimensionality expands slightly as previously silent nodes attempt to construct new representations, often accompanied by desynchronization (decreased PLV) in typical functional hubs."
  }
];

const defaultStateDiff = {
  atRest: "Baseline spontaneous activity, largely decoupled from external environmental features.",
  inDomain: "Highly structured and reliable activity corresponding directly to learned functional features.",
  outOfDomain: "Erratic or uncalibrated variance reflecting processing of novel and unpredictable stimuli."
};

export const metricStateDifferences = {
  "st-behavioral": {
    atRest: "Spike timings show no distinct correlation to external behavioral events.",
    inDomain: "Sharp tuning curves lock spiking patterns tightly to task-relevant behavioral epochs.",
    outOfDomain: "Spurious spiking decoupled from coherent external task structure."
  },
  "st-isi": {
    atRest: "Broad, near-exponential distribution indicative of Poisson-like spontaneous background spiking.",
    inDomain: "Narrow, highly peaked distribution reflecting reliable, task-locked firing rates.",
    outOfDomain: "High variance and irregular intervals lacking a consistent temporal structure."
  },
  "st-raster": defaultStateDiff,
  "st-ks-test": {
    atRest: "Empirical distributions closely match a homogeneous Poisson reference.",
    inDomain: "Distributions diverge significantly from baseline noise models, reflecting deterministic signal.",
    outOfDomain: "Mixed distributions showing partial adherence to background noise models."
  },
  "st-van-rossum": defaultStateDiff,
  "st-schreiber": {
    atRest: "Low cross-trial similarity due to spontaneous noise fluctuations.",
    inDomain: "High structural similarity (R approaches 1) indicating highly reliable spike timing across trials.",
    outOfDomain: "Dropping similarity indices indicating breakdown of response stereotypy."
  },
  "st-cross-correlation": defaultStateDiff,
  "st-multiscale-cross-correlation": defaultStateDiff,
  "mp-vm-mismatch": defaultStateDiff,
  "mp-vm-visualization": defaultStateDiff,
  "mp-psth": {
    atRest: "Flat trace; no significant sustained depolarizations.",
    inDomain: "Sharp, stereotyped transient depolarizations locked accurately to stimulus features.",
    outOfDomain: "Delayed, wider, or highly variable transient depolarizations."
  },
  "mp-psp-counts": {
    atRest: "Steady, balanced rate of background EPSPs and IPSPs.",
    inDomain: "Targeted volleys of EPSPs immediately followed by governing IPSPs.",
    outOfDomain: "Unbalanced barrages or failures of timely inhibitory recruitment."
  },
  "mp-granger": defaultStateDiff,
  "it-entropy": {
    atRest: "High entropy due to a diverse repertoire of active background states.",
    inDomain: "Slightly reduced entropy focusing on a subset of reliable response patterns.",
    outOfDomain: "Increases marginally as network attempts unguided search strategies."
  },
  "it-joint-entropy": defaultStateDiff,
  "it-conditional-entropy": defaultStateDiff,
  "it-mutual-information": {
    atRest: "Near zero; uncoupled to specific stimuli.",
    inDomain: "Peaks sharply, indicating optimal precision encoding of the known stimulus.",
    outOfDomain: "Remains relatively low; novelty attributes aren't robustly encoded."
  },
  "it-transfer-entropy": {
    atRest: "Low directed flow of information between regions.",
    inDomain: "Strong directed flow along established task-relevant pathways.",
    outOfDomain: "Breakdown of typical feedforward pathways; increased unordered feedback."
  },
  "dimensionality": {
    atRest: "High dimensionality; network explores a large portion of state space.",
    inDomain: "Collapses to a low-dimensional manifold necessary for the specific computation.",
    outOfDomain: "Expands as the system struggles to find a compact structural representation."
  },
  "phase-locking-value": {
    atRest: "Baseline low-frequency synchronization across broad networks.",
    inDomain: "Strong task-induced synchronization (e.g., Gamma band) between specific hubs.",
    outOfDomain: "Desynchronization; typical task-related synchronous assemblies break down."
  }
};
