import { useEffect, useRef } from "react";

const useIntersectionObserver = (
	callback: () => void,
	options: IntersectionObserverInit = {}
) => {
	const ref = useRef<HTMLElement | null>(null);
	useEffect(() => {
		const observer = new IntersectionObserver((entries, observer) => {
			const entry = entries[0];
			console.log({ entry });
			if (entry.isIntersecting) {
				callback();
				if (ref.current) {
					observer.unobserve(ref.current);
				}
			}
		}, options);

		console.log(ref.current);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, [callback, options]);
	console.log(ref, "ref");
	return ref;
};

export default useIntersectionObserver;
