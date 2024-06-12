import { MESSAGES } from "../constants/message.constant.js";
import { HASH_SALT_ROUNDS } from "../constants/auth.constant.js";
import { UsersRepository } from "../repositories/users.repository.js";
import bcrypt from 'bcrypt';
import { ACCESS_TOKEN_SECRET } from "../constants/env.constant.js";
import { ACCESS_TOKEN_EXPIRES_IN } from "../constants/auth.constant.js";
import jwt from 'jsonwebtoken';



export class AuthService {
	usersRepository = new UsersRepository();

	// 회원가입
	signUp = async (email, password, name) => {
		// 이메일 조회
		const alreadyExistUser = await this.usersRepository.findByEmail(email);

		// 중복 이메일 유효성 검증
		if (alreadyExistUser) {
			throw new Error(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
		}

		// 패스워드 암호화
		const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

		// 회원 생성
		const newUser = await this.usersRepository.createUser(email, hashedPassword, name);

		// 비밀번호 감추기
		newUser.password = undefined;

		// 회원 생성 반환
		return newUser;

	}

	// 로그인
	signIn = async (email, password) => {
		// 이메일 조회
		const user = await this.usersRepository.findByEmail(email);


		const isPasswordMatched = user && bcrypt.compareSync(password, user.password);

		if (!isPasswordMatched) {
			throw new Error(MESSAGES.AUTH.COMMON.UNAUTHORIZED);
		}

		const payload = { id: user.id };

		const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
			expiresIn: ACCESS_TOKEN_EXPIRES_IN,
		});

		return accessToken;

	}

}