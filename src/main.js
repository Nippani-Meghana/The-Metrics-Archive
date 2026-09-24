function getStateTooltipContent(groupId, system) {
  let generalDef = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  let systemDef = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

  if (groupId === '1. At Rest') {
    // Add logic for At Rest if needed, currently not requested.
  } else if (groupId === '2. In-Domain') {
    generalDef = "In-domain refers to data recorded while testing the ground-truth (GT) system under the conditions for which it was validated. For example, a self-driving system operating on roads and following expected lane and navigation conditions would be considered in-domain.";
    if (system === 'System XOR') {
      systemDef = "The GT XOR circuit behaves deterministically: the output is 1 for inputs 01 and 10, and 0 for 00 and 11.";
    }
  } else if (groupId === '3. Out-of-Domain') {
    generalDef = "Out-of-domain behavior refers to how a system responds when tested under conditions that differ from those used to validate it. These may include unusual inputs, noise, timing perturbations, or changes in the system's internal dynamics. For example, testing a self-driving system during a sandstorm or with a failed sensor would be considered out-of-domain.";
    if (system === 'System XOR') {
      systemDef = "The circuit is tested beyond its controlled/validated conditions, including perturbations such as timing variability, probabilistic synaptic transmission, or novel input patterns.";
    }
  } else if (groupId === '4. Black Box Model') {
    generalDef = "Black-box comparison evaluates systems based on their observable input-output behavior, without requiring their internal circuit structures to be identical.";
    if (system === 'System XOR') {
      systemDef = "An XOR circuit with N neurons is compared with another XOR circuit with M neurons, or with a circuit having different connectivity, while both implement the same input-output function. For example, an 8-neuron XOR circuit may be compared against a 5-neuron XOR circuit with different connectivity, provided both exhibit the same XOR input-output behavior.";
    }
  }

  return { generalDef, systemDef };
}

import './index.css';
import 'katex/dist/katex.min.css';
import katex from 'katex';
import { createIcons, icons } from 'lucide';
import { metricsData, metricStateDifferences, defaultStateDiff } from './data.js';
import { createConnectomicsBackground } from './ConnectomicsBackground.js';
import pipelineData from './diagnostic-pipeline.json';
import { mockExamplesList } from './examples.js';

function getMetricExpectationText(metricId, stateKey, system, example = null) {
  const matchedExample = example || mockExamplesList.find(e => e.system === system && e.stateKey === stateKey);

  // 1. Check if specific expectation is defined on the example object itself
  if (matchedExample) {
    if (matchedExample.metrics && matchedExample.metrics[metricId]) {
      return matchedExample.metrics[metricId];
    }
    if (matchedExample.metricDifferences && matchedExample.metricDifferences[metricId]) {
      return matchedExample.metricDifferences[metricId];
    }
    if (matchedExample.expectations && matchedExample.expectations[metricId]) {
      return matchedExample.expectations[metricId];
    }
    if (matchedExample[metricId] && typeof matchedExample[metricId] === 'string') {
      return matchedExample[metricId];
    }
  }

  const metricDiff = metricStateDifferences[metricId];
  if (!metricDiff) return "Data not available.";

  // 2. Check if keyed by specific example ID (e.g. 'xor-in-domain-1')
  if (matchedExample && metricDiff[matchedExample.id]) {
    const byId = metricDiff[matchedExample.id];
    if (typeof byId === 'string') return byId;
    if (typeof byId === 'object' && byId !== null) {
      return byId[system] || byId.default || "Data not available.";
    }
  }

  // 3. Keyed by stateKey (e.g. 'inDomain', 'outOfDomain', 'atRest', 'blackBoxModel')
  const stateData = metricDiff[stateKey];
  if (!stateData) {
    return "Data not available.";
  }

  if (typeof stateData === 'string') {
    // If no case example exists for this state in this system and it matches generic placeholder:
    if (!matchedExample && defaultStateDiff && stateData === defaultStateDiff[stateKey]) {
      return "Data not available.";
    }
    return stateData;
  }

  if (typeof stateData === 'object' && stateData !== null) {
    if (system && stateData[system]) {
      return stateData[system];
    }
    if (matchedExample && stateData[matchedExample.id]) {
      return stateData[matchedExample.id];
    }
    // If no case example exists for this state in this system, don't show the default placeholder
    if (!matchedExample) {
      return "Data not available.";
    }
    if (stateData.default) {
      return stateData.default;
    }
  }

  return "Data not available.";
}

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
  isSearchOpen: false,
  searchQuery: '',
  searchFilter: 'all', // 'all', 'metric', 'system', 'example'
  carouselIndices: {
    '1. At Rest': 0,
    '2. In-Domain': 0,
    '3. Out-of-Domain': 0,
    '4. Black Box Model': 0
  }
};

