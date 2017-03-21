import React from 'react'
import './PickUsername.css'

class PickUsername extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			name: ''
		}
		this.submitUsername = this.submitUsername.bind(this)
		this.typeName = this.typeName.bind(this)
	}

	typeName (e) {
		this.setState({ name: e.target.value })
	}

	submitUsername (e) {
		e.preventDefault()
		var name = this.state.name
		this.props.submitUsername(name)
	}

	render () {
		return (
			<form className='username-form' onSubmit={this.submitUsername}>
				<h2>Choose a Nickname!</h2>
				<input
					type='text'
					value={this.state.name}
					onChange={this.typeName}
				/>
				<p>This is how Others will see you.</p>
			</form>
		)
	}

}

PickUsername.propTypes = {
	submitUsername: React.PropTypes.func
}

export default PickUsername