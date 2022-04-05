import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import GithubCorner from "react-github-corner";
import Web3Utils from "web3-utils";

@inject("UiStore")
@observer
export class Header extends React.Component {
  state = {
    multisenderAddress: null,
    myAddress: null,
    chain: null,
  };

  formatAddress(address) {
    return address
      ? Web3Utils.toChecksumAddress(address).replace(
          /(.{6}).*(.{6})/,
          "$1...$2"
        )
      : "";
  }

  componentDidMount() {
    (async () => {
      const multisenderAddress =
        await this.props.UiStore.tokenStore.proxyMultiSenderAddress();
      const chain = await this.props.UiStore.web3Store.netIdName;
      const myAddress = await this.props.UiStore.web3Store.defaultAccount;
      console.log("myAddress", myAddress);
      this.setState({ multisenderAddress, chain, myAddress });
    })();
  }

  render() {
    const explorerUrl =
      this.props.UiStore.web3Store.explorerUrl || "https://etherscan.io";

    return (
      <header className="header">
        <div className="multisend-container">
          <a href="#" className="header-logo">
            Bulk Token Transfer Tool
          </a>
          <form className="form form_header">
            {/* <Link className="button" to='/retry'>Retry Failed Transaction</Link> */}
            <label className="multisend-label">Chain: {this.state.chain}</label>
            <label className="multisend-label">
              My Address:{" "}
              <a
                target="_blank"
                href={`${explorerUrl}/address/${this.state.multisenderAddress}`}
              >
                {this.formatAddress(this.state.myAddress)}
              </a>
            </label>
            <label className="multisend-label">
              Contract Address:{" "}
              <a
                target="_blank"
                href={`${explorerUrl}/address/${this.state.multisenderAddress}`}
              >
                {this.formatAddress(this.state.multisenderAddress)}
              </a>
            </label>
          </form>
        </div>
        {/*<div className="multisend-container">*/}
        {/*  Supports Mainnet, Ropsten, Rinkeby, Kovan, Goerli, BSC, Mumbai, Matic*/}
        {/*</div>*/}
      </header>
    );
  }
}
