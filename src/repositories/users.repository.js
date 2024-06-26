import { prisma } from '../utils/prisma.util.js'

export class UsersRepository {

	// 회원가입
	createUser = async (email, hashedPassword, name) => {
		return await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			}
		});

	}

	// 이메일 조회
	findByEmail = async (email) => {
		return await prisma.user.findFirst({
			where: { email }
		});
	}


	// 토큰 인증
	findById = async (id) => {
		return await prisma.user.findUnique({
			where: { id },
			omit: { password: true },
		});
	}
}