import axios from 'axios'

export async function UploadImages (files: HTMLInputElement[]): Promise<string[]> {
  try {
    if (!files.length) return []
    const result = []

    for (let i = 0; i < files.length; i++) {
      const formdata = new FormData()

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      formdata.append('file', files[i])

      const data: any = await axios.post('/static/upload-image', formdata, {
        headers: { 'Content-Type': 'multipart/form-data', },
      })

      result.push(data.image.name)
    }

    return result
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e)
    return []
  }
}
