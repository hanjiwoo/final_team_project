import React from "react";
import Image from "next/image";
import inforServiceImage from "../assets/images/inforServiceImage.jpg";

export default function AboutPage() {
	return (
		<Image src={inforServiceImage} alt="infor" className="w-full h-full" />
	);
}
