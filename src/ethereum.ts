import {Provider} from '@remix-project/remix-simulator';

export function setupEthereum(element: HTMLButtonElement) {
    const provider = new Provider()

    setInterval(() => {
        provider.sendAsync({method: 'eth_blockNumber', params: [], jsonrpc: "2.0", id: 1}, (err, result) => {
            if (err) {
                element.innerHTML = `ERROR: ${err}`
            } else {
                element.innerHTML = Number(result).toString()
            }
        })
    }, 1000);
  }
  