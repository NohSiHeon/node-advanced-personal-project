import express from 'express';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
import { AuthController } from '../controllers/auth.controller.js';

const authRouter = express.Router();
const authController = new AuthController();

// 회원가입
authRouter.post('/sign-up', signUpValidator, authController.signUp);

// 로그인
authRouter.post('/sign-in', signInValidator, authController.signIn);



// authRouter.post('/sign-up', signUpValidator, async (req, res, next) => {
// 	try {
// 		const { email, password, name } = req.body;

// 		const existedUser = await prisma.user.findUnique({ where: { email } });

// 		// 이메일이 중복된 경우
// 		if (existedUser) {
// 			return res.status(HTTP_STATUS.CONFLICT).json({
// 				status: HTTP_STATUS.CONFLICT,
// 				message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
// 			});
// 		}

// 		const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

// 		const data = await prisma.user.create({
// 			data: {
// 				email,
// 				password: hashedPassword,
// 				name,
// 			},
// 		});

// 		data.password = undefined;

// 		return res.status(HTTP_STATUS.CREATED).json({
// 			status: HTTP_STATUS.CREATED,
// 			message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
// 			data,
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

// authRouter.post('/sign-in', signInValidator, async (req, res, next) => {
// 	try {
// 		const { email, password } = req.body;

// 		const user = await prisma.user.findUnique({ where: { email } });

// 		const isPasswordMatched =
// 			user && bcrypt.compareSync(password, user.password);

// 		if (!isPasswordMatched) {
// 			return res.status(HTTP_STATUS.UNAUTHORIZED).json({
// 				status: HTTP_STATUS.UNAUTHORIZED,
// 				message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
// 			});
// 		}

// 		const payload = { id: user.id };

// 		const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
// 			expiresIn: ACCESS_TOKEN_EXPIRES_IN,
// 		});

// 		return res.status(HTTP_STATUS.OK).json({
// 			status: HTTP_STATUS.OK,
// 			message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
// 			data: { accessToken },
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

export { authRouter };