function getSearchIndex() {
  const items = [];

  // 1. All Metrics
  metricsData.forEach(section => {
    section.metrics.forEach(metric => {
      items.push({
        type: 'metric',
        badge: 'Metric',
        title: metric.name,
        subtitle: section.title,
        description: metric.description || '',
        meta: metric.mathematics ? 'Mathematical formulation available' : '',
        category: section.title,
        sectionId: section.id,
        metricId: metric.id
      });
    });
  });

  // 2. Systems
  const distinctSystems = [...new Set(mockExamplesList.map(e => e.system))];
  distinctSystems.forEach(sysName => {
    const examplesForSys = mockExamplesList.filter(e => e.system === sysName);
    items.push({
      type: 'system',
      badge: 'System',
      title: sysName,
      subtitle: `System Architecture & Dynamics (${examplesForSys.length} documented models & cases)`,
      description: `Neural network architecture and biological ground-truth circuits for ${sysName}. Explores deterministic, in-domain, and perturbation dynamics.`,
      system: sysName,
      exampleId: examplesForSys[0]?.id
    });
  });

  // 3. Case Examples
  mockExamplesList.forEach(ex => {
    const groupName = ex.groupId ? ex.groupId.replace(/^\d+\.\s*/, '') : (ex.group ? ex.group.replace(/^\d+\.\s*/, '') : '');
    const desc = ex.body || ex.description || '';
    items.push({
      type: 'example',
      badge: 'Case Example',
      title: ex.title,
      subtitle: `${ex.system} • ${groupName || 'Comparative Case'}`,
      description: desc,
      system: ex.system,
      exampleId: ex.id,
      groupId: ex.groupId
    });
  });

  return items;
}

function searchArchive(query, filter = 'all') {
  const cleanQ = (query || '').trim().toLowerCase();
  const allItems = getSearchIndex();

  let filtered = allItems;
  if (filter !== 'all') {
    filtered = filtered.filter(item => item.type === filter);
  }

  if (!cleanQ) {
    return filtered.slice(0, 10); // Top featured items when search query is empty
  }

  const terms = cleanQ.split(/\s+/).filter(Boolean);

  return filtered.filter(item => {
    const hayStack = `${item.title} ${item.subtitle} ${item.description} ${item.meta || ''} ${item.badge} ${item.system || ''}`.toLowerCase();
    return terms.every(term => hayStack.includes(term));
  });
}

