import {ReactComponent as HomeLogo} from './../../images/home.svg'
import {ReactComponent as SgLogo} from './../../images/sg.svg'
import { useState } from 'react'

/**
 * Functional Component displays greet user message after user logged in.
 * @param {Object} props
 */
const GreetUserMsg = props => {
  if (props.activeUser) {
    return (
      <div className={`user-greet-msg ${props.alwaysShow ? 'show' : ''}`}>
        Welcome, {props.activeUser.name}
      </div>
    )
  }
  return ''
}

/**
 * Tab Button component
 * @param {Object} props
 */
const TabButton = props => {
  const onChange = (newOpt) => {
      props.onChange(newOpt)
  }
  return (<div className="tab-button-container">
      {props.options.map((opt, i) => 
          (<div key={i}
              className={`tab-item ${props.current === opt ? 'current' : ''}`}
              onClick={() => onChange(opt)}
              >{opt}</div>))}
  </div>)
}

/**
 * Checkbox component
 * @param {Object} props
 */
const CheckBox = props => {
  const onChange = (optKey) => {
      props.onChange(optKey, !props.options[optKey].checked)
  }

  return (<div className="checkbox-container">
      {Object.keys(props.options).map((optKey, i) => (<div key={i}>
          <input type="checkbox" id={optKey} value={optKey} checked={!!props.options[optKey].checked} onChange={() => onChange(optKey)}></input>
          <label htmlFor={optKey}>{props.options[optKey].label}</label><br></br>
      </div>))
      }
  </div>)
}

/**
 * Side panel wrapper component
 * @param {Object} props
 */
const SidePanelWrapper = props => {
  const {isOpen, onToggle, onClose, children} = props

  return (
      <div className={`side-panel-entry ${isOpen ? 'open' : ''}`}>
          <svg onClick={onToggle} className="side-panel-toggle-button" version="1.1" viewBox="0 0 35 35" enableBackground="new 0 0 35 35">
              <circle fill="#FFFFFF" opacity="0.5" cx="18.2" cy="17.6" r="15.5"></circle>
              <line stroke="#333333" x1="10.5" y1="13.2" x2="26.1" y2="13.2" strokeWidth="1.7" strokeMiterlimit="10" fill="none">
                  <animate attributeName="y2" from="13.2" to="21.9" dur="0.5s" />
              </line>
              <line stroke="#333333" x1="10.5" y1="17.6" x2="26.1" y2="17.6" opacity="1" strokeWidth="1.7" strokeMiterlimit="10" fill="none">
                  <animate attributeName="x2" from="26.1" to="10.5" dur="0.5s" />
              </line>
              <line stroke="#333333" x1="10.5" y1="21.9" x2="26.1" y2="21.9" strokeWidth="1.7" strokeMiterlimit="10" fill="none">
              <animate attributeName="y2" from="21.9" to="13.2" dur="0.5s" />
              </line>
          </svg>
          <div className="side-panel-container">
              <div className="side-panel-content">
              {children}
              </div>
              <div className="close-region" onClick={onClose}></div>
          </div>
        </div>
  )
}

/**
 * Slider Component
 * @param {Object} props 
 */
const Slider = props => {
  const {title, min, max, step, initialVal, onAfterChange} = props
  const [val, setVal] = useState(initialVal)
  return (<div className="slider">
          <span className="slider-title">{title}</span>
          <input type='range' min={min} max={max} step={step} value={val}
          onChange={e => setVal(e.target.value)}
          onMouseUp={() => onAfterChange(val)}
          onTouchEnd={() => onAfterChange(val)}/>
      </div>)
}

export {GreetUserMsg, HomeLogo, SgLogo, TabButton, CheckBox, SidePanelWrapper, Slider}
