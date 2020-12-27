import React, { useState, useEffect } from "react";
import { useWindowScroll } from "react-use";
import {CaretUpOutlined} from '@ant-design/icons'

const ScrollTop = () => {
	const { y: pageYOffset } = useWindowScroll();
	const [visible, setVisibility] = useState(false);

	useEffect(() => {
		if (pageYOffset > 900) {
			setVisibility(true);
		} else {
			setVisibility(false);
		}
	}, [pageYOffset]);

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	if (!visible) {
		return false;
	}
	return (
		<div className="scroll__toTop" onClick={scrollToTop}>
			<CaretUpOutlined />
		</div>
	);
};

export default ScrollTop;