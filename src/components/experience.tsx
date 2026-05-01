import { WORK_EXPERIENCE } from "@/constants/home";
import { Label } from "@/components/ui/label";

export default function Experience() {
  return (
    <>
      <h4>MY WORK EXPERIENCE SO FAR:</h4>
      <ul>
        {WORK_EXPERIENCE.map((experience) => (
          <li key={`${experience.period}-${experience.company}`}>
            <Label expandedContent={experience.fullPeriod}>
              {experience.period}
            </Label>
            {" "}
            <a href={experience.href}>{experience.company}</a>
            {" - "}
            {experience.role}
          </li>
        ))}
      </ul>
    </>
  );
}
