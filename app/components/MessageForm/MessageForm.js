import React from 'react'
import './MessageForm.css'

class MessageForm extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			text: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.updateInput = this.updateInput.bind(this)
	}

	handleSubmit (e) {
		e.preventDefault()
		var message = {
			name: this.props.user,
			content: this.state.text
		}
		this.props.onMessageSubmit(message)
		this.setState({ text: '' })
	}

	updateInput (e) {
		this.setState({ text: e.target.value })
	}

	render () {
		return (
			<div className='message_form'>
				<form onSubmit={this.handleSubmit}>
					<input
						className='message-input'
						onChange={this.updateInput}
						value={this.state.text}
						placeholder='Write a message'
					/>
				</form>
			</div>
		)
	}

}

MessageForm.propTypes = {
	user: React.PropTypes.string,
	onMessageSubmit: React.PropTypes.func
}

export default MessageForm