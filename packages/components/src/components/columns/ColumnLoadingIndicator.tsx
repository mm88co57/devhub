import React from 'react'
import { StyleSheet, View } from 'react-native'

import { useColumnData } from '../../hooks/use-column-data'
import { useReduxState } from '../../hooks/use-redux-state'
import * as selectors from '../../redux/selectors'
import { ProgressBar } from '../common/ProgressBar'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
})

export interface ColumnLoadingIndicatorProps {
  columnId: string
}

export const ColumnLoadingIndicator = React.memo(
  (props: ColumnLoadingIndicatorProps) => {
    const { columnId } = props

    const isLoggingIn = useReduxState(selectors.isLoggingInSelector)
    const { loadState } = useColumnData(columnId || '')

    if (!(isLoggingIn || (loadState && loadState.includes('loading'))))
      return null

    return (
      <View style={styles.container}>
        <ProgressBar indeterminate />
      </View>
    )
  },
)

ColumnLoadingIndicator.displayName = 'ColumnLoadingIndicator'
