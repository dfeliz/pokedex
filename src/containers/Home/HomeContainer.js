import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Segment } from 'semantic-ui-react';
import RoundButton from '../../components/UI/RoundButton/RoundButton';
import PokemonList from '../../containers/PokemonList/PokemonList';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import CatchContainer from './CatchContainer';
import '../../components/Home/Home.css';
import axios from 'axios';

class HomeContainer extends Component {
    state = { 
        catching: false,
        catches: [],
    }

    componentDidMount() {
        this.fetchCatches();
    }

    handleCatchVisibility = () => {
        this.setState((prevState) => {
            return {
                catching: !prevState.catching 
            }
        })
        this.fetchCatches();
    }

    fetchCatches = async () => {
        let data = {
            user_username: window.localStorage.getItem('user')
        }

        await axios.post('http://localhost:3000/user/catches', data, {
            headers: {
                "Authorization" : window.localStorage.getItem('token'),
            }
        }).then((response) => {
            this.setState({ catches: response.data });
        }).catch((err) => {
            alert('Could not fetch your pokemon list');
            console.log(err);
        })
    }
    
    render () {
        return(
            <Aux>
                <Modal show={this.state.catching} onBackdropClick={this.handleCatchVisibility}>
                    <CatchContainer onCatch={this.handleCatchVisibility}/>
                </Modal>
                <Layout>
                    <div className="AddButtonSpace">
                        <RoundButton color="blue" onClick={this.handleCatchVisibility}><i className="large plus icon"></i></RoundButton>
                    </div>
                    <Container>
                        <Segment>
                            <h1>List</h1>
                            <div className="ui divider" />
                            <PokemonList fetchCatches={this.fetchCatches} catches={this.state.catches}/>
                        </Segment>
                    </Container>
                </Layout>
            </Aux>
        )
    }
}

export default HomeContainer;