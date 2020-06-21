import React from 'react'
import Layout from '../../components/layout'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { PostTitle } from '../../templates/blogPost'
import confusedEmoji from '../../assets/images/emoji-confused-face.png'
import smilingSweatEmoji from '../../assets/images/emoji-smiling-with-sweat.png'
import sunglassesEmoji from '../../assets/images/emoji-sunglasses.png'

/* TODOs
Make the list items sortable
Export as PDF/image - probably not going to do this
*/

const CONTROL_SPECTRUM_KEY = 'controlSpectrumData'

const EmojiSlider = styled.input`
  -webkit-appearance: none;
  outline: none;
  background: ${(props) => props.backgroundColor};
  height: 6px;
  border-radius: 5px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    outline: none;
    border: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: url(${(props) => props.emojiImageUrl});
    background-size: contain;
  }

  &::-moz-range-thumb {
    border: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: ${(props) => props.backgroundColor};
    cursor: pointer;
  }

  &::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: ${(props) => props.backgroundColor};
    border-radius: 5px;
  }
`

const GoalsList = styled.ul`
  margin-left: 0px;
`

const GoalItem = styled.li`
  display: flex;
  background-color: ${(props) => props.background};
  list-style-type: none;
  padding: 5px 10px;
  align-items: center;
`

const DragHandle = styled.div`
  margin-right: 8px;

  &:hover {
    cursor: move;
  }
`

class GoalPrioritisationTool extends React.Component {
  state = {
    currentItemText: '',
    items: {},
    itemsOrder: [],
  }
  itemTextInput = React.createRef()

  saveStateToLocalStorage = () => {
    localStorage.setItem(CONTROL_SPECTRUM_KEY, JSON.stringify(this.state))
  }

  handleCurrentItemNameChange = (e) => {
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
    const updatedItemsOrder = [...this.state.itemsOrder, newItemId]
    this.setState(
      {
        items: updatedItems,
        currentItemText: '',
        itemsOrder: updatedItemsOrder,
      },
      () => {
        this.itemTextInput.current.focus()
        this.saveStateToLocalStorage()
      }
    )
  }

  handleItemChange = (e, itemId) => {
    const propertyName = e.target.name
    const value = e.target.value
    const item = this.state.items[itemId]
    const updatedItem = { ...item, [propertyName]: value }
    this.setState(
      { items: { ...this.state.items, [itemId]: updatedItem } },
      () => this.saveStateToLocalStorage()
    )
  }

  deleteAllItems = () => {
    if (window.confirm('Are you sure you want to DELETE all items?')) {
      this.setState({ items: {}, itemsOrder: [] }, () => {
        this.itemTextInput.current.focus()
        this.saveStateToLocalStorage()
      })
    }
  }

  onDragEnd = ({ source, destination, draggableId }) => {
    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const updatedItemsOrder = [...this.state.itemsOrder]
    updatedItemsOrder.splice(source.index, 1)
    updatedItemsOrder.splice(destination.index, 0, draggableId)

    this.setState({ itemsOrder: [...updatedItemsOrder] }, () =>
      this.saveStateToLocalStorage()
    )
  }

  getEmojiUrlBasedOnValue = (value) =>
    value < 30
      ? sunglassesEmoji
      : value < 50
      ? smilingSweatEmoji
      : confusedEmoji

  componentDidMount = () => {
    this.itemTextInput.current.focus()
    const controlSpectrumDataString = localStorage.getItem(CONTROL_SPECTRUM_KEY)
    if (controlSpectrumDataString) {
      this.setState({ ...this.state, ...JSON.parse(controlSpectrumDataString) })
    }
  }

  renderItems = (items, itemsOrder) => {
    return (
      <Droppable droppableId={'mainList'}>
        {(provided) => (
          <GoalsList ref={provided.innerRef} {...provided.droppableProps}>
            {itemsOrder.map((itemId, i) => {
              const item = items[itemId]
              return (
                <Draggable key={itemId} draggableId={itemId} index={i}>
                  {(provided) => (
                    <GoalItem
                      background={
                        i % 2 === 0 ? 'rgba(130, 190, 237, 0.3)' : 'none'
                      }
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <DragHandle {...provided.dragHandleProps}>↕️</DragHandle>
                      <input
                        name="name"
                        type="text"
                        style={{
                          flex: 1,
                          marginRight: '15px',
                          background: `transparent`,
                          border: 'none',
                          outline: 'none',
                        }}
                        value={item.name}
                        onChange={(e) => this.handleItemChange(e, itemId)}
                      />
                      <EmojiSlider
                        name="value"
                        type="range"
                        min="1"
                        max="100"
                        style={{ flex: 1 }}
                        backgroundColor={`${
                          i % 2 === 0 ? 'white' : 'rgba(130, 190, 237, 0.3)'
                        }`}
                        value={item.value}
                        onChange={(e) => this.handleItemChange(e, itemId)}
                        emojiImageUrl={this.getEmojiUrlBasedOnValue(item.value)}
                      />
                    </GoalItem>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </GoalsList>
        )}
      </Droppable>
    )
  }

  render() {
    const { location } = this.props
    const { items, itemsOrder } = this.state

    return (
      <Layout location={location}>
        <div>
          <PostTitle>Use this to figure out where to begin</PostTitle>
          <p style={{ textAlign: 'center' }}>
            This is NOT a todo list. It's a "to-achieve" list.
          </p>{' '}
          <p style={{ textAlign: 'center' }}>
            A tool to help you prioritze your goals -{' '}
            <em>
              based on how much control you have over whether you'll achieve it
              or not
            </em>{' '}
            - so you can focus on the right ones 😎
          </p>
          <p style={{ textAlign: 'center' }}>
            E.g. you don't have much control over getting a million YouTube
            subscribers. However, posting a video a week is a lot more "in your
            control". So in this case, that would be a better goal to prioritise
            and focus on.
          </p>
          <form onSubmit={this.handleItemAdd} style={{ display: 'flex' }}>
            <input
              type="text"
              placeholder="Thing you want to achieve.."
              value={this.state.currentItemText}
              onChange={this.handleCurrentItemNameChange}
              ref={this.itemTextInput}
              style={{ flex: 1, outline: 'none', padding: '5px' }}
            />
            <input type="submit" value="Add thing" />
            <input
              type="button"
              style={{ marginLeft: '5px' }}
              value="Delete all"
              onClick={this.deleteAllItems}
            />
          </form>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {itemsOrder.length > 0 && (
              <div
                style={{
                  alignSelf: 'flex-end',
                  width: '50%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                }}
              >
                <span>In my control</span>
                <span style={{ textAlign: 'right' }}>Out of my control</span>
              </div>
            )}
            <DragDropContext onDragEnd={this.onDragEnd}>
              {this.renderItems(items, itemsOrder)}
            </DragDropContext>
          </div>
        </div>
      </Layout>
    )
  }
}
export default GoalPrioritisationTool
