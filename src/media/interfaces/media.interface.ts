export interface IMediaResponse {
	url: string
	name: string
}

export interface IFile extends Express.Multer.File {
	name?: string
}
