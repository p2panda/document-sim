import { Component, Element, Host, h, Prop, EventEmitter, Event, Listen } from '@stencil/core';
import { Document, Operation } from 'document-viz-wasm';

@Component({
  tag: 'nama-peer',
  styleUrl: 'nama-peer.css',
  shadow: true,
})
export class NamaPeer {
  @Prop() namaDoc?: Document = null;

  intervalID?: NodeJS.Timer;

  seqNum: number = 0;

  @Prop() author: string = 'noname';

  @Prop() latency: number = 0;

  @Prop() interval: number = 1000;

  @Element() el;

  @Event() namaSend: EventEmitter<{ latency: number; operation: Operation }>;

  @Event() namaPrune: EventEmitter<{ peer: string; pruned: string[] }>;

  @Listen('namaSend', { target: 'window' })
  handleOnSend(e: CustomEvent<{ latency: number; operation: Operation }>) {
    const operation = e.detail.operation;

    setTimeout(async () => {
      this.namaDoc.add(operation);
      this.namaDoc.pruneBeforeDepthPerLog(4);
    }, this.latency + e.detail.latency);
  }

  publish() {
    if (!this.namaDoc) {
      return;
    }

    // Create a new operation for this author.
    const timestamp = new Date().getMilliseconds();
    const operation = this.namaDoc.create(this.author, this.seqNum, timestamp);
    this.seqNum += 1;

    // Prune the local document.
    let pruned = [];
    this.namaDoc.pruneBeforeDepthPerLog(4).forEach(hashes => {
      pruned = pruned.concat(hashes);
    });

    // Emit both a namaSend and namaPrune event.
    this.namaSend.emit({ latency: this.latency, operation });
    this.namaPrune.emit({ peer: this.author, pruned });
  }

  componentWillUpdate() {
    clearInterval(this.intervalID);
    this.intervalID = null;
  }

  componentDidUpdate() {
    this.intervalID = setInterval(this.publish.bind(this), this.interval);
  }

  render() {
    return (
      <Host>
        <slot name="peerContent"></slot>{' '}
      </Host>
    );
  }
}
