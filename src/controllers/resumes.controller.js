import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";
import { ResumesService } from "../services/resumes.service.js";


export class ResumesController {
	resumesService = new ResumesService();
	// 이력서 생성 컨트롤러
	createResume = async (req, res, next) => {
		try {
			const user = req.user;
			const { title, content } = req.body;
			const authorId = user.id;

			const createdResume = await this.resumesService.createResume(title, content, authorId);

			return res.status(HTTP_STATUS.CREATED).json({
				status: HTTP_STATUS.CREATED,
				message: MESSAGES.RESUMES.CREATE,
				data: createdResume
			});
		} catch (error) {
			next(error);

		}
	}
	// 이력서 목록 조회 컨트롤러
	getResumes = async (req, res, next) => {
		try {
			const authorId = req.user.id;
			let { sort } = req.query;


			const resumes = await this.resumesService.getResume(authorId, sort);

			return res.status(HTTP_STATUS.OK).json({
				status: HTTP_STATUS.OK,
				message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
				data: resumes
			});

		} catch (error) {
			next(error);
		}
	}

	// 이력서 상세 조회 컨트롤러
	getResumeById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const authorId = req.user.id;

			const resume = await this.resumesService.getResumeById(id, authorId);

			return res.status(HTTP_STATUS.OK).json({
				status: HTTP_STATUS.OK,
				message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
				data: resume
			});

		} catch (error) {
			next(error);
		}
	}

	// 이력서 수정 컨트롤러
	updateResume = async (req, res, next) => {
		try {
			const { id } = req.params;

			const authorId = req.user.id;
			const { title, content } = req.body;

			const data = await this.resumesService.updateResumeById(id, authorId, title, content);

			return res.status(HTTP_STATUS.CREATED).json({
				status: HTTP_STATUS.CREATED,
				message: MESSAGES.RESUMES.UPDATE.SUCCEED,
				data,
			});

		} catch (error) {
			next(error);
		}
	}

	// 이력서 삭제
	deleteResume = async (req, res, next) => {
		try {
			const { id } = req.params;
			const authorId = req.user.id;

			const data = await this.resumesService.deleteResumeById(id, authorId);


			return res.status(HTTP_STATUS.OK).json({
				status: HTTP_STATUS.OK,
				message: MESSAGES.RESUMES.DELETE.SUCCEED,
				data: { id: data.id }
			});

		} catch (error) {
			next(error);
		}
	}
}