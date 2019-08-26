import { AuthService } from './auth.service';

export function RefreshToken() {
	// tslint:disable-next-line: prefer-const
	let authService: AuthService;
	return () => {
		authService.refreshToken().subscribe((res: any) => {
			authService.setTokens(res.access_token, res.refresh_token);
		});
	};
}
