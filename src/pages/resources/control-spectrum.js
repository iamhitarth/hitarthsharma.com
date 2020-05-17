import React from 'react'
import Layout from '../../components/layout'
import styled from 'styled-components'

import { PostTitle } from '../../templates/blogPost'

/* TODOs
Export as PDF
*/

const CONTROL_SPECTRUM_KEY = 'controlSpectrumData'

class ControlSpectrumTool extends React.Component {
  state = {
    currentItemText: '',
    items: {},
  }
  itemTextInput = React.createRef()

  saveStateToLocalStorage = () => {
    localStorage.setItem(CONTROL_SPECTRUM_KEY, JSON.stringify(this.state))
  }

  handleItemTextChange = (e) => {
    this.setState({ currentItemText: e.target.value }, () =>
      this.saveStateToLocalStorage()
    )
  }

  handleItemAdd = (e) => {
    e.preventDefault()
    const updatedItems = { ...this.state.items }
    const newItemId = Date.now().toString()
    updatedItems[newItemId] = {
      id: newItemId,
      name: this.state.currentItemText,
      value: 1,
    }
    this.setState({ items: updatedItems, currentItemText: '' }, () => {
      this.itemTextInput.current.focus()
      this.saveStateToLocalStorage()
    })
  }

  handleItemValueChange = (itemId, value) => {
    const item = this.state.items[itemId]
    const updatedItem = { ...item, value }
    console.log(updatedItem)
    this.setState(
      { items: { ...this.state.items, [itemId]: updatedItem } },
      () => this.saveStateToLocalStorage()
    )
  }

  componentDidMount = () => {
    this.itemTextInput.current.focus()
    const controlSpectrumDataString = localStorage.getItem(CONTROL_SPECTRUM_KEY)
    if (controlSpectrumDataString) {
      this.setState({ ...this.state, ...JSON.parse(controlSpectrumDataString) })
    }
  }

  renderItems = (items) => {
    return (
      <ul style={{ marginLeft: '0' }}>
        {items.map((item, i) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              background: `${
                i % 2 === 0 ? 'rgba(130, 190, 237, 0.3)' : 'none'
              }`,
              listStyleType: 'none',
              padding: '5px 10px',
            }}
          >
            <div
              style={{
                flex: 1,
                marginRight: '15px',
              }}
            >
              {item.name}
            </div>
            <input
              type="range"
              min="1"
              max="100"
              defaultValue={1}
              style={{ flex: 1 }}
              value={item.value}
              onChange={(e) =>
                this.handleItemValueChange(item.id, e.target.value)
              }
            />
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const { location } = this.props
    const items = Object.values(this.state.items)
    return (
      <Layout location={location}>
        <div>
          <PostTitle>The Control Spectrum</PostTitle>
          <p>
            Use this tool when you have a lot of things that you want to and{' '}
            <em>can</em> do but aren't sure of where to begin.
          </p>
          <form onSubmit={this.handleItemAdd} style={{ display: 'flex' }}>
            <input
              type="text"
              placeholder="Thing you want to do.."
              value={this.state.currentItemText}
              onChange={this.handleItemTextChange}
              ref={this.itemTextInput}
              style={{ flex: 1 }}
            />
            <input type="submit" value="Add item" />
          </form>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.length > 0 && (
              <div
                style={{
                  alignSelf: 'flex-end',
                  width: '50%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>In my control</span>
                <span>Out of my control</span>
              </div>
            )}

            {this.renderItems(items)}
          </div>
        </div>
      </Layout>
    )
  }
}
export default ControlSpectrumTool
