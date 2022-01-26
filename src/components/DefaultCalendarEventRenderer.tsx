import dayjs from 'dayjs'
import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { CalendarTouchableOpacityProps, ICalendarEventBase } from '../interfaces'
import { useTheme } from '../theme/ThemeContext'
import { formatStartEnd } from '../utils'
import { Draggable } from './CalendarDraggable'

interface DefaultCalendarEventRendererProps<T extends ICalendarEventBase> {
  touchableOpacityProps: CalendarTouchableOpacityProps
  event: T
  showTime?: boolean
  textColor: string
  ampm: boolean
  moveCallBack: any
  events: any[]
  dateRange: dayjs.Dayjs[]
}

export function DefaultCalendarEventRenderer<T extends ICalendarEventBase>({
  touchableOpacityProps,
  event,
  showTime = true,
  textColor,
  ampm,
  moveCallBack,
  events,
  dateRange,
}: DefaultCalendarEventRendererProps<T>) {
  const theme = useTheme()
  const eventTimeStyle = { fontSize: theme.typography.xs.fontSize, color: textColor }
  const eventTitleStyle = { fontSize: theme.typography.sm.fontSize, color: textColor }

  return (
    <Draggable
      touchableOpacityProps={touchableOpacityProps}
      moveCallBack={moveCallBack}
      event={event}
      events={events}
      dateRange={dateRange}
    >
      <TouchableOpacity
        onPress={touchableOpacityProps.onPress}
        style={{ width: '100%', height: '100%' }}
      >
        {dayjs(event.end).diff(event.start, 'minute') < 32 && showTime ? (
          <Text style={eventTitleStyle}>
            {event.title},
            <Text style={eventTimeStyle}>
              {dayjs(event.start).format(ampm ? 'hh:mm a' : 'HH:mm')}
            </Text>
          </Text>
        ) : (
          <>
            <Text style={eventTitleStyle}>{event.title}</Text>
            {showTime && (
              <Text style={eventTimeStyle}>
                {formatStartEnd(event.start, event.end, ampm ? 'h:mm a' : 'HH:mm')}
              </Text>
            )}
            {event.children && event.children}
          </>
        )}
      </TouchableOpacity>
    </Draggable>
  )
}
