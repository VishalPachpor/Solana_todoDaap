
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base"
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react"
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui"
import {GlowWalletAdapter, PhantomWalletAdapter, SlopeWalletAdapter} from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo } from "react"
 
export const WalletConnectProvider = ({children}) => {
    const network = WalletAdapterNetwork.Devnet

    const endpoint = useMemo(() =>{
        if(network== WalletAdapterNetwork.Devnet){
            return "https://empty-late-sheet.solana-devnet.discover.quiknode.pro/bbdfeaab10b2bc422271c5d5fa6d4a69764d1604/"
        }
        return clusterApiUrl(network)
    },[network])
    const wallets = useMemo(()=>[new PhantomWalletAdapter(), new GlowWalletAdapter(), new SlopeWalletAdapter()],[network])
    
    return(
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider > {children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )

}