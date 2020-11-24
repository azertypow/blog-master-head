export function linear(t: number, b: number, c: number, d: number) {
  return c*t/d + b
}

export function easeInOutQuad(t: number, b: number, c: number, d: number) {
  t /= d/2
  if (t < 1) return c/2*t*t + b
  t--
  return -c/2 * (t*(t-2) - 1) + b
}

interface EaseInOutCubicParams {
  time: number
  start: number
  end: number
  distance: number
}

export function easeInOutCubic({
                                 time,
                                 start,
                                 end,
                                 distance
                               }: EaseInOutCubicParams) {
  time /= distance/2
  if (time < 1) return end/2*time*time*time + start
  time -= 2
  return end/2*(time*time*time + 2) + start
}
