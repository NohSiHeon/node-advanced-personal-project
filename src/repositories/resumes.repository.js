import { prisma } from '../utils/prisma.util.js'
export class ResumesRepository {

	// 이력서 생성 레포지토리
	createResume = async (authorId, title, content) => {
		return await prisma.resume.create({
			data: {
				authorId,
				title,
				content,
			},
		});
	}
	// 이력서 목록 조회 레포지토리
	getAllResumesByauthorId = async (authorId, sort) => {
		return await prisma.resume.findMany({
			where: { authorId },
			orderBy: { createdAt: sort },
			include: { author: true },
		});
	}

	// 이력서 상세 조회
	findResumeById = async (id, authorId) => {
		return await prisma.resume.findUnique({
			where: {
				id: +id,
				authorId: +authorId,
			},
			include: { author: true }
		});
	}

	// 이력서 수정
	updateResume = async (id, authorId, title, content) => {
		return await prisma.resume.update({
			where: {
				id: +id,
				authorId: +authorId,
			},
			data: {
				...(title && { title }),
				...(content && { content }),
			}
		});

	}

	// 이력서 삭제
	deleteResumeById = async (id, authorId) => {
		return await prisma.resume.delete({
			where: {
				id: +id,
				authorId: +authorId,
			}
		});
	}
}