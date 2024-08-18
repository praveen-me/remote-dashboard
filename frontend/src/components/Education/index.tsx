import EducationItem from "@/components/Education/EducationItem";

const Education: React.FC = () => {
  return (
    <div className="">
      <h2 className="text-xl font-bold text-gray-900 my-4">Education</h2>
      <EducationItem
        college="React Developer"
        degree="Build With Innovation"
        logoSrc="https://via.placeholder.com/150" // Replace with actual path
        startDate="2023"
        endDate="2024"
      />
      <EducationItem
        college="Research Intern"
        degree="Defense Research & Development Organization (DRDO)"
        logoSrc="https://via.placeholder.com/150" // Replace with actual path
        startDate="2021"
        endDate="2022"
      />
      <EducationItem
        college="Web Developer Intern"
        degree="LetsGrowMore"
        logoSrc="https://via.placeholder.com/150" // Replace with actual path
        startDate="2021"
        endDate="2021"
      />
    </div>
  );
};

export default Education;
