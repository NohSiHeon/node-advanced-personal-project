import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";
import { AuthService } from "../services/auth.Service.js";
export class AuthController {
	authService = new AuthService();

	// 회원가입
	signUp = async (req, res, next) => {
		try {
			const { email, password, name } = req.body;

			const signedUp = await this.authService.signUp(email, password, name);

			return res.status(HTTP_STATUS.CREATED).json({
				status: HTTP_STATUS.CREATED,
				message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
				data: signedUp
			});
		} catch (err) {
			next(err);
		}
	}

	// 로그인
	signIn = async (req, res, next) => {
		try {
			// 이메일, 비밀번호 값 받기
			const { email, password } = req.body;

			// 
			const signIn = await this.authService.signIn(email, password);

			return res.status(HTTP_STATUS.OK).json({
				status: HTTP_STATUS.OK,
				message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
				data: signIn
			});

		} catch (err) {
			next(err);
		}
	}
}