import ExperienceItem from "@/components/Experience/ExperienceItem";

const WorkExperience: React.FC = () => {
  return (
    <div className="">
      <h2 className="text-xl font-bold text-gray-900 my-4">Work Experience</h2>
      <ExperienceItem
        title="React Developer"
        company="Build With Innovation"
        description="Proficiently contributed to dynamic web applications, including high-level e-commerce platforms. Key role in implementing real-time interactions, functionalities, & ensuring seamless user experiences. Demonstrated versatility with modern tech stacks like Next.js, React, Firebase etc."
        logoSrc="https://via.placeholder.com/150" // Replace with actual path
        startDate="2023"
        endDate="2024"
      />
      <ExperienceItem
        title="Research Intern"
        company="Defense Research & Development Organization (DRDO)"
        description="Conducted research on Bulk Growth of Silicon Carbide (SiC). Explored practical applications, including Electric Vehicle (EV) technology. Guided by Mr. Ankit Patel, Scientist C, in exploring Electronics technologies."
        logoSrc="https://via.placeholder.com/150" // Replace with actual path
        startDate="2021"
        endDate="2022"
      />
      <ExperienceItem
        title="Web Developer Intern"
        company="LetsGrowMore"
        description="Created a React web application with a student card grid layout. Modified various API calls, for retrieving user’s data. Developed Student Result Management System with HTML, CSS, & JavaScript. Implemented secure storage & evaluation for convenient access to exam results."
        logoSrc="https://via.placeholder.com/150" // Replace with actual path
        startDate="2021"
        endDate="2021"
        isLast
      />
    </div>
  );
};

export default WorkExperience;
