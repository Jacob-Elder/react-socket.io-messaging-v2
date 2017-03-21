import React from 'react'
import './Message.css'

class Message extends React.Component{

	render () {
		return (
			<div className='message'>
				<strong className='poster'>  {this.props.user}  </strong>
				<br />
				<span>{this.props.text}</span>
			</div>
		)
	}

}

Message.propTypes = {
	user: React.PropTypes.string,
	text: React.PropTypes.string
}

export default Message