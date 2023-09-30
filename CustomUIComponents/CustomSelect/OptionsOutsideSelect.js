import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import styled from "styled-components";
import CustomSlider from "COMPONENTS/CustomUIComponents/CustomSlider/CustomSlider";
import { Col, Row } from "react-bootstrap";

const ValuesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const Value = styled.div`
    border-radius: 2px;
    padding: 0rem;
    margin: 5px;
    font-size: 14px;
    color: grey;
    user-select: none;
`;

const XButton = styled.button`
    all: unset;
    margin-left: 0.5rem;
    color: black;
    transition: fill 0.15s ease-in-out;
    cursor: pointer;
    &:hover {
        color: #bb392d;
    }
    &:focus {
        color: #c82f21;
    }
`;
const OptionsOutsideSelect = (props) => {
    const { isMulti, value } = props;
    console.log("value", value);
    return (
        <div className="option-outside-select">
            <Select 
            {...props} 
            isClearable={false}
            controlShouldRenderValue={!isMulti} />
            <div className="selected-skills-container">
                <ValuesContainer className="value-container">
                    <Row className="d-flex mx-2">
                        <Col md={5} lg={5}>
                            <span className="skill-name">Name</span>
                        </Col>
                        <Col md={7} lg={7}>
                            <span className="skill-name">
                                Level of Proficiency
                            </span>
                        </Col>
                    </Row>
                    {isMulti
                        ? value.map((val) => (
                              <Row
                                  key={val.value}
                                  className="skill-slider-chip option"
                              >
                                  <Col md={5} lg={5}>
                                      <Value className="skillValue">
                                          {val.label}
                                      </Value>
                                  </Col>
                                  <Col
                                      md={7}
                                      lg={7}
                                      className="skills-slider d-flex align-items-center"
                                  >
                                      <CustomSlider
                                          id={val.value}
                                          label={val.label}
                                          skillLevel={val.skillLevel}
                                          handleOnClickSkillLevel={(value) =>
                                              props.handleOnClickSkillLevel(
                                                  val.value,
                                                  value
                                              )
                                          }
                                      />
                                      <XButton
                                          name={val.label}
                                          onClick={props.handleRemoveValue}
                                      >
                                          ✕
                                      </XButton>
                                  </Col>
                              </Row>
                          ))
                        : null}
                </ValuesContainer>
            </div>
        </div>
    );
};

OptionsOutsideSelect.propTypes = {
    options: PropTypes.array,
    isMulti: PropTypes.bool,
    isFormatOption: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    value: PropTypes.any,
    text: PropTypes.string,
    handleRemoveValue: PropTypes.func,
    skillLevel: PropTypes.number,
    handleOnClickSkillLevel: PropTypes.func,
    handleDeleteSkillClick: PropTypes.func,
};

export default OptionsOutsideSelect;
