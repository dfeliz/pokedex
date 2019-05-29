import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import Pokedex from '../../components/Pokedex/Pokedex';

class PokedexContainer extends Component {

    render () {
        return (
            <Layout>
                <Pokedex />
            </Layout>
        )
    }
}

export default PokedexContainer;