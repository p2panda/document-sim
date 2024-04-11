# `p2panda` document simulator

Live [here](https://p2panda.github.io/document-sim/)!

![screenshot of document graph simulation](/screenshot.png)


Simulate p2panda documents and visualize changes:
* peers publish operations at different frequencies and with different network latencies
* documents can have different "pruning strategies" (the amount of history kept)
* capabilities can be issued to give non-owner peers document access authorization 

## dev

```bash
# Compile and bundle all web assets
npm run build

# Run dev server
npm run start
```
