import React, { useEffect, useState, } from 'react'
import { Animated, Dimensions, } from 'react-native'
const { width } = Dimensions.get('screen');
const FadeInView = (props) => {
  const [pan, setPan] = useState(new Animated.ValueXY({ x: width, y: 0 }));
  useEffect(() => {
    Animated.sequence([
      Animated.delay(props.delay || 50),
      Animated.spring(
        pan, 
        {
          toValue: {x:0 , y:0 },
        }
      )
    ]).start();
  }, []);

  return (
    <Animated.View {...props} style={{...props.style, transform: pan.getTranslateTransform()}}>
      { props.children }
    </Animated.View>
  )
}

export default FadeInView
