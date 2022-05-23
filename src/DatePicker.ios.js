/**
 * @prettier
 * @flow
 * */

import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  onDateSelected: Date => void,
  initDate: Date
}

type State = {
  chosenDate: Date
}

export default class DatePicker extends React.Component<Props, State> {
  constructor(props: Props){
    super(props)
    this.state = { chosenDate: props.initDate || new Date() }
  }

  setDate = (event, selectedDate) => {
    this.setState({chosenDate: selectedDate})
    const { onDateSelected } = this.props
    if (onDateSelected) onDateSelected(selectedDate)
  }

  render(){
    return (
        <RNDateTimePicker
          style={styles.picker}
          value={this.state.chosenDate}
          onChange={this.setDate}
          {...this.props}
        />
    )
  }
}

let styles = StyleSheet.create({
  picker: {
    width: Dimensions.get('screen').width
  },
})
