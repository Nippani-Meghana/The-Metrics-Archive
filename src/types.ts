export interface Metric {
  id: string;
  name: string;
  description: string;
  mathematics?: string;
  papers: { title: string; url: string }[];
}

export interface MetricSection {
  id: string;
  title: string;
  metrics: Metric[];
}

export interface ExampleSection {
  id: string;
  title: string;
  description: string;
  content: string;
}
