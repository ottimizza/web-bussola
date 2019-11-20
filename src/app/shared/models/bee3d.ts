export interface Bee {
	wrapper?: any;
	selector?: string;
	effect?: string;
	focus?: number;
	listeners?: {
		keys?: any;
		touches?: any;
		clicks?: any;
		scroll?: any;
		drag?: any;
	};
	navigation?: {
		enabled?: any;
		next?: any;
		prev?: any;
	};
	ajax?: {
		enabled?: any;
		path?: any;
		when?: any;
		maxFetches?: any;
		builder?(): any;
	};
	autoplay?: { enabled?: any; speed?: any; pauseHover?: any };
	loop?: { enabled?: any; continuous?: any; offset?: any };
	sync?: { enabled?: any; targets?: [] };
	parallax?: {
		enabled?: any;
		className?: string;
		friction?: number;
		settings?: {
			relativeInput?: any;
			clipRelativeInput?: any;
			calibrateX?: any;
			calibrateY?: any;
			scalarX?: number;
			scalarY?: number;
			frictionX?: number;
			frictionY?: number;
		};
	};
	shadows?: {
		enabled?: any;
		template?: any;
	};
	onInit?(): any;
	onChange?(): any;
	onDestroy?(): any;
}
