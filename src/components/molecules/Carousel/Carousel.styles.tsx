import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../../theme/types';
import { CarouselStyles } from './Carousel.types';

export const createStyles = (theme: Theme): CarouselStyles => StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderWidth: 0,
  },
  slide: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  pagination: {
    position: 'absolute',
    bottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderWidth: 0, 
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginHorizontal: 4,
    borderWidth: 0, 
  },
  paginationDotActive: {
    backgroundColor: theme.colors.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 0, 
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  overlayText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
