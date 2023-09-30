import React, {useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card';

import hide from 'ASSETS/images/ic_a_hide.svg';
import view from 'ASSETS/images/ic_a_view.svg';

import "./CustomAccordion.scss";

/**
 * @param  {} props : The necessary data for accordion.
 * This is to display the accordion with props.data as a component/html element when expands.
 * With the use of customized header of accordion, the click is handled through customized component ContextAwareToggle.
 * This will need a data as array of 
 * {header : header text , id: a uniqueKey, data: as array with HTML element or component to render in body when expands}
 */

const CustomAccordion = (props) => { 
    const [activeKey, setActiveKey] = useState(props.defaultActiveKey);
    const [isExpanded, setIsExpanded] = useState(true); 
    
    const onSelect = (selectedId) => {
        setIsExpanded(selectedId !== null);
    }
    const onToggle = (selectedId) => {
        setActiveKey(selectedId);
    }

    return (
        <div className='custom-accordion-container'>
            <div className='custom-accordion'>
                <Accordion defaultActiveKey="0" flush onSelect = {onSelect} alwaysOpen={false}>
                    { props.accordionData && props.accordionData.map((accordion) => {
                        return <Accordion.Item className='mt-2' eventKey={ `${accordion.id}` } key={accordion.id}>
                            <Card className='p-0'>
                                <Card.Header className='accordion-header'>
                                        <div className='header-prefix'>{accordion.header} ()
                                            <span className='ms-2 header-prefix-data'>$20,000 </span>
                                        </div>
                                        <ContextAwareToggle eventKey={ `${accordion.id}` } callback={() => onToggle(accordion.id)}>
                                            <div className='header-suffix'>
                                                { isExpanded && activeKey === accordion.id
                                                    ? <img src={ hide } />
                                                    : <img src={ view } />
                                                }
                                                <span className='ms-2'>
                                                    { isExpanded && activeKey === accordion.id
                                                        ? "Hide"
                                                        : "View"
                                                    }
                                                </span>
                                            </div>
                                        </ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={ `${accordion.id}` }>
                                <Card.Body className='p-0'> { accordion.data }</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion.Item>
                    })
                }
                </Accordion>
            </div>
        </div>
    );
}

/**
 * @param  {} children : Component/ HTML element for toggle button on header of accordion.
 * @param  {} eventKey : The key of a accordion.
 * @param  {} callback : The callback function to call for handling of children.
 * The customized toggle button for accordion header.
 */
const ContextAwareToggle = ({ children, eventKey, callback}) =>  {
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => {callback && callback (eventKey)},
      
    );
  
    return (
      <div
        type="button"
        onClick={decoratedOnClick}
      >
        {children}
      </div>
    );
}

ContextAwareToggle.propTypes = {
    children: PropTypes.any,
    eventKey: PropTypes.any,
    callback: PropTypes.func, 
}

ContextAwareToggle.defaultProps = {
    children: <></>,
    eventKey: 0,
    callback: () => { },
}

CustomAccordion.propTypes = {
    defaultActiveKey: PropTypes.number,
    accordionData: PropTypes.array,
}

CustomAccordion.defaultProps = {
    defaultActiveKey: 0,
    accordionData: [],
}

export default CustomAccordion;