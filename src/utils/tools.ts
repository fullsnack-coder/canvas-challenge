export const transformPixelsIntoGrayScale = (
  imageData: ImageData
): ImageData => {
  const { data } = imageData
  for (let i = 0; i < data.length; i += 4) {
    const brightness = data[i] * 0.34 + 0.5 * data[i + 1] + 0.16 * data[i + 2]
    data[i] = brightness
    data[i + 1] = brightness
    data[i + 2] = brightness
  }
  return imageData
}
