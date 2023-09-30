import React from 'react'
import { translate } from 'SERVICES/i18n';
import PropTypes from 'prop-types'

import "./ChipList.scss";
import Ic_close from "ASSETS/images/Ic_close.svg";

const ChipList = (props) => {

	const clearFilter = (item) => {
		props.clearFilter(item);
	}

	return (
		<div className='chip-list'>
			{props.selectedCheckboxes?.map((item, index) => {
				return (
					<div className='wrapper ms-2' key={index}>
						<div className='label'>{item.label}</div>
						<div className='d-flex' onClick={() => clearFilter(item)}>
							<img className="cursorPointer close" src={Ic_close} />
						</div>
					</div>
				)
			})
			}
			{props.selectedCheckboxes?.length > 0 &&
				<div className='px-2 link-button' onClick={props.clearAllFilter}>
					{translate("CLEAR_ALL")}
				</div>
			}
		</div>

	)
}

ChipList.propTypes = {
	clearAllFilter: PropTypes.func,
	clearFilter: PropTypes.func,
	selectedCheckboxes: PropTypes.array
}

export default ChipList
