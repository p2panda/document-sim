import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'nama-peer-controls',
  styleUrl: 'nama-peer-controls.css',
  shadow: true,
})
export class NamaPeerControls {
  @Prop() setOnline: CallableFunction;

  @Prop() setLatency: CallableFunction;

  @Prop() setFrequency: CallableFunction;

  @Prop() online: boolean;

  @Prop() latency: number;

  @Prop() frequency: number;

  onChange = e => {
    switch (e.target.name) {
      case 'online':
        this.setOnline(e.target.checked);
        break;
      case 'latency':
        this.setLatency(e.target.value);
        break;
      case 'frequency':
        this.setFrequency(e.target.value);
        break;
    }
  };

  render() {
    return (
      <Host>
        <div id="wrapper">
          <div class="input-field">
            <label htmlFor="online">online</label>
            <input checked={this.online} type="checkbox" name="online" onChange={this.onChange} />
          </div>
          <div class="input-field">
            <label htmlFor="latency">latency: {this.latency}ms</label>
            <input name="latency" type="range" min="0" max="1000" value={this.latency} onChange={this.onChange} />
          </div>
          <div class="input-field">
            <label htmlFor="frequency">frequency: {this.frequency}ms</label>
            <input name="frequency" type="range" min={500} max={10000} value={this.frequency} onChange={this.onChange} />
          </div>
        </div>
      </Host>
    );
  }
}
