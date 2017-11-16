import React, { Component } from 'react'

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      message: '',
      messages: []
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            <div className='card'>
              <div className='card-body'>
                <div className='card-title'>Chat App</div>
                <hr />
                <div className='messages'>
                  {this.state.messages.map(message =>
                    <div>{message.author}: {message.message}</div>
                    )}
                </div>
              </div>
              <div className='card-footer'>
                <input type='text' placeholder='Username' className='form-control' value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} />
                <br />
                <input type='text' placeholder='Message' className='form-control' value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} />
                <br />
                <button className='btn btn-primary form-control'>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
