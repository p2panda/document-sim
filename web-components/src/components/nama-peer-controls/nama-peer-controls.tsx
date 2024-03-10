import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'nama-peer-controls',
  styleUrl: 'nama-peer-controls.css',
  shadow: true,
})
export class NamaPeerControls {
  @Prop() onOnlineChange: CallableFunction;

  onChange = e => {
    switch (e.target.name) {
      case 'online':
        this.onOnlineChange(e.target.checked);
    }
  };

  render() {
    return (
      <Host>
        <label htmlFor="online">online</label>
        <input checked={true} type="checkbox" name="online" onChange={this.onChange} />
      </Host>
    );
  }
}
