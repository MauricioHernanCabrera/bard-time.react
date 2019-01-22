import React, { Component } from 'react'
import { Link } from './../routes'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import Icon from './../components/Icon'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class Layout extends Component {
  render () {
    const { children, title, withArrowBack, route, withTitleDefault, withNavigate } = this.props

    return (
      <div className="Layout">
        <Head>
          <title>{ title }</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
          <link href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Comfortaa:300,400,700" rel="stylesheet"/>
        </Head>

        <header className="Header">
          <div className="Title">
            {
              withArrowBack &&
              <Link route={route}>
                <a>
                  <Icon name="arrow_back" cursorPointer={true}/>
                </a>
              </Link>
            }
            
            <span>
              {
                withTitleDefault? `Bard Time` : `${title}`
              }
            </span>
          </div>
          
          {
            withNavigate &&
            <nav className="Nav">
              <ul className="Nav-list">
                <li className="Nav-item active">
                  <Link route="multimer">
                    <a>
                      Multimer
                    </a>
                  </Link>
                </li>
                {/* <li className="Nav-item">
                  <Link route="config">
                    <a>
                      Configuración
                    </a>
                  </Link>
                </li> */}
              </ul>
            </nav>
          }
        </header>

        <section className="Body">
          {children}
        </section>

        <style jsx>{`
          .Layout {
            display: grid;
            grid-template-columns: 60px 1fr;
            grid-template-columns: minmax(auto, 1024px);
            grid-template-areas: "header"
                                 "body";
            justify-content: center;
            position: relative;
          }

          .Layout .Header {
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            border-bottom: 2px solid var(--color-cloud-2);
            grid-area: header;
          }

          .Layout .Header .Title {
            font-weight: 700;
            font-size: var(--fs-title);
            grid-column: 1 / 2;
            display: flex;
            align-items: center;
          }

          :global(.Layout .Header .Title span) {
            margin-left: 0px;
            margin-right: 10px;
          }

          .Layout .Header .Nav {
            grid-column: 2 / 3;
          }

          .Layout .Header .Nav .Nav-list {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .Layout .Header .Nav .Nav-list .Nav-item {
            margin-right: 5px;
            font-weight: 700;
            border-radius: 20px;
            transition: .3s;
          }

          {/* .Header .nav .nav-list .nav-item:nth-child(1) {
            background-color: var(--color-cloud-3);
          } */}

          .Layout .Header .Nav .Nav-list .Nav-item.active,
          .Layout .Header .Nav .Nav-list .Nav-item:hover {
            background-color: var(--color-cloud-3);
          }
          
          .Layout .Header .Nav .Nav-list .Nav-item.active a,
          .Layout .Header .Nav .Nav-list .Nav-item:hover a {
            color: white;
          }

          .Layout .Header .Nav .Nav-list .Nav-item a {
            text-decoration: none;
            font-size: var(--fs-body);
            padding: 10px 15px;
            display: block;
            color: var(--color-licorice-1);
            transition: .3s;
          }



          .Layout .Body {
            display: grid;
            min-height: calc(100vh - 60px);
            grid-template-columns: minmax(auto, 1024px);
            grid-template-rows: 1fr;
            justify-content: center;
            padding: 20px;
            grid-area: 'body';
          }

        `}</style>

        <style jsx global>{`
          :root {
            --color-kiwi-3: #7AC70C;
            --color-kiwi-2: #8EE000;
            --color-kiwi-1: #BFF199;
            
            --color-blueberry-3: #1CB0F6;
            --color-blueberry-2: #14D4F4;
            --color-blueberry-1: #BCE9FF;

            --color-raspberry-3: #D33131;
            --color-raspberry-2: #E53B3B;
            --color-raspberry-1: #FF9797;

            --color-banana-3: #FFB020;
            --color-banana-2: #FFC300;
            --color-banana-1: #FFF277;

            --color-pumpkin-3: #FA811B;
            --color-pumpkin-2: #FF9400;
            --color-pumpkin-1: #FFCF7A;

            --color-jelly-3: #8549BA;
            --color-jelly-2: #A560EB;
            --color-jelly-1: #CA94FF;

            --color-cocoa-3: #864E1B;
            --color-cocoa-2: #A86425;
            --color-cocoa-1: #DEAC5F;

            --color-licorice-3: #4C4C4C;
            --color-licorice-2: #777777;
            --color-licorice-1: #AFAFAF;

            --color-cloud-3: #CFCFCF;
            --color-cloud-2: #DDDDDD;
            --color-cloud-1: #F0F0F0;

            --color-creme: #FFFFFF;

            --font-family: 'Comfortaa', sans-serif;

            --fs-display-4: 112px;
            --fs-display-3: 56px;
            --fs-display-2: 45px;
            --fs-display-1: 34px;
            --fs-headline: 24px;
            --fs-title: 20px;
            --fs-subheading: 16px;
            --fs-body: 14px;
            --fs-caption: 12px;
          }

          body {
            margin: 0;
            font-family: var(--font-family);
            background: var(--color-cloud-1);
            color: var(--color-licorice-3);
          }

          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: var(--color-kiwi-2);

            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;

            width: 100%;
            height: 2px;
          }

          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px var(--color-kiwi-2), 0 0 5px var(--color-kiwi-2);
            opacity: 1.0;

            -webkit-transform: rotate(3deg) translate(0px, -4px);
                -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
          }

          #nprogress .spinner {
            display: block;
            position: fixed;
            z-index: 1031;
            top: 15px;
            right: 15px;
          }

          #nprogress .spinner-icon {
            width: 18px;
            height: 18px;
            box-sizing: border-box;

            border: solid 2px transparent;
            border-top-color: var(--color-kiwi-2);
            border-left-color: var(--color-kiwi-2);
            border-radius: 50%;

            -webkit-animation: nprogress-spinner 400ms linear infinite;
                    animation: nprogress-spinner 400ms linear infinite;
          }

          .nprogress-custom-parent {
            overflow: hidden;
            position: relative;
          }

          .nprogress-custom-parent #nprogress .spinner,
          .nprogress-custom-parent #nprogress .bar {
            position: absolute;
          }

          @-webkit-keyframes nprogress-spinner {
            0%   { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }
          @keyframes nprogress-spinner {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

        `}</style>
      </div>
    )
  }
}

Layout.defaultProps = {
  withArrowBack: false,
  withTitleDefault: true,
  withNavigate: true,
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  withArrowBack: PropTypes.bool,
  withTitleDefault: PropTypes.bool,
  withNavigate: PropTypes.bool,
  route: PropTypes.string,
}

export default Layout
