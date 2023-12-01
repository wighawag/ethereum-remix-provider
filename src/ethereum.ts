import {Provider} from '@remix-project/remix-simulator';
import { PrivateKeyAccount, generatePrivateKey, mnemonicToAccount, privateKeyToAccount } from 'viem/accounts'

export function setupEthereum(element: HTMLButtonElement) {

    
    const provider = new Provider()
    let account: PrivateKeyAccount;

    const sendTx = (count: number) => {
        provider.sendAsync({method: 'eth_sendTransaction', params: [{from: account.address, to: account.address, gas: "0x21000", gasPrice: "0x1", data: "0x", value: "0x0"}], jsonrpc: "2.0", id: 1}, (err, response) => {
            if (!response || err) {
                element.innerHTML = `ERROR: ${err || 'empty response'}`
            }
        });
    }
      
    provider.init().then(() => {
        const pk = generatePrivateKey();
        account = privateKeyToAccount(pk);
        provider.Accounts._addAccount(pk.slice(2), "0x1000000000000000000000")

        
        element.addEventListener('click', () => sendTx(1));
        setInterval(() => {

            provider.sendAsync({method: 'eth_blockNumber', params: [], jsonrpc: "2.0", id: 1}, (err, response) => {
                if (!response || err) {
                    element.innerHTML = `ERROR: ${err || 'empty response'}`
                } else {
                    element.innerHTML = Number(response.result).toString()
                }
            });

        }, 1000);
      }).catch((error) => {
        console.error(error);
      })
    
  }
  