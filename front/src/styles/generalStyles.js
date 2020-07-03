import { StyleSheet, Dimensions } from "react-native";

export const container = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    padding: 20
  },
  bodySubContainer: {
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  contentContainer: {
    paddingVertical: 20,
  }
})

export const dimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

export const cards = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowRadius: 3, // new to me
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  }
})

export const colors = {
  black: 'black',
  white: 'white',
  red: 'red',
  blue: 'blue',
  pink: 'pink',
  green: 'green',
  purple: 'purple',
  yellow: '#FFCB00',
  grey: '#A3A3A3',
  occupied: '#F0F0F0',
  occupiedBorders: '#DADADA',
  // legacy
  primary: '#7EB72E',
  darkGreen: '#5D8B1C',
}

export const header = StyleSheet.create({
  customHeader: {
    height: 120,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    justifyContent: 'center',
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  // Header A: - title and picture
  titleHeader: {
    flex: .8,
    flexDirection: 'row',
  },
  titleStyle: {
    flex: .8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureStyle: {
    flex: .2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  // Header B: - buttons and tabs
  tabsHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export const text = StyleSheet.create({
  titleText: 22,
  headerText: 18,
  subheaderText: 17,
  normalText: 15,
  buttonText: 15,
})

export const borders = StyleSheet.create({
  black: {
    borderWidth: 1,
    borderColor: 'black'
  },
  green: {
    borderWidth: 1,
    borderColor: 'green'
  },
  pink: {
    borderWidth: 1,
    borderColor: 'pink'
  },
  purple: {
    borderWidth: 1,
    borderColor: 'purple'
  },
  red: {
    borderWidth: 1,
    borderColor: 'red'
  },
})