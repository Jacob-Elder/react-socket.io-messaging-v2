import React from 'react'
import './UserDropdown.css'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

class UserDropdown extends React.Component {

	render () {
		return (
			<RaisedButton
				className='button'
				label='click me!'
				primary={true}
			/>
		)
	}

}

export default UserDropdown