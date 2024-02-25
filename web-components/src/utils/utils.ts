import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import Gradient from 'javascript-color-gradient';

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const gradientArray = new Gradient().setColorGradient('#3F2CAF', '#e9446a', '#edc988', '#607D8B').setMidpoint(20).getColors();

export const initGraph = (el: HTMLElement): cytoscape.Core => {
  cytoscape.use(dagre);
  return cytoscape({
    container: el,
    elements: [],
    style: [
      {
        selector: 'node',
        style: {
          'text-background-padding': '30',
          'width': 40,
          'height': 40,
          'label': 'data(label)',
        },
      },
      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'source-arrow-color': '#ccc',
          'source-arrow-shape': 'triangle',
          'curve-style': 'bezier',
        },
      },
    ],

    layout: {
      name: 'dagre',
    },
  });
};
