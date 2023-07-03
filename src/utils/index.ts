export const getFloors = (start: number, stop: number, step = 1) => {
  const floors = Array.from({ length: Math.abs(stop - start) / step + 1 }, (_, index) =>
    start > stop ? start - index * step : start + index * step
  )
  floors.shift()
  return floors
}
