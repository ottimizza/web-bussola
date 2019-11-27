import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
	handleError(error: any): void {
		const chunkFailedMessage = /Loading chunk [\d]+ failed/;
		console.error(error);
		if (chunkFailedMessage.test(error.message)) {
			if (
				confirm(
					`Nova versão encontrada!\r\nClique em 'OK' para atualizar`
				)
			) {
				window.location.reload();
			}
		}
	}
}
