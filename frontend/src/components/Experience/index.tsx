import ExperienceItem from "@/components/Experience/ExperienceItem";
import { useAppStore } from "@/utils/StoreProvider";

interface WorkExperienceProps {
  experiences: Experience[];
}

const WorkExperience = ({ experiences }: WorkExperienceProps) => {
  return (
    <div className="">
      <h2 className="text-xl font-bold text-gray-900 my-4">Work Experience</h2>
      {experiences.map((experience, index) => (
        <ExperienceItem
          key={index}
          title={experience.role}
          company={experience.company}
          description={experience.description}
          logoSrc="https://via.placeholder.com/150"
          startDate={experience.startDate}
          endDate={experience.endDate}
          isLast={index === experiences.length - 1}
        />
      ))}
    </div>
  );
};

export default WorkExperience;
