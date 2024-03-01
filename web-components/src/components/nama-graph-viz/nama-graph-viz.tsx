import { Component, Method, Element, h } from '@stencil/core';
// import { Document, Operation } from 'document-viz-wasm';
import { initGraph } from '../../utils/utils';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

@Component({
  tag: 'nama-graph-viz',
  styleUrl: 'nama-graph-viz.css',
  shadow: true,
})
export class NamaDocumentViz {
  graph?: cytoscape.Core = null;

  @Element() el;

  @Method()
  public async addNode(id: string, label: string, colour: number, previous?: Array<string>) {
    if (this.graph.$(`#${id}`).length !== 0) {
      return;
    }

    this.graph.add({
      group: 'nodes',
      grabbable: false,
      data: {
        label,
        id,
        isNew: true,
      },
      style: {
        'background-color': colour,
      },
    });

    for (const previousHash of previous) {
      if (this.graph.$(`#${previousHash}`).length !== 0) {
        this.graph.add({
          group: 'edges',
          data: {
            source: previousHash,
            target: id,
          },
        });
      }
    }
  }

  @Method()
  public async prune(id: string) {
    const node = this.graph.$(`#${id}`);
    this.graph.remove(node);
  }

  @Method()
  public async layout() {
    const options: dagre.DagreLayoutOptions = {
      name: 'dagre',
      animate: true,
      fit: true,
      nodeDimensionsIncludeLabels: true,
      animateFilter: function (node, _) {
        if (node.data().isNew) {
          node.data('isNew', false);
          return false;
        }
        return true;
      },
    };

    this.graph.layout(options).run();
  }

  componentDidLoad() {
    console.log('component will load');
    let div = this.el.shadowRoot.querySelector('#document');
    console.log(div);
    this.graph = initGraph(div as HTMLElement);
  }

  render() {
    return <div id="document"></div>;
  }
}
