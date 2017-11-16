import React, { Component } from 'react'
import io from 'socket.io-client'
import { config } from 'dotenv'

config()
console.log(process.env)

class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      message: '',
      messages: []
    }
    this.socket = io(`192.168.15.119:3080`)
    this.socket.on('RECEIVE_MESSAGE', data => {
      this.addMessage(data)
    })
    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage (e) {
    e.preventDefault()
    this.socket.emit('SEND_MESSAGE', {
      author: this.state.username,
      message: this.state.message
    })

    this.setState({
      message: ''
    })
  }

  addMessage (data) {
    console.log(data)
    this.setState({
      messages: [...this.state.messages, data]
    })
    console.log(this.state.messages)
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
                  {this.state.messages.map(message => (
                    <div>
                      {message.author}: {message.message}
                    </div>
                  ))}
                </div>
              </div>
              <div className='card-footer'>
                <input
                  type='text'
                  placeholder='Username'
                  className='form-control'
                  value={this.state.username}
                  onChange={ev => this.setState({ username: ev.target.value })}
                />
                <br />
                <input
                  type='text'
                  placeholder='Message'
                  className='form-control'
                  value={this.state.message}
                  onChange={ev => this.setState({ message: ev.target.value })}
                />
                <br />
                <button
                  className='btn btn-primary form-control'
                  onClick={this.sendMessage}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
