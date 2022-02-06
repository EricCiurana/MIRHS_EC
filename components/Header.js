import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

const Header = (props) => {
	return (
		<Menu >
			<Link route="/">
				<a className="item">
					MIR Hospital Selection
				</a>
			</Link>
			<Menu.Menu position="right">
			<Link route="/">
				<a className="item">
					Index
				</a>
			</Link>
			<Link route="/MIR/new">
				<a className="item">
					Create new
				</a>
			</Link>
		</Menu.Menu>
		</Menu>
	)

};

export default Header;