import { MESSAGES } from "../constants/message.constant.js";
import { ResumesRepository } from "../repositories/resumes.repository.js"
export class ResumesService {

	resumesRepository = new ResumesRepository();

	// 이력서 생성 서비스
	createResume = async (title, content, authorId) => {

		const createdResume = await this.resumesRepository.createResume(
			authorId, title, content
		);
		return {
			authorId: createdResume.authorId,
			title: createdResume.title,
			content: createdResume.content
		}

	}

	// 이력서 목록 조회 서비스
	getResume = async (authorId, sort) => {

		sort = sort?.toLowerCase();

		if (sort !== 'desc' && sort !== 'asc') {
			sort = 'desc';
		}

		let gotResume = await this.resumesRepository.getAllResumesByauthorId(
			authorId, sort
		);

		gotResume = gotResume.map((resume) => {
			return {
				id: resume.id,
				authorId: resume.authorId,
				authorName: resume.name,
				title: resume.title,
				content: resume.content,
				status: resume.status,
				createdAt: resume.createdAt,
				updatedAt: resume.updatedAt,
			};
		});

		return gotResume;
	}

	// 이력서 상세 조회 서비스
	getResumeById = async (id, authorId) => {

		let resume = await this.resumesRepository.findResumeById(id, authorId);
		console.log(resume);
		if (!resume) {
			throw new Error(MESSAGES.RESUMES.COMMON.NOT_FOUND);
		}

		resume = {
			id: resume.id,
			authorName: resume.name,
			title: resume.title,
			content: resume.content,
			status: resume.status,
			createdAt: resume.createdAt,
			updatedAt: resume.updatedAt,
		};

		return resume;
	}

	// 이력서 수정 서비스
	updateResumeById = async (id, authorId, title, content) => {

		const updatedResume = await this.resumesRepository.updateResume(id, authorId, title, content);
		if (!updatedResume) {
			throw new Error(MESSAGES.RESUMES.COMMON.NOT_FOUND);
		}

		return updatedResume;
	}

	// 이력서 삭제 서비스
	deleteResumeById = async (id, authorId) => {

		const deletedResume = await this.resumesRepository.deleteResumeById(id, authorId);

		if (!deletedResume) {
			throw new Error(MESSAGES.RESUMES.COMMON.NOT_FOUND);
		}

		return deletedResume;

	}
}