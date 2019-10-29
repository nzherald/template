import {useState, useRef, useCallback, useEffect} from 'react'
import { drag } from 'd3-drag'
import { select, touch, mouse } from 'd3-selection'

export default () => {
    const [pos,setPos] = useState({x:0,y:0})
    const ref = useRef(null)
    
    
}