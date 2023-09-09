import axios from 'axios'
// import noImage from '~/shared/assets/images/noImage.jpg'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const noImage = require('../../shared/assets/images/noImage.jpg').default

async function checkImage (imageUrl: string): Promise<any> {
  try {
    if (!imageUrl) return noImage
    const data = await axios.get(`static/image/${imageUrl}`)

    if (!data) {
      return noImage
    }

    return `http://localhost:8080/static/image/${imageUrl}`
  } catch {
    return noImage
  }
}

export {
  checkImage
}
