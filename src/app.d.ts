// See https://kit.svelte.dev/docs/types#app
import type { RecordModel } from 'pocketbase';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}

		interface Locals {
			pb: import('pocketbase').default;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			user?: RecordModel;
			authStore?: import('pocketbase').AuthStore;
		}

		interface PageData {
			flash?: { error: boolean; message: string };
		}

		// interface PageState {}
		// interface Platform {}

		namespace Superforms {
			type Message = {
				success: boolean;
				message: string;
			};
		}
	}
}

export {};
