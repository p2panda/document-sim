import { Component, Method, Prop, Element, h } from '@stencil/core';
import { gradientArray, initGraph } from '../../utils/utils';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

@Component({
  tag: 'nama-log-viz',
  styleUrl: 'nama-log-viz.css',
  shadow: true,
})
export class NamaLogViz {
  /**
   * The log authors name
   */
  @Prop() author: string;

  graph?: cytoscape.Core = null;

  @Element() el;

  @Method()
  public async addNode(id: string, seqNum: number, previous?: string) {
    this.graph.add({
      group: 'nodes',
      grabbable: false,
      data: {
        label: `${this.author}_${seqNum}`,
        id,
        isNew: true,
      },
      style: {
        'background-color': gradientArray[seqNum % gradientArray.length],
      },
    });

    if (previous && this.graph.$(`#${previous}`).length !== 0) {
      this.graph.add({
        group: 'edges',
        data: {
          source: previous,
          target: id,
        },
      });
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
      fit: false,
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
    let div = this.el.shadowRoot.querySelector('#log');
    console.log(div);
    this.graph = initGraph(div as HTMLElement);
  }

  render() {
    return <div id="log"></div>;
  }
}
