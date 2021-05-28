import React,{ Component } from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from './Auxility';

const withErorHandler = (WrappedComponent, axios) =>
{
    return class extends Component{
        state=
        {
            error:null,
        }

        componentWillMount()
        {
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res,error=>{
                //console.log(error);
                this.setState({error:error});
            });
        }

        modalStateHandler =()=>
        {
            console.log('DONEEEEEEE!')
            this.setState({error:null});
        }

        render()
        {
            return(
            <Aux>
                <WrappedComponent {...this.props}/>
                <Modal
                active={this.state.error}
                clicked={this.modalStateHandler}
                >
                    {this.state.error ? this.state.error.message: null}
                </Modal>
            </Aux>
            )
        }

        componentWillUnmount()
        {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
    }
}

export default withErorHandler;