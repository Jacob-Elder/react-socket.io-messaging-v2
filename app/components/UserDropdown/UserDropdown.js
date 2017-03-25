import React from 'react'
import './UserDropdown.css'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import Drawer from 'material-ui/Drawer'

class UserDropdown extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			open: false
		}
		this.toggleDrawer = this.toggleDrawer.bind(this)
	}

	toggleDrawer () {
		this.setState({open: !this.state.open})
	}

	render () {
		const drawerContents = <div>
			<FontIcon className='material-icons close' onClick={this.toggleDrawer}>close</FontIcon>
			<h3>Online Users</h3>
			<ul>
				{
					this.props.users.map(function (user, i) {
						return (
							<li key={i}>
								{user}
							</li>
						)
					})
				}
			</ul>
		</div>

		var label = '(' + this.props.users.length + ')'

		return (
			<div>
				<RaisedButton
					className='button'
					width='10px'
					label={label}
					onClick={this.toggleDrawer}
					primary={true}
				/>
				<Drawer
					open={this.state.open}
					children={drawerContents}
				/>
			</div>
		)
	}

}

UserDropdown.propTypes = {
	users: React.PropTypes.array
}

export default UserDropdown