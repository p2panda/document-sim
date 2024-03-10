import { Component, Element, h, Prop, Listen } from '@stencil/core';
// import { Document, Operation } from 'document-viz-wasm';
import { initGraph, gradientArray } from '../../utils/utils';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { Operation } from 'document-viz-wasm';

@Component({
  tag: 'nama-log-viz',
  styleUrl: 'nama-log-viz.css',
  shadow: true,
})
export class NamaLogViz {
  graph?: cytoscape.Core = null;

  @Prop() peer?: string;

  @Element() el;

  @Listen('namaChange', { target: 'window' })
  handleOnChange(e: CustomEvent<{ peer: string; operations: Operation[]; pruned: string[] }>) {
    if (this.peer !== e.detail.peer) {
      return;
    }

    const operations = e.detail.operations;
    for (const operation of operations) {
      if (this.peer !== operation.authorName()) {
        continue;
      }

      this.addNode(operation.authorName(), operation.hash(), operation.seqNum());
    }

    for (const operation of operations) {
      if (this.peer !== operation.authorName()) {
        continue;
      }

      this.addEdge(operation.hash(), operation.backlink());
    }

    this.prune(e.detail.pruned);
    this.layout();
  }

  addNode(author: string, id: string, seqNum: number) {
    if (this.graph.$(`#${id}`).length !== 0) {
      return;
    }

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

  addEdge(id: string, backlink: string) {
    const target = this.graph.$(`#${id}`);
    const source = this.graph.$(`#${backlink}`);

    if (target.length === 0) {
      return;
    }

    if (source.length === 0) {
      return;
    }

    if (target.edgesWith(source).length !== 0) {
      return;
    }

    this.graph.add({
      group: 'edges',
      data: {
        source: backlink,
        target: id,
      },
    });
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
    let div = this.el.shadowRoot.querySelector('#log');
    this.graph = initGraph(div as HTMLElement);
  }

  render() {
    return <div id="log"></div>;
  }
}
