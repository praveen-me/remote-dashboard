import React from "react";

interface IAwardsProps {
  awards: string[];
}

const Awards = ({ awards }: IAwardsProps) => {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-gray-900">Awards</h2>
      <ul className="list-disc ml-8">
        {awards.map((award) => (
          <li className="text-sm text-gray-700 self-end" key={award}>
            {award}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Awards;
