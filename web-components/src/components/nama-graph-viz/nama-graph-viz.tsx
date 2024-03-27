import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';
// import { Document, Operation } from 'document-viz-wasm';
import { initGraph, gradientArray } from '../../utils/utils';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { Operation } from 'nama-document-viz-wasm';

@Component({
  tag: 'nama-graph-viz',
  styleUrl: 'nama-graph-viz.css',
  shadow: true,
})
export class NamaGraphViz {
  graph?: cytoscape.Core = null;

  @Prop() peer?: string;

  @Element() el;

  @Listen('namaChange', { target: 'window' })
  handleOnChange(e: CustomEvent<{ peer: string; offline: boolean; operations: Operation[]; pruned: string[] }>) {
    const operations = e.detail.operations;

    if (e.detail.peer !== this.peer) {
      return;
    }

    for (const operation of operations) {
      this.addNode(operation.authorName(), operation.hash(), operation.seqNum());
    }

    for (const operation of operations) {
      this.addEdge(operation.hash(), operation.previous());
    }
    this.prune(e.detail.pruned);
    this.layout();
  }

  addNode(author: string, id: string, seqNum: number) {
    if (this.graph.$(`#${id}`).length === 0) {
      this.graph.add({
        group: 'nodes',
        grabbable: false,
        data: {
          label: `${author}_${seqNum}`,
          id,
          isNew: true,
        },
        style: {
          'background-color': gradientArray[seqNum % gradientArray.length],
        },
      });
    }
  }

  addEdge(id: string, previous: string[]) {
    const target = this.graph.$(`#${id}`);
    for (const previousId of previous) {
      const source = this.graph.$(`#${previousId}`);

      if (source.length === 0) {
        return;
      }

      if (target.edgesWith(source).length !== 0) {
        return;
      }

      this.graph.add({
        group: 'edges',
        data: {
          source: previousId,
          target: id,
        },
      });
    }
  }

  prune(pruned: string[]) {
    for (const hash of pruned) {
      if (this.graph.$(`#${hash}`).length === 0) {
        continue;
      }

      const node = this.graph.$(`#${hash}`);
      this.graph.remove(node);
    }
  }

  layout() {
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
    let div = this.el.shadowRoot.querySelector('#document');
    this.graph = initGraph(div as HTMLElement);
  }

  render() {
    return (
      <Host>
        <div id="document"></div>
      </Host>
    );
  }
}
