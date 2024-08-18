import defaultProfileImage from "@/assets/images/default-profile.png";
import Button from "@/components/button";
import Divider from "@/components/divider";
import Typography from "@/components/typography";
import Image from "next/image";

export interface CandidateProps {
  /** Name */
  name: string;
  /** Experience in years */
  experience?: string;
  /** Location */
  location?: string;
  /** Skills */
  skills?: string[];
  /** Profile Image */
  profileImage?: string;
  /** Commitment type */
  commitment?: Array<"full-time" | "part-time" | "contract">;
  /** summary */
  summary?: string;
}

export default function Candidate(props: CandidateProps) {
  const {
    name = "USER",
    experience,
    location,
    skills,
    profileImage = defaultProfileImage,
    commitment,
    summary,
  } = props;

  return (
    <div className="p-4 m-4 border-2 border-gray-300 rounded-xl">
      <div className="flex w-full justify-between">
        <div className="flex items-center">
          <Image
            src={profileImage}
            alt={name}
            className="w-14 h-w-14 rounded-md border border-gray-300"
          />
          <div className="ml-4 flex gap-4 ">
            <Typography variant="h5">{name}</Typography>
            {experience && (
              <>
                <Divider orientation="vertical" />
                <Typography variant="h5">Exp: {experience}</Typography>
              </>
            )}
            {location && (
              <>
                <Divider orientation="vertical" />
                <Typography variant="h5">{location}</Typography>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <Button
            text="Know More"
            onClick={console.log}
            variant="contained"
          ></Button>
        </div>
      </div>
      <div className="flex w-full justify-between"></div>
      <div className="flex w-full justify-between"></div>
    </div>
  );
}