function renderSearchModal() {
  if (!state.isSearchOpen) return '';

  const results = searchArchive(state.searchQuery, state.searchFilter);
  const filterCounts = {
    all: searchArchive(state.searchQuery, 'all').length,
    metric: searchArchive(state.searchQuery, 'metric').length,
    system: searchArchive(state.searchQuery, 'system').length,
    example: searchArchive(state.searchQuery, 'example').length
  };

  return `
    <div id="search-modal-backdrop" class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-start justify-center pt-8 sm:pt-16 p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div id="search-modal-container" class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 w-full max-w-3xl overflow-hidden flex flex-col my-auto max-h-[88vh] transition-all transform animate-in zoom-in-95 duration-150">
        
        <!-- Search Input Header -->
        <div class="p-4 sm:p-5 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3.5 bg-white dark:bg-slate-900 shrink-0">
          <div class="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center shrink-0 border border-purple-100 dark:border-purple-900/40">
            <i data-lucide="search" class="w-5 h-5 text-[#5F4A8B] dark:text-[#C4B5FD]"></i>
          </div>
          <input 
            type="text" 
            id="global-search-input" 
            placeholder="Search metrics, neural systems, case studies, or formulas..." 
            value="${state.searchQuery.replace(/"/g, '&quot;')}"
            autocomplete="off"
            spellcheck="false"
            class="flex-1 bg-transparent border-0 text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0"
            style="font-family: var(--font-droid), serif"
          />
          ${state.searchQuery ? `
            <button type="button" data-action="clear-search-query" class="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer" title="Clear query">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          ` : ''}
          <button type="button" data-action="close-search" class="text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer shadow-2xs" style="font-family: var(--font-fira), monospace">
            ESC
          </button>
        </div>

        <!-- Filter Tags -->
        <div class="px-4 sm:px-5 py-3 bg-gray-50/90 dark:bg-slate-950/80 border-b border-gray-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs shrink-0 select-none hide-scrollbar" style="font-family: var(--font-droid), serif">
          <button 
            type="button" 
            data-action="set-search-filter" 
            data-filter="all" 
            class="px-3.5 py-1.5 rounded-lg transition-all shrink-0 font-medium cursor-pointer ${
              state.searchFilter === 'all' 
                ? 'bg-[#5F4A8B] text-white shadow-sm ring-1 ring-[#5F4A8B]' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-slate-800'
            }"
          >
            All Results (${filterCounts.all})
          </button>
          <button 
            type="button" 
            data-action="set-search-filter" 
            data-filter="metric" 
            class="px-3.5 py-1.5 rounded-lg transition-all shrink-0 font-medium cursor-pointer ${
              state.searchFilter === 'metric' 
                ? 'bg-[#5F4A8B] text-white shadow-sm ring-1 ring-[#5F4A8B]' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-slate-800'
            }"
          >
            Metrics (${filterCounts.metric})
          </button>
          <button 
            type="button" 
            data-action="set-search-filter" 
            data-filter="system" 
            class="px-3.5 py-1.5 rounded-lg transition-all shrink-0 font-medium cursor-pointer ${
              state.searchFilter === 'system' 
                ? 'bg-[#5F4A8B] text-white shadow-sm ring-1 ring-[#5F4A8B]' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-slate-800'
            }"
          >
            Systems (${filterCounts.system})
          </button>
          <button 
            type="button" 
            data-action="set-search-filter" 
            data-filter="example" 
            class="px-3.5 py-1.5 rounded-lg transition-all shrink-0 font-medium cursor-pointer ${
              state.searchFilter === 'example' 
                ? 'bg-[#5F4A8B] text-white shadow-sm ring-1 ring-[#5F4A8B]' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-slate-800'
            }"
          >
            Case Examples (${filterCounts.example})
          </button>
        </div>

        <!-- Results List -->
        <div class="flex-1 overflow-y-auto p-3 sm:p-5 divide-y divide-gray-100 dark:divide-slate-800/80 min-h-[220px]">
          ${results.length === 0 ? `
            <div class="py-16 px-4 text-center">
              <i data-lucide="file-question" class="w-12 h-12 mx-auto text-gray-300 dark:text-slate-600 mb-3 stroke-1"></i>
              <h4 class="text-base font-medium text-gray-800 dark:text-gray-200 mb-1" style="font-family: var(--font-lora), serif">No archive entries found</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto" style="font-family: var(--font-content), serif">
                No matching metrics, systems, or case studies found for "${state.searchQuery}". Try searching for terms like "ISI", "XOR", "Beta", "Entropy", or "Spike".
              </p>
            </div>
          ` : results.map(item => {
            const badgeBg = item.type === 'metric' 
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800/50' 
              : item.type === 'system'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800/50'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50';

            return `
              <button 
                type="button"
                data-action="select-search-result"
                data-item-type="${item.type}"
                data-section-id="${item.sectionId || ''}"
                data-metric-id="${item.metricId || ''}"
                data-system="${item.system || ''}"
                data-example-id="${item.exampleId || ''}"
                class="w-full text-left p-3.5 sm:p-4 rounded-xl hover:bg-purple-50/50 dark:hover:bg-slate-800/80 transition-all flex items-start gap-4 group cursor-pointer border border-transparent hover:border-purple-200 dark:hover:border-slate-700 my-1"
              >
                <div class="shrink-0 mt-0.5">
                  <span class="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${badgeBg}" style="font-family: var(--font-fira), monospace">
                    ${item.badge}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h3 class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-[#5F4A8B] dark:group-hover:text-[#C4B5FD] transition-colors truncate" style="font-family: var(--font-lora), serif">
                      ${item.title}
                    </h3>
                    <span class="text-xs text-gray-400 dark:text-gray-500 shrink-0 font-normal" style="font-family: var(--font-droid), serif">
                      ${item.subtitle}
                    </span>
                  </div>
                  <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 leading-relaxed" style="font-family: var(--font-content), serif">
                    ${item.description}
                  </p>
                  ${item.meta ? `
                    <div class="mt-2 text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5" style="font-family: var(--font-fira), monospace">
                      <i data-lucide="function-square" class="w-3.5 h-3.5 text-[#5F4A8B] dark:text-[#C4B5FD]"></i>
                      <span>${item.meta}</span>
                    </div>
                  ` : ''}
                </div>
                <div class="shrink-0 self-center text-gray-400 dark:text-slate-500 group-hover:text-[#5F4A8B] dark:group-hover:text-[#C4B5FD] group-hover:translate-x-0.5 transition-all">
                  <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
                </div>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Footer Shortcuts -->
        <div class="px-4 py-3 bg-gray-50 dark:bg-slate-950/70 border-t border-gray-100 dark:border-slate-800 text-[11px] text-gray-500 dark:text-gray-400 flex flex-wrap items-center justify-between gap-2 shrink-0" style="font-family: var(--font-fira), monospace">
          <div class="flex items-center gap-3">
            <span><kbd class="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-2xs text-gray-700 dark:text-gray-300 font-semibold">ESC</kbd> to close</span>
            <span><kbd class="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-2xs text-gray-700 dark:text-gray-300 font-semibold">/</kbd> to search</span>
          </div>
          <span class="text-gray-400 dark:text-gray-500">The Brain Emulation Metrics Archive</span>
        </div>

      </div>
    </div>
  `;
}

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
        <div id="search-modal-root"></div>
        <div class="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
          <button id="bottom-search-button" data-action="open-search" class="p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm text-gray-500 dark:text-gray-400 hover:text-[var(--color-heading)] dark:hover:text-[var(--color-heading)] transition-all hover:shadow-md hover:-translate-y-1" title="Search archive (Press /)">
            <i data-lucide="search" class="w-5 h-5"></i>
          </button>
          <button data-action="toggle-theme" class="p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm text-gray-500 dark:text-gray-400 hover:text-[var(--color-heading)] dark:hover:text-[var(--color-heading)] transition-all hover:shadow-md hover:-translate-y-1" title="Toggle theme">
            <i data-lucide="${state.isDarkMode ? 'sun' : 'moon'}" class="w-5 h-5"></i>
          </button>
        </div>
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

  // Update bottom search button visibility (hidden on Empirical Examples and The Metrics Page)
  const bottomSearchBtn = document.getElementById('bottom-search-button');
  if (bottomSearchBtn) {
    if (state.currentView === 'metrics' || state.currentView === 'examples') {
      bottomSearchBtn.style.display = 'none';
    } else {
      bottomSearchBtn.style.display = '';
    }
  }

  appContent.innerHTML = `
    ${state.currentView === 'entry' ? renderEntry() : ''}
    ${state.currentView === 'metrics' ? renderMetrics() : ''}
    ${state.currentView === 'examples' ? renderExamples() : ''}
  `;

  const searchModalRoot = document.getElementById('search-modal-root');
  if (searchModalRoot) {
    searchModalRoot.innerHTML = renderSearchModal();
  }

  bgControls.setIsEntryPage(state.currentView === 'entry');

  document.querySelectorAll('[data-math]').forEach(el => {
    katex.render(el.getAttribute('data-math'), el, { displayMode: true, throwOnError: false });
  });

  createIcons({ icons });
}

function navigateToMetric(metricId, sectionId) {
  state.currentView = 'metrics';
  const targetMetricId = metricId || state.selectedMetricId || allMetrics[0]?.id;
  if (targetMetricId) {
    state.selectedMetricId = targetMetricId;
  }
  
  if (!sectionId && targetMetricId) {
    const matchedSection = metricsData.find(s => s.metrics.some(m => m.id === targetMetricId));
    if (matchedSection) {
      sectionId = matchedSection.id;
    }
  }
  
  if (sectionId) {
    state.activeSectionId = sectionId;
  }
  
  renderApp();
  
  // Smooth scroll directly to the metric card and highlight it
  setTimeout(() => {
    if (targetMetricId) {
      const metricEl = document.getElementById(`metric-${targetMetricId}`);
      if (metricEl) {
        metricEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        metricEl.classList.add('ring-2', 'ring-[var(--color-heading)]', 'ring-offset-4', 'transition-all', 'duration-500');
        setTimeout(() => {
          metricEl.classList.remove('ring-2', 'ring-[var(--color-heading)]', 'ring-offset-4');
        }, 2600);
      }
    }
  }, 120);
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
        <div class="w-full flex flex-col items-center text-center space-y-8 mb-12">
          <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[var(--color-heading)] font-normal leading-tight" style="font-family: var(--font-cormorant), serif;">
            The Metrics Archive
          </h1>
          <p class="text-lg md:text-xl lg:text-2xl text-gray-500 dark:text-gray-400 italic max-w-3xl leading-relaxed" style="font-family: var(--font-lora), serif;">
            A repository indexing formal mathematical indices, statistical estimators, and empirical performance metrics utilized by the Brain Emulation Challenge.
          </p>
        </div>

        <!-- Global Search Trigger Input Bar on Entry Screen -->
        <div class="w-full max-w-xl mb-16">
          <button data-action="open-search" class="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[var(--color-heading)]/50 dark:hover:border-[var(--color-heading)]/50 transition-all text-left group">
            <div class="flex items-center gap-3 text-gray-400 dark:text-gray-500 group-hover:text-[var(--color-heading)] transition-colors">
              <i data-lucide="search" class="w-5 h-5 text-[var(--color-heading)]"></i>
              <span class="text-sm md:text-base text-gray-500 dark:text-gray-400" style="font-family: var(--font-droid), serif">Quick search across metrics, systems & cases...</span>
            </div>
            <kbd class="hidden sm:inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-700" style="font-family: var(--font-fira), monospace">
              <span>Press</span> <span class="font-semibold text-gray-700 dark:text-gray-300">/</span>
            </kbd>
          </button>
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
      <div class="fixed top-8 right-8 z-50 flex gap-4 items-center">
        <button data-action="open-search" class="p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-gray-200 dark:border-slate-800 text-gray-500 hover:text-[var(--color-heading)] shadow-xs transition-all hover:shadow-sm" title="Search Archive (Press /)">
          <i data-lucide="search" class="w-5 h-5"></i>
        </button>
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
    <article id="metric-${metric.id}" class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-all duration-300 hover:shadow-md">
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
        <div class="grid grid-cols-6 gap-x-6 md:gap-x-8 min-w-[1200px]">
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
  
  // Ensure selectedExampleId is valid for the selected system
  let selectedExample = mockExamplesList.find(e => e.id === state.selectedExampleId && e.system === state.selectedSystem);
  if (!selectedExample) {
    selectedExample = mockExamplesList.find(e => e.system === state.selectedSystem) || mockExamplesList[0];
    state.selectedExampleId = selectedExample.id;
  }

  const systems = [...new Set(mockExamplesList.map(e => e.system))];

  return `
    <div class="relative min-h-screen z-10 flex justify-center">
      <div class="fixed top-8 right-8 z-50 flex gap-4 items-center">
        <button data-action="open-search" class="p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-gray-200 dark:border-slate-800 text-gray-500 hover:text-[var(--color-heading)] shadow-xs transition-all hover:shadow-sm cursor-pointer" title="Search Archive (Press /)">
          <i data-lucide="search" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="w-full max-w-[1400px] p-8 md:p-12 lg:p-16">
        <button data-action="back-entry" class="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-heading)] transition-colors mb-8 cursor-pointer" style="font-family: var(--font-droid), serif">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Archive
        </button>

        <header class="mb-12">
          <h1 class="text-5xl text-[var(--color-heading)] mb-6 text-center" style="font-family: var(--font-lora), serif">Empirical Examples</h1>
          <p class="text-center text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10" style="font-family: var(--font-content), serif">A walkthrough of the metrics applied across distinct network states.</p>
          
          <!-- Tier 1: Global System Toggle -->
          <div class="flex justify-center mb-8">
            <div class="inline-flex bg-gray-100/80 dark:bg-slate-800/80 p-1.5 rounded-xl gap-1">
              ${systems.map(system => `
                <button data-action="set-system" data-system="${system}" class="px-6 py-2.5 rounded-lg text-sm transition-all duration-300 cursor-pointer ${state.selectedSystem === system ? 'bg-white dark:bg-slate-900 shadow-sm text-[var(--color-heading)] font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium'}" style="font-family: var(--font-droid), serif">
                  ${system}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="flex justify-center items-center gap-4 border-b border-gray-200 dark:border-slate-800 pb-4">
            <div class="flex gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
              <button data-action="set-view-mode" data-mode="by-state" class="px-4 py-2 rounded-md text-sm transition-colors cursor-pointer ${state.viewMode === 'by-state' ? 'bg-white dark:bg-slate-900 shadow-sm text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}" style="font-family: var(--font-droid), serif">View by State</button>
              <button data-action="set-view-mode" data-mode="by-metric" class="px-4 py-2 rounded-md text-sm transition-colors cursor-pointer ${state.viewMode === 'by-metric' ? 'bg-white dark:bg-slate-900 shadow-sm text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}" style="font-family: var(--font-droid), serif">View by Metric</button>
            </div>

            ${state.viewMode === 'by-state' ? `
              <div class="relative dropdown-container">
                <button data-action="toggle-example-dropdown" class="flex justify-between items-center w-72 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 py-2.5 pl-4 pr-3 rounded-lg hover:border-[var(--color-heading)] dark:hover:border-[var(--color-heading)] focus:outline-none focus:ring-1 focus:ring-[var(--color-heading)] text-sm shadow-sm transition-all cursor-pointer" style="font-family: var(--font-droid), serif">
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
                <button data-action="toggle-metric-dropdown" class="flex justify-between items-center w-72 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 py-2.5 pl-4 pr-3 rounded-lg hover:border-[var(--color-heading)] dark:hover:border-[var(--color-heading)] focus:outline-none focus:ring-1 focus:ring-[var(--color-heading)] text-sm shadow-sm transition-all cursor-pointer" style="font-family: var(--font-droid), serif">
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
                  <div class="flex items-center gap-2 group relative w-fit">
                    <p class="text-gray-500 dark:text-gray-400 italic text-lg" style="font-family: var(--font-droid), serif">${selectedExample.groupId} &mdash; ${state.selectedSystem}</p>
                    <span class="text-[#8271A3] dark:text-slate-400 cursor-help border-b border-dotted border-[#8271A3]/50 dark:border-slate-400/50 text-sm opacity-60 hover:opacity-100 transition-opacity relative z-20">
                      [?]
                    </span>
                    <div class="absolute left-0 top-full mt-2 w-64 bg-slate-900 dark:bg-slate-800 text-slate-100 dark:text-slate-200 text-sm rounded-lg shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-slate-700 pointer-events-none" style="font-family: var(--font-fira), monospace">
                       ${(() => {
                         const tooltip = getStateTooltipContent(selectedExample.groupId, state.selectedSystem);
                         return `<p class="mb-3 pb-3 border-b border-slate-700/50">${tooltip.generalDef}</p>
                         <p class="text-slate-300 italic"><span class="font-bold">${state.selectedSystem}:</span> ${tooltip.systemDef}</p>`;
                       })()}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <button data-action="toggle-pipeline" class="border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-gray-300 px-6 py-2.5 rounded-sm hover:bg-[var(--color-heading)] hover:border-[var(--color-heading)] hover:text-white dark:hover:text-white transition-all duration-300 text-[10px] uppercase tracking-widest bg-white dark:bg-slate-900 whitespace-nowrap cursor-pointer" style="font-family: var(--font-fira), monospace">
                    [ ${state.showPipeline ? 'Close' : 'View'} Diagnostic Pipeline ]
                  </button>
                </div>
              </div>

              ${state.showPipeline ? renderPipelineView(selectedExample) : ''}

              <div class="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 leading-loose bg-[#FCFBFF] dark:bg-slate-900 border border-[#E5E2EC] dark:border-slate-800 p-8 rounded-2xl shadow-sm mb-12" style="font-family: var(--font-content), serif">
                <p>${selectedExample.body}</p>
              </div>
              
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h3 class="text-2xl text-[var(--color-heading)]" style="font-family: var(--font-lora), serif">Expectations Across All Metrics</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1" style="font-family: var(--font-droid), serif">Click any metric or its bookmark to jump directly to its formal specification and formulation.</p>
                </div>
              </div>
              
              <div class="space-y-12">
                ${metricsData.map(section => `
                  <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-[#E5E2EC] dark:border-slate-800">
                    <div class="flex items-center justify-between border-b border-[#E5E2EC] dark:border-slate-800 pb-3 mb-6">
                      <h4 class="text-xl text-[var(--color-heading)] font-semibold" style="font-family: var(--font-lora), serif">${section.title}</h4>
                      <span class="text-xs text-gray-400 dark:text-gray-500 font-mono">${section.metrics.length} metrics</span>
                    </div>
                    <div class="space-y-6">
                      ${section.metrics.map(m => {
                         const diffText = getMetricExpectationText(m.id, selectedExample.stateKey, state.selectedSystem, selectedExample);
                         return `
                           <div class="border-b border-gray-100 dark:border-slate-800 pb-5 last:border-0 last:pb-0">
                             <div class="flex items-center justify-between gap-3 mb-2">
                               <button 
                                 type="button"
                                 data-action="goto-specific-metric" 
                                 data-metric-id="${m.id}" 
                                 data-section-id="${section.id}"
                                 class="text-left text-gray-900 dark:text-gray-100 text-lg font-medium hover:text-[var(--color-heading)] dark:hover:text-[#C4B5FD] transition-colors cursor-pointer group flex items-center gap-2" 
                                 style="font-family: var(--font-lora), serif"
                                 title="View ${m.name} in Metrics Archive"
                               >
                                 <span>${m.name}</span>
                                 <i data-lucide="arrow-up-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-heading)]"></i>
                               </button>
                               <button 
                                 type="button"
                                 data-action="goto-specific-metric" 
                                 data-metric-id="${m.id}" 
                                 data-section-id="${section.id}"
                                 class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md text-[var(--color-heading)] dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 border border-purple-200/70 dark:border-purple-900/40 transition-all cursor-pointer shadow-2xs group shrink-0" 
                                 title="View ${m.name} in Metrics Archive"
                                 style="font-family: var(--font-droid), serif"
                               >
                                 <i data-lucide="bookmark" class="w-3.5 h-3.5 fill-current group-hover:scale-110 transition-transform"></i>
                                 <span>View Metric</span>
                               </button>
                             </div>
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
             <div class="border-l-4 border-[var(--color-heading)] pl-8 py-2 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
               <div>
                 <h2 class="text-3xl text-gray-900 dark:text-gray-100 mb-3" style="font-family: var(--font-lora), serif">${selectedMetric?.name}</h2>
                 <p class="text-gray-500 dark:text-gray-400 italic text-lg" style="font-family: var(--font-droid), serif">${selectedMetric?.description} (${state.selectedSystem})</p>
               </div>
               <button 
                 type="button"
                 data-action="goto-specific-metric" 
                 data-metric-id="${selectedMetric?.id}" 
                 class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-purple-50/80 dark:bg-slate-800 text-[var(--color-heading)] dark:text-[#C4B5FD] border border-purple-200/80 dark:border-purple-900/50 hover:bg-[var(--color-heading)] hover:text-white dark:hover:bg-[var(--color-heading)] dark:hover:text-white transition-all shadow-xs text-sm font-medium shrink-0 cursor-pointer group"
                 title="Jump directly to ${selectedMetric?.name} definition in Metrics Archive"
                 style="font-family: var(--font-droid), serif"
               >
                 <i data-lucide="bookmark" class="w-4 h-4 fill-current group-hover:scale-110 transition-transform"></i>
                 <span>View Definition</span>
               </button>
             </div>
             
             <div class="grid grid-cols-1 md:grid-cols-2 ${state.selectedSystem === 'System XOR' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4 max-w-7xl mx-auto">
                ${state.selectedSystem !== 'System XOR' ? renderStateCard('At Rest', "Observation", getMetricExpectationText(state.selectedMetricId, 'atRest', state.selectedSystem)) : ''}
                ${renderStateCard('In-Domain', "Observation", getMetricExpectationText(state.selectedMetricId, 'inDomain', state.selectedSystem))}
                ${renderStateCard('Out-of-Domain', "Observation", getMetricExpectationText(state.selectedMetricId, 'outOfDomain', state.selectedSystem))}
                ${renderStateCard('Black Box Model', "Observation", getMetricExpectationText(state.selectedMetricId, 'blackBoxModel', state.selectedSystem))}
             </div>
          </div>
        `}
      </div>
    </div>
  `;
}

function renderStateCard(title, subtitle, body) {
  return `
    <div class="flex flex-col bg-[#FCFBFF] dark:bg-slate-900 border border-[#E5E2EC] dark:border-slate-800 rounded-xl h-[380px] w-full shadow-sm overflow-hidden text-gray-800 dark:text-gray-200">
      <div class="p-8 border-b border-[#E5E2EC]/60 dark:border-slate-800 flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm h-[130px]">
        <h2 class="text-[1.35rem] text-[var(--color-heading)] font-semibold leading-snug" style="font-family: var(--font-lora), serif">${title}</h2>
      </div>

      <div class="p-8 flex-grow overflow-y-auto relative hide-scrollbar">
        <div class="animate-in fade-in duration-500 flex flex-col min-h-full">
          <h3 class="text-[1.1rem] font-medium text-gray-900 dark:text-gray-100 mb-4 flex-shrink-0" style="font-family: var(--font-lora), serif">${subtitle}</h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-[14px] pb-4" style="font-family: var(--font-fira), monospace">${body}</p>
        </div>
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
  // Handle clicking on the search modal backdrop (outside the dialog card)
  if (state.isSearchOpen && e.target && e.target.id === 'search-modal-backdrop') {
    state.isSearchOpen = false;
    renderApp();
    return;
  }

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
    navigateToMetric(state.selectedMetricId);
  } else if (action === 'goto-specific-metric') {
    const metricId = btn.getAttribute('data-metric-id');
    const sectionId = btn.getAttribute('data-section-id');
    navigateToMetric(metricId, sectionId);
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
  } else if (action === 'open-search') {
    state.isSearchOpen = true;
    renderApp();
    setTimeout(() => {
      const input = document.getElementById('global-search-input');
      if (input) {
        input.focus();
        input.select();
      }
    }, 50);
  } else if (action === 'close-search') {
    state.isSearchOpen = false;
    renderApp();
  } else if (action === 'clear-search-query') {
    state.searchQuery = '';
    renderApp();
    setTimeout(() => {
      const input = document.getElementById('global-search-input');
      if (input) input.focus();
    }, 50);
  } else if (action === 'set-search-filter') {
    state.searchFilter = btn.getAttribute('data-filter');
    renderApp();
    setTimeout(() => {
      const input = document.getElementById('global-search-input');
      if (input) input.focus();
    }, 50);
  } else if (action === 'select-search-result') {
    const itemType = btn.getAttribute('data-item-type');
    state.isSearchOpen = false;

    if (itemType === 'metric') {
      const sectionId = btn.getAttribute('data-section-id');
      const metricId = btn.getAttribute('data-metric-id');
      navigateToMetric(metricId, sectionId);
    } else if (itemType === 'system') {
      const system = btn.getAttribute('data-system');
      const exampleId = btn.getAttribute('data-example-id');
      state.currentView = 'examples';
      state.selectedSystem = system;
      if (exampleId) state.selectedExampleId = exampleId;
      state.viewMode = 'by-state';
      renderApp();
    } else if (itemType === 'example') {
      const system = btn.getAttribute('data-system');
      const exampleId = btn.getAttribute('data-example-id');
      state.currentView = 'examples';
      if (system) state.selectedSystem = system;
      if (exampleId) state.selectedExampleId = exampleId;
      state.viewMode = 'by-state';
      renderApp();
    }
  }
});

// Search input handling
document.addEventListener('input', e => {
  if (e.target && e.target.id === 'global-search-input') {
    state.searchQuery = e.target.value;
    
    // Update only the search results and filter tags rather than rerendering entire app to preserve input focus
    const modalRoot = document.getElementById('search-modal-root');
    if (modalRoot) {
      modalRoot.innerHTML = renderSearchModal();
      createIcons({ icons });
      const input = document.getElementById('global-search-input');
      if (input) {
        input.focus();
        const len = input.value.length;
        input.setSelectionRange(len, len);
      }
    }
  }
});

// Global keyboard shortcuts: '/' to open search, ESC to close
window.addEventListener('keydown', e => {
  // If user presses Escape, close search modal if open
  if (e.key === 'Escape' && state.isSearchOpen) {
    e.preventDefault();
    state.isSearchOpen = false;
    renderApp();
    return;
  }

  // If user presses '/' when not focused on an input/textarea, open search
  if (e.key === '/' && !state.isSearchOpen) {
    const activeEl = document.activeElement;
    const isEditing = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
    if (!isEditing) {
      e.preventDefault();
      state.isSearchOpen = true;
      renderApp();
      setTimeout(() => {
        const input = document.getElementById('global-search-input');
        if (input) {
          input.focus();
          input.select();
        }
      }, 50);
    }
  }
});

renderApp();
