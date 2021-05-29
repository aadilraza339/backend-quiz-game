import React from 'react';
import '../style/quiz.css'
import Question_data from '../assets/data';
import Axios from 'axios'
import Question from './question'

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            questions : Question_data,
            persons: []

        };
    }

    componentDidMount() {
      Axios.get(`http://localhost:8000/get`)
        .then(res => {
          const persons = res.data;
          console.log(persons,'ss');
          this.setState({ persons });
        })
    }

    handleInputChange = (e) => {

        this.setState({

            [e.target.name]: e.target.value   

        });
    }
    
    handleSubmit = (e) => {

        e.preventDefault();

        const url = 'http://localhost:8000/name';

        const user = {

            username: this.state.username, 
        }

        Axios.post(url, user).then((res) => {

            //handle your login 
            console.log(res,'ddd');

        }).catch((e) => {

            //handle your errors
        });

    }
    render() {
        return (
            <div>
                <div className='container' >
                    <img  className='note' src={'https://i.pinimg.com/originals/2f/df/a7/2fdfa7989a2d77a1327e45ce5d4447ab.jpg'} alt="BigCo Inc. logo"/>
                    <span className='heading' >Special  Quiz</span>
                    <form className='form' onSubmit={this.handleSubmit}>
                        <input type = "text" onChange={this.handleInputChange} name= "username" placeholder='enter your name' required></input>
                    </form>
                    <div>
                        <Question {...this.state}/>
                    </div>
                    <div className='score_card'>
                      { this.state.persons.map(person => 
                        <div className='user_score'>
                          <div className='username'>USER NAME {person.user_name}</div>
                          <div className='wrong'>MISTAKE = {person.wrong}</div>
                          <div className='date'>DATE = {person.Today}</div>

                        </div>
                      )}
                  </div>
                </div>
            </div>

        );
    } 
}

export default Login;