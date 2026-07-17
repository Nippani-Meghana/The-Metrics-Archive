import './index.css';
import 'katex/dist/katex.min.css';
import katex from 'katex';
import { createIcons, icons } from 'lucide';
import { metricsData, metricStateDifferences } from './data.js';
import { createConnectomicsBackground } from './ConnectomicsBackground.js';
import pipelineData from './diagnostic-pipeline.json';
import { mockExamplesList } from './examples.js';

const allMetrics = metricsData.flatMap(section => section.metrics);

let state = {
  currentView: 'entry',
  activeSectionId: metricsData[0].id,
  viewMode: 'by-state',
  selectedSystem: mockExamplesList[0].system,
  selectedMetricId: allMetrics[0].id,
  selectedExampleId: mockExamplesList[0].id,
  showMathMap: {},
  showPipeline: false,
  isExampleDropdownOpen: false,
  isMetricDropdownOpen: false,
  isDarkMode: false,
  carouselIndices: {
    '1. At Rest': 0,
    '2. In-Domain': 0,
    '3. Out-of-Domain': 0,
    '4. Black Box Model': 0
  }
};

let bgControls = null;

function renderApp() {
  let appContent = document.getElementById('app-content');
  
  if (state.isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  if (!appContent) {
    const root = document.getElementById('root');
    root.innerHTML = `
      <div class="min-h-screen relative overflow-hidden transition-colors duration-300">
        <div id="bg-container" class="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"></div>
        <div id="app-content" class="relative z-10 w-full h-screen overflow-y-auto"></div>
        <button data-action="toggle-theme" class="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm text-gray-500 dark:text-gray-400 hover:text-[var(--color-heading)] dark:hover:text-[var(--color-heading)] transition-all hover:shadow-md hover:-translate-y-1">
          <i data-lucide="${state.isDarkMode ? 'sun' : 'moon'}" class="w-5 h-5"></i>
        </button>
      </div>
    `;
    appContent = document.getElementById('app-content');
    bgControls = createConnectomicsBackground(document.getElementById('bg-container'));
  } else {
    // Update the floating button icon if it already exists
    const themeBtn = document.querySelector('[data-action="toggle-theme"] i');
    if (themeBtn) {
      themeBtn.setAttribute('data-lucide', state.isDarkMode ? 'sun' : 'moon');
    }
  }

  appContent.innerHTML = `
    ${state.currentView === 'entry' ? renderEntry() : ''}
    ${state.currentView === 'metrics' ? renderMetrics() : ''}
    ${state.currentView === 'examples' ? renderExamples() : ''}
  `;

  bgControls.setIsEntryPage(state.currentView === 'entry');

  document.querySelectorAll('[data-math]').forEach(el => {
    katex.render(el.getAttribute('data-math'), el, { displayMode: true, throwOnError: false });
  });

  createIcons({ icons });
}

function renderEntry() {
  return `
    <div class="min-h-screen flex flex-col w-full px-6 md:px-12 py-8 relative">
      <header class="absolute top-8 left-6 right-6 md:left-12 md:right-12 flex justify-between items-start z-20 text-gray-500/80 dark:text-gray-400/80 text-[11px] sm:text-xs tracking-wide" style="font-family: 'Times New Roman', Times, serif;">
        <div>
          <a href="mailto:nmeghana@carboncopies.org" title="nmeghana@carboncopies.org" class="hover:text-gray-900 dark:hover:text-white transition-colors underline decoration-gray-500/30 dark:decoration-gray-400/30 underline-offset-2">Contact Us</a>
        </div>
        <div>
          Established on 2026
        </div>
      </header>
      <!-- Main Content -->
      <main class="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto z-20 pb-12 lg:pb-24">
        <div class="w-full flex flex-col items-center text-center space-y-8 mb-16">
          <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[var(--color-heading)] font-normal leading-tight" style="font-family: var(--font-cormorant), serif;">
            The Metrics Archive
          </h1>
          <p class="text-lg md:text-xl lg:text-2xl text-gray-500 dark:text-gray-400 italic max-w-3xl leading-relaxed" style="font-family: var(--font-lora), serif;">
            A repository indexing formal mathematical indices, statistical estimators, and empirical performance metrics utilized by the Brain Emulation Challenge.
          </p>
        </div>

        <div class="flex flex-col md:flex-row w-full max-w-4xl gap-16 md:gap-8 justify-between">
          <!-- The Metrics Section -->
          <button data-action="navigate-metrics" class="flex-1 flex flex-col items-center text-center group transition-transform hover:-translate-y-1">
            <h2 class="text-3xl md:text-4xl text-[var(--color-heading)] mb-4" style="font-family: var(--font-cormorant), serif;">The Metrics</h2>
            <div class="text-[10px] text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase mb-4 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" style="font-family: var(--font-fira), monospace;">
              Directory & Formulations &rarr;
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xs" style="font-family: var(--font-lora), serif;">
              A collection of formal metrics to evaluate spike trains, membrane dynamics, information theory, manifolds, and oscillations.
            </p>
          </button>

          <!-- The Examples Section -->
          <button data-action="navigate-examples" class="flex-1 flex flex-col items-center text-center group transition-transform hover:-translate-y-1">
            <h2 class="text-3xl md:text-4xl text-[var(--color-heading)] mb-4" style="font-family: var(--font-cormorant), serif;">The Examples</h2>
            <div class="text-[10px] text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase mb-4 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" style="font-family: var(--font-fira), monospace;">
              Dashboard Comparative &rarr;
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xs" style="font-family: var(--font-lora), serif;">
              Practical examples of metrics applied across distinct experimental states.
            </p>
          </button>
        </div>
      </main>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] text-gray-400/80 tracking-widest uppercase bg-gray-50/50 dark:bg-slate-800/50 px-3 py-1.5 rounded border border-gray-100/50 dark:border-slate-700/50 z-20" style="font-family: var(--font-fira), monospace">
        Press 'C'
      </div>
    </div>
  `;
}

function renderMetrics() {
  const section = metricsData.find(s => s.id === state.activeSectionId);
  return `
    <div class="relative min-h-screen z-10 flex">
      <div class="fixed top-8 right-8 z-50 flex gap-6 items-center">
        <button data-action="goto-examples" class="text-[var(--color-heading)] hover:opacity-80 transition-all hover:-translate-y-1 group" title="Go to Examples">
          <i data-lucide="bookmark" class="w-10 h-10 fill-current group-hover:drop-shadow-md"></i>
        </button>
      </div>

      <aside class="w-72 border-r border-gray-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md fixed h-full flex flex-col pt-12 shadow-sm">
        <div class="px-8 pb-8">
          <button data-action="back-entry" class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[var(--color-heading)] transition-colors" style="font-family: var(--font-droid), serif">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Archive
          </button>
        </div>
        <nav class="flex-1 overflow-y-auto w-full px-4">
          <ul class="space-y-2">
            ${metricsData.map(s => `
              <li>
                <button data-action="set-active-section" data-id="${s.id}" class="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${state.activeSectionId === s.id ? 'bg-[var(--color-heading)] text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}" style="font-family: var(--font-lora), serif">
                  ${s.title}
                </button>
              </li>
            `).join('')}
          </ul>
        </nav>
      </aside>

      <main class="ml-72 flex-1 p-16 max-w-4xl">
        <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 class="text-4xl text-[var(--color-heading)] mb-12 border-b border-gray-200 dark:border-slate-800 pb-6" style="font-family: var(--font-lora), serif">${section.title}</h1>
          <div class="space-y-16">
            ${section.metrics.map(metric => renderMetricCard(metric)).join('')}
          </div>
        </div>
      </main>
    </div>
  `;
}

function renderMetricCard(metric) {
  const showMath = state.showMathMap[metric.id];
  return `
    <article class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-all duration-300 hover:shadow-md">
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-2xl text-[var(--color-heading)]" style="font-family: var(--font-lora), serif">${metric.name}</h2>
        ${metric.mathematics ? `
          <button data-action="toggle-math" data-id="${metric.id}" class="text-sm border border-[var(--color-heading)] text-[var(--color-heading)] px-3 py-1.5 rounded-md hover:bg-[var(--color-heading)] hover:text-white transition-colors" style="font-family: var(--font-droid), serif">
            ${showMath ? 'Hide Math' : 'Show Math'}
          </button>
        ` : ''}
      </div>
      <div class="text-lg text-gray-800 dark:text-gray-200 leading-relaxed space-y-6" style="font-family: var(--font-content), serif">
        <p>${metric.description}</p>
        ${metric.mathematics && showMath ? `
          <div class="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg overflow-x-auto text-center border border-gray-100 dark:border-slate-700 my-6 shadow-inner animate-in fade-in slide-in-from-top-2">
            <div data-math="${metric.mathematics.replace(/"/g, '&quot;')}"></div>
          </div>
        ` : ''}
        ${metric.papers && metric.papers.length > 0 ? `
          <div class="pt-4 mt-6 border-t border-gray-100 dark:border-slate-800">
            <h3 class="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 font-sans flex items-center gap-2">
              <i data-lucide="book-open" class="w-4 h-4"></i> Reference Literature
            </h3>
            <ul class="space-y-2">
              ${metric.papers.map(paper => `
                <li><a href="${paper.url}" class="text-[var(--color-heading)] hover:text-black dark:hover:text-white italic transition-colors text-base">${paper.title}</a></li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    </article>
  `;
}

function renderPipelineView(selectedExample) {
  // If the selected example has specific pipeline data provided, use it.
  // Otherwise, fallback to the placeholder lorem ipsum generation.
  const customPipeline = selectedExample?.pipeline;
  const shiftAmount = selectedExample ? selectedExample.title.length + selectedExample.id.length : 0;
  
  const loremIpsums = [
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
     "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
     "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
     "Nisi ut aliquip ex ea commodo consequat.",
     "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
     "Cillum dolore eu fugiat nulla pariatur.",
     "Excepteur sint occaecat cupidatat non proident.",
     "Sunt in culpa qui officia deserunt mollit anim id est laborum."
  ];

  const conclusions = [
     "Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Sagittis purus sit amet volutpat consequat mauris nunc congue.",
     "Nisl condimentum id venenatis a. In nisl nisi scelerisque eu ultrices vitae auctor eu.",
     "Morbi non arcu risus quis varius quam quisque id diam. Faucibus purus in massa tempor nec feugiat nisl pretium.",
     "Tristique senectus et netus et malesuada fames. Ornare quam viverra orci sagittis eu volutpat odio.",
     "Cursus metus aliquam eleifend mi in nulla. Turpis egestas sed tempus urna et pharetra pharetra massa massa."
  ];

  const finalSyntheses = [
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
     "Ac feugiat amet consectetur adipiscing elit pellentesque habitant morbi. Tincidunt eget nullam non nisi est sit amet facilisis magna. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Vitae congue eu consequat ac felis donec et odio.",
     "Velit scelerisque in dictum non consectetur a. Purus gravida quis blandit turpis cursus. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Adipiscing commodo elit at imperdiet dui accumsan sit."
  ];

  const getObservation = (cIdx, sIdx) => {
    if (customPipeline && customPipeline.columns && customPipeline.columns[cIdx] && customPipeline.columns[cIdx].steps[sIdx]) {
      return customPipeline.columns[cIdx].steps[sIdx].observation;
    }
    return loremIpsums[(cIdx * 3 + sIdx + shiftAmount) % loremIpsums.length];
  };

  const getConclusion = (cIdx) => {
    if (customPipeline && customPipeline.columns && customPipeline.columns[cIdx]) {
      return customPipeline.columns[cIdx].conclusion;
    }
    return conclusions[(cIdx + shiftAmount) % conclusions.length];
  };

  const getSynthesis = () => {
    if (customPipeline && customPipeline.finalSynthesis) {
      return customPipeline.finalSynthesis;
    }
    return finalSyntheses[shiftAmount % finalSyntheses.length];
  };

  const evalTitle = selectedExample ? selectedExample.title : pipelineData.evaluationTitle;

  return `
    <div class="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-8 md:p-12 mb-12 animate-in fade-in zoom-in-[0.98] slide-in-from-top-6 duration-700 ease-out shadow-sm origin-top">
      <header class="text-center mb-16">
        <h3 class="text-4xl text-gray-900 dark:text-gray-50 font-light tracking-tight" style="font-family: var(--font-cormorant), serif">
          ${evalTitle} <span class="italic text-gray-400 dark:text-gray-500">vs. Ground Truth</span>
        </h3>
        <div class="w-12 h-[1px] bg-gray-300 dark:bg-slate-700 mx-auto mt-8"></div>
      </header>

      <div class="w-full overflow-x-auto pb-8 mb-16">
        <div class="grid grid-cols-5 gap-x-6 md:gap-x-8 min-w-[1000px]">
          <!-- Headers Row -->
          ${pipelineData.pipelineColumns.map(col => `
            <div class="flex flex-col justify-end mb-6">
              <h4 class="text-center uppercase tracking-widest text-sm text-black dark:text-white font-bold flex items-end justify-center" style="font-family: var(--font-fira), monospace">${col.category}</h4>
            </div>
          `).join('')}
          
          <!-- Steps Row -->
          ${pipelineData.pipelineColumns.map((col, cIdx) => `
            <div class="flex flex-col items-center w-full relative flex-1">
              ${col.steps.map((step, idx) => `
                <div class="w-full relative flex flex-col items-center">
                  <div class="w-full border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 text-center group hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-black dark:hover:border-slate-500 transition-all duration-300 shadow-sm">
                    <div class="text-sm text-black dark:text-white mb-2 tracking-wide font-bold" style="font-family: var(--font-fira), monospace">${step.metric}</div>
                    <div class="text-xs text-black dark:text-gray-300 leading-relaxed tracking-wide" style="font-family: var(--font-fira), monospace">${getObservation(cIdx, idx)}</div>
                  </div>
                  ${idx < col.steps.length - 1 ? `
                    <div class="h-8 w-0.5 bg-gray-400 dark:bg-slate-600 my-1 relative">
                       <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-black dark:text-white text-xs font-bold leading-none">↓</div>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
              
              <div class="w-0.5 bg-gray-400 dark:bg-slate-600 my-2 relative flex-1 min-h-[3rem]">
                 <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-black dark:text-white text-xs font-bold leading-none">↓</div>
              </div>
            </div>
          `).join('')}

          <!-- Conclusions Row -->
          ${pipelineData.pipelineColumns.map((col, cIdx) => `
            <div class="w-full border-t-2 border-gray-300 dark:border-slate-700 pt-6 text-center mt-2">
               <div class="text-sm text-black dark:text-gray-300 italic leading-relaxed" style="font-family: var(--font-lora), serif">${getConclusion(cIdx)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="flex w-full max-w-4xl items-center mb-10">
             <div class="h-[1px] bg-gray-400 dark:bg-slate-600 flex-1"></div>
             <div class="px-4 text-black dark:text-white text-xs font-bold">↓</div>
             <div class="h-[1px] bg-gray-400 dark:bg-slate-600 flex-1"></div>
        </div>
        
        <div class="w-full max-w-3xl text-center">
          <h4 class="text-sm uppercase tracking-widest text-black dark:text-white font-bold mb-6" style="font-family: var(--font-fira), monospace">Final Unified Synthesis</h4>
          <p class="text-xl md:text-2xl text-black dark:text-gray-200 leading-relaxed" style="font-family: var(--font-lora), serif">
            ${getSynthesis()}
          </p>
        </div>
      </div>
    </div>
  `;
}

function getExampleSelectOptions() {
  const filteredExamples = mockExamplesList.filter(e => e.system === state.selectedSystem);
  const renderOption = (e) => `<button data-action="change-example" data-value="${e.id}" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-sm ${state.selectedExampleId === e.id ? 'bg-gray-50 dark:bg-slate-800 text-[var(--color-heading)] font-medium' : 'text-gray-700 dark:text-gray-300'}">${e.title}</button>`;
  
  const groups = [
    { label: '1. At Rest', key: '1. At Rest' },
    { label: '2. In-Domain', key: '2. In-Domain' },
    { label: '3. Out-of-Domain', key: '3. Out-of-Domain' },
    { label: '4. Black Box Model', key: '4. Black Box Model' }
  ];

  return groups.map(group => {
    const items = filteredExamples.filter(e => e.groupId === group.key);
    if (items.length === 0) return '';
    return `
      <div class="py-1">
        <div class="px-4 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/80 dark:bg-slate-900/80">${group.label}</div>
        ${items.map(renderOption).join('')}
      </div>
    `;
  }).join('');
}

function getMetricSelectOptions() {
  return metricsData.map(section => `
    <div class="py-1">
      <div class="px-4 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/80 dark:bg-slate-900/80">${section.title}</div>
      ${section.metrics.map(metric => `<button data-action="change-metric" data-value="${metric.id}" class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-sm ${state.selectedMetricId === metric.id ? 'bg-gray-50 dark:bg-slate-800 text-[var(--color-heading)] font-medium' : 'text-gray-700 dark:text-gray-300'}">${metric.name}</button>`).join('')}
    </div>
  `).join('');
}

function renderExamples() {
  const selectedMetric = allMetrics.find(m => m.id === state.selectedMetricId);
  const differences = metricStateDifferences[state.selectedMetricId] || { atRest: "Data not available.", inDomain: "Data not available.", outOfDomain: "Data not available.", blackBoxModel: "Data not available." };
  
  // Ensure selectedExampleId is valid for the selected system
  let selectedExample = mockExamplesList.find(e => e.id === state.selectedExampleId && e.system === state.selectedSystem);
  if (!selectedExample) {
    selectedExample = mockExamplesList.find(e => e.system === state.selectedSystem) || mockExamplesList[0];
    state.selectedExampleId = selectedExample.id;
  }

  const systems = [...new Set(mockExamplesList.map(e => e.system))];

  return `
    <div class="relative min-h-screen z-10 flex justify-center">
      <div class="fixed top-8 right-8 z-50 flex gap-6 items-center">
        <button data-action="goto-metrics" class="text-[var(--color-heading)] hover:opacity-80 transition-all hover:-translate-y-1 group" title="Go to Metrics">
          <i data-lucide="bookmark" class="w-10 h-10 fill-current group-hover:drop-shadow-md"></i>
        </button>
      </div>

      <div class="w-full max-w-[1400px] p-8 md:p-12 lg:p-16">
        <button data-action="back-entry" class="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-heading)] transition-colors mb-8" style="font-family: var(--font-droid), serif">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Archive
        </button>

        <header class="mb-12">
          <h1 class="text-5xl text-[var(--color-heading)] mb-6 text-center" style="font-family: var(--font-lora), serif">Empirical Examples</h1>
          <p class="text-center text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10" style="font-family: var(--font-content), serif">A walkthrough of the metrics applied across distinct network states.</p>
          
          <!-- Tier 1: Global System Toggle -->
          <div class="flex justify-center mb-8">
            <div class="inline-flex bg-gray-100/80 dark:bg-slate-800/80 p-1.5 rounded-xl gap-1">
              ${systems.map(system => `
                <button data-action="set-system" data-system="${system}" class="px-6 py-2.5 rounded-lg text-sm transition-all duration-300 ${state.selectedSystem === system ? 'bg-white dark:bg-slate-900 shadow-sm text-[var(--color-heading)] font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium'}" style="font-family: var(--font-droid), serif">
                  ${system}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="flex justify-center items-center gap-4 border-b border-gray-200 dark:border-slate-800 pb-4">
            <div class="flex gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
              <button data-action="set-view-mode" data-mode="by-state" class="px-4 py-2 rounded-md text-sm transition-colors ${state.viewMode === 'by-state' ? 'bg-white dark:bg-slate-900 shadow-sm text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}" style="font-family: var(--font-droid), serif">View by State</button>
              <button data-action="set-view-mode" data-mode="by-metric" class="px-4 py-2 rounded-md text-sm transition-colors ${state.viewMode === 'by-metric' ? 'bg-white dark:bg-slate-900 shadow-sm text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}" style="font-family: var(--font-droid), serif">View by Metric</button>
            </div>

            ${state.viewMode === 'by-state' ? `
              <div class="relative dropdown-container">
                <button data-action="toggle-example-dropdown" class="flex justify-between items-center w-72 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 py-2.5 pl-4 pr-3 rounded-lg hover:border-[var(--color-heading)] dark:hover:border-[var(--color-heading)] focus:outline-none focus:ring-1 focus:ring-[var(--color-heading)] text-sm shadow-sm transition-all" style="font-family: var(--font-droid), serif">
                  <span class="truncate">${selectedExample.title}</span>
                  <i data-lucide="chevron-down" class="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0 ml-2"></i>
                </button>
                ${state.isExampleDropdownOpen ? `
                  <div class="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto" style="font-family: var(--font-droid), serif">
                    ${getExampleSelectOptions()}
                  </div>
                ` : ''}
              </div>
            ` : ''}

            ${state.viewMode === 'by-metric' ? `
              <div class="relative dropdown-container">
                <button data-action="toggle-metric-dropdown" class="flex justify-between items-center w-72 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 py-2.5 pl-4 pr-3 rounded-lg hover:border-[var(--color-heading)] dark:hover:border-[var(--color-heading)] focus:outline-none focus:ring-1 focus:ring-[var(--color-heading)] text-sm shadow-sm transition-all" style="font-family: var(--font-droid), serif">
                  <span class="truncate">${selectedMetric ? selectedMetric.name : 'Select Metric'}</span>
                  <i data-lucide="chevron-down" class="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0 ml-2"></i>
                </button>
                ${state.isMetricDropdownOpen ? `
                  <div class="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto" style="font-family: var(--font-droid), serif">
                    ${getMetricSelectOptions()}
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
        </header>

        ${state.viewMode === 'by-state' ? `
          <div class="space-y-8 animate-in fade-in zoom-in-[0.99] duration-500">
            <section>
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                <div class="border-l-4 border-[var(--color-heading)] pl-8 py-2">
                  <h2 class="text-3xl text-gray-900 dark:text-gray-100 mb-3" style="font-family: var(--font-lora), serif">${selectedExample.title}</h2>
                  <p class="text-gray-500 dark:text-gray-400 italic text-lg" style="font-family: var(--font-droid), serif">${selectedExample.groupId} &mdash; ${state.selectedSystem}</p>
                </div>
                <div class="flex items-center gap-4">
                  <button data-action="toggle-pipeline" class="border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-gray-300 px-6 py-2.5 rounded-sm hover:bg-[var(--color-heading)] hover:border-[var(--color-heading)] hover:text-white dark:hover:text-white transition-all duration-300 text-[10px] uppercase tracking-widest bg-white dark:bg-slate-900 whitespace-nowrap" style="font-family: var(--font-fira), monospace">
                    [ ${state.showPipeline ? 'Close' : 'View'} Diagnostic Pipeline ]
                  </button>
                  <button data-action="download-pdf" class="border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-gray-300 px-6 py-2.5 rounded-sm hover:bg-[var(--color-heading)] hover:border-[var(--color-heading)] hover:text-white dark:hover:text-white transition-all duration-300 text-[10px] uppercase tracking-widest bg-white dark:bg-slate-900 whitespace-nowrap" style="font-family: var(--font-fira), monospace" onclick="alert('Downloading Full Report PDF for ${selectedExample.title}...')">
                    [ Download PDF ]
                  </button>
                </div>
              </div>

              ${state.showPipeline ? renderPipelineView(selectedExample) : ''}

              <div class="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 leading-loose bg-[#FCFBFF] dark:bg-slate-900 border border-[#E5E2EC] dark:border-slate-800 p-8 rounded-2xl shadow-sm mb-12" style="font-family: var(--font-content), serif">
                <p>${selectedExample.body}</p>
              </div>
              
              <h3 class="text-2xl text-[var(--color-heading)] mb-8" style="font-family: var(--font-lora), serif">Expectations Across All Metrics</h3>
              
              <div class="space-y-12">
                ${metricsData.map(section => `
                  <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-[#E5E2EC] dark:border-slate-800">
                    <h4 class="text-xl text-[var(--color-heading)] border-b border-[#E5E2EC] dark:border-slate-800 pb-3 mb-6 font-semibold" style="font-family: var(--font-lora), serif">${section.title}</h4>
                    <div class="space-y-6">
                      ${section.metrics.map(m => {
                         const diffText = (metricStateDifferences[m.id] && metricStateDifferences[m.id][selectedExample.stateKey]) || "Data not available.";
                         return `
                           <div class="border-b border-gray-100 dark:border-slate-800 pb-5 last:border-0 last:pb-0">
                             <h5 class="text-gray-900 dark:text-gray-100 text-lg mb-2 font-medium" style="font-family: var(--font-lora), serif">${m.name}</h5>
                             <p class="text-gray-700 dark:text-gray-300 text-base leading-relaxed" style="font-family: var(--font-fira), monospace">${diffText}</p>
                           </div>
                         `;
                      }).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          </div>
        ` : `
          <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
             <div class="border-l-4 border-[var(--color-heading)] pl-8 py-2">
               <h2 class="text-3xl text-gray-900 dark:text-gray-100 mb-3" style="font-family: var(--font-lora), serif">${selectedMetric?.name}</h2>
               <p class="text-gray-500 dark:text-gray-400 italic text-lg" style="font-family: var(--font-droid), serif">${selectedMetric?.description} (${state.selectedSystem})</p>
             </div>
             
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                ${renderStateCarouselCard('1. At Rest', [{ title: "Observation", body: differences.atRest || "Data not available." }, ...mockExamplesList.filter(e => e.stateKey === 'atRest' && e.system === state.selectedSystem)])}
                ${renderStateCarouselCard('2. In-Domain', [{ title: "Observation", body: differences.inDomain || "Data not available." }, ...mockExamplesList.filter(e => e.stateKey === 'inDomain' && e.system === state.selectedSystem)])}
                ${renderStateCarouselCard('3. Out-of-Domain', [{ title: "Observation", body: differences.outOfDomain || "Data not available." }, ...mockExamplesList.filter(e => e.stateKey === 'outOfDomain' && e.system === state.selectedSystem)])}
                ${renderStateCarouselCard('4. Black Box Model', [{ title: "Observation", body: differences.blackBoxModel || "Data not available." }, ...mockExamplesList.filter(e => e.stateKey === 'blackBoxModel' && e.system === state.selectedSystem)])}
             </div>
          </div>
        `}
      </div>
    </div>
  `;
}

function renderStateCarouselCard(title, items) {
  const currentIndex = state.carouselIndices[title] || 0;
  const currentItem = items[currentIndex];
  
  return `
    <div class="flex flex-col bg-[#FCFBFF] dark:bg-slate-900 border border-[#E5E2EC] dark:border-slate-800 rounded-xl h-[420px] w-full shadow-sm overflow-hidden text-gray-800 dark:text-gray-200">
      <div class="p-8 border-b border-[#E5E2EC]/60 dark:border-slate-800 flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm h-[130px]">
        <h2 class="text-[1.35rem] text-[var(--color-heading)] font-semibold leading-snug" style="font-family: var(--font-lora), serif">${title}</h2>
      </div>

      <div class="p-8 flex-grow overflow-y-auto relative hide-scrollbar">
        <div class="animate-in fade-in duration-500 flex flex-col min-h-full">
          ${currentItem.subtitle ? `<div class="text-[10px] uppercase tracking-widest text-[#8271A3] dark:text-slate-400 mb-1 font-sans font-bold flex-shrink-0">${currentItem.subtitle}</div>` : ''}
          <h3 class="text-[1.1rem] font-medium text-gray-900 dark:text-gray-100 mb-4 flex-shrink-0" style="font-family: var(--font-lora), serif">${currentItem.title}</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-[14px] pb-4" style="font-family: var(--font-fira), monospace">${currentItem.body}</p>
        </div>
      </div>

      <div class="h-16 flex-shrink-0 px-8 flex items-center justify-between pb-6 pt-2">
        ${items.length > 1 ? `
             <button data-action="carousel-prev" data-title="${title}" data-length="${items.length}" class="text-[#8271A3] dark:text-slate-400 hover:text-[var(--color-heading)] transition-colors p-1 flex items-center justify-center border border-transparent hover:border-[#8271A3]/30 dark:hover:border-slate-600 rounded">
               <span class="text-lg leading-none">&lt;</span>
             </button>
             <span class="opacity-90 tracking-[0.2em] text-[10px] text-[var(--color-heading)]" style="font-family: var(--font-fira), monospace">
               ${currentIndex + 1} / ${items.length}
             </span>
             <button data-action="carousel-next" data-title="${title}" data-length="${items.length}" class="text-[#8271A3] dark:text-slate-400 hover:text-[var(--color-heading)] transition-colors p-1 flex items-center justify-center border border-transparent hover:border-[#8271A3]/30 dark:hover:border-slate-600 rounded">
               <span class="text-lg leading-none">&gt;</span>
             </button>
        ` : ''}
      </div>
    </div>
  `;
}

document.addEventListener('click', e => {
  // Handle clicking outside of dropdowns
  if (!e.target.closest('.dropdown-container')) {
    if (state.isExampleDropdownOpen || state.isMetricDropdownOpen) {
      state.isExampleDropdownOpen = false;
      state.isMetricDropdownOpen = false;
      renderApp();
    }
  }

  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.getAttribute('data-action');
  
  if (action === 'navigate-metrics') {
    state.currentView = 'metrics';
    if (!state.activeSectionId) state.activeSectionId = metricsData[0].id;
    renderApp();
  } else if (action === 'navigate-examples') {
    state.currentView = 'examples';
    if (!state.selectedMetricId) state.selectedMetricId = allMetrics[0].id;
    renderApp();
  } else if (action === 'back-entry') {
    state.currentView = 'entry';
    renderApp();
  } else if (action === 'goto-examples') {
    state.currentView = 'examples';
    const section = metricsData.find(s => s.id === state.activeSectionId);
    if (section && section.metrics.length > 0) {
      state.selectedMetricId = section.metrics[0].id;
      state.viewMode = 'by-metric';
    }
    renderApp();
  } else if (action === 'goto-metrics') {
    state.currentView = 'metrics';
    const section = metricsData.find(s => s.metrics.some(m => m.id === state.selectedMetricId));
    if (section) {
      state.activeSectionId = section.id;
    }
    renderApp();
  } else if (action === 'set-active-section') {
    state.activeSectionId = btn.getAttribute('data-id');
    renderApp();
  } else if (action === 'toggle-math') {
    const id = btn.getAttribute('data-id');
    state.showMathMap[id] = !state.showMathMap[id];
    renderApp();
  } else if (action === 'set-view-mode') {
    state.viewMode = btn.getAttribute('data-mode');
    renderApp();
  } else if (action === 'toggle-pipeline') {
    state.showPipeline = !state.showPipeline;
    renderApp();
  } else if (action === 'carousel-prev') {
    const title = btn.getAttribute('data-title');
    const len = parseInt(btn.getAttribute('data-length'), 10);
    const curr = state.carouselIndices[title] || 0;
    state.carouselIndices[title] = (curr - 1 + len) % len;
    renderApp();
  } else if (action === 'carousel-next') {
    const title = btn.getAttribute('data-title');
    const len = parseInt(btn.getAttribute('data-length'), 10);
    const curr = state.carouselIndices[title] || 0;
    state.carouselIndices[title] = (curr + 1) % len;
    renderApp();
  } else if (action === 'set-system') {
    state.selectedSystem = btn.getAttribute('data-system');
    // Reset carousel indices when system changes
    state.carouselIndices = {
      '1. At Rest': 0,
      '2. In-Domain': 0,
      '3. Out-of-Domain': 0,
      '4. Black Box Model': 0
    };
    renderApp();
  } else if (action === 'toggle-example-dropdown') {
    state.isExampleDropdownOpen = !state.isExampleDropdownOpen;
    state.isMetricDropdownOpen = false;
    renderApp();
  } else if (action === 'toggle-metric-dropdown') {
    state.isMetricDropdownOpen = !state.isMetricDropdownOpen;
    state.isExampleDropdownOpen = false;
    renderApp();
  } else if (action === 'toggle-theme') {
    state.isDarkMode = !state.isDarkMode;
    renderApp();
  } else if (action === 'change-example') {
    state.selectedExampleId = btn.getAttribute('data-value');
    state.showPipeline = false;
    state.isExampleDropdownOpen = false;
    renderApp();
  } else if (action === 'change-metric') {
    state.selectedMetricId = btn.getAttribute('data-value');
    state.isMetricDropdownOpen = false;
    state.carouselIndices = {
      '1. At Rest': 0,
      '2. In-Domain': 0,
      '3. Out-of-Domain': 0,
      '4. Black Box Model': 0
    };
    renderApp();
  }
});

renderApp();
