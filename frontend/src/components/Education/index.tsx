import EducationItem from "@/components/Education/EducationItem";

interface EducationProps {
	educations: Education[];
}

const Education = ({ educations }: EducationProps) => {
	return (
		<div className="">
			<h2 className="text-xl font-bold text-gray-900 my-4">Education</h2>
			{educations.map((education, index) => (
				<EducationItem
					key={index}
					college={education.school}
					degree={education.degree}
					logoSrc="https://via.placeholder.com/150"
					startDate={education.startDate}
					endDate={education.endDate}
					isLast={index === educations.length - 1}
				/>
			))}
		</div>
	);
};

export default Education;
