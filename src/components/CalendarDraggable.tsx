import React, { useRef, useState } from 'react'
import { Animated, PanResponder, PanResponderGestureState, StyleSheet, View } from 'react-native'

import { widthContext } from './CalendarBody'

export interface panXY {
  _value: number
}
export interface currentType {
  x: any
  y: any
  setOffset: any
  flattenOffset: any
  setValue: any
}

export const Draggable = (props: any) => {
  const cellWidth = React.useContext(widthContext)
  const cellHeight = 1000 / 24

  const [opacity, setOpacity] = useState<number>(1)

  const previousChangeKey = useRef<string>(`0-0-${props.event.title}`)

  const getChangedInformation = (gestureState: PanResponderGestureState) => {
    const xUnit = (cellWidth - 50) / 3.5
    const xDif = gestureState.moveX - gestureState.x0
    const xUnits = Math.floor(xDif / xUnit + 0.5)

    const yUnit = cellHeight
    const yDif = gestureState.moveY - gestureState.y0
    var yUnits = Math.floor((4 * yDif) / yUnit + 0.5)
    yUnits = yUnits / 4
    yUnits = ~~yUnits / 2
    return { day: xUnits, hour: yUnits, event: props.event }
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_e, gestureState) => {
        setOpacity(0.25)
        const change = getChangedInformation(gestureState)
        if (previousChangeKey.current === `${change.day}-${change.hour}-${props.event}`) return
        previousChangeKey.current = `${change.day}-${change.hour}-${props.event}`
        props.moveCallBack(change)
      },
      onPanResponderRelease: (_e, gestureState) => {
        setOpacity(1)
        const change = getChangedInformation(gestureState)
        props.moveCallBack(change)
      },
    }),
  ).current

  return (
    <Animated.View
      style={[
        (props.touchableOpacityProps && props.touchableOpacityProps.style) || styles.box,
        {
          opacity,
        },
      ]}
      {...panResponder.panHandlers}
    >
      {props.children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
})
