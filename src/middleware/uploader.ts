import { Request, Response, NextFunction } from 'express'
import { UploadedFile } from 'express-fileupload'

/**
 *
 * @param request
 * @param response
 * @param next
 */
const uploader = (request: Request, response: Response, next: NextFunction) => {
  try {
    if (!request.files) {
      console.log('no file upload!')
    } else {
      let avatar: UploadedFile | UploadedFile[] = request.files.avatar

      /* @ts-ignore */
      avatar.mv('./uploads/' + avatar.name)

      response.send({
        status: true,
        message: 'File is uploaded',
        data: {
          /* @ts-ignore */
          name: avatar.name,
          /* @ts-ignore */
          mimetype: avatar.mimetype,
          /* @ts-ignore */
          size: avatar.size,
        },
      })
    }
  } catch (err) {
    response.status(500).send(err)
  }
}

export { uploader }
