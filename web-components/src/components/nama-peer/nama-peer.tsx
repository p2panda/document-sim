import { Component, Element, Host, h, Prop, EventEmitter, Event, Listen, State } from '@stencil/core';
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

  @State() online: boolean = true;

  @Element() el;

  @Event() namaSend: EventEmitter<{ peer: string; latency: number; operations: Operation[] }>;

  @Event() namaChange: EventEmitter<{ peer: string; operations: Operation[]; pruned: string[] }>;

  @Listen('namaSend', { target: 'window' })
  handleOnSend(e: CustomEvent<{ peer: string; latency: number; operations: Operation[] }>) {
    const { peer, latency, operations } = e.detail;

    if (this.author === peer) {
      return;
    }

    if (!this.online) {
      return;
    }

    setTimeout(() => {
      for (const operation of operations) {
        this.namaDoc.add(operation);
      }

      let pruned = [];
      this.namaDoc.pruneBeforeDepth(12).forEach(hashes => {
        pruned = pruned.concat(hashes);
      });

      this.namaChange.emit({ peer: this.author, operations: this.namaDoc.operations(), pruned });
    }, this.latency + latency);
  }

  publish() {
    if (!this.namaDoc) {
      return;
    }

    // Create a new operation for this author.
    const timestamp = new Date().getMilliseconds();
    this.namaDoc.create(this.author, this.seqNum, timestamp);
    this.seqNum += 1;

    let pruned = [];
    this.namaDoc.pruneBeforeDepth(12).forEach(hashes => {
      pruned = pruned.concat(hashes);
    });

    const operations = this.namaDoc.operations();

    if (this.online) {
      this.namaSend.emit({ peer: this.author, latency: this.latency, operations });
    }
    this.namaChange.emit({ peer: this.author, operations, pruned });
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
        <h2>{this.author}</h2>
        <nama-peer-controls
          online={this.online}
          latency={this.latency}
          frequency={this.interval}
          setOnline={value => (this.online = value)}
          setLatency={value => (this.latency = value)}
          setFrequency={value => (this.interval = value)}
        ></nama-peer-controls>
        <slot />
      </Host>
    );
  }
}
