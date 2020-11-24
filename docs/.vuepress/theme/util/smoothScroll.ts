import {easeInOutCubic} from "./easingFunctions"

export function smoothScroll({from, to}: { from: number, to: number }) {

  const distance = to - from
  const duration = 1000
  let start: number | null = null

  console.log(distance)
  console.log("getHeightOfWindowScrollX: ", getHeightOfWindowScrollX() )

  window.requestAnimationFrame( step )

  function step( time: number ) {

    if ( start === null ) start = time

    const progress = time - start
    window.scrollTo( 0, easeInOutCubic( { time: progress, start: from, end: distance, distance: duration } ) )

    if (progress < duration) window.requestAnimationFrame(step)

  }

  function getHeightOfWindowScrollX(): number {
    return window.innerHeight - document.documentElement.clientHeight
  }

}
